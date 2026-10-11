let allItems = [];
let activeCategory = 'All';

const SAMPLE_ITEMS = [
  {
    id: 1, title: 'Disney MMA Dumbo Loungefly Set', category: 'Loungefly',
    description: 'Park exclusive set with ears, plush, and pin. New with tags.',
    price: 185, status: 'Available',
    links: [{ name: 'Vinted', url: 'https://www.vinted.com/member/3141166464-tealcastleco' }, { name: 'eBay', url: 'https://ebay.io/m/ur5Oqp' }],
    photos: []
  },
  {
    id: 2, title: 'Cardew Alice in Wonderland Tea Set', category: 'Antiques',
    description: 'Whimsical 5-piece ceramic tea set featuring Cheshire Cat, Alice, and friends.',
    price: 150, status: 'Available',
    links: [{ name: 'Whatnot', url: 'https://whatnot.com/s/Nlh1KbSX' }],
    photos: []
  },
  {
    id: 3, title: 'Winnie the Pooh Socks', category: 'Disney',
    description: 'Soft character socks — Pooh, Tigger, and Piglet.',
    price: 18, status: 'Available',
    links: [{ name: 'Whatnot', url: 'https://whatnot.com/s/Nlh1KbSX' }],
    photos: []
  },
  {
    id: 4, title: 'Silver Sequin Loungefly', category: 'Loungefly',
    description: 'NWT silver sequin Disney Loungefly. Display only.',
    price: 225, status: 'Available',
    links: [{ name: 'Vinted', url: 'https://www.vinted.com/member/3141166464-tealcastleco' }],
    photos: []
  }
];

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/items')
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(items => { allItems = Array.isArray(items) ? items : []; })
    .catch(() => { allItems = SAMPLE_ITEMS; })
    .finally(() => { renderFilters(); renderGrid(); });

  const grid = document.getElementById('itemGrid');
  if (grid) {
    grid.addEventListener('click', e => {
      if (e.target.closest('[data-stop-card-link]')) return;
      const card = e.target.closest('.product-card');
      if (card) location.href = card.dataset.href;
    });
  }
});

function renderFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;
  const cats = [...new Set(allItems.map(i => (i.category || '').trim()).filter(Boolean))].sort();
  if (cats.length < 2) { container.hidden = true; return; }
  const buttons = ['All', ...cats];
  container.innerHTML = buttons.map(c =>
    `<button class="filter-pill${c === activeCategory ? ' active' : ''}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`
  ).join('');
  container.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.category;
      container.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGrid();
    });
  });
  container.hidden = false;
}

function renderGrid() {
  const grid = document.getElementById('itemGrid');
  if (!grid) return;
  const visible = activeCategory === 'All' ? allItems : allItems.filter(i => (i.category || '').trim() === activeCategory);
  if (!visible.length) {
    grid.innerHTML = '<p class="note">Nothing in this category yet.</p>';
    return;
  }
  grid.innerHTML = visible.map(renderCard).join('');
}

function renderCard(item) {
  const photo = (item.photos && item.photos[0]) || null;
  const price = item.price != null ? `$${Number(item.price).toFixed(2)}` : '';
  const links = item.links || [];
  return `
    <div class="product-card" data-href="product.html?id=${item.id}" tabindex="0" role="link">
      <div class="product-photo">
        ${photo ? `<img src="${photo}" alt="">` : '<div class="product-photo-placeholder">Teal Castle Co</div>'}
        ${item.status && item.status !== 'Available' ? `<span class="status-pill">${escapeHtml(item.status)}</span>` : ''}
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      ${item.category ? `<p class="product-category">${escapeHtml(item.category)}</p>` : ''}
      ${price ? `<p class="product-price">${price}</p>` : ''}
      ${item.description ? `<p class="product-description">${escapeHtml(item.description)}</p>` : ''}
      ${links.length ? `<div class="product-links">${links.map(l => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="product-link-pill" data-stop-card-link>${escapeHtml(l.name)}</a>`).join('')}</div>` : ''}
    </div>`;
}

function escapeHtml(v) {
  return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
