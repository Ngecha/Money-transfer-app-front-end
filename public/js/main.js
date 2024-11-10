document.addEventListener('DOMContentLoaded', function() {
    // Image loading debug
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            console.error('Failed to load image:', img.src);
            img.style.background = '#ff000033';
            img.style.padding = '1rem';
            img.style.border = '2px solid red';
        };
        img.onload = function() {
            console.log('Successfully loaded image:', img.src);
            img.style.border = '2px solid green';
        };
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
            mobileMenuBtn?.classList.remove('active');
            navLinks?.classList.remove('active');
            authButtons?.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu after clicking a link
                mobileMenuBtn?.classList.remove('active');
                navLinks?.classList.remove('active');
                authButtons?.classList.remove('active');
            }
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.classList.add('scroll-top-btn');
    scrollTopBtn.innerHTML = '↑';
    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Initialize AOS
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});