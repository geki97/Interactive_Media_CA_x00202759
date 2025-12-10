// ===== MAIN JAVASCRIPT FILE =====
// Dynamic content and enhanced interactivity for the portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');

    // ===== 1. TYPING EFFECT FOR HERO TAGLINE =====
    const typingText = document.getElementById('typingText');
    const phrases = [
        'Building innovative solutions with code',
        'Turning ideas into reality',
        'Cloud computing enthusiast',
        'Full-stack developer'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && charIndex < currentPhrase.length) {
            typingText.textContent += currentPhrase[charIndex];
            charIndex++;
            setTimeout(type, 50);
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            setTimeout(type, 30);
        } else if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(type, 500);
        }
    }

    // Start typing effect
    setTimeout(type, 500);

    // ===== 2. SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Only prevent default for internal links
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ===== 3. ANIMATE PROGRESS BARS ON SCROLL =====
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.width = percent + '%';
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => progressObserver.observe(bar));

    // ===== 4. FORM VALIDATION =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Bootstrap validation
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
            } else {
                // Form is valid
                const formData = {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    message: document.getElementById('message').value
                };

                // Log form data (in production, send to server)
                console.log('Form submitted:', formData);

                // Show success message
                const successMsg = document.getElementById('formSuccess');
                successMsg.classList.remove('d-none');
                
                // Reset form
                this.reset();
                this.classList.remove('was-validated');

                // Hide success message after 3 seconds
                setTimeout(() => {
                    successMsg.classList.add('d-none');
                }, 3000);
            }
        });
    }

    // ===== 5. DOWNLOAD CV FUNCTIONALITY =====
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', function() {
            // Create a simple CV download (in production, link to actual CV file)
            console.log('CV download triggered');
            alert('CV download functionality would be implemented here. \nIn production, this would trigger a download of your actual CV file.');
        });
    }

    // ===== 6. ACTIVE NAVBAR LINK ON SCROLL =====
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // ===== 7. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Apply fade-in observer to cards and sections
    const cardElements = document.querySelectorAll('.card, .hobby-item');
    cardElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeInObserver.observe(el);
    });

    // ===== 8. TOOLTIP INITIALIZATION =====
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ===== 9. MODAL ANIMATIONS =====
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            this.querySelector('.modal-content').style.animation = 'slideInUp 0.3s ease-out';
        });
    });

    // ===== 10. LAZY LOADING IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== 11. SMOOTH PARALLAX ON HERO SECTION =====
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const scrollPos = window.scrollY;
            heroSection.style.backgroundPosition = `0 ${scrollPos * 0.5}px`;
        }
    });

    // ===== 12. KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const modals = document.querySelectorAll('.modal.show');
            modals.forEach(modal => {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            });
        }
    });

    console.log('All interactive features initialized successfully');
});
