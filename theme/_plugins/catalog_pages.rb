# frozen_string_literal: true

# Generates every persona / problem / project / artifact page from data/.
#
# There are NO stub files on disk and there is deliberately NO override path:
# the data files are the only source of truth. Adding an id to data/ creates its
# page; removing the id removes the page. Nothing about a record can be
# expressed by hand-crafting a file, because a hand-crafted file would be a
# second place to state a fact — which is the bug this data model exists to
# prevent.
#
# The payoff is that the dead-link invariant becomes unbreakable by
# construction. A page cannot fail to exist for a referenced id, so `make test`
# is a safety net rather than the thing standing between us and a broken site.
#
# Lives at theme/_plugins/ (see plugins_dir in _config.yml). This runs under
# `bundle exec jekyll build`, which is what both the Makefile and
# .github/workflows/pages.yml use. It would NOT run under GitHub Pages' hosted
# gem-based build, which ignores plugins entirely — don't switch to that.

module OpenSSFCommunity
  class CatalogPages < Jekyll::Generator
    safe true
    priority :high

    # dir => [data path, layout name]. The layout name also gives the front
    # matter id key the layouts look up (`persona_id`, `project_id`, ...).
    TYPES = {
      "personas"  => [%w[definitions personas],   "persona"],
      "problems"  => [%w[definitions problems],   "problem"],
      "projects"  => [%w[catalog  projects],  "project"],
      "artifacts" => [%w[definitions artifacts], "artifact"],
    }.freeze

    def generate(site)
      records = TYPES.transform_values { |(path, _)| site.data.dig(*path) || [] }

      validate!(records)

      project_count = records["projects"].size

      TYPES.each do |dir, (_, layout)|
        records[dir].each do |record|
          site.pages << build_page(site, dir, layout, record, project_count)
        end
      end

      Jekyll.logger.info "Catalog:", "generated #{records.values.sum(&:size)} pages from data/ " \
                                     "(#{records.map { |d, r| "#{r.size} #{d}" }.join(', ')})"
    end

    private

    def build_page(site, dir, layout, record, project_count)
      id = record["id"]
      page = Jekyll::PageWithoutAFile.new(site, site.source, dir, "#{id}.html")
      page.content = ""
      page.data.merge!(
        "layout"        => layout,
        "title"         => record["name"],
        "permalink"     => "/#{dir}/#{id}/",
        "#{layout}_id"  => id,
        "description"   => description_for(layout, record, project_count)
      )
      page
    end

    def description_for(layout, record, project_count)
      name = record["name"]
      case layout
      when "persona"
        # The count is computed. It used to be hardcoded as "14" in six stub
        # files and went stale the moment a project was added.
        "How the #{name} persona should use each of the #{project_count} OpenSSF " \
        "projects — one role-specific sentence per project."
      when "problem"
        "Which OpenSSF projects help with #{name}, and the personas who care about it."
      when "project"
        if (record["personas"] || []).empty? && (record["problems"] || []).empty?
          "#{name} — an OpenSSF project awaiting its persona and problem mapping."
        else
          "Which personas and problems #{name} addresses — a role-by-role and " \
          "problem-by-problem breakdown of the OpenSSF project."
        end
      when "artifact"
        "What #{name} is and which OpenSSF projects produce or consume it."
      end
    end

    # Fail the build on the two mistakes this data model is most exposed to.
    # Both are silent at runtime: the layouts resolve a record with a
    # loop-and-flag find, so a duplicate id quietly wins (last match) and a
    # dangling reference quietly renders a link to a page that does not exist.
    def validate!(records)
      errors = []

      records.each do |dir, list|
        ids = list.map { |r| r["id"] }
        dupes = ids.tally.select { |_, n| n > 1 }.keys
        errors << "#{dir}: duplicate id(s) #{dupes.join(', ')} — the layouts' find pattern is " \
                  "last-match-wins, so the later entry would silently shadow the earlier one" if dupes.any?
        blank = list.reject { |r| r["id"] && r["name"] }
        errors << "#{dir}: #{blank.size} record(s) missing id or name" if blank.any?
      end

      # Every persona/problem a project claims must be a real vocabulary term.
      persona_ids = records["personas"].map { |r| r["id"] }
      problem_ids = records["problems"].map { |r| r["id"] }
      records["projects"].each do |p|
        (p["personas"] || []).each do |link|
          errors << "projects/#{p['id']}: unknown persona id '#{link['id']}'" unless persona_ids.include?(link["id"])
        end
        (p["problems"] || []).each do |link|
          errors << "projects/#{p['id']}: unknown problem id '#{link['id']}'" unless problem_ids.include?(link["id"])
        end
      end

      return if errors.empty?

      raise Jekyll::Errors::FatalException,
            "Catalog data is invalid:\n  - #{errors.join("\n  - ")}"
    end
  end
end
