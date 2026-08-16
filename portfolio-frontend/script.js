// --- Configuration ---
const API_BASE_URL = 'http://localhost:5000/api';

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
  }
];

let comments = [];

const certificates = [
  { id: 1, title: 'B.Sc. Computer Science Candidate', issuer: 'University Panel Verified', year: '2026' },
  { id: 2, title: 'Full Stack Web Development', issuer: 'Meta / Coursera', year: '2025' },
  { id: 3, title: 'Mobile App Development with Flutter', issuer: 'Google Certified', year: '2025' },
  { id: 4, title: 'Node.js Application Developer', issuer: 'OpenJS Foundation', year: '2024' }
];

const techStack = [
  { name: 'React', icon: '⚛️' },
  { name: 'JavaScript', icon: '🟨' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Flutter', icon: '💙' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Unity Engine', icon: '🎮' },
  { name: 'Kali Linux', icon: '🐉' },
  { name: 'Vite', icon: '⚡' },
  { name: 'MongoDB', icon: '🍃' }
];

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  renderCertificates();
  renderTechStack();
  renderProjects();
  setupEventListeners();

  // Load backend data
  await fetchProjects();
  await fetchComments();
});

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

async function submitCommentToBackend(name, message) {
  try {
    const res = await fetch(`${API_BASE_URL}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message })
    });
    const result = await res.json();
    if (result.success && result.data) {
      comments.unshift(result.data);
      renderComments();
      return true;
    } else {
      alert(result.error || 'Failed to post comment.');
      return false;
    }
  } catch (err) {
    console.error('Error posting comment:', err);
    // Local fallback display if server is down
    const localComment = { name, message, createdAt: new Date().toISOString() };
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
    console.error('Error submitting contact form:', err);
    alert('Thank you for your message! (Server is currently in offline preview mode).');
    return true;
  }
}

// --- Render Methods ---
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p class="text-muted">No projects found.</p>`;
    return;
  }

  container.innerHTML = projects.map(proj => `
    <div class="glass-card project-card">
      <div>
        <div class="project-banner">
          <svg viewBox="0 0 24 24" class="svg-icon lg-icon"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
        </div>
        <span class="project-category">${escapeHTML(proj.category)}</span>
        <h3 class="project-title">${escapeHTML(proj.title)}</h3>
        <p class="project-desc">${escapeHTML(proj.description)}</p>
      </div>
      <div class="project-footer">
        <a href="${proj.demoUrl || '#'}" class="demo-link" target="_blank" rel="noopener">Live Demo ↗</a>
        <button class="btn-details" onclick="openModal('${proj.id}')">Details →</button>
      </div>
    </div>
  `).join('');
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  container.innerHTML = certificates.map(cert => `
    <div class="glass-card cert-card">
      <div class="cert-icon">
        <svg viewBox="0 0 24 24" class="svg-icon"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
      </div>
      <div>
        <h3 class="cert-title">${escapeHTML(cert.title)}</h3>
        <p class="cert-issuer">${escapeHTML(cert.issuer)}</p>
        <span class="cert-badge">Issued ${cert.year}</span>
      </div>
    </div>
  `).join('');
}

function renderTechStack() {
  const container = document.getElementById('techstack-container');
  if (!container) return;

  container.innerHTML = techStack.map(tech => `
    <div class="glass-card tech-card">
      <span class="tech-icon">${tech.icon}</span>
      <span class="tech-name">${escapeHTML(tech.name)}</span>
    </div>
  `).join('');
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

  list.innerHTML = comments.map(c => `
    <div class="glass-card comment-item">
      <div class="comment-header">
        <span class="comment-author">${escapeHTML(c.name)}</span>
        <span class="comment-time">${formatTime(c.createdAt || c.time)}</span>
      </div>
      <p>${escapeHTML(c.message)}</p>
    </div>
  `).join('');
}

// --- Event Listeners & Interaction ---
function setupEventListeners() {
  // Dismiss Welcome Overlay
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');

  if (welcomeScreen && mainContent) {
    welcomeScreen.addEventListener('click', () => {
      welcomeScreen.classList.add('hidden');
      mainContent.classList.remove('hidden');
    });
  }

  // Showcase Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const panel = document.getElementById(`tab-${targetTab}`);
      if (panel) panel.classList.add('active');
    });
  });

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
        const success = await submitCommentToBackend(name, message);
        if (success) {
          nameInput.value = '';
          msgInput.value = '';
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
  if (modalTitle) modalTitle.textContent = proj.title;
  if (modalDesc) modalDesc.textContent = proj.description;
  
  const demoLink = document.getElementById('modal-demo');
  if (demoLink) demoLink.href = proj.demoUrl || '#';
  
  const githubLink = document.getElementById('modal-github');
  if (githubLink) githubLink.href = proj.githubUrl || '#';
  
  const techCountEl = document.getElementById('modal-tech-count');
  const featuresCountEl = document.getElementById('modal-features-count');
  if (techCountEl) techCountEl.textContent = proj.stats ? proj.stats.techCount : (proj.tech ? proj.tech.length : 0);
  if (featuresCountEl) featuresCountEl.textContent = proj.stats ? proj.stats.featuresCount : (proj.features ? proj.features.length : 0);

  // Features List
  const featuresList = document.getElementById('modal-features-list');
  if (featuresList) {
    featuresList.innerHTML = (proj.features || []).map(f => `<li>${escapeHTML(f)}</li>`).join('');
  }

  // Tech Tags
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