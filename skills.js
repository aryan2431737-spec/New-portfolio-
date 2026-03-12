/**
 * skills.js  |  Section 4 — Skills & Tools
 * ─────────────────────────────────────────────────────────
 * Responsibilities:
 *   1. Render skill bars from SKILLS data array
 *   2. Render tool tiles from TOOLS data array
 *   3. Animate skill bars via IntersectionObserver
 *   4. Mouse-tracking 3-D tilt on skill cards & tool tiles
 *   5. Animate floating star particles on canvas
 *   6. Scroll-reveal for .rev elements
 *
 * Edit SKILLS and TOOLS arrays to update content.
 * ─────────────────────────────────────────────────────────
 */

/* ══════════════════════════════════════════════════
   DATA — edit these arrays to change content
══════════════════════════════════════════════════ */

/** @type {{ name: string, pct: number, col: string }[]} */
const SKILLS = [
  { name: 'HTML & CSS',     pct: 60, col: 'sk-bc'  },
  { name: 'JavaScript',     pct: 45, col: 'sk-bgd' },
  { name: 'Flutter / Dart', pct: 40, col: 'sk-bp'  },
  { name: 'Node.js',        pct: 35, col: 'sk-bg'  },
  { name: 'MySQL',          pct: 40, col: 'sk-bc'  },
  { name: 'Git & GitHub',   pct: 50, col: 'sk-bpk' },
];

/** @type {{ i: string, n: string, c: string }[]} */
const TOOLS = [
  { i: '🐦', n: 'Flutter',    c: 'sk-bp'  },
  { i: '🔀', n: 'Git',        c: 'sk-bpk' },
  { i: '🐙', n: 'GitHub',     c: 'sk-bp'  },
  { i: '🟩', n: 'Node.js',    c: 'sk-bg'  },
  { i: '💙', n: 'VS Code',    c: 'sk-bc'  },
  { i: '🐬', n: 'MySQL',      c: 'sk-bc'  },
  { i: '🟨', n: 'JavaScript', c: 'sk-bgd' },
];

/* ══════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════ */

/** Clamp a value between min and max */
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

/** Easing: ease-out cubic */
const easeOut = t => 1 - Math.pow(1 - t, 3);

/* ══════════════════════════════════════════════════
   1. RENDER SKILL BARS (Disabled, now static in index.html)
══════════════════════════════════════════════════ */
// HTML is hardcoded in index.html

/* ══════════════════════════════════════════════════
   2. RENDER TOOL TILES (Disabled, now static in index.html)
══════════════════════════════════════════════════ */
// HTML is hardcoded in index.html

/* ══════════════════════════════════════════════════
   3. SKILL BAR ANIMATION + SCROLL REVEAL
══════════════════════════════════════════════════ */
(function initRevealAndBars() {
  let barsAnimated = false;

  /* ── Scroll-reveal observer ── */
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('on');
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rev').forEach(el => revObs.observe(el));

  /* ── Bar width observer ── */
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !barsAnimated) {
        barsAnimated = true;
        document.querySelectorAll('.ski-bar').forEach(bar => {
          bar.style.width = bar.dataset.p + '%';
        });
      }
    });
  }, { threshold: 0.2 });

  const section = document.getElementById('skills');
  if (section) barObs.observe(section);
})();

