/*
 * Architecture chip filter — small vanilla JS that toggles
 * `.is-filtered-out` on any element with a `data-categories` attribute
 * based on which category chips are pressed. OR semantics: a record is
 * shown if ANY of its categories matches a pressed chip. "All" chip
 * clears the filter.
 *
 * Used on /architecture/ (the index card grid) and any pillar page
 * with chip filtering enabled.
 */
(function () {
  "use strict";

  function init() {
    const root = document.querySelector(".architecture-chips");
    if (!root) return;

    const chips = root.querySelectorAll(".architecture-chip");
    const filterables = document.querySelectorAll("[data-categories]");
    if (!chips.length || !filterables.length) return;

    let active = new Set(); // empty = "All" (show everything)

    function apply() {
      filterables.forEach((el) => {
        const cats = (el.getAttribute("data-categories") || "")
          .split(/\s+/)
          .filter(Boolean);
        const show =
          active.size === 0 ||
          cats.some((c) => active.has(c));
        el.classList.toggle("is-filtered-out", !show);
      });
      // Update aria-pressed + visual state on chips.
      chips.forEach((c) => {
        const v = c.dataset.category;
        const pressed = v === "" ? active.size === 0 : active.has(v);
        c.setAttribute("aria-pressed", pressed ? "true" : "false");
      });
    }

    chips.forEach((chip) => {
      chip.addEventListener("click", (ev) => {
        ev.preventDefault();
        const value = chip.dataset.category;
        if (value === "") {
          // "All" → clear filter.
          active.clear();
        } else if (active.has(value)) {
          active.delete(value);
        } else {
          active.add(value);
        }
        apply();
      });
    });

    apply();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
