# frozen_string_literal: true

# Assembles site.data["catalog"] from data/working-groups/*.yml and
# data/definitions/publications.yml.
#
# A RECORD'S WORKING GROUP IS THE FILE IT LIVES IN. There is no `wg:` field on a
# record, so there is nothing to fall out of sync — membership is derived here,
# once, from the filename, and handed to the templates as a plain
# `working_group` attribute. Moving a record between working groups means moving
# its entry between files, and nothing else.
#
# Each data/working-groups/<id>.yml holds:
#   working_group:  the WG's own record (name, url)
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
# VEX, SARIF … — nobody here owns those, so they have no WG file to live in).
#
# Runs on :post_read, which fires after the data files are read but before the
# generators, so site.data["catalog"] exists by the time catalog_pages.rb needs it.

module OpenSSFCommunity
  module Catalog
    WG_DIR = "working-groups"

    def self.build(site)
      groups = []
      hosted = []

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

      projects, publications = hosted.partition { |r| r["kind"] != "publication" }
      publications += site.data.dig("definitions", "publications") || []

      site.data["catalog"] = {
        "projects"       => projects.sort_by { |p| p["id"].to_s },
        "publications"   => publications.sort_by { |p| p["id"].to_s },
        "working_groups" => groups.sort_by { |g| g["id"].to_s },
      }

      uncategorized = hosted.count { |p| p["working_group"].nil? }
      Jekyll.logger.info "Catalog:", "#{projects.size} projects + #{publications.size} publications " \
                                     "across #{groups.size} working groups (#{uncategorized} uncategorized)"
    end
  end

  Jekyll::Hooks.register(:site, :post_read) { |site| Catalog.build(site) }
end
