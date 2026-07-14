# frozen_string_literal: true

# Publishes theme/assets/** at /assets/**.
#
# Jekyll derives a static file's URL from where it sits on disk, so a file at
# theme/assets/js/theme-toggle.js would normally be published at
# /theme/assets/js/theme-toggle.js. That path-is-the-URL rule is the only reason
# assets conventionally have to sit at the repo root — and it is the one thing
# that stopped the whole website from living under theme/.
#
# So we re-home them. A static file is READ from `path` (built from base + dir +
# name) but WRITTEN to `destination`, which Jekyll derives solely from `url`.
# Those two are independent, so overriding `url` moves where a file is published
# without touching where it is read from. Strip the leading "theme/" and the file
# lands exactly where the browser expects it.
#
# Files that carry front matter are NOT static files — Jekyll renders them, and
# they honour a `permalink:` instead. That covers assets/css/style.scss and
# assets/data/catalog.json, which each declare one. If you add a new asset that
# has front matter, give it a permalink; anything else is handled here.

module OpenSSFCommunity
  # A static file under theme/assets/ that publishes to /assets/.
  class ThemeAsset < Jekyll::StaticFile
    def url
      @url ||= super.sub(%r{\A/?theme/}, "/")
    end
  end

  # The reader has no hook for choosing the class it instantiates, so swap our
  # subclass in once the site has been read but before anything is rendered.
  Jekyll::Hooks.register :site, :post_read do |site|
    rehomed = 0

    site.static_files.map! do |file|
      dir = File.dirname(file.relative_path).sub(%r{\A/}, "")
      next file unless dir.start_with?("theme/assets")

      rehomed += 1
      ThemeAsset.new(site, site.source, dir, file.name)
    end

    Jekyll.logger.info "Assets:", "published #{rehomed} files from theme/assets/ at /assets/"
  end
end
