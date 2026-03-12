/**
 * js/about.js
 * ─────────────────────────────────────────────────────────
 * Section 2 — About
 * Adds interactive mouse-tilt parallax to each floating panel.
 * Edit this file to change panel interaction.
 */
(function () {
  document.querySelectorAll('.ap').forEach(wrap => {
    const inner = wrap.querySelector('.ap-inner');
    if (!inner) return;

    const base = wrap.classList.contains('ap-wide')
      ? 'rotateY(0deg) rotateX(3deg)'
      : 'rotateY(-4deg) rotateX(2deg)';

    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 14;
      const y = ((e.clientY - r.top)  / r.height - .5) * 10;
      inner.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    wrap.addEventListener('mouseleave', () => {
      inner.style.transform = base;
    });
  });
})();