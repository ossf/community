.PHONY: brand-new-env-installs deps start test a11y lint refresh-insights

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
	A11Y_SAMPLE=$(or $(A11Y_SAMPLE),1) $(MAKE) a11y

# WCAG 2 AA (axe) in both themes; config in .pa11yci.js. `make a11y` checks
# every page (~7 min); `make test` checks one page per layout unless run as
# `make test A11Y_SAMPLE=0`, which is what CI does.
# Needs Node >= 22.13; pa11y-ci fetches its own headless Chrome on first run.
PA11Y_CI ?= pa11y-ci@5.0.0
a11y:
	bundle exec ruby -run -e httpd _site -p 4001 >/dev/null 2>&1 & server=$$!; \
	  curl -sf --retry 20 --retry-connrefused --retry-delay 1 -o /dev/null http://localhost:4001/ \
	  && npx --yes $(PA11Y_CI) --config .pa11yci.js; status=$$?; kill $$server; exit $$status

# yamllint is not a gem, so it isn't in the Gemfile. Use it from PATH if it's
# there, otherwise as a module (how `pip install --user` leaves it).
YAMLLINT := $(shell command -v yamllint 2>/dev/null || echo "python3 -m yamllint")

lint: deps
	bundle exec rubocop
	@$(YAMLLINT) --version >/dev/null 2>&1 || { echo "yamllint not found. Install with: pip3 install yamllint"; exit 1; }
	$(YAMLLINT) data/ .github/ _config.yml

# Re-read every `insights:` target and rewrite the snapshot. Writes to a temp
# file first: any non-zero exit (rate limit, network, bad target) leaves the
# committed snapshot untouched. Exit 0 still includes not-found/invalid rows —
# those are facts about the project and are meant to land.
refresh-insights:
	ruby -ryaml -e 'puts Dir["data/working-groups/*.yml"].sort.flat_map { |f| (YAML.load_file(f)["projects"] || []).map { |p| p["insights"] }.compact }' \
	  | xargs $(SI_FETCH) fetch > $(SNAPSHOT).tmp \
	  && mv $(SNAPSHOT).tmp $(SNAPSHOT) \
	  || { rm -f $(SNAPSHOT).tmp; exit 1; }
