// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '☰';
    document.querySelector('nav').appendChild(burger);

    // Image Carousel Functionality
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
        const carousel = card.querySelector('.image-carousel');
        if (carousel) {
            const images = carousel.querySelectorAll('img');
            let currentIndex = 0;
            let carouselInterval = null;
            
            card.addEventListener('mouseenter', () => {
                startCarousel();
            });
            
            card.addEventListener('mouseleave', () => {
                currentIndex = 0;
                updateCarousel();
                if (carouselInterval) {
                    clearInterval(carouselInterval);
                    carouselInterval = null;
                }
            });
            
            function startCarousel() {
                updateCarousel();
                carouselInterval = setInterval(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    updateCarousel();
                }, 2000);
            }
            
            function updateCarousel() {
                images.forEach((img, index) => {
                    img.style.opacity = index === currentIndex ? '1' : '0';
                });
            }
        }
    });

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        burger.innerHTML = navLinks.classList.contains('nav-active') ? '×' : '☰';
        burger.style.textShadow = '0 0 10px var(--cyber-primary)';
        setTimeout(() => {
            burger.style.textShadow = '';
        }, 300);
    });

    // Add scroll animation to elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.boxShadow = '0 0 20px var(--cyber-primary)';
                setTimeout(() => {
                    entry.target.style.boxShadow = '';
                }, 1000);
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all category cards
    document.querySelectorAll('.category-card').forEach(card => {
        observer.observe(card);
    });

    // Observe about section
    const aboutSection = document.querySelector('.about-content');
    if (aboutSection) {
        observer.observe(aboutSection);
    }

    // Add hover effect to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = `
                0 0 20px var(--cyber-primary),
                0 0 40px var(--cyber-primary)
            `;
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.textShadow = '0 0 20px var(--cyber-primary)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.textShadow = '';
            }
        });
    });

    // Cyber text glitch effect
    const glitchTexts = document.querySelectorAll('h1, h2, h3');
    glitchTexts.forEach(text => {
        let currentInterval = null;
        const originalText = text.textContent; // Store original text when binding event

        text.addEventListener('mouseover', () => {
            // Clear any existing interval
            if (currentInterval) clearInterval(currentInterval);
            
            text.style.textShadow = `
                0 0 10px var(--cyber-primary),
                0 0 20px var(--cyber-primary),
                0 0 40px var(--cyber-primary)
            `;
            createGlitchEffect(text, originalText);
        });

        text.addEventListener('mouseout', () => {
            if (currentInterval) clearInterval(currentInterval);
            text.textContent = originalText; // Ensure text is restored
            text.style.textShadow = '';
            text.style.animation = '';
        });

        function createGlitchEffect(element, original) {
            let iterations = 0;
            
            // Clear any existing interval
            if (currentInterval) clearInterval(currentInterval);
            
            currentInterval = setInterval(() => {
                element.textContent = original
                    .split("")
                    .map((letter, index) => {
                        if (index < iterations) {
                            return original[index];
                        }
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    })
                    .join("");

                if (iterations >= original.length) {
                    clearInterval(currentInterval);
                    element.textContent = original;
                    currentInterval = null;
                }
                iterations += 1/3;
            }, 30);
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.querySelector('.nav-links').classList.remove('nav-active');
            document.querySelector('.burger').innerHTML = '☰';
        }
    });
});

// Form Submission with Validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const name = this.querySelector('#name').value.trim();
        const email = this.querySelector('#email').value.trim();
        const message = this.querySelector('#message').value.trim();
        
        if (name && email && message) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you! Your message has been sent.';
            
            // Replace form with success message
            this.innerHTML = '';
            this.appendChild(successMessage);
        } else {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'Please fill in all fields.';
            
            // Remove existing error message if any
            const existingError = this.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            this.insertBefore(errorMessage, this.firstChild);
        }
    });
}

// Service Cards Animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.classList.add('card-hover');
    });
    
    card.addEventListener('mouseleave', function() {
        this.classList.remove('card-hover');
    });
});

// Scroll-based Animation
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.about-content, .services-grid, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Check if element is in viewport
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimation);

// Initialize scroll animation check
handleScrollAnimation(); 