document.addEventListener('DOMContentLoaded', () => {
    // Example: Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default hash behavior if linking to same page sections
            // For multi-page, this would just navigate
            // e.preventDefault(); 
            // document.querySelector(this.getAttribute('href')).scrollIntoView({
            //     behavior: 'smooth'
            // });
        });
    });

    // Example: Highlight active navigation link (if using single page sections)
    // const sections = document.querySelectorAll('section');
    // const navLi = document.querySelectorAll('nav .container ul li');
    // window.addEventListener('scroll', () => {
    //     let current = '';
    //     sections.forEach(section => {
    //         const sectionTop = section.offsetTop;
    //         const sectionHeight = section.clientHeight;
    //         if (pageYOffset >= sectionTop - sectionHeight / 3) { // Adjust offset as needed
    //             current = section.getAttribute('id');
    //         }
    //     });

    //     navLi.forEach(li => {
    //         li.classList.remove('active');
    //         if (li.querySelector('a').getAttribute('href').includes(current)) {
    //             li.classList.add('active');
    //         }
    //     });
    // });

    // Navbar active link highlighting
    const navLinks = document.querySelectorAll('.navbar nav a');
    navLinks.forEach(link => {
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add hover effect to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 8px 32px rgba(46,58,89,0.22)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '';
        });
    });

    // Contact copy to clipboard
    document.querySelectorAll('.contact-card a').forEach(link => {
        link.addEventListener('click', function (e) {
            if (this.href.startsWith('mailto:') || this.href.startsWith('tel:')) {
                e.preventDefault();
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = text;
                    }, 1200);
                });
            }
        });
    });

    // Certifications card hover effect
    document.querySelectorAll('.certification-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = '#26324b';
            card.style.color = '#52b6ff';
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '#23263a';
            card.style.color = '#f6f7fa';
        });
    });

    // Skills card hover effect
    document.querySelectorAll('.skills-category').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = '#26324b';
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '#23263a';
        });
    });

    // Experience card hover effect
    document.querySelectorAll('.experience-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.background = '#26324b';
        });
        card.addEventListener('mouseleave', () => {
            card.style.background = '#23263a';
        });
    });

    // Contact form validation and thank you message
    const visitorForm = document.getElementById('visitorForm');
    if (visitorForm) {
        visitorForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('visitorName').value.trim();
            const email = document.getElementById('visitorEmail').value.trim();
            const messageDiv = document.getElementById('formMessage');
            if (name.length < 2) {
                messageDiv.textContent = "Please enter a valid name.";
                messageDiv.style.color = "#ff4d4d";
                return;
            }
            if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
                messageDiv.textContent = "Please enter a valid email address.";
                messageDiv.style.color = "#ff4d4d";
                return;
            }
            messageDiv.textContent = "Thank you for visiting, " + name + "!";
            messageDiv.style.color = "#52b6ff";
            visitorForm.reset();
        });
    }

    // Add any other interactive elements here, like:
    // - Simple form validation for the contact page
    // - Dynamic loading of project details (if you choose that route)
    // - Animations on scroll (using libraries like AOS)
});