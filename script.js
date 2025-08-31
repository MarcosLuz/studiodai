/**
 * ESTÚDIO AMETISTA - SOPHISTICATED INTERACTIONS
 * Modern, elegant JavaScript for premium user experience
 */

class EstudioAmetista {
    constructor() {
        this.init();
    }

    init() {
        this.setupLoadingScreen();
        this.setupCustomCursor();
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupTypewriter();
        this.setupCounters();
        this.setupParallax();
        this.setupRippleEffects();
        this.setupFormHandling();
        this.setupScheduleFilters();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.initializeAll();
    }

    // ================================================================
    // LOADING SCREEN
    // ================================================================
    setupLoadingScreen() {
        const loader = document.getElementById('loader');
        const progressBar = document.querySelector('.progress-bar');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    document.body.style.overflow = 'visible';
                    this.startHeroAnimations();
                }, 500);
            }
        }, 100);

        // Ensure loading finishes after maximum time
        setTimeout(() => {
            if (!loader.classList.contains('fade-out')) {
                loader.classList.add('fade-out');
                document.body.style.overflow = 'visible';
                this.startHeroAnimations();
            }
        }, 4000);
    }

    startHeroAnimations() {
        // Trigger typewriter effect after loading
        const typewriter = document.querySelector('.typewriter');
        if (typewriter) {
            const text = typewriter.getAttribute('data-text');
            typewriter.textContent = '';
            this.typeWriter(typewriter, text, 0);
        }
    }

    // ================================================================
    // CUSTOM CURSOR
    // ================================================================
    setupCustomCursor() {
        const cursor = document.getElementById('cursor');
        const cursorDot = cursor.querySelector('.cursor-dot');
        const cursorOutline = cursor.querySelector('.cursor-outline');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;

        // Only show custom cursor on desktop
        if (window.innerWidth > 768) {
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            // Smooth cursor movement
            const animateCursor = () => {
                cursorX += (mouseX - cursorX) * 0.15;
                cursorY += (mouseY - cursorY) * 0.15;
                
                cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
                requestAnimationFrame(animateCursor);
            };
            animateCursor();

            // Cursor hover effects
            const hoverElements = document.querySelectorAll('a, button, [data-ripple], .service-card');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
                el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
            });
        } else {
            cursor.style.display = 'none';
        }
    }

    // ================================================================
    // NAVIGATION
    // ================================================================
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Add/remove scrolled class
            if (scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
        });

        // Active navigation highlighting
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observerOptions = {
            rootMargin: '-50% 0px -50% 0px'
        };

        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => navObserver.observe(section));
    }

    // ================================================================
    // SCROLL ANIMATIONS
    // ================================================================
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });

        // Add animation classes to elements
        document.querySelectorAll('.service-card').forEach(card => {
            card.classList.add('fade-in');
        });

        document.querySelectorAll('.schedule-day').forEach(day => {
            day.classList.add('fade-in');
        });

        document.querySelectorAll('.contact-item').forEach(item => {
            item.classList.add('fade-in-left');
        });
    }

    // ================================================================
    // TYPEWRITER EFFECT
    // ================================================================
    typeWriter(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => this.typeWriter(element, text, index + 1), 100);
        }
    }

    // ================================================================
    // COUNTER ANIMATIONS
    // ================================================================
    setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += step;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // ================================================================
    // PARALLAX EFFECTS
    // ================================================================
    setupParallax() {
        const parallaxElements = document.querySelectorAll('.about-image, .floating-element');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            parallaxElements.forEach(element => {
                if (element.classList.contains('about-image')) {
                    element.style.transform = `translateY(${parallax * 0.3}px)`;
                } else if (element.classList.contains('floating-element')) {
                    element.style.transform = `translateY(${parallax * 0.2}px)`;
                }
            });
        });
    }

    // ================================================================
    // RIPPLE EFFECTS
    // ================================================================
    setupRippleEffects() {
        const rippleElements = document.querySelectorAll('[data-ripple]');

        rippleElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                element.appendChild(ripple);

                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ================================================================
    // FORM HANDLING
    // ================================================================
    setupFormHandling() {
        const form = document.getElementById('contact-form');
        const submitBtn = form.querySelector('.btn-submit');
        const inputs = form.querySelectorAll('input, select, textarea');

        // Floating label animation
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Check if input has value on load
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });

        // Form submission
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 500;
            `;
            successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';

            form.appendChild(successMessage);
            form.reset();

            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // ================================================================
    // SCHEDULE FILTERS
    // ================================================================
    setupScheduleFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const classItems = document.querySelectorAll('.class-item');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter classes
                classItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'flex';
                        item.style.animation = 'fade-in-up 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ================================================================
    // MOBILE MENU
    // ================================================================
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ================================================================
    // SMOOTH SCROLL
    // ================================================================
    setupSmoothScroll() {
        const scrollLinks = document.querySelectorAll('a[href^="#"]');

        scrollLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ================================================================
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Throttle scroll events
        let ticking = false;
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-dependent functions here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll, { passive: true });
    }

    // ================================================================
    // ACCESSIBILITY ENHANCEMENTS
    // ================================================================
    setupAccessibility() {
        // Skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            border-radius: 4px;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // ================================================================
    // NEW SECTIONS ANIMATIONS
    // ================================================================
    setupNewSectionAnimations() {
        // Add animation classes to new elements
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.classList.add('fade-in');
        });

        document.querySelectorAll('.feature-item').forEach(item => {
            item.classList.add('fade-in-left');
        });

        document.querySelectorAll('.highlight-img').forEach(img => {
            img.classList.add('fade-in-right');
        });

        document.querySelectorAll('.info-card').forEach(card => {
            card.classList.add('fade-in');
        });

        document.querySelectorAll('.benefit-category').forEach(category => {
            category.classList.add('fade-in');
        });

        document.querySelectorAll('.badge-item').forEach(badge => {
            badge.classList.add('fade-in');
        });
    }

    // ================================================================
    // IMAGE ERROR HANDLING
    // ================================================================
    setupImageErrorHandling() {
        // Handle image load errors gracefully
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                console.warn('Failed to load image:', this.src);
                // Optionally add a fallback or placeholder
                this.style.opacity = '0.5';
            });
        });

        // Handle iframe load errors
        document.querySelectorAll('iframe').forEach(iframe => {
            iframe.addEventListener('error', function() {
                console.warn('Failed to load iframe:', this.src);
            });
        });
    }

    // ================================================================
    // INITIALIZE ALL
    // ================================================================
    initializeAll() {
        // Set initial loading state
        document.body.style.overflow = 'hidden';
        
        // Setup performance optimizations
        this.optimizePerformance();
        
        // Setup accessibility
        this.setupAccessibility();
        
        // Setup image error handling  
        this.setupImageErrorHandling();
        
        // Add fade-in animations to new sections
        this.setupNewSectionAnimations();

        // Add loaded class to body after everything is set up
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });

        // Handle resize events
        window.addEventListener('resize', this.debounce(() => {
            // Recalculate positions for parallax and other elements
            this.handleResize();
        }, 250));

        console.log('🔮 Estúdio Ametista website initialized successfully');
    }

    // ================================================================
    // UTILITY FUNCTIONS
    // ================================================================
    debounce(func, wait) {
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

    handleResize() {
        // Responsive handling
        if (window.innerWidth <= 768) {
            document.getElementById('cursor').style.display = 'none';
        } else {
            document.getElementById('cursor').style.display = 'block';
        }
    }

    // ================================================================
    // SERVICE MODAL (BONUS FEATURE)
    // ================================================================
    setupServiceModals() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const serviceBtn = card.querySelector('.service-cta');
            serviceBtn.addEventListener('click', () => {
                const serviceType = card.getAttribute('data-service');
                this.openServiceModal(serviceType);
            });
        });
    }

    openServiceModal(serviceType) {
        const modalContent = {
            'yoga-1': {
                title: 'Yoga Nível I',
                description: 'Nossa introdução ao Hatha Yoga é perfeita para iniciantes. Focamos em posturas básicas, técnicas de respiração e relaxamento profundo.',
                benefits: ['Melhora da flexibilidade', 'Redução do estresse', 'Fortalecimento muscular', 'Melhora do sono'],
                duration: '60 minutos',
                level: 'Iniciante'
            },
            'yoga-2': {
                title: 'Yoga Nível II',
                description: 'Para praticantes com experiência, oferecemos posturas mais desafiadoras e técnicas avançadas de meditação.',
                benefits: ['Posturas avançadas', 'Meditação profunda', 'Controle respiratório', 'Equilíbrio mental'],
                duration: '75 minutos',
                level: 'Intermediário/Avançado'
            },
            'pilates-tradicional': {
                title: 'Pilates Tradicional',
                description: 'Exercícios precisos e controlados que fortalecem o core e melhoram a postura corporal.',
                benefits: ['Fortalecimento do core', 'Melhora da postura', 'Flexibilidade', 'Consciência corporal'],
                duration: '50 minutos',
                level: 'Todos os níveis'
            },
            'pilates-suspenso': {
                title: 'Pilates Suspenso',
                description: 'Inovação no Pilates com exercícios suspensos que desafiam o equilíbrio e trabalham músculos estabilizadores.',
                benefits: ['Equilíbrio avançado', 'Força funcional', 'Coordenação', 'Músculos estabilizadores'],
                duration: '50 minutos',
                level: 'Intermediário'
            }
        };

        const modal = this.createModal(modalContent[serviceType]);
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('show'), 10);
    }

    createModal(content) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <h3>${content.title}</h3>
                    <p class="modal-description">${content.description}</p>
                    <div class="modal-info">
                        <div class="info-item">
                            <strong>Duração:</strong> ${content.duration}
                        </div>
                        <div class="info-item">
                            <strong>Nível:</strong> ${content.level}
                        </div>
                    </div>
                    <div class="modal-benefits">
                        <h4>Benefícios:</h4>
                        <ul>
                            ${content.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <a href="https://wa.me/5547997440932?text=Olá! Gostaria de saber mais sobre ${content.title}" 
                           class="btn-primary" target="_blank">
                            Agendar Aula Experimental
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10001;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeModal(modal);
        });

        return modal;
    }

    closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// ================================================================
// ADDITIONAL CSS FOR MODAL (Injected via JavaScript)
// ================================================================
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .service-modal.show {
        opacity: 1 !important;
        visibility: visible !important;
    }
    
    .modal-overlay {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        padding: 3rem;
        max-width: 500px;
        width: 100%;
        position: relative;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    }
    
    .service-modal.show .modal-content {
        transform: scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }
    
    .modal-close:hover {
        background: #f0f0f0;
        color: #000;
    }
    
    .modal-content h3 {
        font-family: var(--font-primary);
        font-size: 2rem;
        margin-bottom: 1rem;
        color: var(--primary-black);
    }
    
    .modal-description {
        color: var(--medium-gray);
        line-height: 1.6;
        margin-bottom: 2rem;
    }
    
    .modal-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 2rem;
        padding: 1rem;
        background: var(--soft-gray);
        border-radius: 8px;
    }
    
    .info-item strong {
        color: var(--accent-purple);
    }
    
    .modal-benefits h4 {
        color: var(--primary-black);
        margin-bottom: 1rem;
    }
    
    .modal-benefits ul {
        list-style: none;
        padding: 0;
    }
    
    .modal-benefits li {
        padding: 0.5rem 0;
        position: relative;
        padding-left: 1.5rem;
    }
    
    .modal-benefits li:before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-purple);
        font-weight: bold;
    }
    
    .modal-actions {
        margin-top: 2rem;
        text-align: center;
    }
`;
document.head.appendChild(modalStyles);

// ================================================================
// INITIALIZE WHEN DOM IS READY
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
    new EstudioAmetista();
});

// ================================================================
// ENHANCED PERFORMANCE MONITORING
// ================================================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`🚀 Estúdio Ametista loaded in ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
    });
}