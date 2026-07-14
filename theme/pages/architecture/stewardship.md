---
layout: page
title: "Stewardship"
permalink: /architecture/stewardship/
description: "OpenSSF coverage for cross-cutting governance, policy, advocacy, and compliance work — placed across every SDLC stage."
---

<section class="tool-hero">
  <p class="tool-hero__eyebrow"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> Architecture view · Other / Stewardship pillar</p>
  <h1 class="tool-hero__title">Stewardship</h1>
  <p class="tool-hero__summary">
    Every OpenSSF project and working group whose scope is governance, risk and compliance, advocacy, or policy — work that doesn't sit on the producer / distributor / consumer axis but stewards how the foundation operates across all three.
  </p>
</section>

<h2 class="tool-matrix__heading">The pillar</h2>

{% include pillar-grid.html actor="other" %}

<p class="tool-index-cta">Each name with a hover-highlight links to that project's page. Names in plain text are records not yet given a per-project page in this catalog. Records badged <strong>WG</strong> are working groups rather than projects.</p>

<h2 class="tool-matrix__heading">How to read this</h2>

The other persona covers everything that doesn't fit cleanly under producer, distributor, or consumer — the TAC, the Governing Board, advocacy work, regulatory engagement, and frameworks whose primary audience is a foundation or compliance authority. Many of these entities span all SDLC stages (their reach is foundation-wide); the pillar surfaces that breadth.

A record appears under a stage column if and only if its `sdlc_stages` includes that stage and its `supply_chain_actors` includes `other`. Records that span multiple stages appear in multiple columns.

{% include architecture-style.html %}
