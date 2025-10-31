// Restaurant Section JavaScript
// Import shared functionality
import '../shared/js/scripts.js';

// Restaurant-specific functionality
class RestaurantManager {
    constructor() {
        this.currentCategory = 'entrees';
        this.init();
    }

    init() {
        this.setupMenuTabs();
        this.setupGallery();
        this.setupReservationForm();
        this.setupMenuAnimations();
    }

    setupMenuTabs() {
        const menuTabs = document.querySelectorAll('.menu-tab');
        const menuCategories = document.querySelectorAll('.menu-category');
        
        if (menuTabs.length > 0 && menuCategories.length > 0) {
            // Set first tab and category as active by default
            if (menuTabs[0] && menuCategories[0]) {
                menuTabs[0].classList.add('active');
                menuCategories[0].classList.add('active');
            }
            
            menuTabs.forEach(tab => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.switchMenuCategory(tab, menuTabs, menuCategories);
                });
            });
        }
    }

    switchMenuCategory(clickedTab, allTabs, allCategories) {
        const targetCategory = clickedTab.getAttribute('data-category');
        
        // Remove active class from all tabs
        allTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked tab
        clickedTab.classList.add('active');
        
        // Hide all categories with fade out
        allCategories.forEach(category => {
            category.style.opacity = '0';
            setTimeout(() => {
                category.classList.remove('active');
            }, 200);
        });
        
        // Show target category with fade in
        const targetElement = document.getElementById(targetCategory);
        if (targetElement) {
            setTimeout(() => {
                targetElement.classList.add('active');
                setTimeout(() => {
                    targetElement.style.opacity = '1';
                }, 50);
            }, 200);
        }
        
        // Update current category
        this.currentCategory = targetCategory;
        
        // Scroll to menu section smoothly
        const menuSection = document.querySelector('.menu-modern');
        if (menuSection) {
            menuSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    setupGallery() {
        const galleryMain = document.querySelector('.gallery-main img');
        const galleryThumbs = document.querySelectorAll('.gallery-thumbs img');
        
        if (galleryMain && galleryThumbs.length > 0) {
            galleryThumbs.forEach((thumb, index) => {
                thumb.addEventListener('click', () => {
                    this.switchGalleryImage(thumb, galleryMain, galleryThumbs);
                });
                
                // Add keyboard navigation
                thumb.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.switchGalleryImage(thumb, galleryMain, galleryThumbs);
                    }
                });
                
                // Make thumbnails focusable
                thumb.setAttribute('tabindex', '0');
            });
        }
    }

    switchGalleryImage(clickedThumb, mainImage, allThumbs) {
        const newSrc = clickedThumb.src;
        const newAlt = clickedThumb.alt;
        
        // Fade out main image
        mainImage.style.opacity = '0.5';
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.alt = newAlt;
            mainImage.style.opacity = '1';
        }, 150);
        
        // Update thumbnail states
        allThumbs.forEach(thumb => thumb.classList.remove('active'));
        clickedThumb.classList.add('active');
        
        // Add click animation
        clickedThumb.style.transform = 'scale(0.9)';
        setTimeout(() => {
            clickedThumb.style.transform = 'scale(1.05)';
            setTimeout(() => {
                clickedThumb.style.transform = 'scale(1)';
            }, 150);
        }, 100);
    }

    setupReservationForm() {
        const reservationForms = document.querySelectorAll('.reservation-form form');
        
        reservationForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleReservationSubmit(form);
            });
        });
    }

    handleReservationSubmit(form) {
        const formData = new FormData(form);
        const reservationData = Object.fromEntries(formData);
        
        // Validate reservation data
        if (!this.validateReservation(reservationData)) {
            return;
        }
        
        // Show confirmation
        this.showReservationConfirmation(reservationData);
        
        // Reset form
        form.reset();
    }

    validateReservation(data) {
        if (!data.date) {
            this.showMessage('Veuillez sélectionner une date.', 'error');
            return false;
        }
        
        if (!data.time) {
            this.showMessage('Veuillez sélectionner une heure.', 'error');
            return false;
        }
        
        if (!data.guests || data.guests < 1) {
            this.showMessage('Veuillez indiquer le nombre d\'invités.', 'error');
            return false;
        }
        
        // Check if date is in the future
        const reservationDate = new Date(data.date + 'T' + data.time);
        const now = new Date();
        
        if (reservationDate <= now) {
            this.showMessage('La réservation doit être pour une date future.', 'error');
            return false;
        }
        
        return true;
    }

    showReservationConfirmation(data) {
        const formatDate = new Date(data.date).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const message = `
            Demande de réservation reçue!
            
            Date: ${formatDate}
            Heure: ${data.time}
            Nombre d'invités: ${data.guests}
            ${data.name ? 'Nom: ' + data.name : ''}
            ${data.phone ? 'Téléphone: ' + data.phone : ''}
            
            Nous vous contacterons bientôt pour confirmer votre réservation.
        `;
        
        this.showMessage(message, 'success');
    }

    setupMenuAnimations() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        // Intersection Observer for menu items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }

    showMessage(message, type = 'info') {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: var(--space-lg);
            background: ${type === 'error' ? 'var(--bg-error)' : 'var(--bg-success)'};
            color: ${type === 'error' ? 'var(--color-error)' : 'var(--color-success)'};
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 300px;
            white-space: pre-line;
            font-weight: 500;
        `;
        messageEl.textContent = message;
        
        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 5px;
            right: 10px;
            background: none;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: inherit;
        `;
        closeBtn.onclick = () => messageEl.remove();
        
        messageEl.appendChild(closeBtn);
        document.body.appendChild(messageEl);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
}

// Initialize restaurant manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RestaurantManager();
});

// Export for potential use in other modules
export default RestaurantManager;