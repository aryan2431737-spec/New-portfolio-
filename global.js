/**
 * js/global.js
 * ─────────────────────────────────────────────────────────
 * Global interactive behaviors: cursor, loader, nav active state,
 * scroll reveal, and back-to-top button.
 * Edit this file to change any global behavior.
 */

/* ── Custom Cursor ─────────────────────────────────────── */
(function () {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * 0.14; ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const HOVER = 'a,button,.pw,.tc,.cc,.ap,.ci,#avStage';
  document.addEventListener('mouseover', e => {
    if (!e.target.closest(HOVER)) return;
    dot.style.width = '20px'; dot.style.height = '20px'; dot.style.background = 'var(--neon2)';
    ring.style.width = '54px'; ring.style.height = '54px';
  });
  document.addEventListener('mouseout', e => {
    if (!e.target.closest(HOVER)) return;
    dot.style.width = '10px'; dot.style.height = '10px'; dot.style.background = 'var(--neon)';
    ring.style.width = '38px'; ring.style.height = '38px';
  });
})();


/* ── Loader ─────────────────────────────────────────────── */
(function () {
  const fill   = document.getElementById('ldFill');
  const loader = document.getElementById('loader');
  if (!fill || !loader) return;

  let pct = 0;
  const tick = setInterval(() => {
    pct += Math.random() * 15;
    if (pct >= 95) { pct = 95; clearInterval(tick); }
    fill.style.width = pct + '%';
  }, 80);

  window.addEventListener('load', () => {
    clearInterval(tick);
    fill.style.width = '100%';
    setTimeout(() => loader.classList.add('off'), 700);
  });

  setTimeout(() => loader.classList.add('off'), 5000); // fallback
})();


/* ── Nav active state on scroll ─────────────────────────── */
(function () {
  const links = document.querySelectorAll('.nav-a');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
})();


/* ── Scroll Reveal ──────────────────────────────────────── */
(function () {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rev').forEach(el => obs.observe(el));
})();


/* ── Back-to-Top Button ─────────────────────────────────── */
/* Clicking this arrow button scrolls back to the Home section */
(function () {
  const btn = document.getElementById('backTop');
  if (!btn) return;

  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400));

  btn.addEventListener('click', () => {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  });
})();

/* ── Mobile Menu Toggle ──────────────────────────────────── */
(function () {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-a');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });
})();
