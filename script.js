/**
 * Core Structural Application Interface
 * Handles high-end page timelines, overlapping scroll layouts, and UI components.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Register ScrollTrigger logic hook with GSAP Engine Core
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Framer Simulation Engine Logic
  initViewportAnimations();
  initIntersectionalStacking();
  initLegacyUIComponents();
});

/**
 * Handles Staggered Inbound Text & Item Elements inside the Viewport
 */
function initViewportAnimations() {
  const scrollPanels = document.querySelectorAll(".panels");

  scrollPanels.forEach((panel) => {
    const textRevealElements = panel.querySelectorAll(".reveal-text");
    const containerItems = panel.querySelectorAll(".reveal-item");
    const structuralCards = panel.querySelectorAll(".reveal-card");

    // Unified programmatic timeline execution block
    const panelTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 75%", 
        toggleActions: "play none none reverse" 
      }
    });

    if (textRevealElements.length > 0) {
      panelTimeline.to(textRevealElements, {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 0.85,
        stagger: 0.1,
        ease: "power4.out"
      });
    }

    if (containerItems.length > 0) {
      panelTimeline.to(containerItems, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: "power3.out"
      }, "-=0.55");
    }

    if (structuralCards.length > 0) {
      panelTimeline.to(structuralCards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power4.out"
      }, "-=0.45");
    }
  });
}

/**
 * Multi-layer Interlocking Scroll Effect (Framer-Style Section Scale down)
 */
function initIntersectionalStacking() {
  const allSections = document.querySelectorAll("section");

  allSections.forEach((section, index) => {
    // Escape routing: skip final layout layer to anchor footer processing loops cleanly
    if (index === allSections.length - 1) return;

    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true
      },
      scale: 0.93,
      opacity: 0.35,
      y: -50,
      ease: "none"
    });
  });
}

/**
 * Native Component Operational Loops (Accordions, Nav Menus)
 */
function initLegacyUIComponents() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }

  // Native Accordion Loop for Professional Experience Blocks
  const toggles = document.querySelectorAll(".exp-accordion-toggle, .accordion-toggle");
  toggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      const card = e.target.closest(".experience-card, .project-card");
      if(card) {
        const content = card.querySelector(".exp-accordion-content, .accordion-content");
        content.classList.toggle("open");
        toggle.classList.toggle("rotate");
      }
    });
  });
}
