// --- Configuration ---
const API_BASE_URL = 'https://your-backend.onrender.com/api';

// --- Local Data Stores (Fallback/Static) ---
let projects = [
  {
    id: '1',
    title: 'Kenya Tour Guide App',
    category: 'Mobile Application',
    description: 'A comprehensive travel companion built with Flutter and Supabase providing localized guide content, offline maps, and interactive itineraries.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['Flutter', 'Supabase', 'Dart', 'Google Maps API'],
    features: ['Real-time location updates', 'Offline mode support', 'User reviews & ratings'],
    stats: { techCount: 4, featuresCount: 3 }
  },
  {
    id: '2',
    title: 'Tours & Travel Agency System',
    category: 'Full Stack Web App',
    description: 'Web platform engineered with React and Node.js for managing tour bookings, inventory management, user authentication, and booking scheduling.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: ['Automated booking workflow', 'Admin dashboard', 'Secure payment gateway'],
    stats: { techCount: 5, featuresCount: 3 }
  },
  {
    id: '3',
    title: 'Personal OS Mobile App',
    category: 'Cross-Platform App',
    description: 'A productivity and life-management dashboard tracking daily tasks, habit logging, personal notes, and analytics in one interface.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['Flutter', 'Dart', 'Provider', 'SQLite'],
    features: ['Custom widget dashboard', 'Habit tracker visualization', 'Local-first data sync'],
    stats: { techCount: 4, featuresCount: 3 }
  },
  {
    id: '4',
    title: 'Venture Luxe Travel Platform',
    category: 'Mobile & Web Application',
    description: 'A full-stack travel booking and itinerary management platform for exploring curated destinations and real-time availability.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['React', 'Node.js', 'Flutter', 'Tailwind CSS'],
    features: ['Interactive itinerary scheduling', 'Booking checkout flow', 'Real-time seat updates'],
    stats: { techCount: 4, featuresCount: 3 }
  },
  {
    id: '5',
    title: 'Network Interface Manager',
    category: 'System Utility',
    description: 'A desktop helper utility for automating interface monitoring, managing adapters, and inspecting real-time system status.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['Node.js', 'React', 'JavaScript'],
    features: ['Interface diagnostics', 'Quick status overview', 'Command shortcuts'],
    stats: { techCount: 3, featuresCount: 3 }
  }
];

let comments = [];

let certificates = [
  {
    id: 'c1',
    title: 'Full Stack Web Development',
    issuer: 'University / Professional Platform',
    date: '2026',
    credentialUrl: '#'
  },
  {
    id: 'c2',
    title: 'Mobile App Development with Flutter',
    issuer: 'Professional Certification',
    date: '2026',
    credentialUrl: '#'
  }
];

const techStack = [
  { name: 'React', icon: 'portfolio-frontend/assets/React.png' },
  { name: 'JavaScript', icon: 'portfolio-frontend/assets/icons/javascript.png' },
  { name: 'Node.js', icon: 'portfolio-frontend/assets/Node.js.png' },
  { name: 'Flutter', icon: 'portfolio-frontend/assets/Flutter.png' },
  { name: 'Tailwind CSS', icon: 'portfolio-frontend/assets/icons/tailwind.png' },
  { name: 'Unity Engine', icon: 'portfolio-frontend/assets/icons/unity.png' },
  { name: 'Kali Linux', icon: 'portfolio-frontend/assets/icons/kalilinux.png' },
  { name: 'Vite', icon: 'portfolio-frontend/assets/icons/vite.png' },
  { name: 'MongoDB', icon: 'portfolio-frontend/assets/icons/mongodb.png' }
];

const heroRoles = [
  'Full Stack Web Developer',
  'Flutter Mobile Engineer',
  'Computer Science Graduate'
];

// --- Helper Functions ---
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  initWelcomeScreen();
  initNavigation();
  initRoleTyping();
  initTabs();
  initSeeMoreProjects();
  renderProjects();
  renderCertificates();
  renderTechStack();
  initModal();
  initForms();
  initScrollAnimations();

  // Attempt backend loads gracefully
  await fetchProjects();
  await fetchComments();
});

