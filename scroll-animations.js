/**
 * Scroll-stacking animations using IntersectionObserver
 * Creates a stacking effect where elements slide up and stack on top of previous ones
 */

(function() {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, don't initialize animations
    if (prefersReducedMotion) {
        // Make all elements visible immediately
        const elements = document.querySelectorAll('.stack-on-scroll');
        elements.forEach(el => {
            el.style.transform = 'none';
            el.style.opacity = '1';
            el.style.zIndex = 'auto';
        });
        return;
    }

    // IntersectionObserver options for stacking effect
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -20% 0px', // Trigger when element is 20% from bottom of viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    // Track stacking order
    let stackOrder = 0;

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add stack-in class when element enters viewport
                entry.target.classList.add('stack-in');
                
                // Set z-index for proper stacking
                stackOrder++;
                entry.target.style.zIndex = stackOrder + 10;
                
                // Unobserve the element so animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize animations when DOM is loaded
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.stack-on-scroll');
        
        elements.forEach((element, index) => {
            // Only observe if element doesn't already have stack-in class
            if (!element.classList.contains('stack-in')) {
                // Set initial z-index based on order
                element.style.zIndex = index + 1;
                observer.observe(element);
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    // Re-initialize for dynamically loaded content
    window.initScrollAnimations = initScrollAnimations;

})();
