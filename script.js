// Low-End Device / Performance Degradation Detection
(function detectDevicePerformance() {
  try {
    const isLowEnd = (
      (navigator.deviceMemory && navigator.deviceMemory < 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
      (navigator.connection && (navigator.connection.saveData || /2g|3g/.test(navigator.connection.effectiveType)))
    );
    if (isLowEnd) {
      document.documentElement.classList.add('low-end');
    }
  } catch (e) {}
})();

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  
  document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}
// Hero Video Playback Logic (Play on desktop, Pause on mobile)
const heroVideo = document.getElementById('heroBgVideo');
if (heroVideo) {
    function handleVideoPlayback() {
        if (window.innerWidth > 768 && !document.documentElement.classList.contains('low-end')) {
            heroVideo.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
            heroVideo.pause();
        }
    }
    handleVideoPlayback();
    window.addEventListener('resize', handleVideoPlayback, { passive: true });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => { 
        b.classList.remove('open'); 
        b.setAttribute('aria-expanded', 'false');
        if (b.nextElementSibling) {
            b.nextElementSibling.classList.remove('open'); 
        }
    });
    if (!isOpen) { 
        btn.classList.add('open'); 
        btn.setAttribute('aria-expanded', 'true');
        if (btn.nextElementSibling) {
            btn.nextElementSibling.classList.add('open'); 
        }
    }
  });
});

// Fade-up on scroll with STAGGER from Motion Designer
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { 
      if (e.isIntersecting) { 
          e.target.classList.add('visible'); 
          observer.unobserve(e.target); 
      } 
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

// Apply standard fade up
document.querySelectorAll('.fade-up:not(.services-grid .fade-up):not(.reviews-grid .fade-up):not(.trust-bar-inner .trust-item)').forEach(el => {
    observer.observe(el);
});

// Staggered Grids
const staggerGrids = document.querySelectorAll('.services-grid, .reviews-grid, .trust-bar-inner, .why-list');
staggerGrids.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, i) => {
        child.classList.add('fade-up');
        child.style.transitionDelay = `${i * 100}ms`; // Stagger duration
        observer.observe(child);
    });
});

// Form submit
const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('fname').value;
    const phone = document.getElementById('fphone').value;
    const concern = document.getElementById('fconcern').value;
    const msg = `Hi, I'd like to book an appointment at SMILES By Dr. Annu.\nName: ${name}\nPhone: ${phone}\nConcern: ${concern}`;
    window.open(`https://wa.me/916370371654?text=${encodeURIComponent(msg)}`, '_blank');
  });
}

// Hero-nav three-state scroll behaviour
// transparent → dark-glass (scrolled in hero) → white (past hero)
const heroNav  = document.getElementById('heroNav');
const heroSection = document.getElementById('home');

let cachedHeroBottom = 0;
function recacheLayout() {
  if (heroSection) {
    cachedHeroBottom = heroSection.offsetTop + heroSection.offsetHeight;
  }
}
recacheLayout();

// Debounce layout updates on resize to prevent thrashing
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    recacheLayout();
  }, 200);
}, { passive: true });

function updateNav() {
  if (!heroNav) return;
  const scrollY = window.scrollY;
  if (scrollY < 60) {
    heroNav.classList.remove('scrolled', 'past-hero');
  } else if (scrollY < cachedHeroBottom - 80) {
    heroNav.classList.add('scrolled');
    heroNav.classList.remove('past-hero');
  } else {
    heroNav.classList.add('scrolled', 'past-hero');
  }
}

// requestAnimationFrame scroll throttle
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateNav();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });
updateNav();


// Phone / WhatsApp / Directions helpers
const PHONE = '+916370371654';
const WA = 'https://wa.me/916370371654?text=Hi%2C%20I%20want%20to%20book%20an%20appointment%20at%20SMILES%20By%20Dr.%20Annu.';
const MAPS = 'https://maps.google.com/?q=SMILES+By+Dr+Annu+Dental+Implant+Center+Sambalpur+Odisha';

document.querySelectorAll('[data-action="call"]').forEach(el => el.addEventListener('click', () => window.location.href = `tel:${PHONE}`));
document.querySelectorAll('[data-action="whatsapp"]').forEach(el => el.addEventListener('click', () => window.open(WA, '_blank')));
document.querySelectorAll('[data-action="directions"]').forEach(el => el.addEventListener('click', () => window.open(MAPS, '_blank')));

// Force scroll to top on page reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});
