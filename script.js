document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Functionality
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNav = document.getElementById('mobileNav');

  mobileMenu.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden');
    mobileNav.classList.toggle('opacity-100');
    mobileNav.classList.toggle('translate-y-0');
  });

  // Close mobile menu when a link is clicked
  document.querySelectorAll('#mobileNav a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden');
      mobileNav.classList.remove('opacity-100', 'translate-y-0');
    });
  });

  // Smooth Scroll with Offset for Navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      const offset = 80; // Adjust for fixed navbar height
      window.scrollTo({
        top: target.offsetTop - offset,
        behavior: 'smooth'
      });
    });
  });

  // Scroll Animations with Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '-50px 0px -100px 0px'
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  document.querySelectorAll('.opacity-0').forEach(el => observer.observe(el));

  // Form Handling with Fetch API
  const form = document.querySelector('.contact-form');
  if (form) {
    const statusMessage = document.createElement('p');
    statusMessage.className = 'text-center mt-4';
    form.appendChild(statusMessage);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      statusMessage.textContent = 'Sending message...';
      statusMessage.classList.add('text-blue-500');

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          statusMessage.textContent = 'Message sent successfully!';
          statusMessage.classList.replace('text-blue-500', 'text-green-500');
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (error) {
        statusMessage.textContent = 'Error sending message. Please try again.';
        statusMessage.classList.replace('text-blue-500', 'text-red-500');
      }
    });
  }

  // Resume PDF Download Tracking
  const resumeDownloadBtn = document.querySelector('a[href="resume.pdf"][download]');
  if (resumeDownloadBtn) {
    resumeDownloadBtn.addEventListener('click', () => {
      // You can add analytics tracking here
      console.log('Resume downloaded');
    });
  }

  // Social Link Hover Effects
  document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.classList.add('hover:scale-110', 'transition-transform');
    });
    link.addEventListener('mouseleave', () => {
      link.classList.remove('hover:scale-110');
    });
  });

  // Active Navigation Link Highlighting
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');

  const highlightActiveNav = () => {
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    navLinks.forEach(link => link.classList.remove('active-nav'));
    navLinks[index]?.classList.add('active-nav');
  };

  window.addEventListener('scroll', highlightActiveNav);
  highlightActiveNav(); // Initial call to set active nav on page load
});

// Add this to handle navbar blur on scroll
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});
