// Countdown to November 14, 2026 — only runs on pages with countdown elements
const weddingDate = new Date('2026-11-14T16:00:00');
const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

if (daysEl) {
  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      daysEl.textContent = hoursEl.textContent = minutesEl.textContent = secondsEl.textContent = '0';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent    = String(days).padStart(2, '0');
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// Falling petals — only runs on pages with the petals container
const petalContainer = document.getElementById('petals');
const petalColors = ['#e8c9b0', '#d4b896', '#c9a97a', '#b8a88a', '#d8c4a8', '#ead5be'];

if (petalContainer) {
  function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left     = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${6 + Math.random() * 8}s`;
    petal.style.animationDelay   = `${Math.random() * 6}s`;
    petal.style.background       = petalColors[Math.floor(Math.random() * petalColors.length)];
    petal.style.width  = `${8 + Math.random() * 8}px`;
    petal.style.height = `${10 + Math.random() * 10}px`;
    petal.style.borderRadius = Math.random() > 0.5 ? '50% 0 50% 0' : '0 50% 0 50%';
    petalContainer.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }

  for (let i = 0; i < 18; i++) createPetal();
  setInterval(createPetal, 1200);
}

// Intersection observer — fade in sections
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.timeline-card, .detail-card, .gallery-item, .dress-code').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

document.addEventListener('animationend', () => {}, { once: true });

const visibleStyle = (el) => {
  el.style.opacity = '1';
  el.style.transform = 'translateY(0)';
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      visibleStyle(e.target);
      fadeObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-card, .detail-card, .gallery-item, .dress-code').forEach(el => {
  fadeObserver.observe(el);
});

// RSVP form — only runs on rsvp.html
const form = document.getElementById('rsvpForm');
if (form) {
  const attendingRadios = document.querySelectorAll('input[name="attending"]');
  const guestGroup = document.getElementById('guestCountGroup');
  const successMsg = document.getElementById('formSuccess');
  const errorMsg   = document.getElementById('formError');

  attendingRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      guestGroup.style.display = radio.value === 'yes' ? 'flex' : 'none';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    const fname     = form.fname.value.trim();
    const lname     = form.lname.value.trim();
    const email     = form.email.value.trim();
    const attending = form.attending.value;

    if (!fname || !lname || !email || !attending) {
      errorMsg.style.display = 'block';
      return;
    }

    // In production, replace this with a real form submission (e.g. Formspree, Netlify Forms)
    console.log('RSVP submitted:', { fname, lname, email, attending, guests: form.guests?.value, dietary: form.dietary.value, message: form.message.value });

    form.reset();
    guestGroup.style.display = 'flex';
    successMsg.style.display = 'block';
  });
}
