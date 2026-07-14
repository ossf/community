# OpenSSF Tools by Persona

A Jekyll site built entirely from data files that map the OpenSSF projects onto
the roles they serve, the problems they solve, and the SLSA threats they mitigate.
Every page under `/personas/`, `/problems/`, `/projects/`, and `/artifacts/` is
generated from `data/` — there are no per-page source files. Each project declares which personas and problems it
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
/artifacts/                artifact index
/artifacts/<id>/           artifact detail · where it flows in the supply chain
/architecture/             architecture views · SLSA threat coverage, pillars, gaps
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

All content lives in Jekyll data files plus a JSON mirror — everything else in
the site is layout. `data/` is split by **who owns the edit**:

### `data/definitions/` — static

Controlled vocabularies. Records *reference* these by id; they are not where you
describe a project. Only edit them to track an upstream revision or to add a term.

| File                                    | Purpose                                                        |
| --------------------------------------- | -------------------------------------------------------------- |
| `definitions/personas.yml`                 | Persona rows (id, name, short, icon, summary)                  |
| `definitions/problems.yml`                 | Problem rows (same five fields as a persona)                   |
| `definitions/categories.yml`               | Category enum                                                  |
| `definitions/sdlc_stages.yml`              | SDLC stage enum                                                |
| `definitions/supply_chain_actors.yml`      | Supply-chain actor enum (producer / distributor / consumer)    |
| `definitions/slsa_threats.yml`             | SLSA v1.2 threats — a verbatim mirror of the spec              |
| `definitions/slsa_threat_categories.yml`   | SLSA v1.2 threat category headers                              |
| `definitions/artifacts.yml`                | The formats that flow between projects (SBOM, VEX, SARIF …) — external specs, so nobody here owns them |

### `data/working-groups/` — dynamic

The catalog project representatives maintain. **This is the half you send a PR
against.** One file per working group, holding the WG's own record and the
projects it hosts:

```yaml
# data/working-groups/orbit.yml
working_group:
  id: orbit
  name: ORBIT (…)
projects:
  - id: minder
    …
  - id: security-insights
    …
```

**A project's working group IS the file it lives in.** There is no `wg:` field, so
there is nothing to keep in sync — the build derives membership from the filename
(`theme/_plugins/catalog.rb`). To move a project between working groups, move its
entry between files. That is the entire change.

Each project record declares everything about itself: its personas, problems,
matrix placement, relationships, and the SLSA threats it mitigates.

Two files in there are not working groups:

