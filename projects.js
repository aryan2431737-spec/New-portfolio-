/**
 * js/projects.js
 * ─────────────────────────────────────────────────────────
 * Section 3 — Projects
 * Define your projects in the PROJECTS array below.
 * Each entry renders as an interactive 3D tilt card.
 * Edit the PROJECTS array to add/remove/change projects.
 */

const PROJECTS = [
  {
    emoji: '📱',
    badge: 'FLUTTER APP',
    title: 'Student Planner App',
    desc: 'A cross-platform mobile app built with Flutter for managing college timetables, assignments, and exam schedules.',
    stack: ['Flutter', 'Dart', 'Firebase'],
    link: '#',
  },
  {
    emoji: '🌐',
    badge: 'WEB PROJECT',
    title: 'College Portal UI',
    desc: 'A responsive web interface for a college student portal with attendance, results, and notice board features.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    link: '#',
  },
  {
    emoji: '🗄️',
    badge: 'DATABASE',
    title: 'Library Management System',
    desc: 'A MySQL-backed library management system with book tracking, member records, and issue/return functionality.',
    stack: ['MySQL', 'Node.js', 'JavaScript'],
    link: '#',
  },
  {
    emoji: '🔐',
    badge: 'UTILITY',
    title: 'Password Generator',
    desc: 'A secure, customizable password generator with strength meter and clipboard copy, built with vanilla JS.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    link: '#',
  },
  {
    emoji: '📊',
    badge: 'DASHBOARD',
    title: 'Expense Tracker',
    desc: 'A personal finance tracker with visual charts, category-wise breakdown, and local storage persistence.',
    stack: ['JavaScript', 'Chart.js', 'Node.js'],
    link: '#',
  },
  {
    emoji: '🤖',
    badge: 'LEARNING PROJECT',
    title: 'Quiz App',
    desc: 'An interactive multiple-choice quiz application with timer, score tracking, and animated feedback.',
    stack: ['JavaScript', 'HTML', 'CSS'],
    link: '#',
  },
];

/* ── Render cards ─────────────────────────────────────── */
(function () {
  const grid = document.getElementById('projGrid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => {
    const delay = ['d1','d2','d3'][i % 3];
    const tags  = p.stack.map(t => `<span class="ptag">${t}</span>`).join('');
    return `
      <div class="pw rev ${delay}">
        <div class="pc">
          <div class="pt">
            <span class="pe">${p.emoji}</span>
            <div class="pg"></div>
            <div class="pbadge">${p.badge}</div>
          </div>
          <div class="pb">
            <div class="ptitle">${p.title}</div>
            <p class="pdesc">${p.desc}</p>
            <div class="pstack">${tags}</div>
          </div>
          <a href="${p.link}" class="plnk" title="View Project">↗</a>
        </div>
      </div>`;
  }).join('');

  /* 3D mouse tilt per card */
  document.querySelectorAll('.pw').forEach(wrap => {
    const card = wrap.querySelector('.pc');
    wrap.addEventListener('mousemove', e => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transform = `rotateY(${x*18}deg) rotateX(${-y*12}deg) scale(1.02)`;
      card.style.borderColor = 'rgba(0,212,255,.5)';
    });
    wrap.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.borderColor = '';
    });
  });

  /* Re-trigger scroll reveal for dynamically added .rev elements */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: .1 });
  grid.querySelectorAll('.rev').forEach(el => obs.observe(el));
})();