---
layout: home
title: Home
description: Find the OpenSSF projects that fit you. Browse by your role, by the problem you're solving, or by project.
---

<section class="landing-hero">
  <p class="landing-hero__eyebrow">OpenSSF · Tools by Persona</p>
  <h1 class="landing-hero__title">Find the OpenSSF projects that fit you</h1>
  <p class="landing-hero__lede">
    The OpenSSF ships <strong>{{ site.data.projects | size }} projects</strong> that secure
    open source software — but not all of them speak to every role or every problem.
    Start from whichever angle fits how you think.
  </p>
  <p class="landing-hero__matrix-note">
    <span class="landing-hero__badge">{{ site.data.personas | size }} personas</span>
    <span class="landing-hero__x">·</span>
    <span class="landing-hero__badge">{{ site.data.problems | size }} problems</span>
    <span class="landing-hero__x">·</span>
    <span class="landing-hero__badge landing-hero__badge--accent">{{ site.data.projects | size }} projects</span>
  </p>
</section>

<h2 id="pick-a-persona" class="landing-section-title">Browse by role</h2>
<p>Pick the persona that matches your day job to see the projects written for you.</p>

<div class="component-grid persona-grid">
  {% for p in site.data.personas %}
    <a class="component-card persona-card" href="{{ '/personas/' | append: p.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid {{ p.icon }}"></i></div>
      <h2 class="persona-card__name">{{ p.name }}</h2>
      <p class="component-description persona-card__short">{{ p.short }}</p>
      <p class="component-content persona-card__summary">{{ p.summary }}</p>
      <p class="persona-card__cta">See their project guide <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>

<h2 class="landing-section-title">Browse by problem</h2>
<p>Know the problem you're trying to solve? Start there and see which projects help.</p>

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

<section class="landing-secondary">
  <h2 class="landing-section-title">Or browse every project</h2>
  <p>
    Already know the project? The <a href="{{ '/projects/' | relative_url }}">project index</a>
    lists all {{ site.data.projects | size }} and opens into the personas it serves, the problems
    it solves, and the projects it pairs well with.
  </p>
  <p class="landing-secondary__cta">
    <a class="landing-secondary__button" href="{{ '/projects/' | relative_url }}">
      Browse all {{ site.data.projects | size }} projects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </a>
  </p>
</section>
