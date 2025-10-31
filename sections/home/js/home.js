// Home Manager for TresorLodge Landing Page
class HomeManager {
    constructor() {
        this.heroVideo = null;
        this.statsSection = null;
        this.testimonialSlider = null;
        this.currentTestimonial = 0;
        this.testimonials = [];
        
        this.init();
    }
    
    init() {
        this.initializeHero();
        this.initializeStats();
        this.initializeTestimonials();
        this.initializeScrollAnimations();
        this.initializeNavigation();
    }
    
    initializeHero() {
        this.heroVideo = document.querySelector('.hero-video');
        
        if (this.heroVideo) {
            // Ensure video plays automatically and loops
            this.heroVideo.muted = true;
            this.heroVideo.autoplay = true;
            this.heroVideo.loop = true;
            
            // Handle video loading
            this.heroVideo.addEventListener('loadeddata', () => {
                this.heroVideo.play().catch(console.error);
            });
            
            // Fallback for autoplay restrictions
            document.addEventListener('click', () => {
                if (this.heroVideo.paused) {
                    this.heroVideo.play().catch(console.error);
                }
            }, { once: true });
        }
        
        // Initialize hero CTAs
        this.initializeHeroCTAs();
    }
    
    initializeHeroCTAs() {
        const ctaButtons = document.querySelectorAll('.hero-btn');
        
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.smoothScrollTo(href);
                } else if (href) {
                    // Handle external navigation
                    window.location.href = href;
                }
            });
        });
    }
    
    initializeStats() {
        this.statsSection = document.querySelector('.stats-section');
        
        if (this.statsSection) {
            // Create intersection observer for stats animation
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(this.statsSection);
        }
    }
    
    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            const duration = 2000; // 2 seconds
            const increment = finalValue / (duration / 16); // 60fps
            let currentValue = 0;
            
            stat.textContent = '0';
            
            const timer = setInterval(() => {
                currentValue += increment;
                
                if (currentValue >= finalValue) {
                    stat.textContent = finalValue.toLocaleString();
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentValue).toLocaleString();
                }
            }, 16);
        });
    }
    
    initializeTestimonials() {
        this.testimonials = [
            {
                text: "TresorLodge exceeded all our expectations. The attention to detail, exceptional service, and breathtaking views made our anniversary unforgettable. We can't wait to return!",
                author: "Sarah & Michael Johnson",
                role: "Celebrating 10th Anniversary",
                avatar: "/images/testimonial1.jpg"
            },
            {
                text: "From the moment we arrived, we felt like royalty. The staff anticipated our every need, the amenities were world-class, and the cuisine was absolutely divine. Truly a five-star experience.",
                author: "Elena Rodriguez",
                role: "Business Executive",
                avatar: "/images/testimonial2.jpg"
            },
            {
                text: "Our family vacation at TresorLodge was magical. The kids loved the activities, we enjoyed the spa, and everyone appreciated the beautiful accommodations. Perfect for all ages!",
                author: "The Williams Family",
                role: "Family Vacation",
                avatar: "/images/testimonial3.jpg"
            }
        ];
        
        this.createTestimonialSlider();
        this.startTestimonialRotation();
    }
    
    createTestimonialSlider() {
        const testimonialContainer = document.querySelector('.testimonials-container');
        if (!testimonialContainer) return;
        
        // Create slider HTML
        const sliderHTML = `
            <div class="testimonial-slider">
                <div class="testimonial-track" id="testimonialTrack">
                    ${this.testimonials.map((testimonial, index) => `
                        <div class="testimonial-slide ${index === 0 ? 'active' : ''}">
                            <div class="testimonial-text">${testimonial.text}</div>
                            <div class="testimonial-author">
                                <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar" 
                                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzMzMzMzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgM2MxLjY2IDAgMyAxLjM0IDMgM3MtMS4zNCAzLTMgMy0zLTEuMzQtMy0zIDEuMzQtMyAzLTN6bTAgMTQuMmMtMi41IDAtNC43MS0xLjI4LTYtMy4yMi4wMy0xLjk5IDQtMy4wOCA2LTMuMDhzNS45NyAxLjA5IDYgMy4wOGMtMS4yOSAxLjk0LTMuNSAzLjIyLTYgMy4yMnoiLz4KPHN2Zz4K'">
                                <div class="author-info">
                                    <h4>${testimonial.author}</h4>
                                    <p>${testimonial.role}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="testimonial-controls">
                <button class="testimonial-prev" aria-label="Previous testimonial">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                    </svg>
                </button>
                <div class="testimonial-dots">
                    ${this.testimonials.map((_, index) => `
                        <button class="testimonial-dot ${index === 0 ? 'active' : ''}" data-index="${index}"></button>
                    `).join('')}
                </div>
                <button class="testimonial-next" aria-label="Next testimonial">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                </button>
            </div>
        `;
        
        testimonialContainer.innerHTML = sliderHTML;
        
        // Add controls event listeners
        this.bindTestimonialControls();
        
        // Add CSS for testimonial slider
        this.addTestimonialStyles();
    }
    
    addTestimonialStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .testimonial-track {
                display: flex;
                transition: transform 0.5s ease-in-out;
            }
            
            .testimonial-slide {
                min-width: 100%;
                opacity: 0;
                transition: opacity 0.5s ease-in-out;
            }
            
            .testimonial-slide.active {
                opacity: 1;
            }
            
            .testimonial-controls {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: var(--space-lg);
                margin-top: var(--space-xl);
            }
            
            .testimonial-prev,
            .testimonial-next {
                background: var(--background-white);
                border: 2px solid var(--border-light);
                border-radius: var(--border-radius-full);
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: var(--transition);
                color: var(--text-medium);
            }
            
            .testimonial-prev:hover,
            .testimonial-next:hover {
                border-color: var(--secondary-color);
                color: var(--secondary-color);
                transform: scale(1.1);
            }
            
            .testimonial-dots {
                display: flex;
                gap: var(--space-sm);
            }
            
            .testimonial-dot {
                width: 12px;
                height: 12px;
                border-radius: var(--border-radius-full);
                border: none;
                background: var(--border-light);
                cursor: pointer;
                transition: var(--transition-fast);
            }
            
            .testimonial-dot.active {
                background: var(--secondary-color);
            }
            
            .testimonial-dot:hover {
                background: var(--quaternary-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    bindTestimonialControls() {
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousTestimonial());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextTestimonial());
        }
        
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.goToTestimonial(index);
            });
        });
    }
    
    startTestimonialRotation() {
        // Auto-rotate testimonials every 6 seconds
        setInterval(() => {
            this.nextTestimonial();
        }, 6000);
    }
    
    nextTestimonial() {
        this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
        this.updateTestimonialDisplay();
    }
    
    previousTestimonial() {
        this.currentTestimonial = this.currentTestimonial === 0 ? 
            this.testimonials.length - 1 : this.currentTestimonial - 1;
        this.updateTestimonialDisplay();
    }
    
    goToTestimonial(index) {
        this.currentTestimonial = index;
        this.updateTestimonialDisplay();
    }
    
    updateTestimonialDisplay() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.testimonial-dot');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentTestimonial);
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentTestimonial);
        });
    }
    
    initializeScrollAnimations() {
        // Create intersection observer for fade-in animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .welcome-section .container,
            .services-section .container,
            .service-card,
            .testimonials-section .container,
            .cta-section .container
        `);
        
        animatedElements.forEach(el => observer.observe(el));
    }
    
    initializeNavigation() {
        // Handle smooth scrolling for internal links
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        
        internalLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                this.smoothScrollTo(target);
            });
        });
        
        // Handle CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-btn');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const href = btn.getAttribute('href');
                
                if (href && !href.startsWith('#')) {
                    // External navigation - handle in router if SPA, or allow default
                    console.log(`Navigating to: ${href}`);
                }
            });
        });
    }
    
    smoothScrollTo(target) {
        const element = document.querySelector(target);
        
        if (element) {
            const headerHeight = document.querySelector('.navbar')?.offsetHeight || 80;
            const targetPosition = element.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Service interaction manager
class ServiceManager {
    constructor() {
        this.serviceCards = document.querySelectorAll('.service-card');
        this.init();
    }
    
    init() {
        this.bindServiceInteractions();
    }
    
    bindServiceInteractions() {
        this.serviceCards.forEach(card => {
            const serviceLink = card.querySelector('.service-link');
            
            if (serviceLink) {
                serviceLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const service = this.getServiceFromCard(card);
                    this.handleServiceClick(service);
                });
            }
            
            // Add hover effects
            card.addEventListener('mouseenter', () => this.onServiceHover(card));
            card.addEventListener('mouseleave', () => this.onServiceLeave(card));
        });
    }
    
    getServiceFromCard(card) {
        const title = card.querySelector('h3')?.textContent;
        const description = card.querySelector('p')?.textContent;
        
        return { title, description };
    }
    
    handleServiceClick(service) {
        // Route to appropriate service page or show modal
        console.log(`Exploring service: ${service.title}`);
        
        // In a real application, this would handle routing
        switch (service.title?.toLowerCase()) {
            case 'luxury accommodations':
                window.location.href = 'sections/rooms/rooms.html';
                break;
            case 'fine dining':
                window.location.href = 'sections/restaurant/restaurant.html';
                break;
            case 'spa & wellness':
                // Could open spa page or contact form
                this.showComingSoonModal('Spa & Wellness');
                break;
            case 'concierge services':
                window.location.href = 'sections/contact/contact.html';
                break;
            default:
                this.showComingSoonModal(service.title);
        }
    }
    
    onServiceHover(card) {
        // Add dynamic hover effects
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }
    
    onServiceLeave(card) {
        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.transform = '';
        }
    }
    
    showComingSoonModal(serviceName) {
        const modal = document.createElement('div');
        modal.className = 'service-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--background-white);
                padding: var(--space-3xl);
                border-radius: var(--border-radius-lg);
                text-align: center;
                max-width: 400px;
                width: 90%;
                box-shadow: var(--shadow-lg);
            ">
                <h3 style="color: var(--text-dark); margin-bottom: var(--space-lg);">${serviceName}</h3>
                <p style="color: var(--text-medium); margin-bottom: var(--space-xl);">
                    This service page is coming soon! Please contact us for more information.
                </p>
                <button onclick="this.closest('.service-modal').remove()" style="
                    background: var(--secondary-color);
                    color: var(--text-white);
                    border: none;
                    padding: var(--space-md) var(--space-xl);
                    border-radius: var(--border-radius);
                    cursor: pointer;
                    font-weight: 600;
                ">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on click outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// Performance optimization utilities
const HomeUtils = {
    // Lazy load images
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    },
    
    // Preload critical resources
    preloadResources() {
        const criticalResources = [
            'sections/shared/css/styles.css',
            'sections/home/videos/tours.mp4'
        ];
        
        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'video';
            document.head.appendChild(link);
        });
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomeManager();
    new ServiceManager();
    HomeUtils.lazyLoadImages();
    HomeUtils.preloadResources();
});

export default HomeManager;