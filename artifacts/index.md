---
layout: default
title: Artifacts
permalink: /artifacts/
description: OpenSSF output formats — SLSA Provenance, SBOM, VEX, SARIF, OSV Record, in-toto Attestation — and which projects produce or consume each one.
---

# Artifacts

OpenSSF output formats — the things projects produce or consume that flow across the supply chain. Each artifact has its own page describing what it is, where it sits in the supply chain, and which projects produce or consume it.

<p class="tool-index-cta">Prefer to start elsewhere? <a href="{{ '/projects/' | relative_url }}">Browse by project →</a> or <a href="{{ '/architecture/' | relative_url }}">see the architecture views →</a></p>

<div class="component-grid persona-grid">
  {% assign sorted_artifacts = site.data.artifacts | sort: "name" %}
  {% for a in sorted_artifacts %}
    <a class="component-card persona-card" href="{{ '/artifacts/' | append: a.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-file-shield"></i></div>
      <h2 class="persona-card__name">{{ a.name }}</h2>
      {%- if a.aliases -%}
      <p class="component-description persona-card__short">aka {{ a.aliases | join: ", " }}</p>
      {%- endif -%}
      <p class="component-content persona-card__summary">{{ a.description }}</p>
      <p class="persona-card__cta">See what produces &amp; consumes it <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>
