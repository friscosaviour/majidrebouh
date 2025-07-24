document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Custom Cursor
    const customCursor = document.querySelector('.custom-cursor');
    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = e.clientX + 'px';
        customCursor.style.top = e.clientY + 'px';
    });

    // Scroll-based Animations (Fade-in sections)
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('active');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Project Modals
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalTech = document.getElementById('modal-tech');
    const modalDescription = document.getElementById('modal-description');
    const modalLinks = document.getElementById('modal-links');

    const projectDetails = {
        fractals: {
            title: 'Interactive Fractals',
            tech: 'HTML, CSS (Tailwind), JavaScript',
            description: 'Built an interactive web app to visualize classic fractals with zoom/pan, animations, and user-defined complexity. Deployed on GitHub Pages with Tailwind CSS and included math-based logic for drawing L-system shapes.',
            links: [
                { text: 'GitHub Repo', url: 'https://github.com/majid-rebouh/interactive-fractals' },
                { text: 'Live Demo', url: 'https://majid-rebouh.github.io/interactive-fractals/' }
            ]
        },
        'streamer-ranker': {
            title: 'Streamer Activity Ranker',
            tech: 'React, Tailwind CSS, Supabase',
            description: 'Developed a React-based web app for submitting and voting on on-stream activities for streamers and their communities. Used Supabase (PostgreSQL + Realtime) for backend and deployed with Vercel. Designed responsive UI with Tailwind CSS and implemented vote-tracking logic. Used git version control.',
            links: [
                { text: 'GitHub Repo', url: 'https://github.com/majid-rebouh/streamer-activity-ranker' }
            ]
        },
        'plant-optimization': {
            title: 'Plant Growth Optimization System',
            tech: 'Python, TensorFlow/Keras, OpenCV, Raspberry Pi',
            description: 'Designed an RL-powered plant care system with custom CV features and hardware. Integrated 3D-printed components and sensor-based monitoring using a modular Python backend.',
            links: [
                { text: 'GitHub Repo', url: 'https://github.com/majid-rebouh/plant-optimization-system' }
            ]
        }
    };

    projectCards.forEach(card => {
        card.querySelector('.view-details-btn').addEventListener('click', () => {
            const projectId = card.dataset.project;
            const details = projectDetails[projectId];

            if (details) {
                modalTitle.textContent = details.title;
                modalTech.textContent = details.tech;
                modalDescription.textContent = details.description;
                modalLinks.innerHTML = '';
                details.links.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.url;
                    a.textContent = link.text;
                    a.target = '_blank';
                    modalLinks.appendChild(a);
                });
                modal.style.display = 'flex';
            }
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const nameInput = contactForm.elements['name'];
        const emailInput = contactForm.elements['email'];
        const messageInput = contactForm.elements['message'];

        // Simple validation example
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required.');
            isValid = false;
        } else {
            hideError(nameInput);
        }

        if (emailInput.value.trim() === '') {
            showError(emailInput, 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required.');
            isValid = false;
        } else {
            hideError(messageInput);
        }

        if (isValid) {
            // In a real application, you would send this data to a server
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            contactForm.reset();
        } else {
            formStatus.textContent = 'Please correct the errors above.';
            formStatus.style.color = 'var(--error-color)';
        }
    });

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        input.classList.add('error');
    }

    function hideError(input) {
        const formGroup = input.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        // Basic email regex validation
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
    }
});
