document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     0. Preloader
  ========================================================= */
  const preloader = document.getElementById('preloader');
  const preloaderProgress = document.getElementById('preloaderProgress');
  let progress = 0;
  const progressInterval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) progress = 100;
    if (preloaderProgress) preloaderProgress.style.width = progress + '%';
    if (progress >= 100) clearInterval(progressInterval);
  }, 140);

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloaderProgress) preloaderProgress.style.width = '100%';
      setTimeout(() => {
        preloader && preloader.classList.add('loaded');
      }, 250);
    }, 200);
  });
  // Safety net in case 'load' is slow / already fired
  setTimeout(() => preloader && preloader.classList.add('loaded'), 4000);

  /* =========================================================
     1. Initialize Lenis Smooth Scroll Engine
  ========================================================= */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  /* =========================================================
     2. Register GSAP ScrollTrigger
  ========================================================= */
  gsap.registerPlugin(ScrollTrigger);

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* =========================================================
     3. GSAP Fade/Slide Up Animations
  ========================================================= */
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const revealElements = section.querySelectorAll(".reveal");
    if (revealElements.length > 0) {
      gsap.to(revealElements, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }
  });

  /* =========================================================
     4. Smooth Scrolling for Navbar / Anchor Links
  ========================================================= */
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        closeMobileMenu();
        lenis.scrollTo(targetId, {
          offset: -100,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    });
  });

  /* =========================================================
     5. Accordion Logic
  ========================================================= */
  const cards = document.querySelectorAll('.experience-card, .project-card, .cert-card');
  cards.forEach(card => {
    const toggle = card.querySelector('.exp-accordion-toggle, .accordion-toggle, .cert-expand-toggle');
    const header = card.querySelector('.experience-header, .project-header, .cert-header');
    const triggerElement = toggle || header;
    if (triggerElement) {
      triggerElement.addEventListener('click', (e) => {
        // Prevent triggering if user clicks the 'Verify' link inside the card
        if (e.target.closest('.cert-link')) return;
        e.stopPropagation();
        const isCurrentlyExpanded = card.classList.contains('is-expanded');
        cards.forEach(c => c.classList.remove('is-expanded'));
        if (!isCurrentlyExpanded) {
          card.classList.add('is-expanded');
          refreshScrollTrigger();
        }
      });
    }
  });

  /* =========================================================
     6. Copy to Clipboard Functionality
  ========================================================= */
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const icon = btn.querySelector('i');
        icon.className = "fas fa-check text-emerald";
        setTimeout(() => {
          icon.className = "far fa-copy";
        }, 2000);
      });
    });
  });

  /* =========================================================
     7. Mobile Menu (previously non-functional)
  ========================================================= */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  const mobileBackdrop = document.getElementById('mobileBackdrop');

  function openMobileMenu() {
    navLinksContainer.classList.add('open');
    mobileBackdrop.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileMenuBtn.querySelector('i').className = 'fas fa-xmark';
    lenis.stop();
  }
  function closeMobileMenu() {
    navLinksContainer.classList.remove('open');
    mobileBackdrop.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
    lenis.start();
  }
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinksContainer.classList.contains('open');
      isOpen ? closeMobileMenu() : openMobileMenu();
    });
  }
  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', closeMobileMenu);
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  });

  /* =========================================================
     8. Theme Toggle (light / dark)
  ========================================================= */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isLight = html.getAttribute('data-theme') === 'light';
      html.setAttribute('data-theme', isLight ? 'dark' : 'light');
      themeToggleBtn.querySelector('i').className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    });
  }

  /* =========================================================
     9. Scrollspy — highlight active nav link as user scrolls
  ========================================================= */
  const spySections = document.querySelectorAll('.section[id]');
  spySections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: "top 50%",
      end: "bottom 50%",
      onEnter: () => setActiveLink(section.id),
      onEnterBack: () => setActiveLink(section.id),
    });
  });
  function setActiveLink(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  /* =========================================================
     10. Cursor-follow glow spotlight on cards
  ========================================================= */
  const glowCards = document.querySelectorAll('.experience-card, .project-card, .cert-card');
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (supportsHover) {
    glowCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--gx', `${x}%`);
        card.style.setProperty('--gy', `${y}%`);
      });
    });
  }

  /* =========================================================
     11. Magnetic buttons
  ========================================================= */
  if (supportsHover) {
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const relX = e.clientX - rect.left - rect.width / 2;
        const relY = e.clientY - rect.top - rect.height / 2;
        btn.style.setProperty('--mx', `${relX * 0.25}px`);
        btn.style.setProperty('--my', `${relY * 0.25}px`);
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });
  }

  /* =========================================================
     12. Back to top button
  ========================================================= */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    lenis.on('scroll', ({ scroll }) => {
      backToTop.classList.toggle('visible', scroll > 600);
    });
    backToTop.addEventListener('click', () => {
      lenis.scrollTo(0, { duration: 1.2 });
    });
  }

  /* =========================================================
     Helper: refresh ScrollTrigger after layout shifts
  ========================================================= */
  function refreshScrollTrigger() {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  }
});
