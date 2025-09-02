document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Only initialize slider if elements exist
    if (testimonialCards.length > 0 && prevBtn && nextBtn) {
        // Hide all testimonials except the first one on mobile
        function updateTestimonialVisibility() {
            if (window.innerWidth <= 768) {
                testimonialCards.forEach((card, index) => {
                    if (index === currentIndex) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                testimonialCards.forEach(card => {
                    card.style.display = 'block';
                });
            }
        }

        // Initialize testimonial visibility
        updateTestimonialVisibility();

        // Update on window resize
        window.addEventListener('resize', updateTestimonialVisibility);

        // Previous button click
        prevBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
                updateTestimonialVisibility();
            }
        });

        // Next button click
        nextBtn.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                updateTestimonialVisibility();
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }

    // Animation on Scroll
    const animateElements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .service-card, .testimonial-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .feature-card.animate, .service-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Check if elements are in view on load and scroll
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
    
    // Initial check
    checkIfInView();
});