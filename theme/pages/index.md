---
layout: home
title: Home
permalink: /
description: Find the OpenSSF projects that fit you. Browse by your role, by the problem you're solving, or by project.
---

<section class="landing-hero">
  <div class="landing-hero__intro">
    <h1 class="landing-hero__title">Find the right OpenSSF projects that fit your situation</h1>
    <p class="landing-hero__lede">
      The OpenSSF ships <strong>{{ site.data.catalog.projects | size }} projects</strong> that secure
      open source software — but not all of them speak to every role or every problem.
      Start from whichever angle fits how you think.
    </p>
  </div>

  <nav class="hero-router" aria-label="Ways to browse">
    <p class="hero-router__title">Start from an angle</p>

    <a class="hero-route" href="#pick-a-persona">
      <span class="hero-route__head">
        <span class="hero-route__name">By role</span>
        <span class="hero-route__count">{{ site.data.definitions.personas | size }} personas</span>
      </span>
      <span class="hero-route__desc">Match the persona that fits your day job.</span>
      <i class="fa-solid fa-arrow-right hero-route__arrow" aria-hidden="true"></i>
    </a>

    <a class="hero-route" href="#browse-by-problem">
      <span class="hero-route__head">
        <span class="hero-route__name">By problem</span>
        <span class="hero-route__count">{{ site.data.definitions.problems | size }} problems</span>
      </span>
      <span class="hero-route__desc">Start from the security problem you're solving.</span>
      <i class="fa-solid fa-arrow-right hero-route__arrow" aria-hidden="true"></i>
    </a>

    <a class="hero-route" href="{{ '/projects/' | relative_url }}">
      <span class="hero-route__head">
        <span class="hero-route__name">By project</span>
        <span class="hero-route__count">{{ site.data.catalog.projects | size }} projects</span>
      </span>
      <span class="hero-route__desc">Jump straight to a project you already know.</span>
      <i class="fa-solid fa-arrow-right hero-route__arrow" aria-hidden="true"></i>
    </a>
  </nav>
</section>

<h2 id="pick-a-persona" class="landing-section-title">Browse by role</h2>
<p>Pick the persona that matches your day job to see the projects written for you.</p>

<div class="component-grid persona-grid">
  {% for p in site.data.definitions.personas %}
    <a class="component-card persona-card" href="{{ '/personas/' | append: p.id | append: '/' | relative_url }}">
      <div class="persona-card__icon" aria-hidden="true"><i class="fa-solid {{ p.icon }}"></i></div>
      <h2 class="persona-card__name">{{ p.name }}</h2>
      <p class="component-description persona-card__short">{{ p.short }}</p>
      <p class="component-content persona-card__summary">{{ p.summary }}</p>
      <p class="persona-card__cta">See their project guide <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></p>
    </a>
  {% endfor %}
</div>

<h2 id="browse-by-problem" class="landing-section-title">Browse by problem</h2>
<p>Know the problem you're trying to solve? Start there and see which projects help.</p>

<div class="component-grid persona-grid">
  {% for pr in site.data.definitions.problems %}
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
    lists all {{ site.data.catalog.projects | size }} and opens into the personas it serves, the problems
    it solves, and the projects it pairs well with.
  </p>
  <p class="landing-secondary__cta">
    <a class="landing-secondary__button" href="{{ '/projects/' | relative_url }}">
      Browse all {{ site.data.catalog.projects | size }} projects <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
    </a>
  </p>
</section>
