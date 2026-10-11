/* Homepage upcoming events sidebar */
document.addEventListener('DOMContentLoaded', () => {
  const section = document.getElementById('homeEventsSection');
  const cards = document.getElementById('homeEventCards');
  if (!section || !cards) return;
  fetch('/api/events')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(events => {
      if (!events || !events.length) return;
      section.hidden = false;
      cards.innerHTML = events.slice(0, 2).map(e => `
        <div style="margin-bottom:0.75rem">
          <strong style="font-size:0.9rem">${escapeHtml(e.title)}</strong><br>
          <span style="font-size:0.8rem;color:var(--muted)">${escapeHtml(e.date || e.event_date || '')}</span>
        </div>
      `).join('');
    })
    .catch(() => {});
  function escapeHtml(v) { return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
});
