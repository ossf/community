# OpenSSF Project Community

A Jekyll site built entirely from data files that map the OpenSSF ecosystem
onto four record types: the **projects** the foundation ships, the
**publications** (specifications, frameworks, formats) those projects produce
and implement, the **personas** they serve, and the **problems** they solve.
Every page under `/personas/`, `/problems/`, `/projects/`, and `/publications/`
is generated from `data/` — there are no per-page source files. Each record
declares which personas and problems it addresses (with a sentence of prose per
link) plus the records it's similar to or pairs well with. Visitors start from
whichever axis fits: their role, the problem they're solving, or a specific
project.

## Site map

```
/                          landing page · browse by role / problem / project
/personas/                 persona index
/personas/<id>/            persona view · projects & publications for this role
/problems/                 problem index
/problems/<id>/            problem view · what helps + personas who care
/projects/                 project index
/projects/<id>/            project detail · personas, problems, related records
/publications/             publication index
/publications/<id>/        publication detail · who produces, consumes, implements it
/about/                    about the mapping + data source
```

## Tech stack

- **[Jekyll](https://jekyllrb.com/) 4.4** with the `minima` base theme
- **kramdown** for Markdown, **Rouge** for syntax highlighting
- **`jekyll-seo-tag`** + **`jekyll-feed`**
- **SCSS** compiled by Jekyll (front-matter-prefixed `theme/assets/css/style.scss`)
- **FontAwesome** via CDN for icons; Cairo and IBM Plex Sans self-hosted in `theme/assets/fonts/`
- Vanilla JS for the theme toggle — the only client-side script

There are no framework dependencies beyond the plugins pinned in `Gemfile`.

## Data files

All content lives in Jekyll data files plus a JSON mirror — everything else in
the site is layout. `data/` is split by **who owns the edit**:

### `data/definitions/` — static

Vocabularies and externally-owned records. Catalog records *reference*
personas and problems by id; nothing project-specific is described here.

| File                            | Purpose                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| `definitions/personas.yml`      | Persona rows (id, name, short, icon, summary)                    |
| `definitions/problems.yml`      | Problem rows (same five fields as a persona)                     |
| `definitions/publications.yml`  | Externally-owned formats (SBOM, VEX, SARIF …) — outside specs, so nobody here owns them |

### `data/working-groups/` — dynamic

The catalog project representatives maintain. **This is the half you send a PR
against.** One file per working group, holding the WG's own record and the
records it hosts:

```yaml
# data/working-groups/orbit.yml
working_group:
  id: orbit
  name: ORBIT (…)
projects:
  - id: minder            # kind: project — software you run
    …
  - id: security-insights # kind: publication — a document/spec you read
    …
```

**A record's working group IS the file it lives in.** There is no `wg:` field, so
there is nothing to keep in sync — the build derives membership from the filename
(`theme/_plugins/catalog.rb`). To move a record between working groups, move its
entry between files. That is the entire change.

`kind:` distinguishes software (`project`) from documents and specifications
(`publication`) within a file. WG-hosted publications (SLSA, OSPS Baseline,
Security Insights, Gemara, OSV/OpenVEX) are pooled with the externally-owned
formats from `definitions/publications.yml` into one publications catalog.

One file in there is not a working group: `uncategorized.yml` is a **holding
pen**. The project list published in [`ossf/tac`](https://github.com/ossf/tac)
is the authoritative source for membership, and it does not place these
records. Rather than guess, they wait here. Moving one into the right WG file
is how you categorise it.

Which publications a project **produces** or **consumes** is declared on the
project, in its `relationships:` list. The publication pages reverse-derive it.

`theme/assets/data/catalog.json` (published at `/assets/data/catalog.json`) is
regenerated at build time from both halves — do not edit it by hand.

### Relationships are derived, never authored twice

Personas and problems are linked only *through* the records that declare them —
a persona page derives the problems its records solve, and vice versa.
Produces/consumes edges live on the declaring record, and the publication pages
reverse-lookup. Nothing is ever stated in two places.

### Pages are generated from the data

`theme/_plugins/catalog_pages.rb` generates every persona, problem, project, and
publication page at build time. **There are no per-page source files.** The only
hand-written pages on the whole site are the handful in `theme/pages/` — the
landing page, the section indexes, and the about page.

Adding a record to `data/` creates its page and its sidebar entry; removing the
record removes both. There is no override path, by design: a hand-crafted page
would be a second place to state a fact.

To add a record, append it to your working group's file in
`data/working-groups/`. That is the whole task.

The generator fails the build on a duplicate id, or on any reference that
doesn't resolve — persona/problem ids, relationship kinds and targets,
`similar_to` / `compatible_with` entries, and `status:` values outside
`confirmed` / `needs-review`. The layouts resolve records with a
last-match-wins find, so these mistakes would otherwise silently shadow or drop
data rather than erroring.

## Build

A `Makefile` wraps the common loops (Ruby ≥ 3.2 required):

```sh
make deps     # bundle install (first time / after Gemfile changes)
make start    # serve on http://localhost:4000
make test     # jekyll build + htmlproofer (run this before opening a PR)
make lint     # rubocop + yamllint (needs `pip3 install yamllint`)
```

On a fresh macOS box, `make brand-new-env-installs` installs Ruby via Homebrew
first — pinned to `ruby@3.3`, because Ruby 4.x breaks C extensions in older
gems Jekyll still depends on. The raw equivalents are `bundle install` and
`bundle exec jekyll serve` if you'd rather not use `make`.

## Repository layout

Two directories. The content, and the website that renders it.

```
community/
├── data/                  ← THE CONTENT. Almost every contribution is here.
│   ├── definitions/       STATIC: vocabularies + externally-owned records
│   │   ├── personas.yml
│   │   ├── problems.yml
│   │   └── publications.yml       SBOM, VEX, SARIF … — external specs
│   ├── working-groups/    DYNAMIC catalog the project reps maintain
│   │   ├── orbit.yml              the WG record + the projects/publications it hosts
│   │   ├── supply-chain-integrity.yml
│   │   ├── … one file per working group …
│   │   └── uncategorized.yml      holding pen: no WG recorded yet
│   ├── navigation.yml     header nav
│   └── sidebar.yml        sidebar tree; sections derive from the data
│
├── theme/                   ← THE WEBSITE. How the data becomes pages.
│   ├── _plugins/
│   │   ├── catalog.rb          pools data/working-groups/*.yml + definitions
│   │   │                       publications into site.data.catalog;
│   │   │                       WG membership = filename
│   │   ├── catalog_pages.rb    generates every persona/problem/project/publication page
│   │   └── theme_assets.rb     publishes theme/assets/** at /assets/**
│   ├── _layouts/
│   │   ├── default.html        shell (header + sidebar + content + footer)
│   │   ├── home.html           shell without sidebar (landing page)
│   │   ├── page.html           default page wrapper
│   │   ├── persona.html        record cards + derived problem chips
│   │   ├── problem.html        record cards + derived persona chips
│   │   ├── project.html        hero + shared record-detail body
│   │   └── publication.html    hero + shared record-detail body
│   ├── _includes/
│   │   ├── header.html · footer.html · sidebar.html
│   │   ├── community-records.html      pools projects + publications + WGs into `records`
│   │   ├── record-detail.html          shared personas/problems/related/relationships body
│   │   └── relationships-section.html  a record's implements/produces/consumes links
│   ├── pages/             the only hand-written pages on the site
│   │   ├── index.md · about.md
│   │   └── personas.md · problems.md · projects.md · publications.md   (section indexes)
│   └── assets/            css · js · fonts · logo · data/catalog.json
│                          published at /assets/** by theme/_plugins/theme_assets.rb
│
├── _config.yml            points Jekyll at data/ and theme/
└── Makefile
```

Two things make that layout work, and both are load-bearing:

- `data/` is read via `data_dir` **and** listed in `exclude`. Jekyll only
  auto-skips directories whose name starts with `_`, so without the exclude the
  entire catalog would also be walked as content and copied verbatim into the
  built site.
- A static file's URL is normally its path, which is why assets usually have to
  live at the repo root. `theme/_plugins/theme_assets.rb` overrides that so
  `theme/assets/css/style.css` is published at `/assets/css/style.css`.

## Contributing

Every contribution is an edit to a data file. No templating, no new pages, no
sidebar bookkeeping — the page and its navigation are generated from the record.

**If you represent a project, `data/working-groups/<your-wg>.yml` is your file.**

- **Add or fix a project or publication** → edit its entry in
  `data/working-groups/<your-wg>.yml`. That's the whole task: the page and the
  sidebar entry follow.
- **Categorise an uncategorized record** → move its entry out of
  `data/working-groups/uncategorized.yml` into its working group's file. The
  membership is the file; there is nothing else to update.
- **Confirm a relationship** → entries marked `status: needs-review` are curator
  inferences waiting for a rep to confirm or drop. Correct it, set
  `status: confirmed`, and delete the note.
- **Add a persona or problem** → append to `data/definitions/personas.yml` or
  `problems.yml` and reference it from at least one record.

Do not create files under `personas/`, `problems/`, `projects/`, or
`publications/`. They are generated, and a hand-written page would be a second
place to state a fact the data already carries.

`make test` runs the build and link-checks the output. The build itself fails on
a duplicate id or an unresolvable reference, so most mistakes surface
immediately. `make lint` covers formatting: yamllint over `data/` and the
workflows, RuboCop over the plugins. Run both before opening a pull request
against [`ossf/community`](https://github.com/ossf/community) — CI runs the
same two targets on every PR.

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
