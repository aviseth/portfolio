// Main Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize navigation highlighting
    initNavigationHighlighting();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize typing animation
    initTypingAnimation();
});

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.section, .job-card, .project-card, .skill-category, .education-item');
    animatableElements.forEach(el => {
        el.classList.add('animate-fade-in');
        observer.observe(el);
    });
}

function initNavigationHighlighting() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section nav link
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function initInteractiveElements() {
    // Add hover effects to skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.project-link')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-5px) scale(1)';
                }, 150);
            }
        });
    });
    
    // Add parallax effect to header
    initParallaxEffect();
    
    // Add floating animations to decorative elements
    initFloatingAnimations();
}

function initParallaxEffect() {
    const header = document.querySelector('.main-header');
    const headerContent = document.querySelector('.header-content');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.3;
        
        if (headerContent) {
            headerContent.style.transform = `translateY(${parallax}px)`;
        }
    });
}

function initFloatingAnimations() {
    const decorativeElements = document.querySelectorAll('.title-decoration, .header-ornament, .title-ornament');
    
    decorativeElements.forEach((element, index) => {
        element.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        element.style.animationDelay = `${index * 0.2}s`;
    });
}

function initTypingAnimation() {
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    
    // Clear the text
    subtitle.textContent = '';
    
    // Type out the text
    let i = 0;
    const typeWriter = setInterval(() => {
        subtitle.textContent += originalText.charAt(i);
        i++;
        
        if (i >= originalText.length) {
            clearInterval(typeWriter);
            // Add blinking cursor
            subtitle.innerHTML += '<span class="cursor">|</span>';
        }
    }, 100);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .animate-fade-in.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: var(--primary-gold) !important;
    }
    
    .nav-link.active::after {
        width: 80% !important;
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
    
    .cursor {
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% {
            opacity: 1;
        }
        51%, 100% {
            opacity: 0;
        }
    }
    
    .skill-tag {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .project-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .contact-item:hover {
        animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;
document.head.appendChild(style);

// Add Easter eggs
let clickCount = 0;
document.querySelector('.main-title').addEventListener('click', function() {
    clickCount++;
    if (clickCount === 5) {
        this.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            this.style.animation = '';
        }, 2000);
        clickCount = 0;
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { color: var(--ivory); }
        16% { color: #ff0000; }
        32% { color: #ff8000; }
        48% { color: #ffff00; }
        64% { color: #00ff00; }
        80% { color: #0080ff; }
        100% { color: var(--ivory); }
    }
`;
document.head.appendChild(rainbowStyle);

// Performance optimization - lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}