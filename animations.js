// Initialize animations
gsap.registerPlugin(ScrollTrigger);

// Clean up all existing animations
gsap.killTweensOf(['.hero h1', '.hero-subtitle', '.feature', '.cta-button']);

// Create a single, fluid timeline for the hero section
const heroTimeline = gsap.timeline({
    defaults: {
        duration: 0.6,
        ease: "power2.out"
    }
});

// Sequence the animations with tighter timing
heroTimeline
    .from('.hero h1', {
        y: 30,
        opacity: 0
    })
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0
    }, '-=0.4')
    .from('.feature', {
        y: 20,
        opacity: 0,
        stagger: 0.1
    }, '-=0.3')
    .from('.cta-button', {
        y: 20,
        opacity: 0
    }, '-=0.2');

// Initialize shapes animation (keep this minimal)
function initShapesAnimation() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        gsap.to(shape, {
            y: "random(-30, 30)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "none",
            delay: index * 0.2
        });
    });
}

initShapesAnimation();

// Process steps animation
anime({
    targets: '.step-item',
    translateY: [60, 0],
    opacity: [0, 1],
    delay: anime.stagger(150, {start: 300}),
    duration: 1000,
    easing: 'easeOutCubic'
});

// Service boxes animation
const serviceBoxes = document.querySelectorAll('.service-box');

serviceBoxes.forEach((box, index) => {
    // Initial box animation
    gsap.from(box, {
        scrollTrigger: {
            trigger: box,
            start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
    });

    // Price animation
    gsap.to(box.querySelector('.price'), {
        scrollTrigger: {
            trigger: box,
            start: 'top 80%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: 'power2.out'
    });

    // List items stagger animation
    gsap.to(box.querySelectorAll('.service-list li'), {
        scrollTrigger: {
            trigger: box,
            start: 'top 80%',
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: index * 0.2 + 0.5,
        ease: 'power2.out'
    });

    // Update service box hover animations
    box.addEventListener('mouseenter', () => {
        gsap.to(box, {
            y: -5,
            duration: 0.2, // Faster duration
            ease: 'power2.out',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)'
        });
    });

    box.addEventListener('mouseleave', () => {
        gsap.to(box, {
            y: 0,
            duration: 0.2, // Faster duration
            ease: 'power2.in',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
    });
});

// Team members animation - smoother version
const teamMembers = document.querySelectorAll('.team-member');

// Create a single timeline for team members
gsap.timeline({
    scrollTrigger: {
        trigger: '.team-grid',
        start: 'top 85%',
    }
})
.from(teamMembers, {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out'
});

// Smoother hover animations for team members
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
        gsap.to(member, {
            y: -10,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 15px 40px rgba(27, 54, 93, 0.15)'
        });
    });

    member.addEventListener('mouseleave', () => {
        gsap.to(member, {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            boxShadow: '0 10px 30px rgba(27, 54, 93, 0.1)'
        });
    });
});

// Add a reveal animation for the section title
gsap.from('.section-title', {
    scrollTrigger: {
        trigger: '.section-title',
        start: 'top 85%',
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Update Testimonials animation
const testimonialCards = document.querySelectorAll('.testimonial-card');

gsap.from(testimonialCards, {
    scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 85%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Hover effect for testimonial cards
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        });
    });
});

// Calculator functionality
const transactionInput = document.getElementById('transactionCount');
const timeSavedEl = document.getElementById('timeSaved');
const costSavedEl = document.getElementById('costSaved');

function updateCalculator() {
    const transactions = parseInt(transactionInput.value) || 0;
    const hoursPerTransaction = 8;
    const valuePerHour = 50;
    
    const totalHours = transactions * hoursPerTransaction;
    const totalValue = totalHours * valuePerHour;
    
    timeSavedEl.textContent = `${totalHours} hours`;
    costSavedEl.textContent = `$${totalValue.toLocaleString()}`;
}

transactionInput?.addEventListener('input', updateCalculator);

// Animated statistics
const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.ceil(current);
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target;
            }
        };

        gsap.from(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%',
                onEnter: () => updateStat()
            }
        });
    });
}

animateStats();

// Update the EMFSubmitForm function
function EMFSubmitForm() {
    const loadingOverlay = document.getElementById('loading-overlay');
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    
    // This will trigger the EmailMeForm
    if (typeof EMF !== 'undefined') {
        EMF.showForm();
        // Hide loading overlay after form is shown
        setTimeout(() => {
            loadingOverlay.classList.remove('active');
        }, 1000);
    } else {
        // Fallback if the form script hasn't loaded
        window.location.href = 'https://www.emailmeform.com/builder/form/026a801is4Aen131';
    }
}

// Add event listener for when EMF is loaded
window.addEventListener('EMF_Loaded', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    loadingOverlay.classList.remove('active');
}); 