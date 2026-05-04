(function() {
    // Mobile menu
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    menuToggle.addEventListener('click', () => {
      if (!mobileMenu.innerHTML) {
        mobileMenu.innerHTML = `
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#certificates">Certificates</a>
          <a href="#experience">Journey</a>
          <a href="#contact">Contact</a>
          <a href="resume.pdf" download>📄 Resume</a>
        `;
      }
      mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Back to top
    const btt = document.getElementById('backToTop');
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Contact form
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const el = document.getElementById('formSuccess');
      el.innerText = '✓ Message received — I\'ll get back to you soon!';
      setTimeout(() => el.innerText = '', 4000);
      e.target.reset();
    });

    // Fade-in on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  })();
 
