document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  initNav();
  initTyping();
  initCounters();
  initReveal();
});

/* ===== Nav ===== */
function initNav() {
  const nav = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  links.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

/* ===== Terminal Typing ===== */
function initTyping() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const cmds = [
    'aws s3 ls --region us-east-1',
    'helm upgrade --install api ./chart',
    'gh workflow run deploy.yml',
    'ansible-playbook -i prod site.yml',
    'docker compose up -d --build',
    'terraform plan -var-file=prod.tfvars',
  ];
  let i = 0;

  async function run() {
    while (true) {
      const cmd = cmds[i % cmds.length];
      el.textContent = '';
      for (const ch of cmd) {
        el.textContent += ch;
        await delay(25 + Math.random() * 35);
      }
      await delay(2200);
      el.textContent = '';
      await delay(350);
      i++;
    }
  }
  run();
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ===== Counter ===== */
function initCounters() {
  const els = document.querySelectorAll('.metric-value');
  // Start counters after a short delay for visual impact
  setTimeout(() => {
    els.forEach(el => countUp(el));
  }, 400);
}

function countUp(el) {
  const end = +el.dataset.count;
  const dur = 1400;
  let start = null;
  function tick(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const eased = p * p * (3 - 2 * p);
    el.textContent = Math.round(eased * end);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ===== Scroll Reveal ===== */
function initReveal() {
  const targets = document.querySelectorAll(
    '.info-card, .cert-card, .skill-group, .project, .timeline-item, .contact-row'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 5) * 60}ms`;
    obs.observe(el);
  });
}
