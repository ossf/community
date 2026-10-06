# frozen_string_literal: true

# Assembles site.data["catalog"] from data/working-groups/*.yml,
# data/definitions/publications.yml and the Security Insights snapshot in
# data/generated/insights.json.
#
# A RECORD'S WORKING GROUP IS THE FILE IT LIVES IN. There is no `wg:` field on a
# record, so there is nothing to fall out of sync — membership is derived here,
# once, from the filename, and handed to the templates as a plain
# `working_group` attribute. Moving a record between working groups means moving
# its entry between files, and nothing else.
#
# A RECORD'S NAME, HOMEPAGE AND REPOSITORIES ARE ITS SECURITY INSIGHTS FILE.
# The entry only says where that file is (`insights:` — a GitHub blob URL, or
# `owner/repo` for discovery); the snapshot holds what `si fetch` read from it,
# one row per target. A record whose row is missing or not `ok` is not
# rendered: it is reported under catalog.awaiting_insights instead, and keeps
# its curated mapping in the file so it reappears intact when the file lands.
#
# Each data/working-groups/<id>.yml holds:
#   working_group:  the WG's own record (name, description, url)
#   projects:       the records it hosts — `kind: project` for software,
#                   `kind: publication` for documents/specs the WG stewards
#
# uncategorized.yml is the exception: it has no `working_group:`, because it is a
# holding pen rather than a working group. Its records come out with
# working_group => nil, which is the honest answer — the TAC list does not place
# them and we are not guessing.
#
# catalog.publications pools BOTH halves: the hosted `kind: publication` records
# and the externally-owned formats in data/definitions/publications.yml (SBOM,
# VEX, SARIF … — nobody here owns those, so they have no WG file and no SI).
#
# Runs on :post_read, which fires after the data files are read but before the
# generators, so site.data["catalog"] exists by the time catalog_pages.rb needs it.

module OpenSSFCommunity
  module Catalog
    WG_DIR = "working-groups"

    def self.build(site)
      groups = []
      hosted = []
      snapshot = (site.data.dig("generated", "insights") || []).to_h { |row| [row["target"], row] }

      (site.data[WG_DIR] || {}).sort.each do |slug, doc|
        next unless doc.is_a?(Hash)

        wg = doc["working_group"]
        groups << wg if wg

        # The filename is the membership. uncategorized.yml has no working_group,
        # so its records correctly come out unaffiliated rather than inheriting
        # a WG id from the file they happen to sit in.
        wg_id = wg && wg["id"]
        (doc["projects"] || []).each do |record|
          hosted << record.merge("working_group" => wg_id)
        end
      end

      awaiting = []
      rendered = hosted.select do |record|
        reason = apply_insights!(record, snapshot[record["insights"]])
        next true unless reason

        Jekyll.logger.debug "Catalog:", "#{record['id']} hidden — #{reason}"
        awaiting << {
          "id"            => record["id"],
          "kind"          => record["kind"],
          "working_group" => record["working_group"],
          "insights"      => record["insights"],
          "url"           => repo_url(record["insights"], snapshot[record["insights"]]),
          "reason"        => reason,
        }
        false
      end

      projects, publications = rendered.partition { |r| r["kind"] != "publication" }
      publications += site.data.dig("definitions", "publications") || []

      site.data["catalog"] = {
        "projects"          => projects.sort_by { |p| p["id"].to_s },
        "publications"      => publications.sort_by { |p| p["id"].to_s },
        "working_groups"    => groups.sort_by { |g| g["id"].to_s },
        "awaiting_insights" => awaiting.sort_by { |a| a["id"].to_s },
      }

      uncategorized = rendered.count { |p| p["working_group"].nil? }
      Jekyll.logger.info "Catalog:", "#{projects.size} projects + #{publications.size} publications " \
                                     "across #{groups.size} working groups (#{uncategorized} uncategorized, " \
                                     "#{awaiting.size} awaiting Security Insights)"
    end

    # Fills name/url/repositories from the snapshot row. Returns nil when the
    # record is renderable, otherwise the reason it is hidden.
    def self.apply_insights!(record, row)
      return "no insights: target" unless record["insights"]
      return "not in snapshot — run `make refresh-insights`" unless row
      return "#{row['status']}: #{row['error'].to_s.lines.first.to_s.strip}" unless row["status"] == "ok"

      si      = row["insights"] || {}
      project = si["project"]
      record["name"]              = project ? project["name"] : record["id"].tr("-", " ")
      record["url"]               = (project && project["homepage"]) || si.dig("repository", "url") || repo_url(record["insights"], row)
      record["repositories"]      = (project && project["repositories"]) || []
      record["si_status"]         = project ? "ok" : "no-project-block"
      record["si_schema_version"] = row["schema-version"]
      # `owner/repo` targets are not links; point the hero at the file that was found.
      unless record["insights"].start_with?("http")
        record["insights"] = "https://github.com/#{row['owner']}/#{row['repo']}/blob/HEAD/#{row['path']}"
      end
      nil
    end

    # Best link for a record we cannot render: the repo the file lives (or
    # should live) in. owner/repo are omitempty on failed rows, so fall back
    # to the target itself when it is already a URL.
    def self.repo_url(target, row)
      return "https://github.com/#{row['owner']}/#{row['repo']}" if row && row["owner"] && row["repo"]
      return target if target.to_s.start_with?("http")
      return "https://github.com/#{target}" if target.to_s.match?(%r{\A[\w.-]+/[\w.-]+\z})

      nil
    end
  end

  Jekyll::Hooks.register(:site, :post_read) { |site| Catalog.build(site) }
end
