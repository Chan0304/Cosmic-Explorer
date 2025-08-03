// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200,
    once: true,
    offset: 100
});

// Global Variables
let isMusicPlaying = false;
let isMeditationActive = false;
let breathingInterval;
let currentBreathCount = 4;
let isInhaling = true;

// DOM Elements
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');
const startMeditationBtn = document.getElementById('startMeditation');
const resetMeditationBtn = document.getElementById('resetMeditation');
const breathingCircle = document.getElementById('breathingCircle');
const breathingText = document.getElementById('breathingText');
const breathingTimer = document.getElementById('breathingTimer');
const cosmicParticles = document.getElementById('cosmicParticles');
const cosmicCursor = document.getElementById('cosmicCursor');

// Music Controls
if (musicToggle && backgroundMusic) {
    musicToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            isMusicPlaying = false;
        } else {
            backgroundMusic.play().catch(e => {
                console.log('Audio play failed:', e);
                // Fallback for browsers that block autoplay
                showNotification('Click the music button to enable audio', 'info');
            });
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
            isMusicPlaying = true;
        }
    });
}

// Navigation
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Smooth scrolling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        link.classList.add('active');
        
        // Close mobile menu
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Mobile menu toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Update active navigation based on scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Meditation Controls
if (startMeditationBtn && breathingCircle) {
    startMeditationBtn.addEventListener('click', () => {
        if (!isMeditationActive) {
            startMeditation();
            startMeditationBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
            isMeditationActive = true;
        } else {
            pauseMeditation();
            startMeditationBtn.innerHTML = '<i class="fas fa-play"></i><span>Resume</span>';
            isMeditationActive = false;
        }
    });
}

if (resetMeditationBtn) {
    resetMeditationBtn.addEventListener('click', () => {
        resetMeditation();
    });
}

function startMeditation() {
    currentBreathCount = 4;
    isInhaling = true;
    
    breathingInterval = setInterval(() => {
        if (isInhaling) {
            breathingText.textContent = 'Breathe In';
            breathingCircle.style.transform = 'scale(1.2)';
            breathingCircle.style.borderColor = '#00ffe1';
            breathingTimer.textContent = currentBreathCount;
            currentBreathCount--;
            
            if (currentBreathCount < 0) {
                isInhaling = false;
                currentBreathCount = 4;
            }
        } else {
            breathingText.textContent = 'Breathe Out';
            breathingCircle.style.transform = 'scale(1)';
            breathingCircle.style.borderColor = '#ff9aff';
            breathingTimer.textContent = currentBreathCount;
            currentBreathCount--;
            
            if (currentBreathCount < 0) {
                isInhaling = true;
                currentBreathCount = 4;
            }
        }
    }, 1000);
    
    createCosmicParticles();
}

function pauseMeditation() {
    clearInterval(breathingInterval);
    breathingCircle.style.animationPlayState = 'paused';
}

function resetMeditation() {
    clearInterval(breathingInterval);
    breathingText.textContent = 'Breathe In';
    breathingTimer.textContent = '4';
    breathingCircle.style.transform = 'scale(1)';
    breathingCircle.style.borderColor = '#00ffe1';
    startMeditationBtn.innerHTML = '<i class="fas fa-play"></i><span>Start Meditation</span>';
    isMeditationActive = false;
}

// Cosmic Particles
function createCosmicParticles() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #00ffe1;
        border-radius: 50%;
        pointer-events: none;
        animation: particleFloat 3s ease-out forwards;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = Math.random() * window.innerHeight + 'px';
    
    cosmicParticles.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 3000);
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Cosmic Cursor
document.addEventListener('mousemove', (e) => {
    if (cosmicCursor) {
        cosmicCursor.style.left = e.clientX + 'px';
        cosmicCursor.style.top = e.clientY + 'px';
    }
});

// Interactive Functions
function startJourney() {
    showNotification('Welcome to your cosmic journey! ✨', 'success');
    document.querySelector('#explore').scrollIntoView({ behavior: 'smooth' });
}

function exploreGalaxy() {
    showNotification('Exploring the infinite cosmos... 🌌', 'info');
    createCosmicParticles();
}

