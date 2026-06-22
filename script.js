document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Initialize Lenis Smooth Scroll Engine
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // High-end Framer ease
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  // Tie Lenis into the browser's requestAnimationFrame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. Register GSAP plugins & Sync with Lenis
  gsap.registerPlugin(ScrollTrigger);
  
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0); // Prevents jank on tab switching

  // 3. Setup Framer-Style Reveal Animations
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    // Select all elements designated to animate within this section
    const revealElements = section.querySelectorAll(".reveal-up");

    if (revealElements.length > 0) {
      gsap.to(revealElements, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%", // Triggers when the section is 85% into the viewport
          toggleActions: "play none none reverse" // Allows re-animating if scrolled back up
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15, // Creates that sequential cascade effect
        ease: "power3.out" // Smooth deceleration
      });
    }
  });

  // 4. Parallax Hero Image scaling (Subtle interaction)
  gsap.to(".profile-img", {
    scrollTrigger: {
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      scrub: true // Ties animation progress directly to scroll position
    },
    y: 50,
    scale: 1.1,
    ease: "none"
  });

  // 5. Navbar blurring effect on scroll
  const navbar = document.querySelector(".navbar");
  
  lenis.on('scroll', (e) => {
    if (e.scroll > 50) {
      navbar.style.background = "rgba(10, 10, 10, 0.85)";
      navbar.style.border = "1px solid rgba(255, 255, 255, 0.1)";
      navbar.style.padding = "8px 24px";
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.4)";
      navbar.style.border = "1px solid rgba(255, 255, 255, 0.05)";
      navbar.style.padding = "12px 24px";
    }
  });
});
