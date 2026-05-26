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
// Each entry: "primary" is the lookup name (case-insensitive).
// "family" lists every person shown as a checkbox in step 2.
const inviteeList = [
  { primary: 'John Mathew',              family: ['John Mathew', 'Lizy Mathew'] },
  { primary: 'Jason Mathew',             family: ['Jason Mathew', 'Manju Mathew', 'Emmett Mathew'] },
  { primary: 'Justin Mathew',            family: ['Justin Mathew'] },
  { primary: 'Jose Mundanchira',         family: ['Jose Mundanchira', 'Molly Mundanchira'] },
  { primary: 'Christy Mundanchira',      family: ['Christy Mundanchira'] },
  { primary: 'George Mundanchira',       family: ['George Mundanchira'] },
  { primary: 'Shaji Daniel',             family: ['Shaji Daniel', 'Shali Daniel'] },
  { primary: 'Shaun Daniel',             family: ['Shaun Daniel', 'Liya Daniel', 'Isabella Daniel'] },
  { primary: 'Sherin Daniel',            family: ['Sherin Daniel'] },
  { primary: 'Mathew T. Thomas',         family: ['Mathew T. Thomas', 'Nancy Thomas'] },
  { primary: 'Joshua Thomas',            family: ['Joshua Thomas'] },
  { primary: 'Alisha Thomas',            family: ['Alisha Thomas'] },
  { primary: 'Varsha Thomas',            family: ['Varsha Thomas'] },
  { primary: 'Kunjukunju Johnson',       family: ['Kunjukunju Johnson', 'Sarah Johnson'] },
  { primary: 'Sheena Johnson',           family: ['Sheena Johnson'] },
  { primary: 'Jeffrey Johnson',          family: ['Jeffrey Johnson'] },
  { primary: 'Lijo George',              family: ['Lijo George', 'Soja George'] },
  { primary: 'Sijo George',             family: ['Sijo George', 'Princy Sijo'] },
  { primary: 'Sunil Samuel',             family: ['Sunil Samuel', 'Selva Samuel'] },
  { primary: 'Jenna Samuel',             family: ['Jenna Samuel'] },
  { primary: 'Joel Samuel',              family: ['Joel Samuel'] },
  { primary: 'Wilson John',              family: ['Wilson John', 'Sunitha Wilson'] },
  { primary: 'Hannah Wilson',            family: ['Hannah Wilson'] },
  { primary: 'Sunil George',             family: ['Sunil George', 'Asha George'] },
  { primary: 'Sajosh Mathews',           family: ['Sajosh Mathews', 'Dijina Jacob Mathews'] },
  { primary: 'William Donald Warner Jr.',family: ['William Donald Warner Jr.', 'Tracy Delaney'] },
  { primary: 'Patrick Keffler',          family: ['Patrick Keffler', 'Rosemary Keffler'] },
  { primary: 'Shoemaker',               family: ['Shoemaker', 'Karen Shoemaker'] },
  { primary: 'Abraham Antony',           family: ['Abraham Antony', 'Shara Antony'] },
  { primary: 'Christine Antony',         family: ['Christine Antony'] },
  { primary: 'Dennis Cherian',           family: ['Dennis Cherian', 'Rachel John Cheriyan', 'Priya Cheriyan'] },
  { primary: 'Richard Taylor II',        family: ['Richard Taylor II', 'Kate Fulton-John'] },
  { primary: 'Brandon Owens',            family: ['Brandon Owens', 'Chrissy'] },
  { primary: 'Mary',                     family: ['Mary'] },
  { primary: 'Vinod Varghese',           family: ['Vinod Varghese', 'Jincy Varghese'] },
  { primary: 'David Coutts',             family: ['David Coutts', 'Liya Coutts'] },
  { primary: 'Wilson Kunjukunju',        family: ['Wilson Kunjukunju', 'Sherly Wilson'] },
  { primary: 'Shon Mathew',              family: ['Shon Mathew', 'Divya Jacob'] },
  { primary: 'Dhanya Jacob',             family: ['Dhanya Jacob', 'Susamma Jacob'] },
  { primary: 'Zartasha Khan',                 family: ['Zartasha Khan'] },
  { primary: 'Eldho Mathew',             family: ['Eldho Mathew', 'Bindu Mathew'] },
  { primary: 'Sujith Kumar',             family: ['Sujith Kumar', 'Navaneetha Sujith'] },
  { primary: 'Manu Sebastin',            family: ['Manu Sebastin', 'Megha Thomas'] },
  { primary: 'Manoj Thomas P',                    family: ['Manoj Thomas P', 'Chinnu Manu'] },
  { primary: 'Shaji Kunjumon',                    family: ['Shaji Kunjumon', 'Bindu'] },
  { primary: 'Kichu Sasidharan S.',                    family: ['Kichu Sasidharan S.', 'Shalima Kichu'] },
  { primary: 'Sujatha Mathew',           family: ['Sujatha Mathew'] },
  { primary: 'Mathew Thomas Issac',      family: ['Mathew Thomas Issac', 'Maria Antony'] },
  { primary: 'Athul John Mathew',        family: ['Athul John Mathew', 'Merlin Thomas Issac', 'M. B. Mathukutty', 'Binny John'] },
  { primary: 'Kurian P. Issac',          family: ['Kurian P. Issac', 'Thara Kurian'] },
  { primary: 'Arun Kurian',              family: ['Arun Kurian', 'Angela Susan'] },
  { primary: 'Kiran Kurian',             family: ['Kiran Kurian', 'Neenu Eldhose'] },
  { primary: 'Binu P. Issac',            family: ['Binu P. Issac', 'Beena Binu'] },
  { primary: 'Eldhose Parekkara',        family: ['Eldhose Parekkara', 'Teena Varghese'] },
  { primary: 'Vivek Babu',               family: ['Vivek Babu', 'Rossy'] },
  { primary: 'Modi Wilson Puthuran',     family: ['Modi Wilson Puthuran', 'Anjana Merin Thomas'] },
  { primary: 'Issac Puthuran',           family: ['Issac Puthuran', 'Jithu Rachel James'] },
  { primary: 'Sanju Abey',               family: ['Sanju Abey'] },
  { primary: 'Megha Sajeev',             family: ['Megha Sajeev'] },
  { primary: 'Shawn Keecheril',          family: ['Shawn Keecheril', 'Jacob Keecheril', 'Neena Jacob'] },
  { primary: 'Shreya Jacob',             family: ['Shreya Jacob', 'Alvin'] },
  { primary: 'Paul Joseph',              family: ['Paul Joseph', 'Shoba Joseph', 'Jason Joseph', 'Justin Joseph'] },
  { primary: 'Aji Abraham',              family: ['Aji Abraham', 'Resmi Abraham'] },
  { primary: 'Dinesh Thamby Ambookan', family: ['Dinesh Thamby Ambookan', 'Neethu James'] },
];

