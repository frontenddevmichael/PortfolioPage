// Enhanced Portfolio JavaScript with Staggered Animations
class PortfolioAnimations {
    constructor() {
        this.initializeOnLoad();
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.setupTypingEffect();
        this.setupParallaxEffects();
        this.setupPreloader();
        this.setupNavigation();
        this.setupContactForm();
        this.setupSkillAnimations();
    }

    initializeOnLoad() {
        document.addEventListener('DOMContentLoaded', () => {
            this.animateSkillBars();
            this.setupStaggeredAnimations();
            this.updateFooterTime();
            this.setupThemeToggle();
            this.setupScrollToTop();
        });


    }




    // Advanced staggered animations
    setupStaggeredAnimations() {
        const animateElements = (selector, delay = 100, animation = 'slideUp') => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((el, index) => {
                el.style.opacity = '0';
                el.style.transform = this.getTransformByAnimation(animation);
                el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
                el.style.transitionDelay = `${index * delay}ms`;

                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                }, 100 + (index * delay));
            });
        };

        // Stagger different elements with different animations
        animateElements('.nav-links a', 150, 'slideDown');
        animateElements('.skill-tag', 100, 'slideUp');
        animateElements('.social-link', 200, 'rotate');
        animateElements('.hero-socials a', 150, 'bounce');
        animateElements('.project-card', 200, 'scaleUp');
        animateElements('.stat-item', 300, 'slideUp');
        animateElements('.skill-category', 400, 'slideIn');
    }

    getTransformByAnimation(animation) {
        const transforms = {
            slideUp: 'translateY(30px)',
            slideDown: 'translateY(-30px)',
            slideIn: 'translateX(-30px)',
            scaleUp: 'scale(0.8)',
            rotate: 'rotate(10deg) scale(0.8)',
            bounce: 'translateY(20px) scale(0.9)'
        };
        return transforms[animation] || 'translateY(30px)';
    }

    // Enhanced typing effect for hero tagline
    setupTypingEffect() {
        const tagline = document.querySelector('.hero-tagline');
        if (!tagline) return;

        const text = tagline.textContent;
        tagline.textContent = '';

        let index = 0;
        const typeSpeed = 50;

        const typeWriter = () => {
            if (index < text.length) {
                tagline.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                clearInterval(cursorBlink);
                tagline.style.borderRight = 'none';
            }
        };

        setTimeout(typeWriter, 2000); // Start after other animations
    }

    // Advanced scroll animations with Intersection Observer
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        // Counter animation for stats
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.stat-item h4').forEach(stat => {
            statsObserver.observe(stat);
        });

        // Reveal animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card, .skill-category, .contact-item').forEach(el => {
            revealObserver.observe(el);
        });
    }

    // Counter animation for statistics
    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const suffix = element.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    }

    // Enhanced parallax effects
    setupParallaxEffects() {
        let mouseX = 0, mouseY = 0;
        let targetX = 0, targetY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / window.innerWidth;
            mouseY = (e.clientY - window.innerHeight / 2) / window.innerHeight;
        });

        const animate = () => {
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            // Parallax for hero elements
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                heroImage.style.transform = `translate(${targetX * 10}px, ${targetY * 10}px)`;
            }

            // Parallax for floating elements
            document.querySelectorAll('.blob').forEach(blob => {
                blob.style.transform = `translate(${targetX * 20}px, ${targetY * 15}px) rotate(${targetX * 10}deg)`;
            });

            requestAnimationFrame(animate);
        };
        animate();
    }

    // Interactive element enhancements
    setupInteractiveElements() {
        // Enhanced button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-3px) scale(1.02)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            });

            btn.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });

        // Card tilt effect
        document.querySelectorAll('.project-card, .skill-category').forEach(card => {
            card.addEventListener('mousemove', this.handleCardTilt);
            card.addEventListener('mouseleave', this.resetCardTilt);
        });

        // Ripple effect for clickable elements
        document.querySelectorAll('.skill-tag, .btn, .social-link').forEach(el => {
            el.addEventListener('click', this.createRipple);
        });

        // Email copy functionality with enhanced feedback
        const emailLinks = document.querySelectorAll('[href*="mailto"], .info-detail span');
        emailLinks.forEach(link => {
            if (link.textContent.includes('@')) {
                link.addEventListener('click', this.handleEmailCopy);
                link.style.cursor = 'pointer';
            }
        });
    }

    handleCardTilt(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        this.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-5px) 
            scale(1.02)
        `;
    }

    resetCardTilt() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    }

    createRipple(e) {
        const ripple = document.createElement('div');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            pointer-events: none;
            z-index: 1;
        `;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    handleEmailCopy(e) {
        e.preventDefault();
        const email = this.textContent.includes('@') ? this.textContent : 'frontenddevmichael@gmail.com';

        navigator.clipboard.writeText(email).then(() => {
            this.showCopyFeedback('Email copied to clipboard!');
        }).catch(() => {
            this.showCopyFeedback('Please copy manually: ' + email);
        });
    }

    showCopyFeedback(message) {
        const feedback = document.createElement('div');
        feedback.className = 'copy-feedback';
        feedback.textContent = message;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--color-accent);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(feedback);

        requestAnimationFrame(() => {
            feedback.style.opacity = '1';
            feedback.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(() => feedback.remove(), 300);
        }, 2500);
    }

    // Enhanced navigation with active states
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');

        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active section highlighting
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-50px 0px -50px 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);

                if (entry.isIntersecting) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    // Enhanced contact form with validation
    setupContactForm() {
        const form = document.querySelector('.Contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('button[type="submit"]');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('focus', () => this.clearFieldError(input));
        });

        // Enhanced form submission
        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                message = isValid ? '' : 'Please enter a valid email address';
                break;
            case 'text':
                isValid = value.length >= 2;
                message = isValid ? '' : 'This field must be at least 2 characters long';
                break;
            default:
                isValid = value.length > 0;
                message = isValid ? '' : 'This field is required';
        }

        this.showFieldFeedback(field, isValid, message);
        return isValid;
    }

    showFieldFeedback(field, isValid, message) {
        // Remove existing feedback
        const existingFeedback = field.parentNode.querySelector('.field-feedback');
        if (existingFeedback) existingFeedback.remove();

        if (!isValid && message) {
            const feedback = document.createElement('div');
            feedback.className = 'field-feedback';
            feedback.textContent = message;
            feedback.style.cssText = `
                color: #ff6b6b;
                font-size: 12px;
                margin-top: 4px;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            field.parentNode.appendChild(feedback);
            requestAnimationFrame(() => feedback.style.opacity = '1');
        }

        field.style.borderColor = isValid ? '' : '#ff6b6b';
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const feedback = field.parentNode.querySelector('.field-feedback');
        if (feedback) {
            feedback.style.opacity = '0';
            setTimeout(() => feedback.remove(), 300);
        }
    }

    handleFormSubmit(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let allValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            this.showSuccessMessage('Thank you! Your message has been sent successfully.');
            form.reset();
        } else {
            this.showErrorMessage('Please correct the errors above before submitting.');
        }
    }

    showSuccessMessage(message) {
        this.showFormMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showFormMessage(message, 'error');
    }

    showFormMessage(message, type) {
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            background: ${type === 'success' ? 'var(--color-success)' : '#ff6b6b'};
            color: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

        document.body.appendChild(messageEl);

        requestAnimationFrame(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => messageEl.remove(), 300);
        }, 4000);
    }

    // Enhanced skill bar animations
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');

                    setTimeout(() => {
                        progressBar.style.width = width;
                        progressBar.style.background = `linear-gradient(90deg, var(--color-accent), rgba(7, 217, 7, 0.7))`;
                    }, index * 200);

                    observer.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5
        });

        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }

    setupSkillAnimations() {
        // Add hover effects to skill categories
        document.querySelectorAll('.skill-category').forEach(category => {
            const skillItems = category.querySelectorAll('.skill-item');

            category.addEventListener('mouseenter', () => {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(10px)';
                        item.style.transition = 'transform 0.3s ease';
                    }, index * 50);
                });
            });

            category.addEventListener('mouseleave', () => {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'translateX(0)';
                    }, index * 30);
                });
            });
        });
    }

    // Update footer time
    updateFooterTime() {
        const timeElement = document.getElementById('time');
        const yearElement = document.getElementById('year');

        if (timeElement) {
            const updateTime = () => {
                const now = new Date();
                const options = {
                    timeZone: 'Africa/Lagos',
                    hour12: true,
                    hour: 'numeric',
                    minute: '2-digit'
                };
                timeElement.textContent = `Lagos Time: ${now.toLocaleTimeString('en-US', options)}`;
            };

            updateTime();
            setInterval(updateTime, 1000);
        }

        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Scroll to top functionality
    setupScrollToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(10px)';
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Theme toggle (removed as requested)
    setupThemeToggle() {
        // Theme toggle functionality removed
    }
}

// Add additional CSS animations
const additionalStyles = `
    .reveal {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .nav-links a.active {
        color: var(--color-accent) !important;
        background: var(--bg-glass);
    }

    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .keyboard-nav *:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 2px;
    }

    .project-card {
        transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .skill-item {
        transition: all 0.3s ease;
    }

    .back-to-top {
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the portfolio animations
const portfolio = new PortfolioAnimations();

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioAnimations;
}