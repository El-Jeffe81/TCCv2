# TCCv2 — Teal Castle Co (Modern Redesign)

Professional, modern redesign of the Teal Castle Co storefront.

**This is the preview / lock-in version for GitHub Pages.**  
Full dynamic features (admin, inventory CRUD, events, inquiries, playlist, content editing) use the same D1 SQL schema and Cloudflare Pages Functions as the original TealCastleCo repo. Once the design is locked, point the Cloudflare domain at this repo (or deploy it as a Pages project) to restore live inventory, admin, and backend behavior.

## Features preserved
- Homepage, About, Shop, Events, Contact, Policies, Product detail
- Marketplace links (Whatnot, eBay, Vinted, Mercari)
- Content-editable fields (`data-content-src` / `data-field`)
- Category filters and product cards on Shop
- Contact form structure
- Inventory schema: see `db/schema.sql` (identical core tables)
- Same API paths expected (`/api/items`, `/api/content/...`, `/api/events`, etc.)

## GitHub Pages preview
1. Go to the repo Settings → Pages.
2. Source: Deploy from a branch → `main` → `/ (root)`.
3. Site will be at `https://el-jeffe81.github.io/TCCv2/`.

Shop and Events show sample data when the Cloudflare API is not present (so the preview looks complete).

## Next steps for production
- Copy or link the `functions/` directory and Cloudflare bindings (D1, R2) from the original TealCastleCo project.
- Update domain DNS / Cloudflare Pages project pointer to this repo.
- Admin remains gated by Cloudflare Access as before.

See original `TealCastleCo` repo for full ADMIN-SETUP, functions, and migration history. Do not modify that repo.
