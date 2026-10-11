const SAMPLE_EVENTS = [
  { title: 'Yard Sale', description: 'Military items, clothing, books, bedding, tools, toys, and more.', date: 'Fri, Sep 25, 2026', time: '8:00 AM' },
  { title: 'Whatnot Show', description: 'Wacky, wild, and crazy chaos to end a work day. Come have fun chatting.', date: 'Tue, Sep 29, 2026', time: '10:00 PM', featured: true }
];

document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('eventList');
  if (!list) return;
  fetch('/api/events')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(events => render(events))
    .catch(() => render(SAMPLE_EVENTS));

  function render(events) {
    if (!events || !events.length) {
      list.innerHTML = '<p class="note">No upcoming events right now. Check back soon.</p>';
      return;
    }
    list.innerHTML = events.map(e => `
      <article class="event-card">
        <div class="event-date">${escapeHtml(e.date || e.event_date || '')}${e.time || e.event_time ? ' · ' + escapeHtml(e.time || e.event_time) : ''}</div>
        <div>
          <h3>${escapeHtml(e.title)}</h3>
          <p>${escapeHtml(e.description || '')}</p>
        </div>
      </article>
    `).join('');
  }
  function escapeHtml(v) { return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
});
