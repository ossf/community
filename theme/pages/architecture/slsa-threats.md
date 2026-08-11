---
layout: page
title: "SLSA v1.2 Threats × OSSF Coverage"
permalink: /architecture/slsa-threats/
description: "Every SLSA v1.2 supply-chain threat overlaid with the OSSF projects and working groups that mitigate it — coverage and gaps at a glance."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i> Architecture view</p>
  <h1 class="tool-hero__title">SLSA v1.2 Threats × OSSF Coverage</h1>
  <p class="tool-hero__summary">
    Every threat in the SLSA v1.2 supply-chain threats taxonomy overlaid with the OpenSSF projects and working groups that mitigate it. Threats marked as gaps have no current OSSF coverage.
  </p>
  <p class="tool-hero__links">
    <a class="tool-hero__link" href="https://slsa.dev/spec/v1.2/threats" target="_blank" rel="noopener noreferrer">
      <i class="fa-solid fa-up-right-from-square" aria-hidden="true"></i> SLSA v1.2 threats taxonomy
    </a>
  </p>
</section>

{%- include community-records.html -%}
{%- include threat-coverage.html -%}
{%- assign total_threats = site.data.definitions.slsa_threats.size -%}
{%- assign covered_threats = 0 -%}
{%- for t in site.data.definitions.slsa_threats -%}
  {%- assign needle = "|" | append: t.id | append: "|" -%}
  {%- if covered_ids contains needle -%}
    {%- assign covered_threats = covered_threats | plus: 1 -%}
  {%- endif -%}
{%- endfor -%}
{%- assign gap_threats = total_threats | minus: covered_threats -%}

<p class="threats__summary">
  {{ total_threats }} threats total — {{ covered_threats }} with at least one OpenSSF mitigation, {{ gap_threats }} with no current OSSF coverage.
</p>

<nav class="threats__jumpnav" aria-label="Jump to threat category">
  <span class="threats__jumpnav-label">Jump to:</span>
  {%- for cat in site.data.definitions.slsa_threat_categories -%}
    <a href="#threats-{{ cat.letter | downcase }}">{{ cat.letter }}. {{ cat.name }}</a>
  {%- endfor -%}
</nav>

{% include threats-list.html %}

<h2 class="tool-matrix__heading">How to read this</h2>

The threats taxonomy comes verbatim from the SLSA v1.2 specification — categories A through L cover the producer side of the chain (source authorship, build inputs, build process) through to distribution, consumer-side selection, and verification. Each threat lists the OSSF projects and working groups whose scope addresses it.

When a project mitigates a threat partially or via inference rather than explicit upstream documentation, the mitigation is marked needs-review — the curator's reasoning hasn't yet been confirmed against the project's own materials.

Click a threat row to expand its description and full mitigation list. Mitigation links lead to each project's page.

{% include architecture-style.html %}
