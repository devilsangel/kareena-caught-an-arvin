// Show RSVP nav link only on the /summon route
if (window.location.pathname.includes('/summon')) {
  const navRsvp = document.getElementById('nav-rsvp');
  if (navRsvp) navRsvp.style.display = '';
}

// Countdown to November 14, 2026 — only runs on pages with countdown elements
const weddingDate = new Date('2027-01-11T16:00:00');
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

// ─── INVITEE LIST ────────────────────────────────────────────────────────────
// Edit this array to add guests and their families before going live.
// "primary" is the name used for lookup (case-insensitive, matches full name
// or either part). "family" lists every person in that household.
const inviteeList = [
  {
    primary: 'Thomas George',
    family: ['Thomas George', 'Mary George', 'Alex George'],
  },
  {
    primary: 'Priya Nair',
    family: ['Priya Nair', 'Suresh Nair'],
  },
  {
    primary: 'James Mathew',
    family: ['James Mathew', 'Anita Mathew', 'Rohan Mathew', 'Sana Mathew'],
  },
];

function findInvitee(firstName, lastName) {
  const fullLower  = `${firstName} ${lastName}`.trim().toLowerCase();
  const firstLower = firstName.toLowerCase();
  const lastLower  = lastName.toLowerCase();
  return inviteeList.find(inv => {
    const p = inv.primary.toLowerCase();
    return p === fullLower || p.startsWith(firstLower) || p.endsWith(lastLower);
  });
}
// ─────────────────────────────────────────────────────────────────────────────

// RSVP form — only runs on rsvp.html
const nameForm = document.getElementById('nameForm');
if (nameForm) {
  const step1       = document.getElementById('step1');
  const step2       = document.getElementById('step2');
  const nameError   = document.getElementById('nameError');
  const step2Greeting    = document.getElementById('step2Greeting');
  const familyCheckboxGroup = document.getElementById('familyCheckboxGroup');
  const inviteeNameInput   = document.getElementById('inviteeName');
  const familyAttendingInput = document.getElementById('familyAttending');
  const rsvpForm    = document.getElementById('rsvpForm');
  const successMsg  = document.getElementById('formSuccess');
  const errorMsg    = document.getElementById('formError');
  const backBtn     = document.getElementById('backBtn');

  // Step 1: look up name
  nameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    nameError.style.display = 'none';

    const fname = nameForm.fname.value.trim();
    const lname = nameForm.lname.value.trim();
    if (!fname || !lname) {
      nameError.textContent = 'Please enter your first and last name.';
      nameError.style.display = 'block';
      return;
    }

    const invitee = findInvitee(fname, lname);
    if (!invitee) {
      nameError.textContent =
        "We couldn't find your name on the guest list. Please double-check spelling or contact us.";
      nameError.style.display = 'block';
      return;
    }

    // Populate step 2
    inviteeNameInput.value = invitee.primary;
    step2Greeting.textContent = `Welcome, ${invitee.primary.split(' ')[0]}!`;

    // Remove old checkboxes (keep the label)
    const existingCheckboxes = familyCheckboxGroup.querySelectorAll('.checkbox-label');
    existingCheckboxes.forEach(el => el.remove());

    invitee.family.forEach(member => {
      const lbl = document.createElement('label');
      lbl.className = 'checkbox-label';
      const cb = document.createElement('input');
      cb.type    = 'checkbox';
      cb.value   = member;
      cb.checked = true;
      lbl.appendChild(cb);
      lbl.appendChild(document.createTextNode(' ' + member));
      familyCheckboxGroup.appendChild(lbl);
    });

    step1.style.display = 'none';
    step2.style.display = 'block';
    step2.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Back button
  backBtn.addEventListener('click', () => {
    step2.style.display = 'none';
    step1.style.display = 'block';
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';
    step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Step 2: submit RSVP
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.style.display = 'none';
    errorMsg.style.display   = 'none';

    const email = rsvpForm.email.value.trim();
    if (!email) {
      errorMsg.textContent = 'Please enter your email address.';
      errorMsg.style.display = 'block';
      return;
    }

    const checked = Array.from(
      familyCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked')
    ).map(cb => cb.value);
    familyAttendingInput.value = checked.join(', ');

    const submitBtn = rsvpForm.querySelector('.btn-submit');
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(rsvpForm)).toString(),
    })
      .then(() => {
        rsvpForm.reset();
        successMsg.style.display = 'block';
        backBtn.style.display    = 'none';
      })
      .catch(() => {
        errorMsg.textContent = 'Something went wrong — please try again or email us directly.';
        errorMsg.style.display = 'block';
      })
      .finally(() => {
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send RSVP';
      });
  });
}
