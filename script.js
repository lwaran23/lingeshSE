// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const currentYearSpan = document.getElementById('currentYear');

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Function to handle navigation
    function navigateToSection(targetId) {
        // Hide all sections and remove active class from links
        contentSections.forEach(section => {
            section.classList.remove('active-section');
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
        });

        // Show target section and set active class on link
        const targetSection = document.getElementById(targetId);
        const targetLink = document.querySelector(`nav.nav-link[data-target="${targetId}"]`);

        if (targetSection) {
            // Use a slight delay to allow display:block to take effect before animation
            setTimeout(() => {
                targetSection.classList.add('active-section');
            }, 10); // Small delay
        }
        if (targetLink) {
            targetLink.classList.add('active-link');
        }

        // Scroll to the section smoothly
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Function to handle sub-navigation within a section
    function handleSubNavigation(sectionId) {
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) return;

        const subNavLinks = sectionElement.querySelectorAll('.sub-nav-link');
        const subContentSections = sectionElement.querySelectorAll('.sub-content');

        subNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                const subTargetId = link.dataset.subtarget;

                subContentSections.forEach(subSection => {
                    subSection.classList.remove('active-sub-content');
                });
                subNavLinks.forEach(sLink => {
                    sLink.classList.remove('active-sub-link');
                });

                const targetSubSection = document.getElementById(subTargetId);
                if (targetSubSection) {
                    targetSubSection.classList.add('active-sub-content');
                }
                link.classList.add('active-sub-link');
            });
        });

        // Activate the first sub-navigation link and content by default if they exist
        if (subNavLinks.length > 0 && subContentSections.length > 0) {
            subNavLinks.classList.add('active-sub-link');
            // The active-sub-content class is already set in HTML for the first sub-content
        }
    }


    // Add click event listeners to main navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.dataset.target;
            navigateToSection(targetId);
        });
    });

    // Initialize sub-navigation for all relevant sections
    ['foundations', 'ventilators', 'pen-injectors'].forEach(sectionId => {
        handleSubNavigation(sectionId);
    });
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // For GitHub Pages, you can't directly process this server-side.
            // Option 1: Log to console (for demonstration)
            console.log('Form Submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Subject:', subject);
            console.log('Message:', message);

            // Display a success message to the user
            formMessage.textContent = 'Thank you for your message! (Data logged to console)';
            formMessage.className = 'form-message success'; // Add success class
            contactForm.reset(); // Clear the form

            // Option 2: Integrate with a third-party service like Formspree.
            // To do this, you would change the form's `action` attribute to your Formspree endpoint
            // and remove `event.preventDefault()` or handle submission via fetch API.
            // Example for Formspree (replace YOUR_FORM_ID with your actual Formspree ID):
            // <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
            // Then, you might not need the JS handling for submission itself, or you'd use fetch:
            /*
            fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            }).then(response => {
                if (response.ok) {
                    formMessage.textContent = 'Thank you for your message!';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            formMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            formMessage.textContent = 'Oops! There was a problem submitting your form.';
                        }
                        formMessage.className = 'form-message error';
                    })
                }
            }).catch(error => {
                formMessage.textContent = 'Oops! There was a problem submitting your form.';
                formMessage.className = 'form-message error';
            });
            */

            setTimeout(() => {
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 5000); // Clear message after 5 seconds
        });
    }

    // Show the initial section (home)
    // The 'active-section' class is already set on the home section in HTML.
    // If you want to navigate based on URL hash on load:
    const initialTarget = window.location.hash.substring(1) |
| 'home';
    navigateToSection(initialTarget);
});
