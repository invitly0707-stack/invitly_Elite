document.addEventListener('DOMContentLoaded', () => {

    // --- Elegant Header Transformation On Scroll ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation System Drawer Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        navToggle.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        if(navToggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // --- Ambient Particle Architecture (Hero Section) ---
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        const particleCount = 45;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = `${Math.random() * 3 + 1}px`;
            particle.style.height = particle.style.width;
            particle.style.background = 'rgba(184, 134, 11, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.left = `${Math.random() * 100}%`;
            
            const speed = Math.random() * 4 + 3;
            particle.animate([
                { transform: 'translateY(0px) translateX(0px)', opacity: 0 },
                { opacity: 0.7, offset: 0.2 },
                { transform: `translateY(-${Math.random() * 250 + 150}px) translateX(${Math.random() * 50 - 25}px)`, opacity: 0 }
            ], {
                duration: speed * 1000,
                iterations: Infinity,
                delay: Math.random() * 5000,
                easing: 'linear'
            });

            particlesContainer.appendChild(particle);
        }
    }

    // --- Scroll Intersection Observers ---
    const revealItems = document.querySelectorAll('.scroll-reveal');
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.id === 'why-choose-us') {
                    animateCounters();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealItems.forEach(item => scrollObserver.observe(item));

    // --- Counter System ---
    let countersFired = false;
    function animateCounters() {
        if (countersFired) return;
        countersFired = true;

        const counters = document.querySelectorAll('.counter-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2500; 
            let startTime = null;

            function runStep(currentTime) {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;
                const currentValue = Math.min(Math.floor((progress / duration) * target), target);
                
                counter.innerText = currentValue;

                if (currentValue < target) {
                    requestAnimationFrame(runStep);
                } else {
                    counter.innerText = target; 
                }
            }
            requestAnimationFrame(runStep);
        });
    }

    // --- Carousel ---
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (track && cards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = window.innerWidth > 850 ? 2 : 1;

        function buildDots() {
            dotsContainer.innerHTML = '';
            const totalDots = Math.ceil(cards.length / cardsPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => moveToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function moveToSlide(index) {
            currentIndex = index;
            const gapValue = parseFloat(getComputedStyle(track).gap) || 0;
            const cardWidth = cards[0].getBoundingClientRect().width;
            const moveFactor = index * cardsPerView * (cardWidth + gapValue);
            
            track.style.transform = `translateX(-${moveFactor}px)`;
            
            const dots = document.querySelectorAll('.dot');
            dots.forEach(d => d.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        }

        buildDots();

        window.addEventListener('resize', () => {
            const updatedCardsPerView = window.innerWidth > 850 ? 2 : 1;
            if(updatedCardsPerView !== cardsPerView) {
                cardsPerView = updatedCardsPerView;
                currentIndex = 0;
                track.style.transform = 'none';
                buildDots();
            }
        });
    }

    // --- FAQ Accordion ---
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const parent = trigger.parentElement;
            const isOpen = parent.classList.contains('open');
            
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('open');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isOpen) {
                parent.classList.add('open');
                const content = parent.querySelector('.accordion-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- Form Submit ---
    const form = document.getElementById('eliteContactForm');
    if(form) {
        form.addEventListener('submit', () => {
    console.log('Form submitted successfully.');
    alert("thank you ");
});
    }
});



