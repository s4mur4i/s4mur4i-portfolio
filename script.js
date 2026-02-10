// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(dark) {
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => {
  setTheme(root.getAttribute('data-theme') !== 'dark');
});

// Load saved theme
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved === 'dark');

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile nav
      document.getElementById('nav-toggle').checked = false;
    }
  });
});

// Scroll animations with IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));

// Expandable timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
  const header = item.querySelector('.timeline-header');
  header.addEventListener('click', () => {
    item.classList.toggle('expanded');
  });
  header.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.classList.toggle('expanded');
    }
  });
});

// Active nav highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });

  // Shrink header on scroll
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 50);
});

// Terminal typing effect in hero
const typed = document.getElementById('typed-text');
if (typed) {
  const text = typed.getAttribute('data-text');
  typed.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < text.length) {
      typed.textContent += text[i];
      i++;
      setTimeout(typeChar, 50 + Math.random() * 40);
    }
  }
  setTimeout(typeChar, 800);
}

// Language bar animation
const langBars = document.querySelectorAll('.lang-fill');
const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.getAttribute('data-width');
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

langBars.forEach(bar => {
  bar.style.width = '0';
  langObserver.observe(bar);
});
