---
layout: default
title: Publications
permalink: /publications/
description: OpenSSF publications — the specifications, frameworks, and formats the projects produce, implement, and consume.
---

# Publications

The documents of the OpenSSF ecosystem — specifications and frameworks like SLSA and the OSPS Baseline, and the formats that flow across the supply chain like SBOM, VEX, and SLSA Provenance. Each publication has its own page describing what it is and which projects produce, consume, or implement it.

<p class="tool-index-cta">Prefer to start elsewhere? <a href="{{ '/projects/' | relative_url }}">Browse by project →</a> or <a href="{{ '/personas/' | relative_url }}">by role →</a></p>

<div class="component-grid persona-grid">
  {% assign sorted_pubs = site.data.catalog.publications | sort: "name" %}
  {% for pub in sorted_pubs %}
    <a class="component-card persona-card" href="{{ '/publications/' | append: pub.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-file-shield"></i></div>
      <h2 class="persona-card__name">{{ pub.name }}</h2>
      {%- if pub.aliases -%}
      <p class="component-description persona-card__short">aka {{ pub.aliases | join: ", " }}</p>
      {%- endif -%}
      <p class="component-content persona-card__summary">{{ pub.description }}</p>
      <p class="persona-card__cta">See how it connects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>
