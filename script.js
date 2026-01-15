// ================================
// Portfolio JavaScript
// ================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initNavigation();
    initScrollEffects();
    initAnimatedNumbers();
    initSkillBars();
});

// ================================
// Navigation
// ================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// ================================
// Scroll Effects
// ================================
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.timeline-item, .skill-category, .cert-card, .edu-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .skill-category, .cert-card, .edu-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .timeline-item.revealed, .skill-category.revealed, .cert-card.revealed, .edu-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        .timeline-item:nth-child(2) { transition-delay: 0.1s; }
        .timeline-item:nth-child(3) { transition-delay: 0.2s; }
        .timeline-item:nth-child(4) { transition-delay: 0.3s; }
        .skill-category:nth-child(2) { transition-delay: 0.1s; }
        .skill-category:nth-child(3) { transition-delay: 0.2s; }
        .cert-card:nth-child(2) { transition-delay: 0.05s; }
        .cert-card:nth-child(3) { transition-delay: 0.1s; }
        .cert-card:nth-child(4) { transition-delay: 0.15s; }
        .cert-card:nth-child(5) { transition-delay: 0.2s; }
        .cert-card:nth-child(6) { transition-delay: 0.25s; }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ================================
// Animated Numbers
// ================================
function initAnimatedNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const animateNumbers = () => {
        if (animated) return;
        
        const heroSection = document.querySelector('.hero');
        const sectionTop = heroSection.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight * 0.8) {
            animated = true;
            
            statNumbers.forEach(number => {
                const target = parseInt(number.dataset.target);
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        number.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        number.textContent = target;
                    }
                };
                
                updateNumber();
            });
        }
    };
    
    window.addEventListener('scroll', animateNumbers);
    animateNumbers(); // Check on load
}

// ================================
// Skill Bars Animation
// ================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;
    
    const animateSkillBars = () => {
        if (animated) return;
        
        const skillsSection = document.querySelector('.skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        
        if (sectionTop < window.innerHeight * 0.8) {
            animated = true;
            
            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.animationPlayState = 'running';
                }, index * 100);
            });
        }
    };
    
    // Pause animations initially
    skillBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
    
    window.addEventListener('scroll', animateSkillBars);
    animateSkillBars(); // Check on load
}

// ================================
// Typewriter Effect (Optional Enhancement)
// ================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ================================
// Parallax Effect for Background Orbs
// ================================
window.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        
        orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// ================================
// Intersection Observer for Performance
// ================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
