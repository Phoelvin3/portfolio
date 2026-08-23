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
  { name: "React", icon: "portfolio-frontend/assets/React.png" },
  { name: "JavaScript", icon: "portfolio-frontend/assets/JavaScript.png" },
  { name: "Node.js", icon: "portfolio-frontend/assets/Node.js.png" },
  { name: "Flutter", icon: "portfolio-frontend/assets/Flutter.png" },
  { name: "Tailwind CSS", icon: "portfolio-frontend/assets/Tailwind CSS.png" },
  { name: "Unity Engine", icon: "portfolio-frontend/assets/Unity.png" },
  { name: "Kali Linux", icon: "portfolio-frontend/assets/Linux.png" },
  { name: "Vite", icon: "portfolio-frontend/assets/Vite.js.png" },
  { name: "MongoDB", icon: "portfolio-frontend/assets/MongoDB.png" }
];

// --- Helper Functions ---
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
  initWelcomeScreen();
  initNavigation();
  initTabs();
  renderProjects();
  renderCertificates();
  renderTechStack();
  initModal();
  initForms();

  // Attempt backend loads gracefully if active
  await fetchProjects();
  await fetchComments();
});

// --- Welcome Screen Dismissal Fix ---
function initWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const mainContent = document.getElementById('main-content');

  if (welcomeScreen && mainContent) {
    const handleDismiss = (e) => {
      e.stopPropagation();
      welcomeScreen.style.opacity = '0';
      welcomeScreen.style.transition = 'opacity 0.3s ease-out';
      welcomeScreen.style.pointerEvents = 'none';
      
      setTimeout(() => {
        welcomeScreen.style.display = 'none';
        welcomeScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.style.display = 'block';
        window.scrollTo(0, 0);
      }, 300);
    };

    welcomeScreen.addEventListener('click', handleDismiss);
    welcomeScreen.addEventListener('touchstart', handleDismiss, { passive: true });
  }
}

// --- Navigation Scroll Handling ---
function initNavigation() {
  const links = document.querySelectorAll('.nav-links a');
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
}

// --- Tab Switching Logic ---
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${targetTab}`);
      if (activePanel) activePanel.classList.add('active');
    });
  });
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
  if (!container) return;

  if (projects.length === 0) {
    container.innerHTML = `<p class="text-muted">No projects found.</p>`;
    return;
  }

  container.innerHTML = projects.map(p => `
    <div class="glass-card project-card">
      <span class="modal-category-tag">${escapeHTML(p.category)}</span>
      <h3>${escapeHTML(p.title)}</h3>
      <p>${escapeHTML(p.description)}</p>
      <div class="tech-tags">
        ${p.tech.map(t => `<span class="tag">${escapeHTML(t)}</span>`).join('')}
      </div>
      <button class="btn btn-outline btn-sm view-project-btn" onclick="openModal('${p.id}')">
        View Details
      </button>
    </div>
  `).join('');
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;

  container.innerHTML = certificates.map(c => `
    <div class="glass-card cert-card">
      <h3>${escapeHTML(c.title)}</h3>
      <p class="cert-issuer">${escapeHTML(c.issuer)}</p>
      <p class="cert-date">Issued: ${escapeHTML(c.date)}</p>
      <a href="${c.credentialUrl}" target="_blank" class="btn btn-outline btn-sm">Verify Credential</a>
    </div>
  `).join('');
}

function renderTechStack() {
  const container = document.getElementById('techstack-container');
  if (!container) return;

  container.innerHTML = techStack.map(tech => `
    <div class="glass-card tech-card">
      <img src="${tech.icon}" alt="${escapeHTML(tech.name)}" class="tech-card-icon" onerror="this.style.display='none'" />
      <span class="tech-card-name">${escapeHTML(tech.name)}</span>
    </div>
  `).join('');
}

function renderComments() {
  const list = document.getElementById('comments-list');
  const countElem = document.getElementById('comment-count');

  if (countElem) countElem.textContent = comments.length;
  if (!list) return;

  list.innerHTML = comments.map(c => `
    <div class="comment-item glass-card">
      <strong>${escapeHTML(c.name)}</strong>
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
}

function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
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

// --- Form Submissions (Formspree Direct Dispatch) ---
function initForms() {
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const data = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          alert('Thank you! Your message has been sent to my email.');
          form.reset();
        } else {
          const errData = await response.json();
          alert(`Formspree Error: ${errData.errors ? errData.errors.map(e => e.message).join(', ') : 'Submission failed.'}`);
        }
      } catch (err) {
        alert('Network error. Check your internet connection or Formspree endpoint URL.');
      }
    });
  }
}
