.PHONY: brand-new-env-installs deps start test

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
