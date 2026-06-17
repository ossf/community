# OpenSSF Tools by Persona

A Jekyll site built from three master lists — **personas**, **problems**, and
**projects** — that maps the OpenSSF projects onto the roles they serve and the
problems they solve. Each project declares which personas and problems it
addresses (with a sentence of prose per link) plus the projects it's similar to
or pairs well with. Visitors start from whichever axis fits: their role, the
problem they're solving, or a specific project.

## Site map

```
/                          landing page · browse by role / problem / project
/personas/                 persona index
/personas/<id>/            persona view · projects for this role + problems they solve
/problems/                 problem index
/problems/<id>/            problem view · projects that help + personas who care
/projects/                 project index
/projects/<slug>/          project detail · personas, problems, related projects
/about/                    about the mapping + data source
```

## Tech stack

- **[Jekyll](https://jekyllrb.com/) 4.4** with the `minima` base theme
- **kramdown** for Markdown, **Rouge** for syntax highlighting
- **`jekyll-seo-tag`** + **`jekyll-feed`**
- **SCSS** compiled by Jekyll (front-matter-prefixed `assets/css/style.scss`)
- **FontAwesome** via CDN for icons
- Vanilla JS for the theme toggle

There are no framework dependencies beyond the plugins pinned in `Gemfile`.

## Data files

All content lives in three Jekyll data files plus a JSON mirror — everything
else in the site is layout.

| File                            | Purpose                                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `_data/personas.yml`            | Persona rows (id, name, short, icon, summary) — **source of truth**                                  |
| `_data/problems.yml`            | Problem rows (same five fields as a persona) — **source of truth**                                   |
| `_data/projects.yml`            | Projects; each declares the personas + problems it addresses (`{id, note}` lists), `insights`, and optional `similar_to`/`compatible_with` — **source of truth** |
| `assets/data/catalog.json`      | Generated at build time from the three YAML files; do not edit by hand                               |

Personas and problems are linked only *through* projects — a persona page derives
the problems its projects solve, and vice versa. The three YAML files are the
single source of truth; the `note` sentences, `insights` links, and project
relationships are all edited here and refined over time.

**Invariant:** every problem `id` used in `projects.yml` must have a matching
`problems/<id>.md` stub, or `make test` fails on a dead internal link.

## Build

A `Makefile` wraps the common loops (Ruby ≥ 3.2 required):

```sh
make deps     # bundle install (first time / after Gemfile changes)
make start    # serve on http://localhost:4000
make test     # jekyll build + htmlproofer (run this before opening a PR)
```

On a fresh macOS box, `make brand-new-env-installs` installs a suitable Ruby
via Homebrew first. The raw equivalents are `bundle install` and
`bundle exec jekyll serve` if you'd rather not use `make`.

## Repository layout

```
community/
├── _config.yml
├── _data/
│   ├── navigation.yml        # header nav
│   ├── sidebar.yml           # collapsible sidebar (hand-maintained)
│   ├── personas.yml          # master list 1 · personas
│   ├── problems.yml          # master list 2 · problems
│   └── projects.yml          # master list 3 · projects (+ persona/problem maps)
├── _includes/
│   ├── header.html           # OpenSSF logo + branding + theme toggle
│   ├── footer.html           # social links + copyright
│   └── sidebar.html          # collapsible <details> sidebar nav
├── _layouts/
│   ├── default.html          # shell (header + sidebar + content + footer)
│   ├── home.html             # shell without sidebar (landing page)
│   ├── page.html             # default page wrapper
│   ├── persona.html          # switcher + project cards + derived problem chips
│   ├── problem.html          # switcher + project cards + derived persona chips
│   └── project.html          # personas + problems accordions + related projects
├── assets/
│   ├── css/style.scss        # Gemara stylesheet + net-new site CSS
│   ├── js/theme-toggle.js    # dark-mode toggle (verbatim from Gemara)
│   ├── fonts/                # Cairo + IBMPlexSans
│   ├── data/catalog.json
│   ├── favicon.ico
│   └── logo.svg
├── personas/
│   ├── index.md              # /personas/
│   ├── developer.md          # /personas/developer/ …etc.
│   └── …
├── problems/
│   ├── index.md              # /problems/
│   ├── build-provenance.md   # /problems/build-provenance/ …etc.
│   └── …
├── projects/
│   ├── index.md              # /projects/
│   ├── allstar.md            # /projects/allstar/ …etc.
│   └── …
├── about.md                  # /about/
└── index.md                  # /
```

## Contributing

The site is data-driven, so most contributions are edits to one of the three
`_data/*.yml` files — no templating required.

- **Add or fix a project** → edit `_data/projects.yml` and add a one-line stub at
  `projects/<slug>.md` (copy an existing stub and change the front matter).
- **Add a persona or problem** → append to `_data/personas.yml` or
  `_data/problems.yml`, add the matching `personas/<id>.md` / `problems/<id>.md`
  stub, and reference it from at least one project in `_data/projects.yml`.
- **Keep the sidebar in sync** → `_data/sidebar.yml` is hand-maintained, so add
  your new id/url there too.

Every problem and persona `id` used in `projects.yml` must have a matching stub
page, or `make test` fails on a dead internal link. Run `make test` before
opening a pull request against [`ossf/community`](https://github.com/ossf/community).

## Accessibility

- Full keyboard navigation: focus rings on pills, tabs, and `<details>` summaries.
- `aria-selected` / `aria-current` on the persona switcher pills.
- Native `<details>` elements on the tool-detail accordion (no JS needed).
- Dark-mode parity via the `data-theme="dark"` attribute and the inline
  anti-flash script in the `<head>`.
- Responsive down to mobile; the sticky persona switcher collapses to a
  static strip on screens ≤ 600 px.

## License & attribution

The OpenSSF logo is used with attribution and links back to
<https://openssf.org>. This site is distributed under the same license as the
underlying OpenSSF project metadata.
