/* ═══════════════════════════════════════════════════════════════
   KROMBOOK STOCK MANAGER — WEBSITE JAVASCRIPT
   ═══════════════════════════════════════════════════════════════ */

// ─── Navbar scroll effect ───────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ─── Hamburger menu ─────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ─── Modules Tabs ───────────────────────────────────────────────
const moduleTabs = document.querySelectorAll('.module-tab');
const modulePanels = document.querySelectorAll('.module-panel');

moduleTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    moduleTabs.forEach(t => t.classList.remove('active'));
    modulePanels.forEach(p => p.classList.remove('active'));

    // Set active
    tab.classList.add('active');
    const targetId = 'tab-' + tab.dataset.tab;
    const targetPanel = document.getElementById(targetId);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// ─── Scroll Animations (AOS-like) ───────────────────────────────
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
      aosObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

aosElements.forEach(el => aosObserver.observe(el));

// ─── Active nav link on scroll ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinkItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ─── Contact Form Submit ─────────────────────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate sending
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      submitBtn.disabled = false;
      formSuccess.classList.add('show');
      contactForm.reset();

      setTimeout(() => {
        formSuccess.classList.remove('show');
      }, 5000);
    }, 1500);
  });
}

// ─── Animated Counter Numbers ────────────────────────────────────
function animateCounter(el, target, duration = 1500, prefix = '', suffix = '') {
  const start = 0;
  const step = (timestamp) => {
    if (!el._startTime) el._startTime = timestamp;
    const progress = Math.min((timestamp - el._startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = prefix + value.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ─── Smooth bar chart animation on scroll ───────────────────────
const chartBars = document.querySelectorAll('.bar, .ss-bar, .mb');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transition = 'height 1s ease';
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
chartBars.forEach(bar => chartObserver.observe(bar));

// ─── Parallax Hero Orbs ──────────────────────────────────────────
document.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.hero-orb');
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.3;
    orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

// ─── Tech Stack chip hover ──────────────────────────────────────
const chips = document.querySelectorAll('.tsv-chip');
chips.forEach(chip => {
  chip.addEventListener('mouseenter', () => {
    chip.style.transform = chip.style.transform + ' scale(1.1)';
    chip.style.zIndex = '10';
  });
  chip.addEventListener('mouseleave', () => {
    chip.style.zIndex = '';
  });
});

// ─── Scroll to top on logo click ──────────────────────────────
const logo = document.querySelector('.nav-logo');
if (logo) {
  logo.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Add active style to nav links ───────────────────────────────
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: white !important; font-weight: 700; }`;
document.head.appendChild(style);

// ─── Report tabs visual toggle ──────────────────────────────────
document.querySelectorAll('.rt').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.rt').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// ─── Pricing card hover effect ───────────────────────────────────
document.querySelectorAll('.pricing-card:not(.pricing-featured)').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.borderColor = 'rgba(21,101,192,0.3)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.borderColor = '';
  });
});

// ─── Feature cards staggered animation ──────────────────────────
document.querySelectorAll('.feature-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 60}ms`;
});

// ─── Screenshots Carousel ───────────────────────────────────────
const scMainImg = document.getElementById('scMainImg');
const scTitle = document.getElementById('scTitle');
const scThumbnails = document.querySelectorAll('.sc-thumb');
const scPrevBtn = document.getElementById('scPrevBtn');
const scNextBtn = document.getElementById('scNextBtn');

if (scMainImg && scThumbnails.length > 0) {
  let currentScIndex = 0;

  function updateCarousel(index) {
    if (index < 0) index = scThumbnails.length - 1;
    if (index >= scThumbnails.length) index = 0;
    
    currentScIndex = index;
    const targetThumb = scThumbnails[currentScIndex];
    
    // Update main image and title with smooth exact fade
    scMainImg.style.opacity = '0.4';
    scMainImg.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
      scMainImg.src = targetThumb.dataset.src;
      scTitle.textContent = targetThumb.dataset.caption;
      scMainImg.style.opacity = '1';
      scMainImg.style.transform = 'scale(1)';
    }, 200);

    // Update active thumb
    scThumbnails.forEach(t => t.classList.remove('active'));
    targetThumb.classList.add('active');
    
    // Scroll thumbnail into view
    targetThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  scThumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => updateCarousel(index));
  });

  if (scPrevBtn) scPrevBtn.addEventListener('click', () => updateCarousel(currentScIndex - 1));
  if (scNextBtn) scNextBtn.addEventListener('click', () => updateCarousel(currentScIndex + 1));
}

// ─── Download Modal ──────────────────────────────────────────────
const downloadModal = document.getElementById('downloadModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const openModalBtns = document.querySelectorAll('.open-download-modal');

if (downloadModal) {
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      downloadModal.classList.add('active');
    });
  });

  closeModalBtn.addEventListener('click', () => {
    downloadModal.classList.remove('active');
  });

  // Close when clicking outside modal-container
  downloadModal.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
      downloadModal.classList.remove('active');
    }
  });
}

// ─── Initialize ─────────────────────────────────────────────────
console.log('%c Krombook Stock Manager Website ', 'background:#1565C0;color:white;font-size:14px;padding:4px 10px;border-radius:4px;font-weight:700;');
console.log('%c Built with ❤️ for Pakistani Businesses ', 'color:#2E7D32;font-weight:600;');
