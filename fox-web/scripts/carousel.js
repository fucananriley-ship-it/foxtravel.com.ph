// Simple Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicators .indicator');
        let currentIndex = 0;
        let touchStartX = 0;
        let isDragging = false;

        // Preload images
        items.forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                img.loading = 'eager';
            }
        });

        // Simple slide show function
        function showSlide(index) {
            // Hide all slides
            items.forEach(item => {
                item.style.display = 'none';
                item.classList.remove('active');
            });

            // Show selected slide
            items[index].style.display = 'block';
            items[index].classList.add('active');

            // Update indicators
            if (indicators.length) {
                indicators.forEach(indicator => indicator.classList.remove('active'));
                indicators[index].classList.add('active');
            }

            currentIndex = index;
        }

        // Simple touch handling
        function handleTouchStart(e) {
            isDragging = true;
            touchStartX = e.touches[0].clientX;
        }

        function handleTouchEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchEndX - touchStartX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex > 0) {
                    // Swipe right - show previous
                    showSlide(currentIndex - 1);
                } else if (diff < 0 && currentIndex < items.length - 1) {
                    // Swipe left - show next
                    showSlide(currentIndex + 1);
                }
            }
        }

        // Event listeners
        carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
        carousel.addEventListener('touchend', handleTouchEnd);

        // Arrow controls
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let prevIndex = currentIndex - 1;
                if (prevIndex < 0) prevIndex = items.length - 1;
                showSlide(prevIndex);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = currentIndex + 1;
                if (nextIndex >= items.length) nextIndex = 0;
                showSlide(nextIndex);
            });
        }

        // Indicator clicks
        if (indicators.length) {
            indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => {
                    showSlide(index);
                });
            });
        }

        // Show first slide
        showSlide(0);
    });
}); 