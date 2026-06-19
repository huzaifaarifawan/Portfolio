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
      
      const icon = mobileMenuBtn.querySelector('i');
      if (mobileMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
      });
    });

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
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // --- Dynamic Scroll Monitor Logic ---
  const handleScrollOperations = () => {
    const scrollPosition = window.scrollY;
    nav.classList.toggle('scrolled', scrollPosition > 50);

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

  window.addEventListener('scroll', handleScrollOperations, { passive: true });
  handleScrollOperations();

  // --- Interactive Project Accordion Engine ---
  document.querySelectorAll('.project-card').forEach(card => {
    const header = card.querySelector('.project-header');
    if (header) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.contains('is-expanded');
        document.querySelectorAll('.project-card').forEach(otherCard => {
          otherCard.classList.remove('is-expanded');
        });
        card.classList.toggle('is-expanded', !isExpanded);
      });
    }
  });

  // --- Interactive Experience Accordion Engine ---
  document.querySelectorAll('.experience-card').forEach(card => {
    const header = card.querySelector('.experience-header');
    if (header) {
      header.addEventListener('click', () => {
        const isExpanded = card.classList.contains('is-expanded');
        document.querySelectorAll('.experience-card').forEach(otherCard => {
          otherCard.classList.remove('is-expanded');
        });
        card.classList.toggle('is-expanded', !isExpanded);
      });
    }
  });

  // --- Interactive Certifications Accordion Expansion Engine ---
  document.querySelectorAll('.cert-card').forEach(card => {
    const toggleBtn = card.querySelector('.cert-expand-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = card.classList.contains('is-expanded');
        
        document.querySelectorAll('.cert-card').forEach(otherCard => {
          if(otherCard !== card) otherCard.classList.remove('is-expanded');
        });
        
        card.classList.toggle('is-expanded', !isExpanded);
        
        const labelText = toggleBtn.childNodes[0];
        if (card.classList.contains('is-expanded')) {
          labelText.textContent = "Collapse ";
        } else {
          labelText.textContent = "Read More ";
        }
      });
    }
  });

  // --- Theme Architecture Switcher Pipeline ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'light' && themeToggleBtn) {
    themeToggleBtn.querySelector('i').className = 'fas fa-sun';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      const icon = themeToggleBtn.querySelector('i');
      
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'light');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // --- Real-time Card Light Gradient Coordinate Mapping & Parallax 3D Tilt Engine ---
  const handleCardInteraction = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Parallax Tilt Calculation Matrix
    if (window.innerWidth > 768) {
      const tiltX = (y - rect.height / 2) / (rect.height / 2) * -4; 
      const tiltY = (x - rect.width / 2) / (rect.width / 2) * 4; 
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px) scale(1.01)`;
    }
  };

  const resetCardInteraction = (e) => {
    const card = e.currentTarget;
    card.style.transform = `rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
  };

  // Bind interaction engines to all layout structural elements
  document.querySelectorAll('.experience-card, .project-card, .cert-card').forEach(card => {
    card.addEventListener('mousemove', handleCardInteraction);
    card.addEventListener('mouseleave', resetCardInteraction);
  });

  // --- Secure Clipboard Copy Execution Pipeline ---
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetText = btn.getAttribute('data-copy');
      
      navigator.clipboard.writeText(targetText).then(() => {
        btn.classList.add('copied');
        const icon = btn.querySelector('i');
        icon.className = 'fas fa-check';
        icon.style.color = '#10b981';
        
        setTimeout(() => {
          btn.classList.remove('copied');
          icon.className = 'far fa-copy';
          icon.style.color = '';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy text data: ', err);
      });
    });
  });

});
