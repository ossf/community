---
layout: page
title: "Architecture overview"
permalink: /architecture/overview/
description: "Full flat catalog of every OpenSSF project, working group, and artifact tracked by the architecture views — with SDLC stages, supply-chain actors, and categories at a glance."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-list" aria-hidden="true"></i> Architecture view</p>
  <h1 class="tool-hero__title">Overview — full catalog</h1>
  <p class="tool-hero__summary">
    Every record in the architecture catalog — OpenSSF projects, working groups, and artifacts — with the SDLC stages, supply-chain actors, and categories each addresses. This is the "everything at a glance" view; use it when you need the raw list rather than a curated lens.
  </p>
</section>

{% assign records = site.data.architecture_records | sort: "name" %}
{% assign total = records.size %}
{% assign projects = records | where: "kind", "project" | size %}
{% assign wgs = records | where: "kind", "working-group" | size %}
{% assign artifacts = records | where: "kind", "artifact" | size %}

<p class="overview__summary">
  {{ total }} records — {{ projects }} projects, {{ wgs }} working groups, {{ artifacts }} artifacts.
</p>

<table class="overview__table">
  <thead>
    <tr>
      <th>Record</th>
      <th>Kind</th>
      <th>SDLC stages</th>
      <th>Supply-chain actors</th>
      <th>Categories</th>
    </tr>
  </thead>
  <tbody>
    {%- for r in records -%}
    <tr>
      <td class="overview__name">
        {%- if r.kind == "artifact" -%}
          {%- assign path = "/artifacts/" -%}
        {%- else -%}
          {%- assign path = "/projects/" -%}
        {%- endif -%}
        {%- if r.has_community_page -%}
          <a href="{{ path | append: r.id | append: '/' | relative_url }}">{{ r.name }}</a>
        {%- else -%}
          {{ r.name }}
        {%- endif -%}
      </td>
      <td><span class="overview__kind overview__kind--{{ r.kind }}">{{ r.kind }}</span></td>
      <td>
        {%- for s in r.sdlc_stages -%}<span class="overview__chip">{{ s }}</span>{%- endfor -%}
      </td>
      <td>
        {%- for a in r.supply_chain_actors -%}<span class="overview__chip">{{ a }}</span>{%- endfor -%}
      </td>
      <td>
        {%- for c in r.categories -%}<span class="overview__chip overview__chip--cat">{{ c }}</span>{%- endfor -%}
      </td>
    </tr>
    {%- endfor -%}
  </tbody>
</table>

{% include architecture-style.html %}
