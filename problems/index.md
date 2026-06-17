---
layout: default
title: Problems
permalink: /problems/
description: The security problems the OpenSSF toolchain addresses — pick one to see which projects help and which roles care.
---

# Problems

The {{ site.data.problems | size }} problem areas the OpenSSF toolchain addresses.
Pick one to see which projects help with it — and which personas care most.

<p class="tool-index-cta">Prefer to start elsewhere? <a href="{{ '/personas/' | relative_url }}">Browse by role →</a> or <a href="{{ '/projects/' | relative_url }}">by project →</a></p>

<div class="component-grid persona-grid">
  {% for pr in site.data.problems %}
    <a class="component-card persona-card" href="{{ '/problems/' | append: pr.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid {{ pr.icon }}"></i></div>
      <h2 class="persona-card__name">{{ pr.name }}</h2>
      <p class="component-description persona-card__short">{{ pr.short }}</p>
      <p class="component-content persona-card__summary">{{ pr.summary }}</p>
      <p class="persona-card__cta">See the projects that help <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>
