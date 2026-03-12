/**
 * js/home.js
 * ─────────────────────────────────────────────────────────
 * Section 1 — Home
 * 360° drag-to-rotate avatar with inertia, auto-spin, scroll-to-zoom.
 * Edit this file to change avatar interaction behavior.
 */
(function () {
  const stage = document.getElementById('avStage');
  const av    = document.getElementById('av3d');
  if (!stage || !av) return;

  let rX = -5, rY = 0, vX = 0, vY = 0;
  let drag = false, lx = 0, ly = 0, sc = 1;
  let autoSpin = true, autoY = 0;
  let resumeTimer = null;
  const RESUME_MS = 3000;

  function apply() {
    av.style.transform = `rotateX(${rX}deg) rotateY(${rY}deg) scale3d(${sc},${sc},${sc})`;
  }

  /* Mouse drag */
  stage.addEventListener('mousedown', e => {
    drag = true; lx = e.clientX; ly = e.clientY; vX = vY = 0;
    autoSpin = false; clearTimeout(resumeTimer);
    e.preventDefault();
  });
  document.addEventListener('mouseup', () => {
    if (!drag) return; drag = false;
    resumeTimer = setTimeout(() => autoSpin = true, RESUME_MS);
  });
  document.addEventListener('mousemove', e => {
    if (!drag) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    rY += dx * .5; rX -= dy * .4;
    rX = Math.max(-55, Math.min(55, rX));
    vX = dx * .5; vY = dy * .4;
    lx = e.clientX; ly = e.clientY;
    apply();
  });

  /* Touch drag */
  stage.addEventListener('touchstart', e => {
    drag = true; lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    autoSpin = false; clearTimeout(resumeTimer);
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('touchend', () => {
    drag = false;
    resumeTimer = setTimeout(() => autoSpin = true, RESUME_MS);
  });
  document.addEventListener('touchmove', e => {
    if (!drag) return;
    const dx = e.touches[0].clientX - lx, dy = e.touches[0].clientY - ly;
    rY += dx * .5; rX -= dy * .4;
    rX = Math.max(-55, Math.min(55, rX));
    vX = dx * .5; vY = dy * .4;
    lx = e.touches[0].clientX; ly = e.touches[0].clientY;
    apply(); e.preventDefault();
  }, { passive: false });

  /* Scroll to zoom */
  stage.addEventListener('wheel', e => {
    sc += e.deltaY * -.001;
    sc = Math.max(.7, Math.min(1.5, sc));
    apply(); e.preventDefault();
  }, { passive: false });

  /* Animation loop — inertia + auto-spin */
  (function loop() {
    requestAnimationFrame(loop);
    if (autoSpin) {
      autoY += .35;
      av.style.transform = `rotateX(-5deg) rotateY(${autoY}deg)`;
    } else if (!drag) {
      vX *= .9; vY *= .9;
      rY += vX * .12; rX += vY * .12;
      rX += (0 - rX) * .006;
      rY += .18;
      apply();
    }
  })();
})();