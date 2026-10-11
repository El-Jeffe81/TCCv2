document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-content-src]').forEach(block => {
    const src = block.getAttribute('data-content-src');
    if (!src) return;
    fetch(src)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) return;
        block.querySelectorAll('[data-field]').forEach(el => {
          const key = el.getAttribute('data-field');
          const val = data[key];
          if (val == null) return;
          if (Array.isArray(val)) {
            el.innerHTML = val.map(p => `<p>${escapeHtml(p)}</p>`).join('');
          } else if (typeof val === 'string') {
            el.textContent = val;
          }
        });
      })
      .catch(() => {});
  });
});

function escapeHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
