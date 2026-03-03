// script.js
(function() {
  // mobile
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  menuToggle.addEventListener('click', () => {
    if (!mobileMenu.innerHTML) {
      mobileMenu.innerHTML = `
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#certificates">Certificate</a>
        <a href="#contact">Contact</a>
        <a href="Rohit%20Ushkoyal.pdf" download>📄 Resume</a>
      `;
    }
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // back to top
  const btt = document.getElementById('backToTop');
  window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // contact mock
  document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('formSuccess').innerText = '✓ message received (demo)';
    setTimeout(() => document.getElementById('formSuccess').innerText = '', 3000);
  });
})();
