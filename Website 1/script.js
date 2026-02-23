document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    setupHeader();
    setupAtelier();
    setupAnimations();
    setupSmoothScroll();
    setupCartFeedback();
}

// Header Scroll Effect
function setupHeader() {
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.padding = '15px 0';
            header.style.background = 'rgba(250, 249, 246, 0.98)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(250, 249, 246, 0.95)';
        }
    });
}

// Atelier Customization Logic
function setupAtelier() {
    const optionGroups = document.querySelectorAll('.custom-options');
    const summaryText = document.getElementById('summary-text');

    // Store current state
    const selections = {
        fabric: 'Premium Nida',
        sleeve: 'Kimono Style',
        length: 'Standard (54")'
    };

    optionGroups.forEach(group => {
        const type = group.dataset.type;
        const buttons = group.querySelectorAll('.opt-btn');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove selected from others in group
                buttons.forEach(b => b.classList.remove('selected'));
                // Add to clicked
                btn.classList.add('selected');

                // Update selections state
                selections[type] = btn.innerText;

                // Update UI Summary
                updateSummary();

                // Visual feedback on the image (subtle flash)
                const visual = document.querySelector('.atelier-visual img');
                visual.style.opacity = '0.8';
                setTimeout(() => visual.style.opacity = '1', 200);
            });
        });
    });

    function updateSummary() {
        summaryText.innerText = `${selections.fabric}, ${selections.sleeve}, ${selections.length}`;
    }
}

// Elegant Reveal Animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, observerOptions);

    // Elements to reveal
    const revealElements = document.querySelectorAll('.section-title, .product-card, .atelier-visual, .atelier-form, .story-text, .story-img');

    revealElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = target.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link if needed
            }
        });
    });
}

// Cart Micro-interaction
function setupCartFeedback() {
    const cartBtn = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    let count = 0;

    cartBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            cartCount.innerText = count;

            // Luxe vibration/scale effect
            cartCount.style.transform = 'scale(1.3)';
            setTimeout(() => cartCount.style.transform = 'scale(1)', 300);

            // Button feedback
            const originalText = btn.innerText;
            btn.innerText = 'ADDED TO BAG';
            btn.style.color = '#B8860B';

            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.color = '#1A1A1A';
            }, 2000);
        });
    });
}

// Log brand initialization
console.log('%c NOORA LUXE %c COLLECTION INITIALIZED ',
    'background: #1A1A1A; color: #FAF9F6; padding: 5px 10px; font-weight: bold; font-family: serif; font-size: 14px;',
    'background: #B8860B; color: #fff; padding: 5px 10px; font-weight: bold; font-size: 11px;');
