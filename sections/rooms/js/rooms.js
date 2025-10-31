// Rooms Section JavaScript
// Import shared functionality
import '../shared/js/scripts.js';

// Room-specific functionality
class RoomManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupVideoHandlers();
        this.setupBookingForm();
        this.setupRoomCards();
        this.setupDateInputs();
    }

    setupVideoHandlers() {
        const roomVideos = document.querySelectorAll('.room-video');
        const videoIndicators = document.querySelectorAll('.video-indicator');

        // Video hover effects
        roomVideos.forEach(video => {
            const card = video.closest('.room-card-modern');
            
            if (card) {
                card.addEventListener('mouseenter', () => {
                    video.play().catch(e => console.log('Video play failed:', e));
                });
                
                card.addEventListener('mouseleave', () => {
                    video.pause();
                    video.currentTime = 0;
                });
            }
        });

        // Video indicator clicks
        videoIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const video = this.closest('.room-media').querySelector('.room-video');
                if (video) {
                    if (video.paused) {
                        video.play().catch(e => console.log('Video play failed:', e));
                        this.style.background = 'var(--secondary-color)';
                    } else {
                        video.pause();
                        video.currentTime = 0;
                        this.style.background = 'var(--background-overlay)';
                    }
                }
            });
        });
    }

    setupBookingForm() {
        const bookingForms = document.querySelectorAll('.booking-form form');
        
        bookingForms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleBookingSubmit(form);
            });
        });
    }

    handleBookingSubmit(form) {
        const formData = new FormData(form);
        const bookingData = Object.fromEntries(formData);
        
        // Validate dates
        const checkinDate = new Date(bookingData.checkin);
        const checkoutDate = new Date(bookingData.checkout);
        const today = new Date();
        
        if (checkinDate < today) {
            this.showMessage('La date d\'arrivée ne peut pas être dans le passé.', 'error');
            return;
        }
        
        if (checkoutDate <= checkinDate) {
            this.showMessage('La date de départ doit être après la date d\'arrivée.', 'error');
            return;
        }
        
        // Calculate nights
        const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
        
        // Show booking confirmation
        this.showBookingConfirmation(bookingData, nights);
    }

    showBookingConfirmation(data, nights) {
        const message = `
            Demande de réservation reçue!
            
            Chambre: ${data.room || 'Non spécifiée'}
            Arrivée: ${data.checkin}
            Départ: ${data.checkout}
            Nombre de nuits: ${nights}
            Invités: ${data.guests || 1}
            
            Nous vous contacterons bientôt pour confirmer votre réservation.
        `;
        
        this.showMessage(message, 'success');
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
        `;
        messageEl.textContent = message;
        
        document.body.appendChild(messageEl);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }

    setupRoomCards() {
        const roomCards = document.querySelectorAll('.room-card-modern');
        
        // Add intersection observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        roomCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    setupDateInputs() {
        const dateInputs = document.querySelectorAll('input[type="date"]');
        const today = new Date().toISOString().split('T')[0];
        
        dateInputs.forEach((input, index) => {
            input.setAttribute('min', today);
            
            // Auto-update departure date when arrival changes
            if (index % 2 === 0 && dateInputs[index + 1]) {
                input.addEventListener('change', function() {
                    const arrivalDate = new Date(this.value);
                    if (!isNaN(arrivalDate.getTime())) {
                        arrivalDate.setDate(arrivalDate.getDate() + 1);
                        const nextDay = arrivalDate.toISOString().split('T')[0];
                        dateInputs[index + 1].setAttribute('min', nextDay);
                        
                        // Update departure if it's before the new minimum
                        if (dateInputs[index + 1].value && dateInputs[index + 1].value <= this.value) {
                            dateInputs[index + 1].value = nextDay;
                        }
                    }
                });
            }
        });
    }
}

// Initialize room manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RoomManager();
});

// Export for potential use in other modules
export default RoomManager;