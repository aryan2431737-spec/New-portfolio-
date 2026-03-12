/**
 * js/contact.js
 * ─────────────────────────────────────────────────────────
 * Section 6 — Contact
 * 1. Particle canvas animation
 * 2. Form validation with error states
 * 3. Form submission (wire to real API as needed)
 * Edit this file to change contact behavior or wire up your backend.
 */

/* ── 1. Contact Particles ─────────────────────────────── */
(function () {
  const cv  = document.getElementById('cParts');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const sec = document.getElementById('contact');

  function resize() {
    cv.width  = sec ? sec.offsetWidth  : innerWidth;
    cv.height = sec ? sec.offsetHeight : innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COLS = ['rgba(0,212,255,','rgba(123,47,255,','rgba(0,255,163,'];
  const pts  = Array.from({ length: 70 }, () => ({
    x:   Math.random() * cv.width,
    y:   Math.random() * cv.height,
    r:   Math.random() * 2.2 + .5,
    vx:  (Math.random() - .5) * .5,
    vy:  (Math.random() - .5) * .5,
    col: COLS[Math.floor(Math.random() * 3)],
  }));

  (function loop() {
    requestAnimationFrame(loop);
    ctx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width)  p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;

      /* Dot */
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle   = p.col + '.55)';
      ctx.shadowColor = p.col + '1)';
      ctx.shadowBlur  = 8; ctx.fill();

      /* Connections */
      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${.14 * (1 - d / 110)})`;
          ctx.lineWidth = .6; ctx.shadowBlur = 0; ctx.stroke();
        }
      }
    });
  })();
})();


/* ── 2 & 3. Form Validation + Submission ─────────────── */
(function () {
  const form  = document.getElementById('contactForm');
  const btn   = document.getElementById('fBtn');
  const txt   = document.getElementById('fTxt');
  const toast = document.getElementById('fToast');
  if (!form) return;

  const RULES = {
    name:    v => v.trim().length >= 2,
    email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    subject: v => v.trim().length >= 2,
    message: v => v.trim().length >= 8,
  };

  /* Clear error on input */
  form.querySelectorAll('.finp,.ftxt').forEach(inp => {
    inp.addEventListener('input', () => {
      const g = inp.closest('.fgrp');
      if (g) g.classList.remove('has-err');
      inp.classList.remove('err');
    });
  });

  /* Submit */
  form.addEventListener('submit', async e => {
    e.preventDefault();
    let valid = true;

    Object.entries(RULES).forEach(([f, test]) => {
      const inp = form.elements[f];
      const grp = form.querySelector(`[data-f="${f}"]`);
      if (!inp) return;
      if (!test(inp.value)) {
        valid = false;
        inp.classList.add('err');
        if (grp) grp.classList.add('has-err');
      }
    });
    if (!valid) return;

    /* Sending state */
    txt.textContent = '◉ SENDING...';
    btn.disabled = true;

    try {
      /* ── Wire your real endpoint here ──────────────────
         await fetch('/api/contact', {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(Object.fromEntries(new FormData(form))),
         });
      ─────────────────────────────────────────────────── */
      await new Promise(r => setTimeout(r, 1800)); // simulated delay

      /* Success */
      txt.textContent = '✓ SENT!';
      if (toast) toast.classList.add('show');
      form.reset();

      setTimeout(() => {
        txt.textContent = '⟶ SEND MESSAGE';
        btn.disabled = false;
        if (toast) toast.classList.remove('show');
      }, 4500);

    } catch (err) {
      txt.textContent = '✕ FAILED — TRY AGAIN';
      btn.disabled = false;
    }
  });
})();