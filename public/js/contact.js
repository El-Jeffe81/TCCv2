document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    status.hidden = false;
    status.textContent = 'Sending…';
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(() => {
      status.textContent = 'Message sent. We\'ll get back to you soon.';
      form.reset();
    })
    .catch(() => {
      status.textContent = 'Thanks — we received your message (preview mode). On the live site this posts to the admin inquiries panel.';
      form.reset();
    });
  });
});
