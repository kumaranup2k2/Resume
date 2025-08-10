// 1. Footer me current year set kare
document.getElementById('year').textContent = new Date().getFullYear();

// 2. Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('open'); // Menu open/close kare
});

// 3. Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) { 
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
      nav.classList.remove('open'); // Mobile menu close kare
    }
  });
});

// 4. Reveal Animation on Scroll
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target); // Once visible, stop observing
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// 5. Typing Effect in Hero Section
const phrases = [
  'Building sleek & functional web experiences',
  'Frontend-first, backend-capable',
  'I make ideas click — UI, animations, code'
];
let phraseIndex = 0, charIndex = 0;

function typeLoop() {
  const typingEl = document.getElementById('typing');
  if (!typingEl) return;

  const currentPhrase = phrases[phraseIndex];
  typingEl.textContent = currentPhrase.slice(0, charIndex);

  if (charIndex++ > currentPhrase.length) {
    setTimeout(() => {
      charIndex = 0;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 1200);
  }
  setTimeout(typeLoop, 28);
}
setTimeout(typeLoop, 400);

// 6. Animate Skill Progress Bars on Scroll
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.progress').forEach(bar => {
        const value = bar.getAttribute('data-value') || 80;
        bar.querySelector('span').style.width = value + '%';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('#skills').forEach(section => skillObserver.observe(section));

// 7. Background Particles Animation
(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;

  const particles = [];
  function rand(min, max) { return Math.random() * (max - min) + min; }

  // Create 30 particles
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 2.4),
      vx: rand(-0.2, 0.2),
      vy: rand(-0.1, 0.1)
    });
  }

  function resize() {
    w = canvas.width = innerWidth;
    h = canvas.height = innerHeight;
  }
  addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;

      ctx.beginPath();
      ctx.fillStyle = 'rgba(164,204,217,0.06)';
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// 8. Project Tabs (Category Filter)
const tabBtns = document.querySelectorAll('.tab-btn');
const projectCards = document.querySelectorAll('.project-card');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Active tab highlight
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.dataset.category;

    // Show/Hide projects by category
    projectCards.forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// 9. Dummy Contact Form Handler
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thanks — this is a demo contact form. Replace with backend endpoint.');
    form.reset();
  });
}
