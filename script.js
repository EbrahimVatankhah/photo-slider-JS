const slider = document.querySelector('.slider');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const indicatorsContainer = document.querySelector('.indicators');
        const fileInput = document.getElementById('fileInput');
        let slideIndex = 0;
        let slides = [];

        // Handle image upload
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    createSlide(e.target.result);
                    updateIndicators();
                }
                reader.readAsDataURL(file);
            });
        });

        function createSlide(imageSrc) {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.innerHTML = `<img src="${imageSrc}" alt="Slider Image">`;
            slider.appendChild(slide);
            slides = document.querySelectorAll('.slide');
        }

        // Update navigation indicators
        function updateIndicators() {
            indicatorsContainer.innerHTML = '';
            slides.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${index === slideIndex ? 'active' : ''}`;
                indicator.addEventListener('click', () => goToSlide(index));
                indicatorsContainer.appendChild(indicator);
            });
        }

        // Navigation functions
        function goToSlide(index) {
            slideIndex = index;
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            updateIndicators();
        }
        
        function nextSlide() {
            slideIndex = (slideIndex + 1) % slides.length;
            goToSlide(slideIndex);
        }

        function prevSlide() {
            slideIndex = (slideIndex - 1 + slides.length) % slides.length;
            goToSlide(slideIndex);
        }

        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        });