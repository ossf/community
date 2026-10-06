---
layout: default
title: Projects
permalink: /projects/
description: Every OpenSSF project in the mapping, each opening into the personas and problems it addresses.
---

# Projects

All {{ site.data.catalog.projects | size }} OpenSSF projects in the mapping. Each one opens
into the personas it serves and the problems it helps with — plus links to similar
and complementary projects.

<p class="tool-index-cta">Looking for a different angle? <a href="{{ '/personas/' | relative_url }}">Browse by role →</a> or <a href="{{ '/problems/' | relative_url }}">by problem →</a></p>

<div class="component-grid tool-index-grid">
  {% for project in site.data.catalog.projects %}
    <a class="component-card tool-index-card" href="{{ '/projects/' | append: project.id | append: '/' | relative_url }}">
      <h2 class="tool-index-card__title">{{ project.name }}</h2>
      <p class="tool-index-card__desc">{{ project.description }}</p>
      <p class="tool-index-card__cta">See personas &amp; problems <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>

{%- assign awaiting = site.data.catalog.awaiting_insights -%}
{%- if awaiting and awaiting != empty %}

## Awaiting Security Insights

A project's name, homepage and repositories on this site come from its own
[Security Insights](https://github.com/ossf/security-insights-spec) file, so a
project is listed only once it publishes a valid one. These
{{ awaiting | size }} records are mapped to personas and problems already and
will appear here as soon as their file lands.

<ul class="tool-index-awaiting">
  {%- for rec in awaiting %}
  <li>
    {%- if rec.url -%}<a href="{{ rec.url }}" target="_blank" rel="noopener noreferrer"><code>{{ rec.id }}</code></a>{%- else -%}<code>{{ rec.id }}</code>{%- endif %}
    <span class="tool-index-awaiting__reason">{{ rec.reason }}</span>
  </li>
  {%- endfor %}
</ul>
{%- endif %}
