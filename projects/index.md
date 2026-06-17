---
layout: default
title: Projects
permalink: /projects/
description: Every OpenSSF project in the mapping, each opening into the personas and problems it addresses.
---

# Projects

All {{ site.data.projects | size }} OpenSSF projects in the mapping. Each one opens
into the personas it serves and the problems it helps with — plus links to similar
and complementary projects.

<p class="tool-index-cta">Looking for a different angle? <a href="{{ '/personas/' | relative_url }}">Browse by role →</a> or <a href="{{ '/problems/' | relative_url }}">by problem →</a></p>

<div class="component-grid tool-index-grid">
  {% for project in site.data.projects %}
    <a class="component-card tool-index-card" href="{{ '/projects/' | append: project.id | append: '/' | relative_url }}">
      <h2 class="tool-index-card__title">{{ project.name }}</h2>
      <p class="tool-index-card__desc">{{ project.description }}</p>
      <p class="tool-index-card__cta">See personas &amp; problems <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>
