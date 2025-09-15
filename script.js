 // Initialize variables
        let currentSlide = 0;
        const totalSlides = 3;
        const typingTexts = ['Reviews', 'Reputation', 'Feedback', 'Growth'];
        let typingIndex = 0;
        let typingTimer;

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger counter animations
                    if (entry.target.id === 'counter1' || entry.target.id === 'counter2' || entry.target.id === 'counter3') {
                        animateCounter(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Counter animation function
        function animateCounter(element) {
            let target = 0;
            if (element.id === 'counter1') target = 10000;
            else if (element.id === 'counter2') target = 5000000;
            else if (element.id === 'counter3') target = 50;
            
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (element.id === 'counter1') {
                    element.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (element.id === 'counter2') {
                    element.textContent = (Math.floor(current / 1000000) || 1) + 'M+';
                } else {
                    element.textContent = Math.floor(current) + '+';
                }
            }, 50);
        }

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Observe all fade-in elements
            document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
                observer.observe(el);
            });

            // Observe counters specifically
            document.querySelectorAll('#counter1, #counter2, #counter3').forEach(el => {
                observer.observe(el);
            });

            // Initialize typing animation
            startTypingAnimation();

            // Initialize carousel auto-play
            setInterval(nextSlide, 5000);

            // Handle scroll events
            handleScroll();
            window.addEventListener('scroll', handleScroll);

            // Initialize dropdown functionality
            initializeDropdowns();
        });

        // Typing animation
        function startTypingAnimation() {
            const typingElement = document.getElementById('typingText');
            if (!typingElement) return;

            function typeText() {
                typingElement.textContent = typingTexts[typingIndex];
                typingIndex = (typingIndex + 1) % typingTexts.length;
            }

            typeText();
            setInterval(typeText, 3000);
        }

        // Scroll handling
        function handleScroll() {
            const nav = document.querySelector('.sticky-nav');
            const backToTop = document.getElementById('backToTop');
            const scrollY = window.scrollY;

            // Handle navigation background
            if (scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
                nav.style.boxShadow = 'none';
            }

            // Handle back to top button
            if (scrollY > 500) {
                backToTop.style.transform = 'translateY(0)';
                backToTop.style.opacity = '1';
            } else {
                backToTop.style.transform = 'translateY(64px)';
                backToTop.style.opacity = '0';
            }
        }

        // Dropdown functionality
        function initializeDropdowns() {
            const dropdownButtons = document.querySelectorAll('.group');
            
            dropdownButtons.forEach(group => {
                const dropdown = group.querySelector('.dropdown');
                
                group.addEventListener('mouseenter', () => {
                    dropdown.classList.add('active');
                });

                group.addEventListener('mouseleave', () => {
                    dropdown.classList.remove('active');
                });
            });
        }

        // Mobile menu
        function toggleMobileMenu() {
            const mobileMenu = document.getElementById('mobileMenu');
            mobileMenu.classList.toggle('active');
        }

        // Carousel functionality
        function updateCarousel() {
            const carousel = document.getElementById('reviewsCarousel');
            const dots = document.querySelectorAll('.carousel-dot');
            
            carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            dots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.remove('bg-gray-300');
                    dot.classList.add('bg-blue-600');
                } else {
                    dot.classList.remove('bg-blue-600');
                    dot.classList.add('bg-gray-300');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }

        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
        }

        // Accordion functionality
        function toggleAccordion(button) {
            const accordion = button.parentElement;
            const content = accordion.querySelector('.accordion-content');
            const icon = button.querySelector('i');
            
            const isActive = accordion.classList.contains('active');
            
            // Close all accordions
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('active');
                acc.querySelector('i').style.transform = 'rotate(0deg)';
            });
            
            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordion.classList.add('active');
                icon.style.transform = 'rotate(180deg)';
            }
        }

        // Modal functionality
        function openModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalId) {
            const modal = document.getElementById(modalId);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                const modalId = e.target.id;
                closeModal(modalId);
            }
        });

        // Back to top functionality
        document.getElementById('backToTop').addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
            });
        });

        // Form handling
        document.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message (you would integrate with your backend here)
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.textContent = 'Message Sent!';
                submitButton.style.backgroundColor = '#10b981';
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                    form.reset();
                    
                    // Close modal if it's a modal form
                    const modal = form.closest('.modal');
                    if (modal) {
                        closeModal(modal.id);
                    }
                }, 2000);
            }, 1500);
        });

        // Add loading animation to buttons
        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function(e) {
                // Add ripple effect
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Touch/swipe support for mobile carousel
        let touchStartX = 0;
        let touchEndX = 0;

        const carousel = document.getElementById('reviewsCarousel');
        if (carousel) {
            carousel.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            carousel.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });

            function handleSwipe() {
                const swipeThreshold = 50;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > swipeThreshold) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        previousSlide();
                    }
                }
            }
        }

        // Keyboard navigation support
        document.addEventListener('keydown', function(e) {
            // ESC key to close modals
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    closeModal(modal.id);
                });
            }
            
            // Arrow keys for carousel
            if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });

        // Error handling
        window.addEventListener('error', function(e) {
            console.error('JavaScript Error:', e.error);
        });