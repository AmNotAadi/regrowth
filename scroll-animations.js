/**
 * Scroll-triggered animations using IntersectionObserver
 * Lightweight, performant, and accessible
 */

(function() {
    'use strict';

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // If user prefers reduced motion, don't initialize animations
    if (prefersReducedMotion) {
        // Make all elements visible immediately
        const elements = document.querySelectorAll('.fade-on-scroll');
        elements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
        return;
    }

    // IntersectionObserver options
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -50px 0px', // Trigger when element is 50px from bottom of viewport
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add fade-in class when element enters viewport
                entry.target.classList.add('fade-in');
                
                // Unobserve the element so animation only runs once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initialize animations when DOM is loaded
    function initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-on-scroll');
        
        elements.forEach(element => {
            // Only observe if element doesn't already have fade-in class
            if (!element.classList.contains('fade-in')) {
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