function findInvitee(firstName, lastName) {
  const normalize  = s => s.toLowerCase().replace(/\./g, '');
  const firstLower = normalize(firstName);
  const lastLower  = normalize(lastName);

  function nameMatches(name) {
    const n = normalize(name);
    if (!lastLower) return n.startsWith(firstLower);
    return n.startsWith(firstLower) && n.includes(lastLower);
  }

  return inviteeList.find(inv =>
    nameMatches(inv.primary) || inv.family.some(member => nameMatches(member))
  );
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
    nameError.style.display   = 'none';
    successMsg.style.display  = 'none';

    const fname = nameForm.fname.value.trim();
    const lname = nameForm.lname.value.trim();
    if (!fname) {
      nameError.textContent = 'Please enter your first name.';
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

    // Clear previous dynamic content
    familyCheckboxGroup.querySelectorAll('.checkbox-label, .radio-group').forEach(el => el.remove());

    const isSolo = invitee.family.length === 1;
    const groupLabel = familyCheckboxGroup.querySelector('label');

    if (isSolo) {
      groupLabel.textContent = 'Will you be attending?';
      const radioGroup = document.createElement('div');
      radioGroup.className = 'radio-group';
      [['yes', 'Joyfully accepts'], ['no', 'Regretfully declines']].forEach(([val, text], i) => {
        const lbl = document.createElement('label');
        lbl.className = 'radio-label';
        const rb = document.createElement('input');
        rb.type    = 'radio';
        rb.name    = 'solo-attending';
        rb.value   = val;
        rb.checked = i === 0;
        lbl.appendChild(rb);
        lbl.appendChild(document.createTextNode(' ' + text));
        radioGroup.appendChild(lbl);
      });
      familyCheckboxGroup.appendChild(radioGroup);
    } else {
      groupLabel.textContent = 'Who will be attending?';
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
    }

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

    const soloRadio = familyCheckboxGroup.querySelector('input[name="solo-attending"]:checked');
    if (soloRadio) {
      familyAttendingInput.value = soloRadio.value === 'yes' ? inviteeNameInput.value : 'Not attending';
    } else {
      const checked = Array.from(
        familyCheckboxGroup.querySelectorAll('input[type="checkbox"]:checked')
      ).map(cb => cb.value);
      familyAttendingInput.value = checked.join(', ');
    }

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
        nameForm.reset();
        step2.style.display = 'none';
        step1.style.display = 'block';
        nameError.style.display = 'none';
        successMsg.style.display = 'block';
        backBtn.style.display    = '';
        step1.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