function startLunarMeditation() {
    showNotification('Connecting with lunar energy... 🌙', 'success');
    document.querySelector('#meditation').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
        if (!isMeditationActive) {
            startMeditation();
            startMeditationBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pause</span>';
            isMeditationActive = true;
        }
    }, 1000);
}

function startStellarConnection() {
    showNotification('Aligning with stellar energy... ⭐', 'success');
    createCosmicParticles();
}

function accessWisdom() {
    showNotification('Accessing ancient cosmic wisdom... 🧘', 'info');
    document.querySelector('#wisdom').scrollIntoView({ behavior: 'smooth' });
}

function getNewWisdom() {
    const wisdomQuotes = [
        {
            text: "The universe is not outside of you. Look inside yourself; everything that you want, you already are.",
            author: "Cosmic Wisdom"
        },
        {
            text: "Energy flows where attention goes. Focus on the light, and the light will grow.",
            author: "Energy Healing"
        },
        {
            text: "In the vastness of space and the immensity of time, it is my joy to share a planet and an epoch with you.",
            author: "Carl Sagan"
        },
        {
            text: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
            author: "Cosmic Connection"
        },
        {
            text: "Everything in this universe is a reflection of you. Within you lies the energy of stars, galaxies, and infinite potential.",
            author: "The Cosmic Energy"
        },
        {
            text: "The moment you let go of resistance, life begins to flow effortlessly. The universe always has your back.",
            author: "Cosmic Wisdom"
        },
        {
            text: "Within silence, there is clarity. The cosmic voice whispers only to those who listen deeply.",
            author: "Ancient Wisdom"
        },
        {
            text: "You are not a drop in the ocean. You are the entire ocean in a drop.",
            author: "Rumi"
        }
    ];
    
    const randomQuote = wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)];
    const wisdomQuote = document.getElementById('wisdomQuote');
    
    if (wisdomQuote) {
        wisdomQuote.style.opacity = '0';
        setTimeout(() => {
            wisdomQuote.querySelector('blockquote').textContent = randomQuote.text;
            wisdomQuote.querySelector('cite').textContent = `- ${randomQuote.author}`;
            wisdomQuote.style.opacity = '1';
        }, 300);
    }
    
    showNotification('New wisdom revealed! ✨', 'success');
    createCosmicParticles();
}

function joinCommunity() {
    showNotification('Welcome to the Cosmic Community! 🌟', 'success');
    createCosmicParticles();
}

function viewEvents() {
    showNotification('Loading cosmic events... 📅', 'info');
    setTimeout(() => {
        showNotification('Events loaded! Check your cosmic calendar ✨', 'success');
    }, 1500);
}

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification(`Thank you for your cosmic message, ${name}! ✨\nWe'll respond to ${email} within 24 hours.`, 'success');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.9);
            border: 1px solid #00ffe1;
            border-radius: 10px;
            padding: 1rem 1.5rem;
            color: #ffffff;
            z-index: 10000;
            backdrop-filter: blur(10px);
            animation: slideIn 0.3s ease-out;
        }
        
        .notification.success {
            border-color: #00ff88;
        }
        
        .notification.info {
            border-color: #00ffe1;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: #ffffff;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(-50%) translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        notificationStyle.id = 'notification-styles';
        document.head.appendChild(notificationStyle);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
}

// Interactive Click Effects
document.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 255, 225, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        animation: rippleEffect 0.6s ease-out forwards;
    `;
    
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Create cosmic particles on click
    createCosmicParticles();
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(20);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax Effect for Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.stars, .twinkling, .clouds, .nebula');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Auto-hide navigation on scroll down
let lastScrollTop = 0;
const navbar = document.querySelector('.cosmic-nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Initialize cosmic effects
document.addEventListener('DOMContentLoaded', () => {
    // Create initial cosmic particles
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createCosmicParticles();
        }, i * 200);
    }
    
    // Welcome message
    setTimeout(() => {
        showNotification('Welcome to the Cosmic Galaxy! ✨', 'success');
    }, 1000);
});

// Console welcome message
console.log('✨ Cosmic Galaxy Website Loaded Successfully! ✨');
console.log('May the cosmic forces guide your journey through this digital realm.');
