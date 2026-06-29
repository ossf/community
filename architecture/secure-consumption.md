---
layout: page
title: "Secure Consumption"
permalink: /architecture/secure-consumption/
description: "OpenSSF coverage for software consumers — end users, manufacturers, and downstream integrators — across every SDLC stage."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-box-archive" aria-hidden="true"></i> Architecture view · Consumer pillar</p>
  <h1 class="tool-hero__title">Secure Consumption</h1>
  <p class="tool-hero__summary">
    Every OpenSSF project and working group whose scope touches the <strong>consumer</strong> side of the supply chain — end users, manufacturers, downstream integrators, and the dependency loop that turns every consumer into a producer of something — placed at the SDLC stage(s) they address.
  </p>
</section>

<h2 class="tool-matrix__heading">The pillar</h2>

{% include pillar-grid.html actor="software-consumer" %}

<p class="tool-index-cta">Each name with a hover-highlight links to that project's page. Names in plain text are records not yet given a per-project page in this catalog. Records badged <strong>WG</strong> are working groups rather than projects.</p>

<h2 class="tool-matrix__heading">How to read this</h2>

The consumer persona covers everything downstream of distribution — installation, verification, dependency selection, vulnerability monitoring of running software, and the recursive supply chain (every consumer is also a producer of something else).

A record appears under a stage column if and only if its `sdlc_stages` includes that stage and its `supply_chain_actors` includes `software-consumer`. Records that span multiple stages appear in multiple columns.

{% include architecture-style.html %}
