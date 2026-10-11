document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const root = document.getElementById('productDetail');
  if (!id || !root) {
    root.innerHTML = '<p class="note">Product not found.</p>';
    return;
  }
  fetch(`/api/items/${id}`)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(item => render(item))
    .catch(() => {
      // Sample fallback
      const samples = {
        '1': { title: 'Disney MMA Dumbo Loungefly Set', description: 'Park exclusive set with ears, plush, and pin. New with tags.', price: 185, category: 'Loungefly', links: [{name:'Vinted',url:'#'},{name:'eBay',url:'#'}] },
        '2': { title: 'Cardew Alice in Wonderland Tea Set', description: 'Whimsical 5-piece ceramic tea set.', price: 150, category: 'Antiques', links: [] }
      };
      if (samples[id]) render(samples[id]);
      else root.innerHTML = '<p class="note">This item is not available in the preview. On the live site it loads from inventory.</p>';
    });

  function render(item) {
    const price = item.price != null ? `$${Number(item.price).toFixed(2)}` : '';
    const links = (item.links || []).map(l => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="product-link-pill">${escapeHtml(l.name)}</a>`).join('');
    root.innerHTML = `
      <div class="product-detail-inner">
        <div class="gallery">
          <div class="product-photo-placeholder" style="aspect-ratio:1;display:grid;place-items:center;color:var(--muted)">Photo</div>
        </div>
        <div>
          <p class="product-category">${escapeHtml(item.category || '')}</p>
          <h1>${escapeHtml(item.title)}</h1>
          ${price ? `<p class="product-price" style="font-size:1.25rem">${price}</p>` : ''}
          <p>${escapeHtml(item.description || '')}</p>
          ${links ? `<div class="product-links" style="margin-top:1.25rem">${links}</div>` : ''}
          <p style="margin-top:1.5rem;font-size:0.9rem;color:var(--muted)">Also available on our marketplace shops. Message us via Contact if you have questions.</p>
        </div>
      </div>`;
  }
  function escapeHtml(v) { return String(v || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
});
