---
layout: page
title: "TAC summary"
permalink: /architecture/tac-summary/
description: "Coverage stats across SDLC stages, supply-chain actors, and categories — plus the needs-review backlog. Built for the OpenSSF TAC to track where curator review is still outstanding."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-chart-column" aria-hidden="true"></i> Architecture view</p>
  <h1 class="tool-hero__title">TAC summary</h1>
  <p class="tool-hero__summary">
    Coverage statistics across SDLC stages, supply-chain actors, and categories — plus the full backlog of classifications still marked <code>needs-review</code>. Built so the TAC and working-group chairs can see at a glance where curator review is still outstanding.
  </p>
</section>

{% assign records = site.data.architecture_records %}

<h2 id="coverage-by-stage" class="tac-summary__heading">Coverage by SDLC stage</h2>
<table class="overview__table">
  <thead><tr><th>Stage</th><th>Records</th></tr></thead>
  <tbody>
    {%- for s in site.data.sdlc_stages -%}
      {%- assign matching = records | where_exp: "r", "r.sdlc_stages contains s.id" -%}
      <tr>
        <td><strong>{{ s.name | default: s.id }}</strong> <span class="overview__chip">{{ s.id }}</span></td>
        <td>{{ matching.size }}</td>
      </tr>
    {%- endfor -%}
  </tbody>
</table>

<h2 id="coverage-by-actor" class="tac-summary__heading">Coverage by supply-chain actor</h2>
<table class="overview__table">
  <thead><tr><th>Actor</th><th>Records</th></tr></thead>
  <tbody>
    {%- for a in site.data.supply_chain_actors -%}
      {%- assign matching = records | where_exp: "r", "r.supply_chain_actors contains a.id" -%}
      <tr>
        <td><strong>{{ a.name | default: a.id }}</strong> <span class="overview__chip">{{ a.id }}</span></td>
        <td>{{ matching.size }}</td>
      </tr>
    {%- endfor -%}
  </tbody>
</table>

<h2 id="coverage-by-category" class="tac-summary__heading">Coverage by category</h2>
<table class="overview__table">
  <thead><tr><th>Category</th><th>Records</th></tr></thead>
  <tbody>
    {%- for c in site.data.categories -%}
      {%- assign matching = records | where_exp: "r", "r.categories contains c.id" -%}
      <tr>
        <td><strong>{{ c.name }}</strong> <span class="overview__chip overview__chip--cat">{{ c.id }}</span></td>
        <td>{{ matching.size }}</td>
      </tr>
    {%- endfor -%}
  </tbody>
</table>

<h2 id="needs-review" class="tac-summary__heading">Needs-review backlog</h2>

<p>Every cell-synopsis and relationship classification currently marked <code>needs-review</code>. Each entry is a curator-inferred assignment that hasn't yet been confirmed against the project's own materials.</p>

<h3 class="tac-summary__subheading">Cell synopses</h3>
<ul class="tac-summary__list">
  {%- assign synopsis_nr_count = 0 -%}
  {%- for r in records -%}
    {%- for s in r.cell_synopses -%}
      {%- if s.status == "needs-review" -%}
        {%- assign synopsis_nr_count = synopsis_nr_count | plus: 1 -%}
        <li>
          {%- if r.kind == "artifact" -%}
            {%- assign path = "/artifacts/" -%}
          {%- else -%}
            {%- assign path = "/projects/" -%}
          {%- endif -%}
          {%- if r.has_community_page -%}
            <a href="{{ path | append: r.id | append: '/' | relative_url }}"><strong>{{ r.name }}</strong></a>
          {%- else -%}
            <strong>{{ r.name }}</strong>
          {%- endif -%}
          — <span class="overview__chip">{{ s.stage }}</span> × <span class="overview__chip">{{ s.actor }}</span>
          {%- if s.note -%}<br><em>{{ s.note }}</em>{%- endif -%}
        </li>
      {%- endif -%}
    {%- endfor -%}
  {%- endfor -%}
</ul>
<p class="tac-summary__count">{{ synopsis_nr_count }} cell synopses currently marked needs-review.</p>

<h3 class="tac-summary__subheading">Relationships</h3>
<ul class="tac-summary__list">
  {%- assign rel_nr_count = 0 -%}
  {%- for r in records -%}
    {%- for rel in r.relationships -%}
      {%- if rel.status == "needs-review" -%}
        {%- assign rel_nr_count = rel_nr_count | plus: 1 -%}
        <li>
          <strong>{{ r.name }}</strong> <em>{{ rel.kind }}</em> <strong>{{ rel.target }}</strong>
          {%- if rel.note -%}<br><em>{{ rel.note }}</em>{%- endif -%}
        </li>
      {%- endif -%}
    {%- endfor -%}
  {%- endfor -%}
</ul>
<p class="tac-summary__count">{{ rel_nr_count }} relationships currently marked needs-review.</p>

<h3 class="tac-summary__subheading">Threat mitigations</h3>
<ul class="tac-summary__list">
  {%- assign threat_nr_count = 0 -%}
  {%- for t in site.data.threats -%}
    {%- for m in t.mitigations -%}
      {%- if m.status == "needs-review" -%}
        {%- assign threat_nr_count = threat_nr_count | plus: 1 -%}
        <li>
          <code class="threat__code">{{ t.code }}</code> {{ t.label }} — mitigation: <strong>{{ m.ref }}</strong>
          {%- if m.note -%}<br><em>{{ m.note }}</em>{%- endif -%}
        </li>
      {%- endif -%}
    {%- endfor -%}
  {%- endfor -%}
</ul>
<p class="tac-summary__count">{{ threat_nr_count }} threat mitigations currently marked needs-review.</p>

{% include architecture-style.html %}
