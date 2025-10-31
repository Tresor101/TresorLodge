// Contact Manager for TresorLodge Contact Section
class ContactManager {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.isSubmitting = false;
        
        this.init();
    }
    
    init() {
        this.form = document.querySelector('.contact-form form');
        this.submitBtn = document.querySelector('.submit-btn');
        
        if (this.form) {
            this.bindEvents();
            this.initializeValidation();
        }
        
        this.initializeMap();
        this.initializeSocialLinks();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
        
        // Phone number formatting
        const phoneInput = this.form.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => this.formatPhoneNumber(e));
        }
    }
    
    initializeValidation() {
        const requiredFields = this.form.querySelectorAll('.form-input[required], .form-textarea[required]');
        
        requiredFields.forEach(field => {
            const label = this.form.querySelector(`label[for="${field.id}"]`);
            if (label && !label.classList.contains('required')) {
                label.classList.add('required');
            }
        });
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.isSubmitting) return;
        
        const isValid = this.validateForm();
        if (!isValid) return;
        
        this.isSubmitting = true;
        this.submitBtn.disabled = true;
        this.submitBtn.textContent = 'Sending...';
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call
            await this.submitContactForm(data);
            
            this.showSuccessMessage();
            this.form.reset();
            
        } catch (error) {
            this.showErrorMessage('Failed to send message. Please try again.');
            console.error('Contact form submission error:', error);
        } finally {
            this.isSubmitting = false;
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Send Message';
        }
    }
    
    async submitContactForm(data) {
        // In a real application, this would be an actual API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) { // 90% success rate for demo
                    resolve({ success: true });
                } else {
                    reject(new Error('Server error'));
                }
            }, 2000);
        });
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        else if (fieldName === 'phone' && value) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Name validation
        else if ((fieldName === 'firstName' || fieldName === 'lastName') && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        }
        
        // Message validation
        else if (fieldName === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters';
            }
        }
        
        this.displayFieldError(field, isValid, errorMessage);
        return isValid;
    }
    
    displayFieldError(field, isValid, errorMessage) {
        const existingError = field.parentNode.querySelector('.field-error');
        
        if (existingError) {
            existingError.remove();
        }
        
        if (isValid) {
            field.classList.remove('error');
        } else {
            field.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: var(--color-error);
                font-size: var(--text-sm);
                margin-top: var(--space-xs);
                display: block;
            `;
            errorElement.textContent = errorMessage;
            
            field.parentNode.appendChild(errorElement);
        }
    }
    
    clearErrors(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    formatPhoneNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: var(--space-lg);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--space-sm);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
                <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }
    
    showErrorMessage(text) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-error);
            color: white;
            padding: var(--space-lg);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        message.innerHTML = `
            <div style="display: flex; align-items: center; gap: var(--space-sm);">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>${text}</span>
            </div>
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => message.remove(), 300);
        }, 4000);
    }
    
    initializeMap() {
        const mapContainer = document.querySelector('.map-container');
        if (!mapContainer) return;
        
        // In a real application, you would initialize Google Maps or another mapping service here
        const placeholder = mapContainer.querySelector('.map-placeholder');
        if (placeholder) {
            placeholder.innerHTML = `
                <div style="text-align: center;">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom: var(--space-md);">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <p>Interactive Map Loading...</p>
                    <small>TresorLodge Location</small>
                </div>
            `;
            
            // Simulate map loading
            setTimeout(() => {
                placeholder.style.background = 'linear-gradient(45deg, #f0f9ff, #e0f2fe)';
                placeholder.innerHTML = `
                    <div style="text-align: center; color: var(--secondary-color);">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="margin-bottom: var(--space-md);">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        <h4 style="margin: 0; color: var(--text-dark);">TresorLodge</h4>
                        <p style="margin: var(--space-sm) 0; color: var(--text-medium);">Luxury Hotel & Resort</p>
                        <small style="color: var(--text-light);">Click to view interactive map</small>
                    </div>
                `;
                
                mapContainer.style.cursor = 'pointer';
                mapContainer.addEventListener('click', () => {
                    window.open('https://maps.google.com/?q=TresorLodge+Hotel', '_blank');
                });
            }, 2000);
        }
    }
    
    initializeSocialLinks() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 150);
                
                // Open social media links (in a real app, these would be actual URLs)
                const platform = link.getAttribute('data-platform');
                if (platform) {
                    console.log(`Opening ${platform} social media page`);
                }
            });
        });
    }
}

// Additional utility functions for contact page
const ContactUtils = {
    // Format address for display
    formatAddress(address) {
        return address.split(',').map(part => part.trim()).join(',\n');
    },
    
    // Generate contact hours display
    generateBusinessHours() {
        const hours = {
            'Monday': '8:00 AM - 10:00 PM',
            'Tuesday': '8:00 AM - 10:00 PM',
            'Wednesday': '8:00 AM - 10:00 PM',
            'Thursday': '8:00 AM - 10:00 PM',
            'Friday': '8:00 AM - 11:00 PM',
            'Saturday': '7:00 AM - 11:00 PM',
            'Sunday': '7:00 AM - 10:00 PM'
        };
        
        return hours;
    },
    
    // Check if currently open
    isCurrentlyOpen() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();
        
        // Simple logic - adjust based on actual business hours
        if (currentDay === 0 || currentDay === 6) { // Weekend
            return currentHour >= 7 && currentHour < 23;
        } else { // Weekday
            return currentHour >= 8 && currentHour < 22;
        }
    }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize Contact Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactManager();
    
    // Display business hours if container exists
    const hoursContainer = document.querySelector('.hours-list');
    if (hoursContainer) {
        const hours = ContactUtils.generateBusinessHours();
        const isOpen = ContactUtils.isCurrentlyOpen();
        
        Object.entries(hours).forEach(([day, time]) => {
            const listItem = document.createElement('li');
            listItem.className = 'hours-item';
            listItem.innerHTML = `
                <span class="hours-day">${day}</span>
                <span class="hours-time">${time}</span>
            `;
            hoursContainer.appendChild(listItem);
        });
        
        // Add current status indicator
        const statusIndicator = document.createElement('div');
        statusIndicator.style.cssText = `
            text-align: center;
            margin-top: var(--space-md);
            padding: var(--space-sm);
            border-radius: var(--border-radius);
            font-weight: 500;
            ${isOpen ? 
                'background: rgba(34, 197, 94, 0.1); color: var(--color-success);' :
                'background: rgba(239, 68, 68, 0.1); color: var(--color-error);'
            }
        `;
        statusIndicator.textContent = isOpen ? '🟢 Currently Open' : '🔴 Currently Closed';
        hoursContainer.parentNode.appendChild(statusIndicator);
    }
});

export default ContactManager;