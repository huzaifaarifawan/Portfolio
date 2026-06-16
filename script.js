document.addEventListener('DOMContentLoaded', () => {
  
  // --- Structural Cache Selectors ---
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const nav = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('section');

  // --- Mobile Navigation Controller Interface ---
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('active');
      
      // Toggle button visual effect between hamburger and cross icon
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Dismiss active drawer state upon mapping choice
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
      });
    });

    // Close menu if user clicks outside the navigation container
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
      }
    });
  }

  // --- Intersection Scroll Reveal Engine Configuration ---
  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Stop tracking once rendered
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // --- Dynamic Scroll Monitor Logic (Scroll Spy & Navbar Scrolled Class) ---
  const handleScrollOperations = () => {
    const scrollPosition = window.scrollY;

    // Apply tracking background state modifiers to navbar container
    nav.classList.toggle('scrolled', scrollPosition > 50);

    // Scroll Spy: Dynamic tracking highlighting visual anchors
    let insideSectionId = 'home';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        insideSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${insideSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  // Bind and initiate active scroll listening pipelines
  window.addEventListener('scroll', handleScrollOperations, { passive: true });
  handleScrollOperations(); // Run once initialization map properties render

  // --- Interactive Project Accordion Engine ---
  document.querySelectorAll('.project-card').forEach(card => {
    const header = card.querySelector('.project-header');
    
    if (header) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.contains('is-expanded');
        
        // Auto-close any other open project card to preserve clean layout spaces
        document.querySelectorAll('.project-card').forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('is-expanded');
          }
        });
        
        // Toggle current card selection state loop
        card.classList.toggle('is-expanded', !isExpanded);
      });
    }
  });

});
