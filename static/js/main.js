/* Wall of Art — interactions */
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

  /* ---------- Reveal: show immediately (animations disabled) ---------- */
  $$(".reveal").forEach(el => el.classList.add("in"));

  /* ---------- Counters: final values, no animation ---------- */
  $$("[data-count]").forEach(el => { el.textContent = (parseInt(el.dataset.count, 10) || 0).toLocaleString("en-US"); });

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
  const items = $$(".cat-tile");
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

  /* ---------- Static build: route contact form to WhatsApp ----------
     Active only when the form has a data-wa number (the static export);
     the Django version posts to the server as usual. */
  const cform = $(".contact-form");
  if (cform && cform.dataset.wa) {
    cform.addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(cform);
      const L = (k) => (f.get(k) || "").toString().trim();
      const en = document.documentElement.lang === "en";
      const lines = en ? [
        "New request — Wall of Art",
        "Name: " + L("name"),
        "Mobile: " + L("phone"),
        "City: " + L("city"),
        "Service: " + L("service"),
        "Details: " + L("message"),
      ] : [
        "طلب جديد — Wall of Art",
        "الاسم: " + L("name"),
        "الجوال: " + L("phone"),
        "المدينة: " + L("city"),
        "الخدمة: " + L("service"),
        "التفاصيل: " + L("message"),
      ];
      window.open("https://wa.me/" + cform.dataset.wa + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
    });
  }

  /* ---------- Pause other videos when one plays ---------- */
  const vids = $$(".video-card video");
  vids.forEach(v => v.addEventListener("play", () => vids.forEach(o => { if (o !== v) o.pause(); })));
})();
