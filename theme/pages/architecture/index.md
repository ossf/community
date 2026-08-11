---
layout: default
title: Architecture
permalink: /architecture/
description: Cross-cutting architecture views — diagrams that map OpenSSF projects against external taxonomies (SLSA threats, supply-chain stages, persona coverage) and surface coverage and gaps at a glance.
---

# Architecture views

Cross-cutting views that overlay the OpenSSF project catalog against external taxonomies and frameworks. Use these to see where projects collectively cover the supply chain — and where the gaps are.

<p class="tool-index-cta">Prefer to start with the catalog itself? <a href="{{ '/projects/' | relative_url }}">Browse by project →</a> or <a href="{{ '/problems/' | relative_url }}">by problem →</a></p>

<nav class="architecture-chips" aria-label="Filter by category">
  <span class="architecture-chips__label">Filter by category:</span>
  <button type="button" class="architecture-chip architecture-chip--all" data-category="" aria-pressed="true">All</button>
  {% for c in site.data.definitions.categories %}
    <button type="button" class="architecture-chip" data-category="{{ c.id }}" aria-pressed="false" title="{{ c.description }}">{{ c.name }}</button>
  {% endfor %}
</nav>

<div class="component-grid persona-grid">
  <a class="component-card persona-card" href="{{ '/architecture/slsa-threats/' | relative_url }}" data-categories="specification">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-diagram-project"></i></div>
    <h2 class="persona-card__name">SLSA v1.2 Threats × OSSF Coverage</h2>
    <p class="component-description persona-card__short">Threats matrix</p>
    <p class="component-content persona-card__summary">Every SLSA v1.2 supply-chain threat overlaid with the OpenSSF projects and working groups that mitigate it. Red rows mark threats with no current OSSF coverage.</p>
    <p class="persona-card__cta">See the matrix <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/secure-production/' | relative_url }}" data-categories="tooling specification best-practices framework">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-screwdriver-wrench"></i></div>
    <h2 class="persona-card__name">Secure Production</h2>
    <p class="component-description persona-card__short">Producer pillar</p>
    <p class="component-content persona-card__summary">OpenSSF projects and working groups for the producer side — engineers, source repos, build systems — placed at every SDLC stage they address.</p>
    <p class="persona-card__cta">See the pillar <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/secure-distribution/' | relative_url }}" data-categories="tooling specification service">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-truck-fast"></i></div>
    <h2 class="persona-card__name">Secure Distribution</h2>
    <p class="component-description persona-card__short">Distributor pillar</p>
    <p class="component-content persona-card__summary">OpenSSF projects and working groups for the distributor side — registries, package forges, release channels — placed at every SDLC stage they address.</p>
    <p class="persona-card__cta">See the pillar <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/secure-consumption/' | relative_url }}" data-categories="tooling specification data-source">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-box-archive"></i></div>
    <h2 class="persona-card__name">Secure Consumption</h2>
    <p class="component-description persona-card__short">Consumer pillar</p>
    <p class="component-content persona-card__summary">OpenSSF projects and working groups for the consumer side — end users, manufacturers, downstream integrators, and the dependency loop.</p>
    <p class="persona-card__cta">See the pillar <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/stewardship/' | relative_url }}" data-categories="governance best-practices">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-shield-halved"></i></div>
    <h2 class="persona-card__name">Stewardship</h2>
    <p class="component-description persona-card__short">Other / governance pillar</p>
    <p class="component-content persona-card__summary">Cross-cutting governance, risk, compliance, advocacy, and policy work — entities that don't sit on the producer/distributor/consumer axis but steward how the foundation operates across all three.</p>
    <p class="persona-card__cta">See the pillar <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>
</div>

<h2 class="tool-matrix__heading">Reports &amp; derived views</h2>

<div class="component-grid persona-grid">
  <a class="component-card persona-card" href="{{ '/architecture/overview/' | relative_url }}">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-list"></i></div>
    <h2 class="persona-card__name">Overview</h2>
    <p class="component-description persona-card__short">Full catalog</p>
    <p class="component-content persona-card__summary">Flat list of every project, working group, and artifact with the SDLC stages, supply-chain actors, and categories each addresses.</p>
    <p class="persona-card__cta">See the catalog <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/tac-summary/' | relative_url }}">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-chart-column"></i></div>
    <h2 class="persona-card__name">TAC summary</h2>
    <p class="component-description persona-card__short">Coverage stats</p>
    <p class="component-content persona-card__summary">Coverage across stages, actors, categories — plus the full needs-review backlog. Built for the TAC and working-group chairs.</p>
    <p class="persona-card__cta">See the stats <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>

  <a class="component-card persona-card" href="{{ '/architecture/gaps/' | relative_url }}">
    <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
    <h2 class="persona-card__name">Gaps</h2>
    <p class="component-description persona-card__short">Where the architecture is incomplete</p>
    <p class="component-content persona-card__summary">SLSA threats with no current OSSF coverage, artifacts with one-sided flows, and specifications with no declared implementers.</p>
    <p class="persona-card__cta">See the gaps <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
  </a>
</div>

<script src="{{ '/assets/js/architecture-filter.js' | relative_url }}"></script>
