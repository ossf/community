---
layout: page
title: "Architecture gaps"
permalink: /architecture/gaps/
description: "Structural gaps in the OpenSSF architecture: SLSA threats with no current mitigation, artifacts with producers but no consumers (and vice versa), and specifications that nothing yet implements."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-magnifying-glass-chart" aria-hidden="true"></i> Architecture view</p>
  <h1 class="tool-hero__title">Architecture gaps</h1>
  <p class="tool-hero__summary">
    Structural gaps in the OpenSSF architecture surface in three places — threats without mitigations, artifacts with producers but no consumers (and vice versa), and specifications that nothing yet implements. These are the worklists for the TAC and incoming projects.
  </p>
</section>

{%- include community-records.html -%}
{%- include threat-coverage.html -%}

<h2 id="threat-gaps" class="tac-summary__heading">SLSA v1.2 threats with no OSSF coverage</h2>

{%- comment -%} A threat is a gap when no record in the catalog claims it. {%- endcomment -%}
{%- assign uncovered = "" | split: "" -%}
{%- for t in site.data.definitions.slsa_threats -%}
  {%- assign needle = "|" | append: t.id | append: "|" -%}
  {%- unless covered_ids contains needle -%}
    {%- assign uncovered = uncovered | push: t -%}
  {%- endunless -%}
{%- endfor -%}

<p>{{ uncovered.size }} SLSA v1.2 threats currently have no OpenSSF project or working group listing them as in-scope.</p>

<ul class="threats__list">
  {%- for t in uncovered -%}
  <li class="threat threat--gap">
    <details class="threat__details">
      <summary class="threat__summary">
        <span class="threat__code threat__code--gap">{{ t.code }}</span>
        <span class="threat__label">{{ t.label }}</span>
        <span class="threat__coverage threat__coverage--gap">no current OSSF coverage</span>
      </summary>
      <div class="threat__body">
        {%- if t.description -%}<p class="threat__description">{{ t.description }}</p>{%- endif -%}
        <p class="threat__gap-note"><em>No OpenSSF project or working group currently lists this threat in its scope. This is a real coverage gap and a worklist for the TAC.</em></p>
      </div>
    </details>
  </li>
  {%- endfor -%}
</ul>

<h2 id="artifact-gaps" class="tac-summary__heading">Artifacts without producers or consumers</h2>

<p>An artifact with producers but no consumers (or vice versa) usually signals a missing project — something is generating data that nobody is downstream of, or consuming data that nothing is generating.</p>

{%- assign artifacts = records | where: "kind", "artifact" -%}
{%- assign artifact_gaps_found = false -%}
<ul class="tac-summary__list">
  {%- for a in artifacts -%}
    {%- assign producers = "" | split: "" -%}
    {%- assign consumers = "" | split: "" -%}
    {%- for r in records -%}
      {%- for rel in r.relationships -%}
        {%- if rel.target == a.id and rel.kind == "produces" -%}
          {%- assign producers = producers | push: r.name -%}
        {%- endif -%}
        {%- if rel.target == a.id and rel.kind == "consumes" -%}
          {%- assign consumers = consumers | push: r.name -%}
        {%- endif -%}
      {%- endfor -%}
    {%- endfor -%}

    {%- if producers.size > 0 and consumers.size == 0 -%}
      {%- assign artifact_gaps_found = true -%}
      <li>
        <strong><a href="{{ '/artifacts/' | append: a.id | append: '/' | relative_url }}">{{ a.name }}</a></strong>
        — has {{ producers.size }} producer{% if producers.size != 1 %}s{% endif %} but no consumers.
      </li>
    {%- endif -%}
    {%- if consumers.size > 0 and producers.size == 0 -%}
      {%- assign artifact_gaps_found = true -%}
      <li>
        <strong><a href="{{ '/artifacts/' | append: a.id | append: '/' | relative_url }}">{{ a.name }}</a></strong>
        — has {{ consumers.size }} consumer{% if consumers.size != 1 %}s{% endif %} but no producers.
      </li>
    {%- endif -%}
  {%- endfor -%}
</ul>

{%- unless artifact_gaps_found -%}
<p><em>No artifact-flow gaps detected. Every tracked artifact has at least one producer and one consumer.</em></p>
{%- endunless -%}

<h2 id="spec-gaps" class="tac-summary__heading">Specifications with no implementations</h2>

<p>A specification that nothing implements isn't necessarily a gap — it might just be early — but specs in the catalog with zero <code>implements</code> edges pointing at them are worth flagging for working-group review.</p>

{%- assign specs = records | where_exp: "r", "r.categories contains 'specification'" -%}
{%- assign spec_gaps_found = false -%}
<ul class="tac-summary__list">
  {%- for s in specs -%}
    {%- assign implementers = "" | split: "" -%}
    {%- for r in records -%}
      {%- for rel in r.relationships -%}
        {%- if rel.target == s.id and rel.kind == "implements" -%}
          {%- assign implementers = implementers | push: r.name -%}
        {%- endif -%}
      {%- endfor -%}
    {%- endfor -%}
    {%- if implementers.size == 0 -%}
      {%- assign spec_gaps_found = true -%}
      <li>
        {%- if s.kind == "artifact" -%}{%- assign path = "/artifacts/" -%}{%- else -%}{%- assign path = "/projects/" -%}{%- endif -%}
        {%- if s.kind != "working-group" -%}
          <strong><a href="{{ path | append: s.id | append: '/' | relative_url }}">{{ s.name }}</a></strong>
        {%- else -%}
          <strong>{{ s.name }}</strong>
        {%- endif -%}
        — no OSSF project or working group currently records itself as implementing this spec.
      </li>
    {%- endif -%}
  {%- endfor -%}
</ul>

{%- unless spec_gaps_found -%}
<p><em>No specification gaps detected. Every spec in the catalog has at least one declared implementer.</em></p>
{%- endunless -%}

{% include architecture-style.html %}