// --- Welcome Screen Dismissal with Smooth Transition ---
function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');

  if (!welcomeScreen || !mainContent) return;

  let dismissed = false;

  const handleDismiss = (e) => {
    if (dismissed) return;
    dismissed = true;
    if (e) e.stopPropagation();

    welcomeScreen.classList.add('leaving');
    mainContent.classList.remove('hidden');
    mainContent.style.display = 'block';
    mainContent.classList.add('entered');
    window.scrollTo(0, 0);

    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      welcomeScreen.classList.add('hidden');
      observeRevealElements();
    }, 420);
  };

  welcomeScreen.addEventListener('click', handleDismiss);
  welcomeScreen.addEventListener('touchstart', handleDismiss, { passive: true });
  welcomeScreen.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDismiss(e);
    }
  });
}

// --- Hero Role Typing Animation ---
function initRoleTyping() {
  const roleEl = document.getElementById('typed-role');
  if (!roleEl) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    roleEl.textContent = heroRoles[0];
    return;
  }

  let roleIndex = 0;
  let charIndex = heroRoles[0].length;
  let isDeleting = false;

  const tick = () => {
    const currentRole = heroRoles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      roleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(tick, 1700);
        return;
      }
      setTimeout(tick, 65);
    } else {
      charIndex--;
      roleEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % heroRoles.length;
        setTimeout(tick, 320);
        return;
      }
      setTimeout(tick, 38);
    }
  };

  setTimeout(() => {
    isDeleting = true;
    tick();
  }, 1800);
}

// --- Navigation Scroll & Active Section Highlight ---
function initNavigation() {
  const links = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = links
    .map(link => document.getElementById(link.getAttribute('href').substring(1)))
    .filter(Boolean);

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (sections.length > 0 && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 });

    sections.forEach(sec => navObserver.observe(sec));
  }
}

// --- Tab Switching Logic ---
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
      }
    });
  });
}

// --- See More / See Less Projects Toggle ---
function initSeeMoreProjects() {
  const toggleBtn = document.getElementById('toggle-more-projects-btn');
  const container = document.getElementById('projects-container');

  if (!toggleBtn || !container) return;

  toggleBtn.addEventListener('click', () => {
    const expanded = container.classList.toggle('expanded');
    toggleBtn.textContent = expanded ? 'See Less ↑' : 'See More ↓';
  });
}

// --- Scroll Reveal & Counter Animations ---
let revealObserver = null;

function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    return;
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');

        const counterEl = entry.target.querySelector('[data-count]');
        if (counterEl && !counterEl.dataset.animated) {
          counterEl.dataset.animated = 'true';
          animateStatCounter(counterEl);
        }

        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  observeRevealElements();
}

function observeRevealElements() {
  const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-visible)');
  elements.forEach((el, idx) => {
    el.style.setProperty('--reveal-delay', `${Math.min(idx * 60, 240)}ms`);
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add('is-visible');
    }
  });
}

function animateStatCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (Number.isNaN(target)) return;

  const duration = 900;
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = `${Math.round(eased * target)}${suffix}`;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

// --- API Methods ---
async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    const result = await res.json();
    if (result.success && result.data && result.data.length > 0) {
      projects = result.data;
      renderProjects();
    }
  } catch (err) {
    console.warn('Backend unavailable, utilizing default fallback projects.');
  }
}

async function fetchComments() {
  try {
    const res = await fetch(`${API_BASE_URL}/comments`);
    const result = await res.json();
    if (result.success && result.data) {
      comments = result.data;
      renderComments();
    }
  } catch (err) {
    console.warn('Comments service unavailable.');
  }
}

