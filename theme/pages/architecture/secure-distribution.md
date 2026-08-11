---
layout: page
title: "Secure Distribution"
permalink: /architecture/secure-distribution/
description: "OpenSSF coverage for software distributors — package registries, source forges, and release channels — across every SDLC stage."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-truck-fast" aria-hidden="true"></i> Architecture view · Distributor pillar</p>
  <h1 class="tool-hero__title">Secure Distribution</h1>
  <p class="tool-hero__summary">
    Every OpenSSF project and working group whose scope touches the <strong>distributor</strong> side of the supply chain — package registries, source-code forges, mirror networks, and release channels — placed at the SDLC stage(s) they address.
  </p>
</section>

<h2 class="tool-matrix__heading">The pillar</h2>

{% include pillar-grid.html actor="software-distributor" %}

<p class="tool-index-cta">Each name with a hover-highlight links to that project's page. Names in plain text are records not yet given a per-project page in this catalog. Records badged <strong>WG</strong> are working groups rather than projects.</p>

<h2 class="tool-matrix__heading">How to read this</h2>

The distributor persona covers the systems that move software from producers to consumers — registries (npm, PyPI, crates.io), source forges (GitHub, GitLab), package-manager backends, and the policies enforced at those boundaries. The columns show which OpenSSF efforts apply at each stage that distributors operate.

A record appears under a stage column if and only if its `sdlc_stages` includes that stage and its `supply_chain_actors` includes `software-distributor`. Records that span multiple stages appear in multiple columns.

{% include architecture-style.html %}
