// TresorLodge - Enhanced JavaScript for GitHub Hosting
// Version: 2.0 - Optimized for all devices and orientations

'use strict';

// Performance optimization
const TresorLodge = {
    // Debounce function for performance
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Safe DOM element selection
    $: function(selector) {
        return document.querySelector(selector);
    },

    $$: function(selector) {
        return document.querySelectorAll(selector);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    
    // Loading Screen with error handling
    const loadingOverlay = TresorLodge.$('#loadingOverlay') || TresorLodge.$('.loader');
    if (loadingOverlay) {
        const hideLoader = () => {
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingOverlay.remove(); // Clean up DOM
            }, 500);
        };
        
        // Hide loader after content loads or timeout
        if (document.readyState === 'complete') {
            setTimeout(hideLoader, 500);
        } else {
            window.addEventListener('load', hideLoader);
            // Fallback timeout
            setTimeout(hideLoader, 3000);
        }
    }

    // Enhanced Mobile Menu Toggle
    const mobileMenuBtn = TresorLodge.$('#mobileMenuBtn');
    const mobileMenu = TresorLodge.$('#mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Improved click handler
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active', !isActive);
            mobileMenuBtn.classList.toggle('active', !isActive);
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'auto' : 'hidden';
            
            // Accessibility
            mobileMenuBtn.setAttribute('aria-expanded', !isActive);
            mobileMenu.setAttribute('aria-hidden', isActive);
        });
        
        // Close mobile menu on link click
        const mobileLinks = TresorLodge.$$('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                mobileMenuBtn.focus(); // Return focus
            }
        });
    }

    // Enhanced Navbar Scroll Effect with performance optimization
    const navbar = TresorLodge.$('#mainNav');
    if (navbar) {
        let lastScrollTop = 0;
        let ticking = false;
        
        const updateNavbar = TresorLodge.throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class for styling
            navbar.classList.toggle('scrolled', scrollTop > 100);
            
            // Optional: Hide/show navbar on scroll direction
            if (Math.abs(lastScrollTop - scrollTop) > 5) {
                if (scrollTop > lastScrollTop && scrollTop > 200) {
                    navbar.classList.add('navbar-hidden');
                } else {
                    navbar.classList.remove('navbar-hidden');
                }
                lastScrollTop = scrollTop;
            }
        }, 100);
        
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Room Video Hover Effects
    const roomVideos = document.querySelectorAll('.room-video');
    roomVideos.forEach(video => {
        const card = video.closest('.room-card-modern');
        
        if (card) {
            card.addEventListener('mouseenter', function() {
                video.play().catch(e => console.log('Video play failed:', e));
            });
            
            card.addEventListener('mouseleave', function() {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Video Indicators Click
    const videoIndicators = document.querySelectorAll('.video-indicator');
    videoIndicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const video = this.closest('.room-media').querySelector('.room-video');
            if (video) {
                if (video.paused) {
                    video.play().catch(e => console.log('Video play failed:', e));
                    this.style.background = '#d4af37';
                } else {
                    video.pause();
                    video.currentTime = 0;
                    this.style.background = 'rgba(0, 0, 0, 0.7)';
                }
            }
        });
    });

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Current Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Simple Animation on Scroll (replaces AOS)
    const animateElements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    if (animateElements.length > 0) {
        window.addEventListener('scroll', checkScroll);
        checkScroll(); // Check on load
    }

    // Hero Video Autoplay
    const heroVideo = document.getElementById('heroVideo');
    if (heroVideo) {
        heroVideo.play().catch(e => console.log('Hero video autoplay failed:', e));
    }

    // Form Validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#dc2626';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    });

    // Simple Image Lazy Loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Contact Form Handling (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple success message
            alert('Merci pour votre message ! Nous vous répondrons bientôt.');
            this.reset();
        });
    }

    console.log('TresorLodge website loaded successfully!');

    // Add simple animation CSS class
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        [data-aos].animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos="fade-right"] {
            transform: translateX(-30px);
        }
        
        [data-aos="fade-left"] {
            transform: translateX(30px);
        }
        
        [data-aos="zoom-in"] {
            transform: scale(0.9);
        }
        
        [data-aos="fade-right"].animate,
        [data-aos="fade-left"].animate,
        [data-aos="zoom-in"].animate {
            transform: translateX(0) scale(1);
        }
        
        .navbar-modern.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        img.lazy.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Restaurant Menu Tabs Functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length > 0 && menuCategories.length > 0) {
        // Set first tab and category as active by default
        if (menuTabs[0] && menuCategories[0]) {
            menuTabs[0].classList.add('active');
            menuCategories[0].classList.add('active');
        }
        
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetCategory = this.getAttribute('data-category');
                
                // Remove active class from all tabs
                menuTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all categories
                menuCategories.forEach(category => {
                    category.classList.remove('active');
                });
                
                // Show target category
                const targetElement = document.getElementById(targetCategory);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
                
                // Smooth scroll to menu section
                const menuSection = document.querySelector('.menu-modern');
                if (menuSection) {
                    menuSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Restaurant Gallery Functionality
    const galleryMain = document.querySelector('.gallery-main img');
    const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
    
    if (galleryMain && galleryThumbs.length > 0) {
        galleryThumbs.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const newSrc = this.src;
                galleryMain.src = newSrc;
                
                // Add click animation
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    }

    // Enhanced Date Input Handling for Booking Forms
    const setupDateInputs = () => {
        const dateInputs = TresorLodge.$$('input[type="date"]');
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        
        dateInputs.forEach((input, index) => {
            input.setAttribute('min', todayString);
            
            // Auto-update departure date when arrival changes
            if (index === 0 && dateInputs[1]) {
                input.addEventListener('change', function() {
                    const arrivalDate = new Date(this.value);
                    if (!isNaN(arrivalDate.getTime())) {
                        arrivalDate.setDate(arrivalDate.getDate() + 1);
                        const nextDay = arrivalDate.toISOString().split('T')[0];
                        dateInputs[1].setAttribute('min', nextDay);
                        
                        // Update departure if it's before the new minimum
                        if (dateInputs[1].value && dateInputs[1].value <= this.value) {
                            dateInputs[1].value = nextDay;
                        }
                    }
                });
            }
        });
    };
    
    setupDateInputs();

    // Enhanced Form Handling with Validation
    const setupFormHandling = () => {
        const forms = TresorLodge.$$('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    field.classList.remove('error');
                    if (!field.value.trim()) {
                        field.classList.add('error');
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    // Show success message
                    const submitBtn = form.querySelector('button[type="submit"]');
                    const originalText = submitBtn.textContent;
                    
                    submitBtn.textContent = 'Envoyé ✓';
                    submitBtn.disabled = true;
                    
                    // Reset form after 2 seconds
                    setTimeout(() => {
                        form.reset();
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }, 2000);
                } else {
                    // Show error message
                    const firstErrorField = form.querySelector('.error');
                    if (firstErrorField) {
                        firstErrorField.focus();
                        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    };
    
    setupFormHandling();

    // Video Handling with Performance Optimization
    const setupVideoHandling = () => {
        const videos = TresorLodge.$$('video');
        
        videos.forEach(video => {
            // Preload metadata for better performance
            video.preload = 'metadata';
            
            // Handle video loading errors gracefully
            video.addEventListener('error', function() {
                console.log('Video loading failed, hiding video element');
                this.style.display = 'none';
                
                // Show fallback image if available
                const fallbackImg = this.parentElement.querySelector('img');
                if (fallbackImg) {
                    fallbackImg.style.display = 'block';
                }
            });
            
            // Pause video when out of viewport for performance
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            if (video.paused) video.play().catch(() => {});
                        } else {
                            video.pause();
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(video);
            }
        });
    };
    
    setupVideoHandling();

    // Current Year Update
    const updateCurrentYear = () => {
        const yearElements = TresorLodge.$$('#currentYear, .current-year');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    };
    
    updateCurrentYear();

    // Enhanced Smooth Scrolling with error handling
    const setupSmoothScrolling = () => {
        const anchors = TresorLodge.$$('a[href^="#"]');
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = TresorLodge.$(href);
                
                if (target) {
                    const navbar = TresorLodge.$('#mainNav');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    setupSmoothScrolling();
});

// Handle window resize events
window.addEventListener('resize', TresorLodge.debounce(function() {
    // Recalculate any size-dependent layouts
    const mobileMenu = TresorLodge.$('#mobileMenu');
    if (mobileMenu && window.innerWidth > 768) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}, 250));

// Handle orientation change for mobile devices
window.addEventListener('orientationchange', function() {
    // Small delay to allow for orientation change to complete
    setTimeout(() => {
        // Force a repaint/reflow to handle iOS Safari viewport issues
        document.body.style.height = '100.1%';
        setTimeout(() => {
            document.body.style.height = '';
        }, 500);
    }, 100);
});

// Error handling for production
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // In production, you could send this to an analytics service
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart + 'ms');
            }
        }, 0);
    });
}

// Expose TresorLodge object globally for debugging in development
if (typeof window !== 'undefined') {
    window.TresorLodge = TresorLodge;
}