/**
 * js/certifications.js
 * ─────────────────────────────────────────────────────────
 * Section 5 — Certifications
 * Edit the CERTS array to add/remove/change certifications.
 */

const CERTS = [
  {
    org: 'GOOGLE / COURSERA',
    icon: '🐍',
    title: 'Google Certificate of Python',
    desc: 'Completed Python programming course by Google on Coursera covering data structures, functions, and file handling.',
    year: '2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/2QULKUSQF8DY'
  },
  {
    org: 'MICROSOFT',
    icon: '🖥️',
    title: 'Microsoft Certificate of Operating Systems',
    desc: 'Certified by Microsoft covering core OS concepts, process management, memory management, and file systems.',
    year: '2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/4C950JA45U3M'
  },
  {
    org: 'COURSERA',
    icon: '🌐',
    title: 'HTML & CSS',
    desc: 'Front-end web development certification covering HTML5 and CSS3 fundamentals.',
    year: '2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/GQCJZICPOI36'
  },
  {
    org: 'SPRINGBOARD',
    icon: '🚀',
    title: 'Springboard Certification C and C++',
    desc: 'Certification from Springboard covering core technical and professional development skills.',
    year: '2024',
    url: 'https://verify.onwingspan.com/'
  },

  {
    org: 'AWS',
    icon: '☁️',
    title: 'AWS Solution Architecture',
    desc: 'AWS Solution Architecture certification covering cloud computing, infrastructure design, and deployment best practices.',
    year: '2024',
    url: 'https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_bvvTnwpi863C7JwtD_1756481236557_completion_certificate.pdf'
  },
  {
    org: 'COURSERA',
    icon: '✨',
    title: 'Introduction to Gemini for Google Workspace',
    desc: 'Completed Coursera certification on integrating and utilizing Gemini AI features within Google Workspace applications.',
    year: '2024',
    url: 'https://www.coursera.org/account/accomplishments/verify/DATK872V7FTL'
  }
];

/* ── Render ──────────────────────────────────────────── */
(function () {
  const grid = document.getElementById('certGrid');
  if (!grid) return;

  grid.innerHTML = CERTS.map((c, i) => {
    const delay = ['d1', 'd2', 'd3'][i % 3];
    return `
      <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="cc rev ${delay}" style="text-decoration: none; color: inherit; display: block;">
        <div class="cc-inner">
          <div class="cc-scan"></div>
          <div class="cc-org"><span class="cc-dot"></span>${c.org}</div>
          <span class="cc-icon">${c.icon}</span>
          <div class="cc-title">${c.title}</div>
          <p class="cc-desc">${c.desc}</p>
          <div class="cc-footer">
            <span class="cc-year">${c.year}</span>
            <span class="cc-status">VERIFIED</span>
          </div>
        </div>
      </a>`;
  }).join('');

  /* Re-trigger scroll reveal for dynamic elements */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
  }, { threshold: .1 });
  grid.querySelectorAll('.rev').forEach(el => obs.observe(el));
})();