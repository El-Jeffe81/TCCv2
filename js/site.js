document.addEventListener('DOMContentLoaded', () => {
  Promise.all([
    fetch('partials/header.html').then(r => r.text()),
    fetch('partials/footer.html').then(r => r.text())
  ]).then(([header, footer]) => {
    document.getElementById('site-header').innerHTML = header;
    document.getElementById('site-footer').innerHTML = footer;
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('navigation');
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (path === 'index.html' && href === '/') || (path === '' && href === '/')) {
        a.setAttribute('aria-current', 'page');
      }
    });
  }).catch(() => {});
});

window.themeImages = { placeholder: 'assets/favicon.svg' };
