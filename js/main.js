(function () {
  "use strict";

  /* ---- Sticky header shadow/border on scroll -------------------------- */
  const header = document.querySelector(".site-header");
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Mobile nav toggle ------------------------------------------------ */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      navToggle.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        navToggle.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Reveal-on-scroll -------------------------------------------------- */
  const revealTargets = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---- Render projects from js/projects-data.js -------------------------- */
  const grid = document.getElementById("projects-grid");

  const icons = {
    live: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  };

  function buildProjectCard(project) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.setAttribute("data-reveal", "");

    const top = document.createElement("div");
    top.className = "project-card-top";
    card.appendChild(top);

    const body = document.createElement("div");
    body.className = "project-card-body";

    const head = document.createElement("div");
    head.className = "project-card-head";

    const h3 = document.createElement("h3");
    h3.textContent = project.title;
    head.appendChild(h3);

    if (project.status) {
      const status = document.createElement("span");
      status.className = "project-status";
      status.textContent = project.status;
      head.appendChild(status);
    }

    body.appendChild(head);

    const desc = document.createElement("p");
    desc.className = "project-desc";
    desc.textContent = project.description || "";
    body.appendChild(desc);

    if (Array.isArray(project.tags) && project.tags.length) {
      const tagRow = document.createElement("div");
      tagRow.className = "project-tags";
      project.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.textContent = tag;
        tagRow.appendChild(span);
      });
      body.appendChild(tagRow);
    }

    if (project.liveUrl || project.codeUrl) {
      const links = document.createElement("div");
      links.className = "project-links";

      if (project.liveUrl) {
        const a = document.createElement("a");
        a.href = project.liveUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `${icons.live} Live`;
        links.appendChild(a);
      }
      if (project.codeUrl) {
        const a = document.createElement("a");
        a.href = project.codeUrl;
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.innerHTML = `${icons.code} Code`;
        links.appendChild(a);
      }
      body.appendChild(links);
    }

    card.appendChild(body);
    return card;
  }

  if (grid && typeof PROJECTS !== "undefined") {
    PROJECTS.forEach((project) => grid.appendChild(buildProjectCard(project)));

    const more = document.createElement("div");
    more.className = "projects-more";
    more.setAttribute("data-reveal", "");
    more.textContent = "More projects coming soon.";
    grid.appendChild(more);

    document.querySelectorAll("#projects-grid [data-reveal]").forEach((el) => {
      if ("IntersectionObserver" in window) {
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
        obs.observe(el);
      } else {
        el.classList.add("is-visible");
      }
    });
  }

  /* ---- Footer year -------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
