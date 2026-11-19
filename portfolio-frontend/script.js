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
    title: 'eFootball Tactical Analyzer',
    category: 'Web Tool',
    description: 'Specialized web utility for analyzing formations, player playstyle matchups, and offensive tactical setups.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    features: ['Tactical layout mapping', 'Stat comparison matrix', 'Playstyle synergy overview'],
    stats: { techCount: 4, featuresCount: 3 }
  },
  {
    id: '6',
    title: 'Network Interface Manager',
    category: 'System Utility',
    description: 'Desktop helper tool for automating interface monitoring, managing adapters, and inspecting real-time network status.',
    demoUrl: '#',
    githubUrl: '#',
    tech: ['Node.js', 'React', 'JavaScript'],
    features: ['Interface diagnostics', 'Quick status overview', 'Command shortcuts'],
    stats: { techCount: 3, featuresCount: 3 }
  }
];

let comments = [];

let certificates = [
  { id: 1, title: 'B.Sc. Computer Science Candidate', issuer: 'University Panel Verified', year: '2026', credentialUrl: '#' },
  { id: 2, title: 'Full Stack Web Development', issuer: 'Meta / Coursera', year: '2025', credentialUrl: '#' },
  { id: 3, title: 'Mobile App Development with Flutter', issuer: 'Google Certified', year: '2025', credentialUrl: '#' },
  { id: 4, title: 'Node.js Application Developer', issuer: 'OpenJS Foundation', year: '2024', credentialUrl: '#' }
];

const techStack = [
  { name: 'React', icon: 'portfolio-frontend/assets/icons/react.png', fallback: '⚛️' },
  { name: 'JavaScript', icon: 'portfolio-frontend/assets/icons/javascript.png', fallback: '🟨' },
  { name: 'Node.js', icon: 'portfolio-frontend/assets/icons/nodejs.png', fallback: '🟢' },
  { name: 'Flutter', icon: 'portfolio-frontend/assets/icons/flutter.png', fallback: '💙' },
  { name: 'Tailwind CSS', icon: 'portfolio-frontend/assets/icons/tailwind.png', fallback: '🎨' },
  { name: 'Unity Engine', icon: 'portfolio-frontend/assets/icons/unity.png', fallback: '🎮' },
  { name: 'Kali Linux', icon: 'portfolio-frontend/assets/icons/kalilinux.png', fallback: '🐉' },
  { name: 'Vite', icon: 'portfolio-frontend/assets/icons/vite.png', fallback: '⚡' },
  { name: 'MongoDB', icon: 'portfolio-frontend/assets/icons/mongodb.png', fallback: '🍃' }
];

const heroRoles = [
  'Full Stack & Mobile Engineer',
  'React & Node.js Developer',
  'Flutter Cross-Platform Builder'
];

let selectedPhotoDataUrl = '';
let revealObserver = null;

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  initWelcomeScreen();
  initRoleTyping();
  renderCertificates();
  renderTechStack();
  renderProjects();
  renderComments();
  setupEventListeners();
  initScrollAnimations();

  await fetchProjects();
  await fetchComments();
});

