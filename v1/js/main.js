// Header and Footer Templates
const headerTemplate = `
    <header class="header">
        <div class="header-content">
            <a href="index.html" class="logo">
                <span>🎨</span>
                <span>CryptArtist</span>
            </a>
            <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Toggle menu">
                ☰
            </button>
            <nav class="nav" id="mainNav">
                <a href="index.html" data-page="index">Home</a>
                <a href="ideas.html" data-page="ideas">Ideas</a>
                <a href="info.html" data-page="info">Info</a>
                <a href="contact.html" data-page="contact">Contact</a>
                <a href="legal.html" data-page="legal">Legal</a>
            </nav>
        </div>
    </header>
`;

const footerTemplate = `
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-section">
                <h3>CryptArtist</h3>
                <p>A suite of innovative cryptocurrency projects exploring the future of blockchain technology.</p>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="ideas.html">Ideas</a></li>
                    <li><a href="info.html">Info</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Resources</h3>
                <ul class="footer-links">
                    <li><a href="legal.html">Legal</a></li>
                    <li><a href="#">Documentation</a></li>
                    <li><a href="#">Community</a></li>
                    <li><a href="#">Support</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Connect</h3>
                <ul class="footer-links">
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">Discord</a></li>
                    <li><a href="#">GitHub</a></li>
                    <li><a href="#">Telegram</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} CryptArtist. All rights reserved.</p>
        </div>
    </footer>
`;

// Load header and footer
function loadLayout() {
    const headerContainer = document.getElementById('header-container');
    const footerContainer = document.getElementById('footer-container');
    
    if (headerContainer) {
        headerContainer.innerHTML = headerTemplate;
    }
    
    if (footerContainer) {
        footerContainer.innerHTML = footerTemplate;
    }
    
    // Set active nav link
    setActiveNavLink();
    
    // Setup mobile menu
    setupMobileMenu();
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Setup mobile menu toggle
function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            const isActive = mainNav.classList.contains('active');
            mobileMenuBtn.textContent = isActive ? '✕' : '☰';
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking a link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.textContent = '☰';
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Contact form handler
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (in a real app, this would send to a server)
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            
            console.log('Form submitted:', formData);
        });
    }
}

// Smooth scroll for anchor links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// Add animations on scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.feature-card, .idea-card, .info-card, .contact-method');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadLayout();
    setupContactForm();
    setupSmoothScroll();
    
    // Delay scroll animations to ensure layout is loaded
    setTimeout(() => {
        setupScrollAnimations();
    }, 100);
});

// Add some interactivity to idea cards
document.addEventListener('DOMContentLoaded', () => {
    const ideaCards = document.querySelectorAll('.idea-card');
    
    ideaCards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(0.98)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });
});

// Add copy year to footer dynamically
function updateFooterYear() {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && !footerYear.textContent.includes(new Date().getFullYear())) {
        footerYear.textContent = `© ${new Date().getFullYear()} CryptArtist. All rights reserved.`;
    }
}

// Update footer year on load
window.addEventListener('load', updateFooterYear);
