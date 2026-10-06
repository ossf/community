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
# SECURITY INSIGHTS ENRICHES A RECORD; IT NEVER GATES IT. The entry states a
# `name` and says where the project's Security Insights file is (`insights:` —
# a GitHub blob URL, or `owner/repo` for discovery). The snapshot holds what
# `si fetch` read from it, one row per target. When the row is ok, the SI
# project name wins over the local one and homepage/repositories come from it.
# When the row is missing or not ok, the record renders from its local name and
# description, its url derives from the repo, and `si_available` is false so the
# layouts can say why. catalog.awaiting_insights lists those records.
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

      hosted.each { |record| apply_insights!(record, snapshot[record["insights"]]) }

      awaiting = hosted.reject { |r| r["si_available"] }.map do |r|
        {
          "id"       => r["id"],
          "name"     => r["name"],
          "kind"     => r["kind"],
          "page"     => "/#{r['kind'] == 'publication' ? 'publications' : 'projects'}/#{r['id']}/",
          "repo_url" => r["repo_url"],
          "reason"   => r["si_status"],
        }
      end

      projects, publications = hosted.partition { |r| r["kind"] != "publication" }
      publications += site.data.dig("definitions", "publications") || []

      site.data["catalog"] = {
        "projects"          => projects.sort_by { |p| p["id"].to_s },
        "publications"      => publications.sort_by { |p| p["id"].to_s },
        "working_groups"    => groups.sort_by { |g| g["id"].to_s },
        "awaiting_insights" => awaiting.sort_by { |a| a["id"].to_s },
      }

      uncategorized = hosted.count { |p| p["working_group"].nil? }
      Jekyll.logger.info "Catalog:", "#{projects.size} projects + #{publications.size} publications " \
                                     "across #{groups.size} working groups (#{uncategorized} uncategorized, " \
                                     "#{awaiting.size} without Security Insights)"
    end

    # Enrich a record from its snapshot row. Always leaves the record renderable:
    # `si_available` says whether the SI file was usable, `si_status` is "ok" or
    # the reason it was not.
    def self.apply_insights!(record, row)
      record["repo_url"] = repo_url(record["insights"], row)

      reason =
        if !record["insights"]      then "no insights: target"
        elsif !row                  then "not in snapshot — run `make refresh-insights`"
        elsif row["status"] != "ok" then "#{row['status']}: #{row['error'].to_s.lines.first.to_s.strip}"
        end

      if reason
        Jekyll.logger.debug "Catalog:", "#{record['id']} without Security Insights — #{reason}"
        record["url"]          = nil # the homepage is an SI fact; openssf_url is the link that is always there
        record["repositories"] = []
        record["si_available"] = false
        record["si_status"]    = reason
        return
      end

      si      = row["insights"] || {}
      project = si["project"]
      record["name"]              = project["name"] if project && !project["name"].to_s.empty?
      record["url"]               = (project && project["homepage"]) || si.dig("repository", "url")
      record["repositories"]      = (project && project["repositories"]) || []
      record["si_available"]      = true
      record["si_status"]         = project ? "ok" : "ok (no project block)"
      record["si_schema_version"] = row["schema-version"]
      # `owner/repo` targets are not links; point the hero at the file that was found.
      unless record["insights"].start_with?("http")
        record["insights"] = "https://github.com/#{row['owner']}/#{row['repo']}/blob/HEAD/#{row['path']}"
      end
    end

    # The repository the SI file lives (or should live) in. owner/repo are
    # omitempty on failed rows, so fall back to the target itself.
    def self.repo_url(target, row)
      return "https://github.com/#{row['owner']}/#{row['repo']}" if row && row["owner"] && row["repo"]
      return target if target.to_s.start_with?("http")
      return "https://github.com/#{target}" if target.to_s.match?(%r{\A[\w.-]+/[\w.-]+\z})

      nil
    end
  end

  Jekyll::Hooks.register(:site, :post_read) { |site| Catalog.build(site) }
end
