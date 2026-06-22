document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Initialize Lenis strictly
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

  // 2. Register GSAP & Sync
  gsap.registerPlugin(ScrollTrigger);
  
  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time)=>{
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 3. Framer Reveal Animations
  const sections = document.querySelectorAll(".section");

  sections.forEach((section) => {
    const revealElements = section.querySelectorAll(".reveal-up");

    if (revealElements.length > 0) {
      gsap.to(revealElements, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%", 
          toggleActions: "play none none reverse" 
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15, 
        ease: "power3.out"
      });
    }
  });

});
