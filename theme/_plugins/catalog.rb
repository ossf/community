# frozen_string_literal: true

# Assembles site.data["catalog"] from data/working-groups/*.yml and
# data/governance.yml.
#
# A PROJECT'S WORKING GROUP IS THE FILE IT LIVES IN. There is no `wg:` field on a
# project record, so there is nothing to fall out of sync — membership is derived
# here, once, from the filename, and handed to the templates as a plain
# `working_group` attribute. Moving a project between working groups means moving
# its entry between files, and nothing else.
#
# Each data/working-groups/<id>.yml holds:
#   working_group:  the WG's own record (name, url, matrix placement, synopses)
#   projects:       the projects it hosts
#
# uncategorized.yml is the exception: it has no `working_group:`, because it is a
# holding pen rather than a working group. Its projects come out with
# working_group => nil, which is the honest answer — the TAC list does not place
# them and we are not guessing.
#
# data/governance.yml holds the TAC and the Governing Board. They are not working
# groups and host no projects, but they are still records on the architecture
# pages, so they join the working_groups pool for rendering purposes.
#
# Runs on :post_read, which fires after the data files are read but before the
# generators, so site.data["catalog"] exists by the time catalog_pages.rb needs it.

module OpenSSFCommunity
  module Catalog
    WG_DIR = "working-groups"

    def self.build(site)
      groups   = []
      projects = []

      (site.data[WG_DIR] || {}).sort.each do |slug, doc|
        next unless doc.is_a?(Hash)

        wg = doc["working_group"]
        groups << wg if wg

        # The filename is the membership. uncategorized.yml has no working_group,
        # so its projects correctly come out unaffiliated rather than inheriting
        # a WG id from the file they happen to sit in.
        wg_id = wg && wg["id"]
        (doc["projects"] || []).each do |project|
          projects << project.merge("working_group" => wg_id)
        end
      end

      # Governance bodies (TAC, Governing Board) render like working groups but
      # host nothing.
      groups.concat(site.data.dig("governance", "bodies") || [])

      site.data["catalog"] = {
        "projects"       => projects.sort_by { |p| p["id"].to_s },
        "working_groups" => groups.sort_by { |g| g["id"].to_s },
      }

      uncategorized = projects.count { |p| p["working_group"].nil? }
      Jekyll.logger.info "Catalog:", "#{projects.size} projects across #{groups.size} bodies " \
                                     "(#{uncategorized} uncategorized)"
    end
  end

  Jekyll::Hooks.register(:site, :post_read) { |site| Catalog.build(site) }
end
