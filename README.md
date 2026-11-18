# Udith Babu K N — Executive Portfolio & Marketing Hub

Welcome to the official repository for the personal portfolio, business analysis showcase, and digital marketing knowledge hub of **Udith Babu K N**.

**Live Site:** [udithbabukn.github.io](https://udithbabukn.github.io/)

---

## About Me

I am a **Marketing & Sales Executive** and **IT Business Analyst** based in Kerala, India, holding a dual academic foundation:
- **MBA (Operations & Marketing)** — College of Engineering Thalassery (7.29 CGPA)
- **B.Tech (Information Technology)** — College of Engineering Thalassery (7.84 CGPA)
- **Industry Credentials:** JPMorgan Chase Agile Job Simulation (Forage) & micro1 Business Analyst AI Certified

I specialize in technical SEO audits, search intent architecture, Google Search Console organic scaling (350+ daily peak clicks), data pipeline automation with Python & MySQL, and cross-functional Agile Scrum project delivery.

---

## Architectural & Design Aesthetic

- **Design System:** High-contrast monochrome cards (`#FFFFFF` / `#000000`) with brutalist `2px` borders and hard shadows set over an interactive WebGL fluid canvas (`olivasky.png`).
- **Modern Geometric Typography:** Google Fonts pairings featuring **Outfit**, **Plus Jakarta Sans**, and **JetBrains Mono**.
- **Interactive Desk Mat:** Tactile Minicom speech widget with status cards, Google Search metrics, and interactive project previews.
- **Micro-Interactions:** Tactile pill navigation, tilted desk cards that straighten on hover, and responsive accordion drawer systems.

---

## Site Structure & Subpages

The portfolio is structured as a high-performance Single Page Application (SPA) with dedicated, indexable subpages:

| Route | Page | Purpose & Content |
|---|---|---|
| `/` | **Home** | Interactive Executive Desk mat, Work Experience & Education timeline paper, and Frequently Asked Questions accordion. |
| `/work` | **Work** | Production case studies & live applications (*SEO & Analytics Dashboard*, *Web Analyzer Pro*, *Malicious JPEG Security Extension*, *Free LinkedIn Banner Collection*, *ImageForge*). |
| `/about` | **About** | Professional ethos, data & search mechanics manifesto, and Agile delivery credentials memo sheets. |
| `/skills` | **Skills** | Core competencies across *Marketing & SEO*, *Core Technologies*, *Project & Design*, and *Business & Analysis*. |
| `/blog` | **Blog** | Searchable digital marketing and sales library with category filters, pagination, and direct access to 150 deep-dive static HTML articles. |
| `/contact` | **Contact** | Integrated Web3Forms contact form with direct validation and social channel access. |

---

## Modern Web Platform & SEO Architecture

- **Native HTML & CSS Primitives:**
  - Native `<dialog>` legal modals (`showModal()`, `closedby="any"` with Safari bounds fallback, and `overscroll-behavior: contain` backdrop scroll locking).
  - Native `<details>` / `<summary>` FAQ accordion with `::details-content` progressive animations (`prefers-reduced-motion` aware).
  - Post-interaction form validation via `:user-invalid` / `:user-valid`, `autocomplete`, and synced `aria-invalid` / `aria-describedby`.
  - Off-screen blog card deferral using `content-visibility: auto` paired with `contain-intrinsic-size`.
  - Idle-pausing WebGL fluid canvas (`src/components/LiquidBackground.jsx`).
- **Schema.org Structured Data (JSON-LD):**
  - `@type: ProfilePage` (in `index.html`) & `@type: FAQPage` on the Home page.
  - `@type: CollectionPage` on the Work page and `CollectionPage` / `Blog` on `/blog`.
  - `@type: AboutPage` on `/about` and `@type: ContactPage` on `/contact`.
  - Semantic `@type: BreadcrumbList` microdata across subpages.
- **Routing, PWA & Discovery:**
  - GitHub Pages SPA fallback (`public/404.html`) + Workbox service worker (`vite-plugin-pwa`) configured to pass `/blog/*.html` directly to static articles.
  - XML sitemaps (`sitemap.xml`, `sitemap-pages.xml`, `sitemap-blog.xml`), RSS feed (`rss.xml`), `robots.txt`, `llms.txt`, `.well-known/ard.json`, and in-browser WebMCP tools (`src/utils/webmcp.js`).

---

## Tech Stack

- **Framework:** React 19 + React Router DOM v7
- **Bundler & PWA:** Vite 8 + `vite-plugin-pwa` (Workbox)
- **Head & SEO:** React Helmet Async
- **Icons:** Custom inline SVG component (`src/components/Icons.jsx`) + Phosphor Icons on static blog pages
- **Styling:** Vanilla CSS (`src/shelbyStyle.css` and `public/style.css`) with zero heavy UI frameworks
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`, running lint + build on push to `main`)

---

## Local Development

### Prerequisites
- Node.js `22+` (or `20.19+`, required by Vite 8 and ESLint 10)
- npm

### Setup & Run
```bash
# 1. Clone the repository
git clone https://github.com/UdithBabuKN/udithbabukn.github.io.git
cd udithbabukn.github.io

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Linting
```bash
# Run ESLint checks
npm run lint

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## License

This project is open-source under the MIT License.
