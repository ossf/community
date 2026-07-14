---
layout: default
title: Personas
permalink: /personas/
description: The six personas in the OpenSSF Tools-by-Persona mapping — pick one to see a role-specific guide to every OpenSSF tool.
---

# Personas

These {{ site.data.definitions.personas | size }} personas cover the roles that most often touch the OpenSSF toolchain.
Pick yours and you'll see how every one of the {{ site.data.catalog.projects | size }} projects applies to your work.

<div class="component-grid persona-grid">
  {% for p in site.data.definitions.personas %}
    <a class="component-card persona-card" href="{{ '/personas/' | append: p.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid {{ p.icon }}"></i></div>
      <h2 class="persona-card__name">{{ p.name }}</h2>
      <p class="component-description persona-card__short">{{ p.short }}</p>
      <p class="component-content persona-card__summary">{{ p.summary }}</p>
      <p class="persona-card__cta">See their 14-tool guide <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>
