// script.js - Complete Portfolio Functionality

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all features
  initTypingEffect();
  initThemeToggle();
  initMobileMenu();
  initScrollProgress();
  initParticles();
  initSkillBars();
  initTabs();
  initContactForm();
  initBackToTop();
  initScrollAnimations();
  initGitHubStats();
});

// 1. Typing Effect
function initTypingEffect() {
  const typedText = document.getElementById('typed-text');
  const cursor = document.querySelector('.cursor');
  const text = "Building Digital Experiences with Code & Creativity";
  
  let charIndex = 0;
  let isDeleting = false;
  let isTyping = true;
  
  function typeWriter() {
    const currentText = typedText.textContent;
    
    if (!isDeleting && charIndex < text.length) {
      typedText.textContent = currentText + text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else if (!isDeleting && charIndex === text.length) {
      isTyping = false;
      // Start cursor blink after typing completes
      setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
      }, 500);
    }
  }
  
  // Start typing after a short delay
  setTimeout(typeWriter, 800);
}

// 2. Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const mobileThemeToggle = document.getElementById('mobileThemeToggle');
  const themeIcon = themeToggle.querySelector('i');
  const mobileThemeIcon = mobileThemeToggle.querySelector('i');
  
  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const newTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    mobileThemeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Dispatch custom event for theme change
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: newTheme }));
  }
  
  themeToggle.addEventListener('click', toggleTheme);
  mobileThemeToggle.addEventListener('click', toggleTheme);
  
  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
  mobileThemeIcon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
}

// 3. Mobile Menu
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = menuToggle.querySelector('i');
  
  menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuIcon.className = mobileMenu.classList.contains('active') 
      ? 'fas fa-times' 
      : 'fas fa-bars';
  });
  
  // Close menu when clicking on a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      menuIcon.className = 'fas fa-bars';
    });
  });
}

// 4. Scroll Progress Bar
function initScrollProgress() {
  const scrollProgress = document.getElementById('scrollProgress');
  
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });
}

// 5. Particle Background
function initParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
  
  function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.5 + 0.1;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;
    
    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = opacity;
    particle.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;
    
    // Random color based on theme
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const colors = isLight 
      ? ['rgba(99, 102, 241, 0.1)', 'rgba(6, 182, 212, 0.1)', 'rgba(139, 92, 246, 0.1)']
      : ['rgba(99, 102, 241, 0.2)', 'rgba(6, 182, 212, 0.2)', 'rgba(139, 92, 246, 0.2)'];
    
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    
    container.appendChild(particle);
    
    // Recreate particle after animation completes
    setTimeout(() => {
      particle.remove();
      createParticle(container);
    }, (duration + delay) * 1000);
  }
  
  // Update particles on theme change
  document.addEventListener('themeChanged', () => {
    particlesContainer.innerHTML = '';
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }
  });
}

// 6. Animated Skill Bars
function initSkillBars() {
  const skillLevels = document.querySelectorAll('.skill-level');
  
  function animateSkillBars() {
    skillLevels.forEach(skill => {
      const level = skill.getAttribute('data-level');
      if (isElementInViewport(skill)) {
        skill.style.width = `${level}%`;
      }
    });
  }
  
  // Initial animation
  setTimeout(animateSkillBars, 500);
  
  // Animate on scroll
  window.addEventListener('scroll', animateSkillBars);
}

// 7. Tab System
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      
      // Update active button
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show active content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });
}

// 8. Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset errors
    clearErrors();
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    // Validation
    let isValid = true;
    
    if (!formData.name) {
      showError('nameError', 'Name is required');
      isValid = false;
    }
    
    if (!formData.email) {
      showError('emailError', 'Email is required');
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      showError('emailError', 'Please enter a valid email');
      isValid = false;
    }
    
    if (!formData.message) {
      showError('messageError', 'Message is required');
      isValid = false;
    }
    
    if (!isValid) return;
    
    // Simulate form submission (replace with actual API call)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    successMessage.classList.add('active');
    
    // Reset form
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove('active');
    }, 5000);
  });
  
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
  }
  
  function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
    });
  }
  
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// 9. Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}



// 11. Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.project-card, .stat-card, .skills-category, .experience-card, .timeline-item');
  
  function checkScroll() {
    animatedElements.forEach(element => {
      if (isElementInViewport(element)) {
        element.classList.add('animated');
      }
    });
  }
  
  // Initial check
  checkScroll();
  
  // Check on scroll
  window.addEventListener('scroll', checkScroll);
}

// 12. GitHub Stats Animation
function initGitHubStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      if (isElementInViewport(stat)) {
        const target = parseInt(stat.textContent.replace('+', ''));
        if (!stat.hasAttribute('data-animated')) {
          animateValue(stat, 0, target, 2000);
          stat.setAttribute('data-animated', 'true');
        }
      }
    });
  }
  
  // Initial check
  animateStats();
  
  // Check on scroll
  window.addEventListener('scroll', animateStats);
}

// Utility Functions
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  const originalText = element.textContent;
  const hasPlus = originalText.includes('+');
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = hasPlus && progress === 1 ? `${currentValue}+` : currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(15, 23, 42, 0.95)';
    header.style.backdropFilter = 'blur(15px)';
  } else {
    header.style.background = 'rgba(15, 23, 42, 0.9)';
    header.style.backdropFilter = 'blur(10px)';
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + / to show shortcuts
  if ((e.ctrlKey || e.metaKey) && e.key === '/') {
    e.preventDefault();
    alert('Keyboard Shortcuts:\n\n' +
          '? - Show this help\n' +
          'h - Scroll to Home\n' +
          'p - Scroll to Projects\n' +
          's - Scroll to Skills\n' +
          'e - Scroll to Experience\n' +
          'c - Scroll to Contact\n' +
          't - Toggle theme\n' +
          'Escape - Close mobile menu');
  }
  
  // Single key shortcuts
  if (!e.ctrlKey && !e.metaKey && !e.altKey) {
    switch(e.key.toLowerCase()) {
      case '?':
        alert('Keyboard shortcuts enabled!\nPress Ctrl+/ for help.');
        break;
      case 'h':
        document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'p':
        document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
        break;
      case 's':
        document.querySelector('#skills').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'e':
        document.querySelector('#experience').scrollIntoView({ behavior: 'smooth' });
        break;
      case 'c':
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        break;
      case 't':
        document.getElementById('themeToggle').click();
        break;
      case 'escape':
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu.classList.contains('active')) {
          document.getElementById('menuToggle').click();
        }
        break;
    }
  }
});

// Console greeting
console.log('%c👋 Hello! Welcome to my portfolio!', 'color: #6366f1; font-size: 18px; font-weight: bold;');
console.log('%c🚀 Built with modern web technologies', 'color: #06b6d4; font-size: 14px;');

console.log('%c💡 Tips: Try keyboard shortcuts (press ?)', 'color: #10b981; font-size: 14px;');