- `uncategorized.yml` — a **holding pen**. The project list published in
  [`ossf/tac`](https://github.com/ossf/tac) is the authoritative source for
  membership, and it does not place these 10 projects. Rather than guess, they
  wait here. Moving one into the right WG file is how you categorise it.
- `data/governance.yml` (outside the directory) — the TAC and the Governing Board.
  They are governance bodies, not working groups, and host no projects, but they
  are still records on the architecture pages.

Which artifacts a project **produces** or **consumes** is declared on the project,
in its `relationships:` list. The artifact pages reverse-derive it, and
`/architecture/gaps/` uses it to flag any format something generates but nothing
reads.

`assets/data/catalog.json` is generated at build time from both halves — do not
edit it by hand.

### Relationships are derived, never authored twice

Personas and problems are linked only *through* projects — a persona page derives
the problems its projects solve, and vice versa. **Threat mitigations work the
same way:** a project declares the threats it mitigates on its own record, and
the threat pages reverse-lookup to build their mitigation lists. Nothing is ever
stated in two places, and no rep has to edit the static SLSA mirror to claim
coverage.

### Pages are generated from the data

`theme/_plugins/catalog_pages.rb` generates every persona, problem, project, and
artifact page at build time. **There are no per-page source files.** The only
hand-written pages on the whole site are the dozen-odd in `theme/pages/` — the
landing page, the section indexes, and the architecture views.

Adding a record to `data/` creates its page and its sidebar entry; removing the
record removes both. There is no override path, by design: a hand-crafted page
would be a second place to state a fact.

To add a project, append it to your working group's file in
`data/working-groups/`. That is the whole task.

The generator fails the build on a duplicate id, or on a project referencing a
persona/problem that doesn't exist — the layouts resolve records with a
last-match-wins find, so a duplicate id would otherwise silently shadow the real
entry rather than erroring.

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

Two directories. The content, and the website that renders it.

```
community/
├── data/                  ← THE CONTENT. Almost every contribution is here.
│   ├── definitions/       STATIC vocabularies; records reference these by id
│   │   ├── personas.yml
│   │   ├── problems.yml
│   │   ├── categories.yml
│   │   ├── sdlc_stages.yml
│   │   ├── supply_chain_actors.yml
│   │   ├── slsa_threats.yml           verbatim SLSA v1.2 mirror — no mitigations
│   │   ├── slsa_threat_categories.yml
│   │   └── artifacts.yml              SBOM, VEX, SARIF … — external specs
│   ├── working-groups/    DYNAMIC catalog the project reps maintain
│   │   ├── orbit.yml              the WG record + the projects it hosts
│   │   ├── supply-chain-integrity.yml
│   │   ├── … one file per working group …
│   │   └── uncategorized.yml      holding pen: no WG recorded yet
│   ├── governance.yml     the TAC and Governing Board (not working groups)
│   ├── navigation.yml     header nav
│   └── sidebar.yml        sidebar tree; catalog sections derive from the data
│
├── theme/                   ← THE WEBSITE. How the data becomes pages.
│   ├── _plugins/
│   │   └── catalog_pages.rb    generates every persona/problem/project/artifact page
│   ├── _layouts/
│   │   ├── default.html        shell (header + sidebar + content + footer)
│   │   ├── home.html           shell without sidebar (landing page)
│   │   ├── page.html           default page wrapper
│   │   ├── persona.html        project cards + derived problem chips
│   │   ├── problem.html        project cards + derived persona chips
│   │   ├── project.html        personas + problems + related projects
│   │   └── artifact.html       matrix placement + relationships
│   ├── _includes/
│   │   ├── header.html · footer.html · sidebar.html
│   │   ├── community-records.html   pools projects + artifacts + WGs into `records`
│   │   ├── threat-coverage.html     derives which threats have a mitigation
│   │   ├── pillar-grid.html         SDLC × actor matrix for /architecture/*
│   │   └── threats-list.html        SLSA threats + reverse-derived mitigations
│   ├── pages/             the only hand-written pages on the site
│       ├── index.md · about.md
│       ├── personas.md · problems.md · projects.md · artifacts.md   (section indexes)
│       └── architecture/  the architecture views
│
│   └── assets/            css · js · fonts · logo
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

- **Add or fix a project** → edit its entry in `data/working-groups/<your-wg>.yml`.
  That's the whole task: the `/projects/<id>/` page and the sidebar entry follow.
- **Categorise an uncategorized project** → move its entry out of
  `data/working-groups/uncategorized.yml` into its working group's file. The
  membership is the file; there is nothing else to update.
- **Claim or correct a SLSA threat mitigation** → add or edit `{id, status, note}`
  in your project's own `threats:` list. Set `status: confirmed` when the project
  asserts the coverage; entries marked `needs-review` are curator inferences
  waiting for a rep to confirm or drop them. **Never** edit
  `data/definitions/slsa_threats.yml` — it is a verbatim mirror of the SLSA spec,
  and the threat pages build their mitigation lists by reading your record.
- **Fix how your project is placed in the architecture matrix** → edit its
  `sdlc_stages`, `supply_chain_actors`, and `cell_synopses`.
- **Add a persona or problem** → append to `data/definitions/personas.yml` or
  `problems.yml` and reference it from at least one project.

Do not create files under `personas/`, `problems/`, `projects/`, or `artifacts/`.
They are generated, and a hand-written page would be a second place to state a
fact the data already carries.

`make test` runs the build and link-checks the output. The build itself fails on
a duplicate id or a reference to a persona/problem that doesn't exist, so most
mistakes surface immediately. Run it before opening a pull request against
[`ossf/community`](https://github.com/ossf/community).

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
