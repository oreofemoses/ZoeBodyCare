document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    hamburgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Image hover effect for product cards
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const img = item.querySelector('img');
        if (img && img.dataset.originalSrc && img.dataset.hoverSrc) {
            item.addEventListener('mouseover', () => {
                img.classList.add('fade-out');
                setTimeout(() => {
                    img.src = img.dataset.hoverSrc;
                    img.classList.remove('fade-out');
                }, 200); // Match CSS transition duration
            });
            item.addEventListener('mouseout', () => {
                img.classList.add('fade-out');
                setTimeout(() => {
                    img.src = img.dataset.originalSrc;
                    img.classList.remove('fade-out');
                }, 200); // Match CSS transition duration
            });
        }
    });

    // Intersection Observer for fade-up animations
    const faders = document.querySelectorAll('.fade-up');

    const appearOptions = {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: "0px 0px 0px 0px" // Removed negative margin to avoid late triggering
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Start image cycling and zoom when hero is in view
                if (entry.target.id === 'home') {
                    startHeroImageCycle();
                }
            } else {
                entry.target.classList.remove('in-view');
                // Stop image cycling when hero leaves view
                if (entry.target.id === 'home') {
                    stopHeroImageCycle();
                }
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Hero image cycling logic
    const heroSection = document.querySelector('#home');
    const heroBgs = document.querySelectorAll('.hero-bg'); // Select all hero background images
    let currentImageIndex = 0;
    let imageCycleInterval;

    function startHeroImageCycle() {
        // Deactivate all images first
        heroBgs.forEach(bg => bg.classList.remove('active'));
        // Activate the first image initially
        heroBgs[0].classList.add('active');
        currentImageIndex = 0;

        // Clear any existing interval to prevent duplicates
        if (imageCycleInterval) {
            clearInterval(imageCycleInterval);
        }

        imageCycleInterval = setInterval(() => {
            // Deactivate current image
            heroBgs[currentImageIndex].classList.remove('active');
            
            // Move to next image, loop back to start if at the end
            currentImageIndex = (currentImageIndex + 1) % heroBgs.length;

            // Activate the new current image
            heroBgs[currentImageIndex].classList.add('active');
        }, 5000); // Change image every 5 seconds
    }

    function stopHeroImageCycle() {
        clearInterval(imageCycleInterval);
        // Deactivate all images
        heroBgs.forEach(bg => bg.classList.remove('active'));
        // Optionally, reset to the first image when stopped
        if (heroBgs.length > 0) {
            heroBgs[0].classList.add('active');
        }
        currentImageIndex = 0;
    }
});
