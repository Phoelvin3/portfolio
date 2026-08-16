const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// --- In-Memory Data Stores ---
let comments = [
  {
    id: 1,
    name: 'Alex',
    message: 'Awesome portfolio design and smooth animations!',
    createdAt: new Date().toISOString()
  }
];

const projects = [
  {
    id: 'travel-app',
    title: 'Venture Luxe Travel App',
    category: 'Mobile & Web Application',
    description: 'A full-stack mobile and web-based travel booking & itinerary management platform enabling users to explore curated destinations, book trip slots, and view real-time updates.',
    tech: ['React', 'Node.js', 'Flutter', 'Tailwind CSS', 'MongoDB'],
    stats: { techCount: 5, featuresCount: 4 },
    features: [
      'Interactive itinerary scheduling & destination tracking',
      'Secure authentication & booking checkout workflow',
      'Real-time booking updates & seat availability',
      'Responsive cross-platform web and mobile UI'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'efootball-analytics',
    title: 'eFootball Tactical Analyzer',
    category: 'Web Tool',
    description: 'A specialized web utility for analyzing team formations, player playstyle matchups, and Out Wide offensive strategies in eFootball.',
    tech: ['React', 'JavaScript', 'Tailwind CSS', 'Vite'],
    stats: { techCount: 4, featuresCount: 3 },
    features: [
      'Visual tactical field layout mapping',
      'Player card stat comparison matrix',
      'Playstyle synergy calculator'
    ],
    demoUrl: '#',
    githubUrl: '#'
  },
  {
    id: 'kali-network-monitor',
    title: 'Network Interface Manager',
    category: 'System Utility',
    description: 'A Kali Linux desktop helper tool for automating interface monitoring, managing Wi-Fi adapters, and displaying real-time audio/network socket status.',
    tech: ['Node.js', 'Bash', 'React', 'Electron'],
    stats: { techCount: 4, featuresCount: 3 },
    features: [
      'Automated network interface reset & monitoring',
      'Visual status overview for system drivers',
      'Custom command execution shortcuts'
    ],
    demoUrl: '#',
    githubUrl: '#'
  }
];

// --- Routes ---

// Healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Get Projects
app.get('/api/projects', (req, res) => {
  res.json({ success: true, data: projects });
});

// Get Comments
app.get('/api/comments', (req, res) => {
  res.json({ success: true, data: comments });
});

// Post Comment
app.post('/api/comments', (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      success: false,
      error: 'Name and message are required fields.'
    });
  }

  const newComment = {
    id: Date.now(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString()
  };

  comments.unshift(newComment);
  res.status(201).json({ success: true, data: newComment });
});

// Submit Contact Form
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      error: 'All fields (name, email, message) are required.'
    });
  }

  // Console log submission (or connect Nodemailer/SendGrid here)
  console.log(`[Contact Form Submission] From: ${name} (${email}) - Msg: ${message}`);

  res.status(200).json({
    success: true,
    message: 'Message received successfully!'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});