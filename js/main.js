/* ========== MENU TOGGLE ========== */
/* Opens and closes the mobile navigation menu when the menu icon is clicked. */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}

/* ========== SCROLL NAV ACTIVE ========== */
/* Updates the active nav link based on the section currently being viewed. */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });
    }
  })

  /* ========== STICKY HEADER ========== */
  /* Adds a border to the header after the user scrolls down. */
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* ========== CLOSE MENU ON SCROLL ========== */
  /* Closes the mobile menu so it does not stay open while scrolling. */
  menuIcon.classList.remove('bx-x'); 
  navbar.classList.remove('active');
};

/* ========== SCROLL REVEAL ========== */
/* Adds entrance animations as sections appear on the screen. */
ScrollReveal({
  reset: true,
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', {origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .skills-tabs, .certificate-card, .contact form',{ origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img',{ origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content',{ origin: 'right'});

/* ========== SKILL TABS ========== */
/* Shows the development story for the selected skill. Arrow keys also move between tabs. */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-panel');

const activateSkillTab = (tab) => {
  skillTabs.forEach((item) => {
    const isSelected = item === tab;
    item.classList.toggle('active', isSelected);
    item.setAttribute('aria-selected', isSelected);
    item.tabIndex = isSelected ? 0 : -1;
  });

  skillPanels.forEach((panel) => {
    const isSelected = panel.id === tab.dataset.tab;
    panel.classList.toggle('active', isSelected);
    panel.hidden = !isSelected;
  });
};

skillTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateSkillTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % skillTabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + skillTabs.length) % skillTabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = skillTabs.length - 1;
    skillTabs[nextIndex].focus();
    activateSkillTab(skillTabs[nextIndex]);
  });
});

/* ========== TYPED TEXT ========== */
/* Creates looping typing animations for the home and about section text. */
const typed = new Typed('.multiple-text', {
  strings: ['Junior Developer', 'Student', 'Tech-Enthusiast'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

const about_typed = new Typed('.multiple-text-about', {
  strings: ['Junior Developer', 'Student', 'Tech-Enthusiast'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

/* ========== CONTACT FORM EMAIL ========== */
/* Sends the contact form information to EmailJS and shows a status message. */
const emailJs_Public_Key = 'XQj5Ql5-AbgOKaNOk';
const emailJs_Service_ID = 'service_942filc';
const emailJs_Template_ID = 'template_s3nnr3n';

const contactForm = document.querySelector('#contact-form');
const contactStatus = document.querySelector('#contact-status');

if (window.emailjs && contactForm) {
  emailjs.init(emailJs_Public_Key);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    contactStatus.textContent = 'Sending message...';
    contactStatus.style.color = 'var(--text-color)';

    const templateParams = {
      full_name: document.querySelector('#full-name').value,
      email_address: document.querySelector('#email-address').value,
      mobile_number: document.querySelector('#mobile-number').value,
      email_subject: document.querySelector('#email-subject').value,
      message: document.querySelector('#message').value
    };

    emailjs.send(emailJs_Service_ID, emailJs_Template_ID, templateParams)
      .then(() => {
        contactStatus.textContent = 'Message sent successfully!';
        contactStatus.style.color = '#00ff88';
        contactForm.reset();
      })
      .catch(() => {
        contactStatus.textContent = 'Message could not be sent. Please try again later.';
        contactStatus.style.color = '#ff6b6b';
      });
  });
}
/* ========== END ========== */
