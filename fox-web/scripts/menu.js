// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelectorAll('nav a');
    const header = document.querySelector('.header-transparent');
    let lastScroll = 0;

    function toggleMenu(show) {
        nav.classList.toggle('active', show);
        mobileMenuBtn.classList.toggle('active', show);
        menuOverlay.classList.toggle('active', show);
        document.body.style.overflow = show ? 'hidden' : '';
    }

    mobileMenuBtn.addEventListener('click', () => {
        const shouldShow = !nav.classList.contains('active');
        toggleMenu(shouldShow);
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Always close menu when any link is clicked
            toggleMenu(false);
        });
    });

    menuOverlay.addEventListener('click', () => {
        toggleMenu(false);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu(false);
        }
    });

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
        lastScroll = currentScroll;
    });
});

// Add logo fade functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo');
    const footer = document.querySelector('footer');
    let lastScrollTop = 0;

    function handleLogoVisibility() {
        if (window.innerWidth <= 768) { // Only on mobile
            const footerTop = footer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const fadeStartDistance = 150; // Start fading only when 150px away from footer
            
            // Start fading when very close to footer
            if (footerTop < fadeStartDistance) {
                const fadePercentage = (fadeStartDistance - footerTop) / fadeStartDistance;
                logo.style.opacity = Math.max(0, 1 - fadePercentage);
            } else {
                logo.style.opacity = 1;
            }

            lastScrollTop = window.pageYOffset;
        } else {
            logo.style.opacity = 1; // Always visible on desktop
        }
    }

    // Add smooth transition to logo opacity
    logo.style.transition = 'opacity 0.3s ease';

    window.addEventListener('scroll', handleLogoVisibility, { passive: true });
    window.addEventListener('resize', handleLogoVisibility, { passive: true });

    // Initial check
    handleLogoVisibility();
}); 