---
layout: page
title: "Secure Production"
permalink: /architecture/secure-production/
description: "OpenSSF coverage for software producers — engineers, source repos, and build systems — across every SDLC stage."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> Architecture view · Producer pillar</p>
  <h1 class="tool-hero__title">Secure Production</h1>
  <p class="tool-hero__summary">
    Every OpenSSF project and working group whose scope touches the <strong>producer</strong> side of the supply chain — engineers and their workstations, source repositories, build systems, and the artefacts that flow downstream — placed at the SDLC stage(s) they address.
  </p>
</section>

<h2 class="tool-matrix__heading">The pillar</h2>

{% include pillar-grid.html actor="software-producer" %}

<p class="tool-index-cta">Each name with a hover-highlight links to that project's page. Names in plain text are records not yet given a per-project page in this catalog; their tooltip shows the canonical id. Records badged <strong>WG</strong> are working groups rather than projects.</p>

<h2 class="tool-matrix__heading">How to read this</h2>

The producer persona covers the engineer and the project's own development environment — local tooling, source-repo configuration, build pipelines. The columns let you see, at a glance, which OpenSSF efforts a producer can adopt at each stage of the supply chain they own.

A record appears under a stage column if and only if its `sdlc_stages` includes that stage and its `supply_chain_actors` includes `software-producer`. Records that span multiple stages appear in multiple columns.

{% include architecture-style.html %}
