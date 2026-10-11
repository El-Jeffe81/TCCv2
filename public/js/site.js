document.addEventListener('DOMContentLoaded', () => {
  // Load header & footer partials
  Promise.all([
    fetch('/partials/header.html').then(r => r.text()),
    fetch('/partials/footer.html').then(r => r.text())
  ]).then(([header, footer]) => {
    document.getElementById('site-header').innerHTML = header;
    document.getElementById('site-footer').innerHTML = footer;
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navigation');
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
    // Mark current page
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(a => {
      if (a.getAttribute('href').includes(path) || (path === '' && a.getAttribute('href') === '/')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }).catch(() => {});
});

// Theme image fallbacks (used by shop.js when no photo)
window.themeImages = { placeholder: '/assets/favicon.svg' };
