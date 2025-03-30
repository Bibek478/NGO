document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Donation button click event
    // const donateBtn = document.querySelector('.donate-btn');
    // if (donateBtn) {
    //     donateBtn.addEventListener('click', function() {
    //         alert('Thank you for your interest in donating. This feature is coming soon!');
    //     });
    // }

    const heroSwiper = new Swiper('.hero-swiper', {
        direction: 'horizontal',
        loop: true,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
        speed: 1000,
    });

    // Project slider functionality
    const projectGrid = document.querySelector('.project-grid');
    const indicatorContainer = document.querySelector('.slider-indicator-container');
    const indicatorBar = document.querySelector('.slider-indicator-bar');

    // Check if all elements exist
    if (projectGrid && indicatorContainer && indicatorBar) {

        const updateIndicator = () => {
            const scrollLeft = projectGrid.scrollLeft;
            const scrollWidth = projectGrid.scrollWidth;
            const clientWidth = projectGrid.clientWidth;

            // Calculate the maximum scrollable distance
            const maxScrollLeft = scrollWidth - clientWidth;

            // Prevent division by zero if content doesn't overflow
            if (maxScrollLeft <= 0) {
                indicatorBar.style.width = '100%'; // Show full bar if no scroll needed
                indicatorContainer.style.display = 'none'; // Or hide indicator if no scroll
                return;
            } else {
                 indicatorContainer.style.display = 'block'; // Ensure it's visible if scrollable
            }

            // Calculate scroll percentage
            const scrollPercentage = (scrollLeft / maxScrollLeft) * 100;

            // Update the indicator bar width
            indicatorBar.style.width = `${scrollPercentage}%`;
        };

        // Update indicator on scroll
        projectGrid.addEventListener('scroll', updateIndicator);

        // Allow clicking on the indicator track to navigate
        indicatorContainer.addEventListener('click', (e) => {
            const containerRect = indicatorContainer.getBoundingClientRect();
            const clickX = e.clientX - containerRect.left; // Click position relative to container start
            const containerWidth = containerRect.width;

            // Calculate the desired scroll proportion
            const scrollProportion = clickX / containerWidth;

            const scrollWidth = projectGrid.scrollWidth;
            const clientWidth = projectGrid.clientWidth;
            const maxScrollLeft = scrollWidth - clientWidth;

            // Calculate the target scrollLeft position
            const targetScrollLeft = scrollProportion * maxScrollLeft;

            // Smoothly scroll to the calculated position
            projectGrid.scrollTo({
                left: targetScrollLeft,
                behavior: 'smooth'
            });
        });

        // Initial update in case content loaded differently
        // Use setTimeout to ensure layout is fully calculated, especially with images
        setTimeout(updateIndicator, 100); // Small delay might be needed

        // Also update on window resize as clientWidth can change
        window.addEventListener('resize', updateIndicator);

    } else {
        // Log an error if elements aren't found
        if (!projectGrid) console.error("Project grid '.project-grid' not found.");
        if (!indicatorContainer) console.error("Slider indicator container '.slider-indicator-container' not found.");
        if (!indicatorBar) console.error("Slider indicator bar '.slider-indicator-bar' not found.");
    }
});