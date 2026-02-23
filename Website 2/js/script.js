// ====================================
// APPOINTMENT FORM HANDLING
// ====================================

const appointmentForm = document.getElementById('appointmentForm');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const appointmentDate = document.getElementById('appointmentDate').value;
        const appointmentTime = document.getElementById('appointmentTime').value;
        const reason = document.getElementById('reason').value.trim();
        const medicalHistory = document.getElementById('medicalHistory').value.trim();
        const terms = document.getElementById('terms').checked;
        const consent = document.getElementById('consent').checked;
        
        // Validate required fields
        if (!fullName || !email || !phone || !service || !appointmentDate || !appointmentTime) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        if (!terms || !consent) {
            showFormMessage('Please agree to the terms and consent', 'error');
            return;
        }
        
        // Validate email format
        if (!validateEmail(email)) {
            showFormMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Validate phone format (basic)
        if (!validatePhone(phone)) {
            showFormMessage('Please enter a valid phone number', 'error');
            return;
        }
        
        // Create appointment data
        const appointmentData = {
            fullName,
            email,
            phone,
            service,
            appointmentDate,
            appointmentTime,
            reason,
            medicalHistory,
            submittedAt: new Date().toLocaleString()
        };
        
        // Save to localStorage (for demo purposes)
        saveAppointment(appointmentData);
        
        // Show success message
        showFormMessage('✓ Appointment booked successfully! We will confirm via email shortly.', 'success');
        
        // Reset form
        appointmentForm.reset();
        
        // Optionally send email (requires backend)
        // sendAppointmentEmail(appointmentData);
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    // Remove non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length >= 10;
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = 'form-message ' + type;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

function saveAppointment(data) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(data);
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// ====================================
// CONTACT FORM HANDLING
// ====================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contactName = document.getElementById('contactName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();
        const contactPhone = document.getElementById('contactPhone').value.trim();
        const contactSubject = document.getElementById('contactSubject').value.trim();
        const contactMessage = document.getElementById('contactMessage').value.trim();
        const contactConsent = document.getElementById('contactConsent').checked;
        
        // Validate required fields
        if (!contactName || !contactEmail || !contactSubject || !contactMessage) {
            showContactMessage('Please fill in all required fields', 'error');
            return;
        }
        
        if (!contactConsent) {
            showContactMessage('Please consent to be contacted', 'error');
            return;
        }
        
        if (!validateEmail(contactEmail)) {
            showContactMessage('Please enter a valid email address', 'error');
            return;
        }
        
        // Create contact data
        const contactData = {
            contactName,
            contactEmail,
            contactPhone,
            contactSubject,
            contactMessage,
            submittedAt: new Date().toLocaleString()
        };
        
        // Save to localStorage
        saveContact(contactData);
        
        // Show success message
        showContactMessage('✓ Thank you! Your message has been sent. We will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

function showContactMessage(message, type) {
    const messageDiv = document.getElementById('contactFormMessage');
    messageDiv.textContent = message;
    messageDiv.className = 'form-message ' + type;
    
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

function saveContact(data) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.push(data);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// ====================================
// SMOOTH SCROLLING
// ====================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// ====================================
// ACTIVE NAV LINK
// ====================================

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ====================================
// APPOINTMENT DATE VALIDATION
// ====================================

const appointmentDateInput = document.getElementById('appointmentDate');

if (appointmentDateInput) {
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    appointmentDateInput.setAttribute('min', today);
    
    // Disable Sundays (if needed)
    appointmentDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const dayOfWeek = selectedDate.getDay();
        
        if (dayOfWeek === 0) { // Sunday
            showFormMessage('Sorry, we are closed on Sundays. Please select another day.', 'error');
            this.value = '';
        }
    });
}

// ====================================
// RESPONSIVE NAVIGATION MENU
// ====================================

function setupMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navMenu) return;
    
    // Create hamburger menu for mobile
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger-menu')) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger-menu';
            hamburger.innerHTML = '☰';
            hamburger.addEventListener('click', function() {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            });
            navbar.querySelector('.container').insertBefore(hamburger, navMenu);
        }
    }
}

setupMobileMenu();

// ====================================
// FORM FIELD AUTOFILL FROM PREVIOUS ENTRY
// ====================================

function populateFormFromStorage(formId, storageKey) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }
}

// ====================================
// INITIALIZE TOOLTIPS AND POPOVERS
// ====================================

document.querySelectorAll('[data-tooltip]').forEach(element => {
    element.addEventListener('mouseenter', function() {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = this.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = this.getBoundingClientRect();
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
        tooltip.style.left = (rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)) + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(t => t.remove());
    });
});

// ====================================
// LAZY LOADING IMAGES
// ====================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ====================================
// CONSOLE LOGGING FOR DEVELOPMENT
// ====================================

console.log('HealthCare Clinic Website Loaded');
console.log('Appointments stored:', localStorage.getItem('appointments'));
console.log('Contact messages stored:', localStorage.getItem('contacts'));

// ====================================
// ACCESSIBILITY ENHANCEMENTS
// ====================================

// Add skip to main content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.prepend(skipLink);
}

addSkipLink();

// Add aria-labels where needed
document.querySelectorAll('button').forEach(button => {
    if (!button.getAttribute('aria-label')) {
        button.setAttribute('aria-label', button.textContent.trim());
    }
});

// ====================================
// ANALYTICS AND TRACKING (placeholder)
// ====================================

// Track page views
function trackPageView() {
    const pageInfo = {
        page: window.location.pathname,
        title: document.title,
        timestamp: new Date().toISOString()
    };
    console.log('Page view tracked:', pageInfo);
    // Send to analytics service
}

trackPageView();

// Track user actions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        console.log('Button clicked:', e.target.textContent);
    }
});