/* ══════════════════════════════════════════════════
   4. MOUSE-TRACKING 3-D TILT — Skill Cards
══════════════════════════════════════════════════ */
(function initSkillTilt() {
  /* Wait for DOM to be ready with rendered cards */
  requestAnimationFrame(() => {
    const cards = document.querySelectorAll('.ski');

    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const r  = card.getBoundingClientRect();
        const cx = (e.clientX - r.left)  / r.width  - 0.5;  // -0.5 → +0.5
        const cy = (e.clientY - r.top)   / r.height - 0.5;
        const rx = clamp(-cy * 11, -10, 10);   // tilt around X axis
        const ry = clamp( cx * 13, -12, 12);   // tilt around Y axis
        card.style.transform =
          `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(16px) scale(1.025)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform .6s cubic-bezier(0.22,1,0.36,1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform .15s ease-out, box-shadow .5s, border-color .4s';
      });
    });
  });
})();

/* ══════════════════════════════════════════════════
   5. MOUSE-TRACKING 3-D TILT — Tool Tiles
══════════════════════════════════════════════════ */
(function initToolTilt() {
  requestAnimationFrame(() => {
    const tiles = document.querySelectorAll('.tc');

    tiles.forEach(tile => {
      const inner = tile.querySelector('.ti');
      if (!inner) return;

      tile.addEventListener('mousemove', e => {
        const r  = tile.getBoundingClientRect();
        const cx = (e.clientX - r.left)  / r.width  - 0.5;
        const cy = (e.clientY - r.top)   / r.height - 0.5;
        const rx = clamp(-cy * 28, -24, 24);
        const ry = clamp( cx * 32, -28, 28);
        inner.style.transform =
          `perspective(480px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.13) translateZ(10px)`;
      });

      tile.addEventListener('mouseleave', () => {
        inner.style.transform = '';
        inner.style.transition = 'transform .6s cubic-bezier(0.22,1,0.36,1)';
      });

      tile.addEventListener('mouseenter', () => {
        inner.style.transition = 'transform .12s ease-out';
      });
    });
  });
})();

/* ══════════════════════════════════════════════════
   6. STARFIELD PARTICLE CANVAS
   Matches the floating dots visible in the screenshot
══════════════════════════════════════════════════ */
(function initParticles() {
  const canvas = document.getElementById('skCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;
  let raf;

  /* ── Particle factory ── */
  function makeParticle() {
    const types = ['dot', 'cross', 'square'];
    const type  = types[Math.floor(Math.random() * types.length)];
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.18,
      vy:    (Math.random() - 0.5) * 0.18,
      size:  Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.08,
      da:    (Math.random() - 0.5) * 0.003,   /* pulse speed */
      type,
      hue:   Math.random() < 0.7 ? 195 : Math.random() < 0.5 ? 265 : 150,
    };
  }

  /* ── Resize handler ── */
  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    W = canvas.width  = rect.width;
    H = canvas.height = rect.height || window.innerHeight;
    particles = Array.from({ length: 110 }, makeParticle);
  }

  /* ── Draw one particle ── */
  function drawParticle(p) {
    ctx.save();
    ctx.globalAlpha = clamp(p.alpha, 0.04, 0.65);
    ctx.fillStyle   = `hsl(${p.hue}, 85%, 70%)`;
    ctx.strokeStyle = `hsl(${p.hue}, 85%, 70%)`;
    ctx.lineWidth   = 0.6;

    if (p.type === 'dot') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.type === 'cross') {
      const s = p.size * 2.5;
      ctx.beginPath();
      ctx.moveTo(p.x - s, p.y); ctx.lineTo(p.x + s, p.y);
      ctx.moveTo(p.x, p.y - s); ctx.lineTo(p.x, p.y + s);
      ctx.stroke();
    } else {
      const s = p.size * 1.4;
      ctx.strokeRect(p.x - s, p.y - s, s * 2, s * 2);
    }

    ctx.restore();
  }

  /* ── Animation loop ── */
  function tick() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      /* Move */
      p.x += p.vx;
      p.y += p.vy;

      /* Pulse alpha */
      p.alpha += p.da;
      if (p.alpha > 0.65 || p.alpha < 0.04) p.da *= -1;

      /* Wrap edges */
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      drawParticle(p);
    });

    raf = requestAnimationFrame(tick);
  }

  /* ── Pause when tab hidden ── */
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(tick);
    }
  });

  /* ── Init ── */
  resize();
  window.addEventListener('resize', () => { resize(); });
  tick();
})();