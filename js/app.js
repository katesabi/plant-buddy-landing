(function () {
  "use strict";

  /* Burger */
  const burger = document.getElementById("burger");
  const mobileNav = document.getElementById("mobileNav");

  burger.addEventListener("click", function () {
    const open = burger.classList.toggle("open");
    mobileNav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  /* Close */
  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      burger.classList.remove("open");
      mobileNav.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* Scroll */
  const header = document.getElementById("header");
  const backToTop = document.getElementById("backToTop");

  window.addEventListener(
    "scroll",
    function () {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 40);
      backToTop.classList.toggle("show", y > 400);
    },
    { passive: true }
  );

  /* Top */
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* Reveal */
  const reveals = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  reveals.forEach(function (el) { revealObserver.observe(el); });

  /* Counters */
  const counters = document.querySelectorAll(".stat-num");
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.floor(eased * target);
        el.textContent = val.toLocaleString() + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { counterObserver.observe(el); });

  /* Subscribe */
  const form = document.getElementById("subscribeForm");
  const msg = document.getElementById("subscribeMsg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.classList.add("show");
    form.reset();
    setTimeout(function () { msg.classList.remove("show"); }, 4000);
  });
})();
