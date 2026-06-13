/* مؤسسة جدار الفن للمقاولات — interactions */
(function () {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Year ---------- */
  const yr = $("#year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const nav = $("#nav");
  const toggle = $("#navToggle");
  const backdrop = $("#navBackdrop");
  const closeNav = () => { nav.classList.remove("open"); toggle.classList.remove("open"); backdrop.classList.remove("show"); document.body.style.overflow = ""; };
  if (toggle) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      backdrop.classList.toggle("show", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);
  $$(".nav-link, .nav-cta", nav).forEach(a => a.addEventListener("click", closeNav));

  /* ---------- Header shadow on scroll ---------- */
  const header = $("#header");
  const onScroll = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 10);
    const bt = $("#backTop");
    if (bt) bt.classList.toggle("show", window.scrollY > 600);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach(el => { if (!el.classList.contains("in")) revealObs.observe(el); });

  /* ---------- Animated counters ---------- */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => countObs.observe(el));

  /* ---------- Scrollspy ---------- */
  const sections = $$("section[id], div[id='home']");
  const navLinks = $$(".nav-link");
  const spy = () => {
    const y = window.scrollY + 140;
    let current = "home";
    $$("section[id]").forEach(sec => { if (sec.offsetTop <= y) current = sec.id; });
    navLinks.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + current));
  };
  window.addEventListener("scroll", spy, { passive: true });
  spy();

  /* ---------- Lightbox gallery ---------- */
  const items = $$(".gallery-item");
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  let idx = 0;
  const imgs = items.map(it => it.dataset.img);
  const show = (i) => { idx = (i + imgs.length) % imgs.length; lbImg.src = imgs[idx]; };
  const openLb = (i) => { show(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeLb = () => { lb.classList.remove("open"); document.body.style.overflow = ""; };
  items.forEach((it, i) => it.addEventListener("click", () => openLb(i)));
  $("#lbClose")?.addEventListener("click", closeLb);
  $("#lbPrev")?.addEventListener("click", () => show(idx + 1)); // RTL: prev = next index
  $("#lbNext")?.addEventListener("click", () => show(idx - 1));
  lb?.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ---------- Back to top ---------- */
  $("#backTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- Download profile (print to PDF) ---------- */
  $("#printProfile")?.addEventListener("click", (e) => { e.preventDefault(); window.print(); });

  /* ---------- Pause other videos when one plays ---------- */
  const vids = $$(".video-card video");
  vids.forEach(v => v.addEventListener("play", () => vids.forEach(o => { if (o !== v) o.pause(); })));
})();
