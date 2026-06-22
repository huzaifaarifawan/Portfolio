document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Initialize Lenis Smooth Scroll Engine
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Silky Framer curve
    direction: 'vertical',
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 3. GSAP Fade/Slide Up Animations
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const revealElements = section.querySelectorAll(".reveal");

    if (revealElements.length > 0) {
      gsap.to(revealElements, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Triggers slightly before element enters
          toggleActions: "play none none reverse"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15, // Cascade effect
        ease: "power3.out"
      });
    }
  });

  // 4. Smooth Scrolling for Navbar Links (Lenis Intercept)
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      // Get the target ID (e.g. #experience)
      const targetId = link.getAttribute('href');
      
      // Navigate to target using Lenis. The offset pushes the view down so the floating navbar doesn't cover the title.
      lenis.scrollTo(targetId, {
        offset: -100, 
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    });
  });

  // 5. Accordion Logic (For Experiences, Certifications, and Projects)
  const cards = document.querySelectorAll('.experience-card, .project-card, .cert-card');

  cards.forEach(card => {
    // Find the toggle button inside this specific card
    const toggle = card.querySelector('.exp-accordion-toggle, .accordion-toggle, .cert-expand-toggle');
    
    // Also allow clicking the whole header to open it
    const header = card.querySelector('.experience-header, .project-header, .cert-header');
    const triggerElement = toggle || header;

    if (triggerElement) {
      triggerElement.addEventListener('click', (e) => {
        e.stopPropagation();
        
        const isCurrentlyExpanded = card.classList.contains('is-expanded');

        // Close all other cards first (Optional: remove this if you want multiple open at once)
        cards.forEach(c => c.classList.remove('is-expanded'));

        // Toggle the clicked one
        if (!isCurrentlyExpanded) {
          card.classList.add('is-expanded');
          
          // Small UX feature: Recalculate ScrollTrigger sizes since the layout height just changed
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 600); // 600ms matches the CSS transition time
        }
      });
    }
  });

  // 6. Copy to Clipboard Functionality
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

});
