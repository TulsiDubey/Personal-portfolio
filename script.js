document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init('u21jLDh7xH5tWfYDm');

    // Theme Toggle with Animation
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    themeToggle.addEventListener('click', function() {
        const isDark = document.body.dataset.theme === 'dark';
        document.body.dataset.theme = isDark ? '' : 'dark';
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        themeToggle.classList.toggle('active');
    });

    // Scroll to Top Button
    const scrollTop = document.getElementById('scrollTop');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    });

    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth Scrolling for Navigation (only for in-page links)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only apply smooth scrolling to in-page links (starting with #)
            if (href.startsWith('#') && href !== '#') {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Force navigation for project buttons as a fallback
    document.querySelectorAll('.project-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && (href.startsWith('http') || href.startsWith('https'))) {
                // Ensure the default behavior is not prevented
                window.open(href, '_blank');
            }
        });
    });

    // Enhanced Animations on Scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated');

                if (entry.target.classList.contains('fadeIn')) {
                    entry.target.classList.add('animate__zoomIn');
                } else if (entry.target.classList.contains('fadeInUp')) {
                    entry.target.classList.add('animate__slideInUp');
                } else if (entry.target.classList.contains('fadeInDown')) {
                    entry.target.classList.add('animate__bounceIn');
                }

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fadeIn, .fadeInUp, .fadeInDown').forEach(el => {
        observer.observe(el);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        emailjs.send('service_1kvmqbm', 'template_80of6df', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'dubeytulsi3@gmail.com'
        }).then(
            function(response) {
                alert('Message sent successfully!');
                contactForm.reset();
            },
            function(error) {
                alert('Failed to send message. Please try again.');
                console.error('EmailJS error:', JSON.stringify(error, null, 2));
            }
        );
    });

    // Enhanced bubble animation with random movement
    const container = document.querySelector('.bubble-container');
    const colors = [
        'rgba(249, 213, 202, 0.8)',
        'rgba(224, 99, 119, 0.7)',
        'rgba(65, 89, 127, 0.6)',
        'rgba(200, 51, 73, 0.7)'
    ];
    const emojis = [''];

    // Create additional bubbles dynamically
    for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.dataset.emoji = emojis[Math.floor(Math.random() * emojis.length)];
        bubble.style.left = `${Math.random() * 90 + 5}%`;
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        bubble.style.animationDuration = `${10 + Math.random() * 10}s`;
        bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        container.appendChild(bubble);
    }

    // Make bubbles interactive
    function resetBubble(bubble) {
        const newBubble = bubble.cloneNode(true);
        bubble.parentNode.replaceChild(newBubble, bubble);
        newBubble.style.animationDelay = '0s';
        newBubble.style.animation = 'floatUp 15s linear infinite';
        newBubble.addEventListener('click', () => handleBubbleClick(newBubble));
    }

    function handleBubbleClick(bubble) {
        bubble.style.animation = 'none';
        bubble.style.transform = 'scale(3.5)';
        bubble.style.opacity = '1';
        setTimeout(() => {
            resetBubble(bubble);
        }, 500);
    }

    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', () => handleBubbleClick(bubble));
    });
});