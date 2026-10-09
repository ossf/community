.PHONY: brand-new-env-installs deps start test refresh-insights

# `si fetch` from ossf/si-tooling, pinned to a release. Override to run a
# local checkout: make refresh-insights SI_FETCH="go -C ../si-tooling/v2 run ./cmd/si"
SI_FETCH ?= go run github.com/ossf/si-tooling/v2/cmd/si@v2.3.0
SNAPSHOT := data/generated/insights.json

brand-new-env-installs:
	@command -v brew >/dev/null || { echo "Homebrew not found. Install from https://brew.sh first."; exit 1; }
	brew install ruby@3.3
	@echo
	@echo "Ruby 3.3 installed at /opt/homebrew/opt/ruby@3.3/bin/ruby."
	@echo "We pin to 3.3 (not latest) because Ruby 4.x breaks C extensions in older gems"
	@echo "like http_parser.rb that Jekyll still depends on."
	@echo
	@echo "Add it to your PATH so it takes precedence over macOS system Ruby 2.6:"
	@echo
	@echo "    echo 'export PATH=\"/opt/homebrew/opt/ruby@3.3/bin:\$$PATH\"' >> ~/.zshrc"
	@echo "    exec zsh"
	@echo
	@echo "Then run: make deps"

deps:
	bundle install

start: deps
	bundle exec jekyll serve

test: deps
	bundle exec jekyll build
	bundle exec htmlproofer ./_site --disable-external

# Re-read every `insights:` target and rewrite the snapshot. Writes to a temp
# file first: any non-zero exit (rate limit, network, bad target) leaves the
# committed snapshot untouched. Exit 0 still includes not-found/invalid rows —
# those are facts about the project and are meant to land.
refresh-insights:
	ruby -ryaml -e 'puts Dir["data/working-groups/*.yml"].sort.flat_map { |f| (YAML.load_file(f)["projects"] || []).map { |p| p["insights"] }.compact }' \
	  | xargs $(SI_FETCH) fetch > $(SNAPSHOT).tmp \
	  && mv $(SNAPSHOT).tmp $(SNAPSHOT) \
	  || { rm -f $(SNAPSHOT).tmp; exit 1; }