// --- Render Functions ---
function renderProjects() {
  const container = document.getElementById('projects-container');
  const seeMoreWrap = document.getElementById('see-more-projects-wrap');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p class="text-muted">No projects found.</p>`;
    if (seeMoreWrap) seeMoreWrap.style.display = 'none';
    return;
  }

  if (seeMoreWrap) {
    seeMoreWrap.style.display = projects.length > 3 ? 'flex' : 'none';
  }

  container.innerHTML = projects.map((p, index) => `
    <article class="glass-card project-card reveal-on-scroll ${index >= 3 ? 'extra-project' : ''}" style="--reveal-delay: ${Math.min(index * 70, 280)}ms">
      <div>
        <div class="project-banner">
          <span>${escapeHTML(p.title.split(' ').slice(0, 2).join(' '))}</span>
        </div>
        <span class="project-category">${escapeHTML(p.category)}</span>
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        <p class="project-desc">${escapeHTML(p.description)}</p>
        <div class="tech-tags">
          ${p.tech.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
        </div>
      </div>
      <div class="project-footer">
        <button type="button" class="btn btn-outline btn-sm view-project-btn" onclick="openModal('${escapeHTML(p.id)}')">
          Details →
        </button>
      </div>
    </article>
  `).join('');

  observeRevealElements();
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  container.innerHTML = certificates.map((c, index) => `
    <div class="glass-card cert-card reveal-on-scroll" style="--reveal-delay: ${index * 80}ms">
      <div style="display:flex; gap:1rem; align-items:flex-start;">
        <div class="cert-icon">📜</div>
        <div>
          <h4 class="cert-title">${escapeHTML(c.title)}</h4>
          <p class="cert-issuer">${escapeHTML(c.issuer)}</p>
          <p class="cert-date">Issued: ${escapeHTML(c.date)}</p>
        </div>
      </div>
      <a href="${escapeHTML(c.credentialUrl)}" target="_blank" rel="noreferrer" class="btn btn-outline btn-sm">Verify Credential</a>
    </div>
  `).join('');

  observeRevealElements();
}

function renderTechStack() {
  const container = document.getElementById('techstack-container');
  if (!container) return;

  container.innerHTML = techStack.map((tech, index) => `
    <div class="glass-card tech-card reveal-on-scroll" style="--reveal-delay: ${Math.min(index * 45, 320)}ms">
      <img src="${escapeHTML(tech.icon)}" alt="${escapeHTML(tech.name)}" class="tech-card-icon" onerror="this.style.display='none'" />
      <span class="tech-name">${escapeHTML(tech.name)}</span>
    </div>
  `).join('');

  observeRevealElements();
}

function renderComments() {
  const list = document.getElementById('comments-list');
  const countElem = document.getElementById('comment-count');

  if (countElem) countElem.textContent = comments.length;
  if (!list) return;

  list.innerHTML = comments.map(c => `
    <div class="comment-item glass-card">
      <strong class="comment-author">${escapeHTML(c.name)}</strong>
      <p>${escapeHTML(c.message)}</p>
    </div>
  `).join('');
}

// --- Modal Handlers ---
function initModal() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.add('hidden');
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });
}

function openModal(projectId) {
  const project = projects.find(p => String(p.id) === String(projectId));
  if (!project) return;

  document.getElementById('modal-title').textContent = project.title;
  document.getElementById('modal-category').textContent = project.category;
  document.getElementById('modal-desc').textContent = project.description;
  document.getElementById('modal-tech-count').textContent = project.stats ? project.stats.techCount : project.tech.length;
  document.getElementById('modal-features-count').textContent = project.stats ? project.stats.featuresCount : project.features.length;

  const featuresList = document.getElementById('modal-features-list');
  featuresList.innerHTML = project.features.map(f => `<li>${escapeHTML(f)}</li>`).join('');

  const techTags = document.getElementById('modal-tech-tags');
  techTags.innerHTML = project.tech.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');

  document.getElementById('modal-demo').href = project.demoUrl || '#';
  document.getElementById('modal-github').href = project.githubUrl || '#';

  document.getElementById('project-modal').classList.remove('hidden');
}

// --- Form Submissions ---
function initForms() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      const email = document.getElementById('contact-email').value;
      const message = document.getElementById('contact-msg').value;

      try {
        await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        });
      } catch (err) {
        console.warn('Contact API offline, fallback alert triggered.');
      }

      alert('Thank you! Your message has been sent.');
      contactForm.reset();
    });
  }

  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('comment-name').value;
      const msg = document.getElementById('comment-msg').value;

      comments.unshift({ name, message: msg });
      renderComments();

      try {
        await fetch(`${API_BASE_URL}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, message: msg })
        });
      } catch (err) {
        console.warn('Comments API offline, updated locally.');
      }

      commentForm.reset();
    });
  }
}
