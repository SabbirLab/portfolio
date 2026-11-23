(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasIO = "IntersectionObserver" in window;
  if (hasIO && !reduce) root.classList.add("js");

  /* ---- scroll progress ---- */
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var ticking = false;
  function updateProgress() {
    var max = root.scrollHeight - window.innerHeight;
    bar.style.setProperty("--p", max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
  }, { passive: true });
  updateProgress();

  /* ---- active nav link ---- */
  if (hasIO) {
    var links = {};
    [].forEach.call(document.querySelectorAll("#site-nav a[href^='#']"), function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.remove("active"); });
        var a = links[e.target.id];
        if (a) a.classList.add("active");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  /* ---- reveal on scroll ---- */
  if (root.classList.contains("js")) {
    var sel = ".section-heading,.section-lead,.project-card,.timeline-item,.achievement-card," +
              ".education-list article,.toolkit,.cert-card,.cv-card,.contact-grid>*";
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target;
        n.classList.add("in");
        io.unobserve(n);
        // drop reveal classes after animation so card hover transitions work again
        var wait = 700 + (parseFloat(n.style.getPropertyValue("--d")) || 0) * 1000;
        setTimeout(function () { n.classList.remove("reveal", "in"); n.style.removeProperty("--d"); }, wait);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    [].forEach.call(document.querySelectorAll(sel), function (n) {
      var sib = n.parentNode ? [].indexOf.call(n.parentNode.children, n) : 0;
      n.style.setProperty("--d", Math.min(sib % 3, 2) * 0.08 + "s");
      n.classList.add("reveal");
      io.observe(n);
    });
  }

  /* ---- project filter (categories derived from each card's tags) ---- */
  var CAT = {
    Robotics: "Robotics",
    Embedded: "Embedded", ESP32: "Embedded", Bluetooth: "Embedded", Sensors: "Embedded", Circuits: "Embedded", "ESP-NOW": "Embedded",
    DSP: "Signals", MATLAB: "Signals", "Numerical methods": "Signals",
    Power: "Power", Hardware: "Power", AutoCAD: "Power",
    IoT: "Networks", Simulation: "Networks"
  };
  var grid = document.querySelector(".project-grid");
  if (!grid) return;
  var cards = [].slice.call(grid.querySelectorAll(".project-card"));
  var cats = [];
  cards.forEach(function (c) {
    var set = [];
    [].forEach.call(c.querySelectorAll(".project-tags span"), function (t) {
      var k = CAT[t.textContent.trim()];
      if (k && set.indexOf(k) < 0) set.push(k);
      if (k && cats.indexOf(k) < 0) cats.push(k);
    });
    c.dataset.cat = set.join("|");
  });
  if (cats.length < 2) return;

  var bar2 = document.createElement("div");
  bar2.className = "cert-filters project-filters";
  bar2.setAttribute("role", "group");
  bar2.setAttribute("aria-label", "Filter projects by category");
  grid.parentNode.insertBefore(bar2, grid);

  ["All"].concat(cats).forEach(function (cat, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.textContent = cat;
    b.setAttribute("aria-pressed", String(i === 0));
    b.addEventListener("click", function () {
      [].forEach.call(bar2.children, function (x) { x.setAttribute("aria-pressed", "false"); });
      b.setAttribute("aria-pressed", "true");
      cards.forEach(function (c) {
        var show = cat === "All" || c.dataset.cat.split("|").indexOf(cat) >= 0;
        c.classList.toggle("is-hidden", !show);
      });
    });
    bar2.appendChild(b);
  });
})();