// --- Welcome Screen Dismissal ---
function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');

  if (!welcomeScreen || !mainContent) return;

  let dismissed = false;
  const handleDismiss = (e) => {
    if (dismissed) return;
    dismissed = true;
    if (e) e.stopPropagation();

    welcomeScreen.style.opacity = '0';
    welcomeScreen.style.transform = 'scale(1.03)';
    welcomeScreen.style.transition = 'opacity 0.35s ease-out, transform 0.35s ease-out';
    welcomeScreen.style.pointerEvents = 'none';

    mainContent.classList.remove('hidden');
    mainContent.style.display = 'block';
    mainContent.classList.add('entered');
    window.scrollTo(0, 0);

    setTimeout(() => {
      welcomeScreen.style.display = 'none';
      welcomeScreen.classList.add('hidden');
      observeRevealElements();
    }, 350);
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

// --- Scroll Reveal & Stat Counters ---
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

// --- API Calls ---
async function fetchProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/projects`);
    const result = await res.json();
    if (result.success && result.data && result.data.length > 0) {
      projects = result.data;
      renderProjects();
    }
  } catch (err) {
    console.warn('Backend unavailable, using default fallback projects:', err);
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
    console.warn('Failed to fetch comments from backend:', err);
    renderComments();
  }
}

async function submitCommentToBackend(name, message, photoUrl = '') {
  try {
    const res = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });
    const result = await res.json();
    if (result.success && result.data) {
      comments.unshift({ ...result.data, photoUrl: result.data.photoUrl || photoUrl });
      renderComments();
      return true;
    } else {
      alert(result.error || 'Failed to post comment.');
      return false;
    }
  } catch (err) {
    console.warn('Error posting comment to backend, displaying locally:', err);
    const localComment = { name, message, photoUrl, createdAt: new Date().toISOString() };
    comments.unshift(localComment);
    renderComments();
    return true;
  }
}

async function submitContactToBackend(name, email, message) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    const result = await res.json();
    if (result.success) {
      alert('Message sent successfully!');
      return true;
    } else {
      alert(result.error || 'Failed to send message.');
      return false;
    }
  } catch (err) {
    console.warn('Error submitting contact form:', err);
    alert('Thank you for your message! (Server is currently in offline preview mode).');
    return true;
  }
}

// --- Render Methods ---
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

  container.innerHTML = projects.map((proj, index) => `
    <div class="glass-card project-card reveal-on-scroll ${index >= 3 ? 'extra-project' : ''}" style="--reveal-delay: ${Math.min(index * 70, 280)}ms">
      <div>
        <div class="project-banner">
          <span>${escapeHTML(proj.title)}</span>
        </div>
        <span class="project-category">${escapeHTML(proj.category)}</span>
        <h3 class="project-title">${escapeHTML(proj.title)}</h3>
        <p class="project-desc">${escapeHTML(proj.description)}</p>
      </div>
      <div class="project-footer">
        <a href="${escapeHTML(proj.demoUrl || '#')}" class="demo-link" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
        <button type="button" class="btn-details" onclick="openModal('${escapeHTML(proj.id)}')">Details →</button>
      </div>
    </div>
  `).join('');

  observeRevealElements();
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  container.innerHTML = certificates.map((cert, index) => `
    <div class="glass-card cert-card reveal-on-scroll" style="--reveal-delay: ${index * 80}ms">
      <div class="cert-icon">
        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
      </div>
      <div>
        <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
        <p class="cert-issuer">${escapeHTML(cert.issuer)}</p>
        <span class="cert-badge">Issued ${escapeHTML(cert.year)}</span>
      </div>
    </div>
  `).join('');

  observeRevealElements();
}

function renderTechStack() {
  const container = document.getElementById('techstack-container');
  if (!container) return;

  container.innerHTML = techStack.map((tech, index) => `
    <div class="glass-card tech-card reveal-on-scroll" style="--reveal-delay: ${Math.min(index * 45, 320)}ms">
      <img src="${escapeHTML(tech.icon)}" alt="${escapeHTML(tech.name)}" class="tech-card-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline-block';" />
      <span class="tech-icon" style="display:none;">${escapeHTML(tech.fallback || '✦')}</span>
      <span class="tech-name">${escapeHTML(tech.name)}</span>
    </div>
  `).join('');

  observeRevealElements();
}

function renderComments() {
  const list = document.getElementById('comments-list');
  const count = document.getElementById('comment-count');
  if (!list) return;

  if (count) count.textContent = comments.length;

  if (comments.length === 0) {
    list.innerHTML = `<p class="text-muted" style="font-size: 0.75rem;">No comments yet. Be the first!</p>`;
    return;
  }

  list.innerHTML = comments.map(c => {
    const initial = escapeHTML((c.name || '?').trim().charAt(0).toUpperCase() || '?');
    const avatarHtml = c.photoUrl
      ? `<img src="${escapeHTML(c.photoUrl)}" alt="${escapeHTML(c.name)}" class="comment-avatar" />`
      : `<div class="comment-avatar" aria-hidden="true">${initial}</div>`;

    return `
      <div class="glass-card comment-item">
        ${avatarHtml}
        <div class="comment-body">
          <div class="comment-header">
            <span class="comment-author">${escapeHTML(c.name)}</span>
            <span class="comment-time">${formatTime(c.createdAt || c.time)}</span>
          </div>
          <p>${escapeHTML(c.message)}</p>
        </div>
      </div>
    `;
  }).join('');
}

// --- Event Listeners & Interaction ---
function setupEventListeners() {
  // Smooth scroll & active section tracking for nav links
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map(link => document.getElementById(link.getAttribute('href').substring(1)))
    .filter(Boolean);

  navLinks.forEach(link => {
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
          navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-35% 0px -50% 0px', threshold: 0.05 });

    sections.forEach(sec => navObserver.observe(sec));
  }

  // Showcase Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetTab = btn.getAttribute('data-tab');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) {
        panel.classList.add('active');
        panel.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
      }
    });
  });

  // See More / See Less Projects Toggle
  const toggleMoreBtn = document.getElementById('toggle-more-projects-btn');
  const projectsContainer = document.getElementById('projects-container');
  if (toggleMoreBtn && projectsContainer) {
    toggleMoreBtn.addEventListener('click', () => {
      const expanded = projectsContainer.classList.toggle('expanded');
      toggleMoreBtn.textContent = expanded ? 'See Less ↑' : 'See More ↓';
      projectsContainer.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-visible'));
    });
  }

  // Optional Comment Photo Upload
  const photoInput = document.getElementById('comment-photo');
  const photoLabel = document.getElementById('comment-photo-label');
  if (photoInput && photoLabel) {
    photoInput.addEventListener('change', () => {
      const file = photoInput.files && photoInput.files[0];
      if (!file) {
        selectedPhotoDataUrl = '';
        photoLabel.textContent = '🖼 Choose Profile Photo';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be 5MB or smaller.');
        photoInput.value = '';
        selectedPhotoDataUrl = '';
        photoLabel.textContent = '🖼 Choose Profile Photo';
        return;
      }
      photoLabel.textContent = `✓ ${file.name}`;
      const reader = new FileReader();
      reader.onload = () => {
        selectedPhotoDataUrl = typeof reader.result === 'string' ? reader.result : '';
      };
      reader.readAsDataURL(file);
    });
  }

  // Comment Submission
  const commentForm = document.getElementById('comment-form');
  if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('comment-name');
      const msgInput = document.getElementById('comment-msg');

      const name = nameInput.value.trim();
      const message = msgInput.value.trim();

      if (name && message) {
        const success = await submitCommentToBackend(name, message, selectedPhotoDataUrl);
        if (success) {
          nameInput.value = '';
          msgInput.value = '';
          selectedPhotoDataUrl = '';
          if (photoInput) photoInput.value = '';
          if (photoLabel) photoLabel.textContent = '🖼 Choose Profile Photo';
        }
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-msg');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = msgInput.value.trim();

      if (name && email && message) {
        const success = await submitContactToBackend(name, email, message);
        if (success) {
          contactForm.reset();
        }
      }
    });
  }

  // Modal Close Events
  const modalCloseBtn = document.getElementById('modal-close-btn');
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// --- Modal Functions ---
function openModal(projectId) {
  const proj = projects.find(p => String(p.id) === String(projectId));
  if (!proj) return;

  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCat = document.getElementById('modal-category');
  const modalBreadcrumb = document.getElementById('modal-breadcrumb-title');
  const modalPreviewBadge = document.getElementById('modal-preview-badge');

  if (modalTitle) modalTitle.textContent = proj.title;
  if (modalDesc) modalDesc.textContent = proj.description;
  if (modalCat && proj.category) modalCat.textContent = proj.category;
  if (modalBreadcrumb) modalBreadcrumb.textContent = proj.title;
  if (modalPreviewBadge) modalPreviewBadge.textContent = proj.title;

  const demoLink = document.getElementById('modal-demo');
  if (demoLink) demoLink.href = proj.demoUrl || '#';

  const githubLink = document.getElementById('modal-github');
  if (githubLink) githubLink.href = proj.githubUrl || '#';

  const techCountEl = document.getElementById('modal-tech-count');
  const featuresCountEl = document.getElementById('modal-features-count');
  if (techCountEl) techCountEl.textContent = proj.stats ? proj.stats.techCount : (proj.tech ? proj.tech.length : 0);
  if (featuresCountEl) featuresCountEl.textContent = proj.stats ? proj.stats.featuresCount : (proj.features ? proj.features.length : 0);

  const featuresList = document.getElementById('modal-features-list');
  if (featuresList) {
    featuresList.innerHTML = (proj.features || []).map(f => `<li>${escapeHTML(f)}</li>`).join('');
  }

  const techTags = document.getElementById('modal-tech-tags');
  if (techTags) {
    techTags.innerHTML = (proj.tech || []).map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('');
  }

  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.remove('hidden');
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) modal.classList.add('hidden');
}

// --- Utility Helpers ---
function escapeHTML(str) {
  if (!str) return '';
  return String(str).replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

function formatTime(isoString) {
  if (!isoString) return 'Recently';
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;

  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
