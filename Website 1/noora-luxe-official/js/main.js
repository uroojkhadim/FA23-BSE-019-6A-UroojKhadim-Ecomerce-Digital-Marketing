document.addEventListener('DOMContentLoaded', () => {
    initGlobal();
});

function initGlobal() {
    setupNavigation();
    setupScrollReveal();
    setupCartCounter();
}

/**
 * Navigation logic: active state and scroll effects
 */
function setupNavigation() {
    const header = document.querySelector('.header');
    const path = window.location.pathname;
    const page = path.split("/").pop() || 'index.html';

    // Set active link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === page) {
            link.classList.add('active');
        }
    });

    // Header transparency/shadow on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            header.style.padding = '25px 0';
            header.style.boxShadow = 'none';
        }
    });
}

/**
 * Subtle scroll reveal using Intersection Observer
 */
function setupScrollReveal() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.fade-in, .product-card, section h2');
    revealElements.forEach(el => {
        if (!el.classList.contains('fade-in')) {
            el.classList.add('fade-in');
        }
        observer.observe(el);
    });
}

/**
 * Shared cart counter logic
 */
function setupCartCounter() {
    const cartCount = document.querySelector('.cart-count');
    // Simple mock storage for demo purposes
    let count = parseInt(localStorage.getItem('nooraluxe_cart_count')) || 0;
    if (cartCount) cartCount.textContent = count;

    window.updateGlobalCart = (delta) => {
        count += delta;
        localStorage.setItem('nooraluxe_cart_count', count);
        if (cartCount) {
            cartCount.textContent = count;
            cartCount.style.transform = 'scale(1.4)';
            setTimeout(() => cartCount.style.transform = 'scale(1)', 400);
        }
    };
}

console.log('%c NOORA LUXE OFFICIAL %c Ready ', 'color: #B8860B; font-weight: bold;', 'color: #1A1A1A;');
