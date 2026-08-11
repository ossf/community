---
layout: default
title: About
permalink: /about/
description: About OpenSSF Project Community — where the data comes from, who it's for, and how to contribute.
---

# About this site

**OpenSSF Project Community** is a role- and problem-first way to navigate the
projects the Open Source Security Foundation ships. Rather than ask visitors to
read a stack of separate project READMEs and work out which ones apply to them,
this site lets you start from whichever angle fits how you think: your role, the
problem you're solving, or a specific project.

## How the site is built

Everything renders from **three master lists** in `_data/`:

- **Personas** ({{ site.data.definitions.personas | size }}) — the roles that touch the OpenSSF toolchain.
- **Problems** ({{ site.data.definitions.problems | size }}) — the security problems those projects address.
- **Projects** ({{ site.data.catalog.projects | size }}) — each declaring which personas and problems it
  addresses (with a sentence of prose for each), plus links to similar and
  complementary projects.

Personas and problems are never linked directly — that relationship is *derived
through projects*. A persona page surfaces the problems its projects solve; a
problem page surfaces the personas who care.

### Personas

{% for p in site.data.definitions.personas %}
- **[{{ p.name }}]({{ '/personas/' | append: p.id | append: '/' | relative_url }})** — {{ p.short }}
{% endfor %}

### Problems

{% for pr in site.data.definitions.problems %}
- **[{{ pr.name }}]({{ '/problems/' | append: pr.id | append: '/' | relative_url }})** — {{ pr.short }}
{% endfor %}

### Projects

{% for project in site.data.catalog.projects %}
- **[{{ project.name }}]({{ '/projects/' | append: project.id | append: '/' | relative_url }})** — <a href="{{ project.url }}" target="_blank" rel="noopener noreferrer">project site ↗</a>
{% endfor %}

## How to use this site

Start from whichever axis is most natural:

- **[Start from a persona →]({{ '/personas/' | relative_url }})** if you know your role.
- **[Start from a problem →]({{ '/problems/' | relative_url }})** if you know what you're trying to solve.
- **[Start from a project →]({{ '/projects/' | relative_url }})** if you already know the project
  and want to see who it's for and what it solves.

Every page links across to the other axes, so you can pivot freely.

## Data source

The site renders straight from the three Jekyll data files above
(`_data/personas.yml`, `_data/problems.yml`, `_data/projects.yml`), plus a JSON
mirror at `/assets/data/catalog.json` for client-side consumers. Those three
files are the single source of truth — the usage sentences, problem mappings,
Security Insights links, and project relationships all live there and are
refined over time.

## Contributing

To propose a new project, problem, persona, or mapping, open a pull request on
the <a href="https://github.com/{{ site.repository }}">project repository</a>.
Each project should declare the personas and problems it addresses, with one
sentence of prose per link.
