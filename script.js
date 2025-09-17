// WhatsApp redirection function
function redirectToWhatsApp(plan, price) {
    const phoneNumber = '+919202718909'; // Replace with your actual WhatsApp number
    const message = `Hi, I am interested in the ${plan} Plan (₹${price})`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.reason-card, .pricing-card').forEach(card => {
    observer.observe(card);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Create WhatsApp message from form data
        const message = `New Contact Form Submission:\nName: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`;
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        successMessage.style.cssText = `
            background: #2ecc71;
            color: white;
            padding: 1rem;
            border-radius: 5px;
            margin-top: 1rem;
            text-align: center;
        `;
        
        contactForm.appendChild(successMessage);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Add WhatsApp redirection to pricing plan buttons
document.querySelectorAll('.select-plan').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const card = button.closest('.pricing-card');
        const planName = card.querySelector('h3').textContent;
        const price = card.querySelector('.price').textContent.replace('₹', '');
        redirectToWhatsApp(planName, price);
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    });
}

// Add hover effect to pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add click animation to CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        ctaButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            ctaButton.style.transform = 'scale(1)';
        }, 200);
    });
}

// Add floating animation to shapes
const shapes = document.querySelector('.floating-shapes');
if (shapes) {
    let angle = 0;
    function animateShapes() {
        angle += 0.5;
        shapes.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(animateShapes);
    }
    animateShapes();
}

// Typing effect removed as requested

// Add statistics animation
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCount = () => {
            current += step;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Intersection Observer for stats animation
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add explosion effect to Get Started button on hover
const getStartedButton = document.querySelector('.cta-button');
if (getStartedButton) {
    getStartedButton.addEventListener('mouseenter', (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        // Single, more impactful confetti burst
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'],
            shapes: ['square', 'circle'],
            gravity: 1.5,
            scalar: 1.4,
            ticks: 300
        });
    });
}

// Add individual letter scramble effect to navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    const text = link.textContent;
    const letters = text.split('');
    
    // Wrap each letter in a span
    link.innerHTML = letters.map(letter => 
        `<span class="letter">${letter}</span>`
    ).join('');
    
    link.addEventListener('mouseenter', (e) => {
        const letterElements = e.target.querySelectorAll('.letter');
        
        letterElements.forEach(letter => {
            // Generate random positions for each movement stage
            const positions = [
                { x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 },
                { x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 },
                { x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 },
                { x: Math.random() * 40 - 20, y: Math.random() * 40 - 20 }
            ];
            
            // Set CSS variables for the animation
            letter.style.setProperty('--x1', `${positions[0].x}px`);
            letter.style.setProperty('--y1', `${positions[0].y}px`);
            letter.style.setProperty('--x2', `${positions[1].x}px`);
            letter.style.setProperty('--y2', `${positions[1].y}px`);
            letter.style.setProperty('--x3', `${positions[2].x}px`);
            letter.style.setProperty('--y3', `${positions[2].y}px`);
            letter.style.setProperty('--x4', `${positions[3].x}px`);
            letter.style.setProperty('--y4', `${positions[3].y}px`);
        });
    });
}); 