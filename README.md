# adidas Clone — EOSS Page

A pixel-perfect React clone of the adidas India EOSS (End of Season Sale) page with full routing.

## Tech Stack
- **React 18** — UI library
- **React Router DOM v7** — Client-side routing
- **Vite** — Build tool
- **CSS Modules** — Component-scoped CSS (one CSS file per component)

## Project Structure

```
src/
├── components/
│   ├── Navbar/          → Navbar.jsx + Navbar.css
│   ├── Footer/          → Footer.jsx + Footer.css
│   ├── HeroBanner/      → HeroBanner.jsx + HeroBanner.css
│   ├── OfferBanner/     → OfferBanner.jsx + OfferBanner.css
│   ├── CategoryGrid/    → CategoryGrid.jsx + CategoryGrid.css
│   ├── ProductCard/     → ProductCard.jsx + ProductCard.css
│   └── CountdownTimer/  → CountdownTimer.jsx + CountdownTimer.css
├── pages/
│   ├── Home/            → Home.jsx + Home.css
│   ├── Product/         → Product.jsx + Product.css
│   └── About/           → About.jsx + About.css
├── data/
│   └── products.js      → Product data & categories
├── App.jsx              → Route definitions only
├── main.jsx
└── index.css            → Global reset/base styles
```

## Routes

| Path | Page |
|------|------|
| `/home` | Home / EOSS Landing |
| `/product/:product_id` | Dynamic product detail |
| `/about` | About Adidas (via navbar dropdown only) |

## Features

- ✅ Auto-sliding hero banner with arrows & dots
- ✅ Hover image swap on product cards
- ✅ Live countdown timer
- ✅ Filter tabs (All / Men's / Women's / Originals / Sport)
- ✅ Size & color selector on product page
- ✅ Wishlist toggle (heart icon)
- ✅ Quick Add to Bag
- ✅ Accordion description sections
- ✅ Full navbar with dropdowns (About only via dropdown)
- ✅ Newsletter signup in footer
- ✅ Fully responsive (mobile, tablet, desktop)

## Running Locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo at vercel.com
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` handles SPA routing automatically.
