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

- **Design System:** Exclusive **Dark Textured Green & White** visual hierarchy.
  - Primary Dark Forest Green (`#14452F`)
  - Deepest Evergreen (`#0B301F`) & Body Green (`#0F3D27`)
  - Crisp Architectural White Surfaces (`#FFFFFF`)
  - Dynamic Dark Green ASCII Character Background Field
- **Modern Geometric Typography:** Google Fonts pairings featuring **Outfit**, **Plus Jakarta Sans**, and **JetBrains Mono**.
- **Interactive Desk Mat:** Tactile Minicom speech widget with status cards, Google Search metrics, and interactive project previews.
- **Micro-Interactions:** Zero-shadow tactile pill buttons, card hover lift, and responsive accordion drawer systems.

---

## Site Structure & Subpages

The portfolio is structured as a high-performance Single Page Application (SPA) with dedicated, indexable subpages:

| Route | Page | Purpose & Content |
|---|---|---|
| `/` | **Home** | Interactive Executive Desk mat, Work Experience & Education timeline paper, and Frequently Asked Questions accordion. |
| `/work` | **Work** | Production case studies & live applications (*SEO & Analytics Dashboard*, *Web Analyzer Pro*, *Malicious JPEG Security Extension*, *Free LinkedIn Banner Collection*, *ImageForge*). |
| `/about` | **About** | Professional ethos, data & search mechanics manifesto, and Agile delivery credentials memo sheets. |
| `/skills` | **Skills** | Core competencies across *Marketing & SEO*, *Core Technologies*, *Project & Design*, and *Business & Analysis*. |
| `/articles`| **Articles** | Searchable digital marketing and sales library with category filters, pagination, and direct access to 100 deep-dive articles. |
| `/contact` | **Contact** | Integrated Web3Forms contact form with direct validation and social channel access. |

---

## Advanced SEO & Schema Markup

- **Schema.org Structured Data (JSON-LD):**
  - `@type: WebSite` & `@type: ProfilePage` on the Home page.
  - `@type: CollectionPage` on the Work and Articles pages.
  - `@type: AboutPage` on the About page.
  - `@type: ContactPage` on the Contact page.
  - Semantic `@type: BreadcrumbList` microdata on all subpages for rich search engine result snippets.
- **GitHub Pages SPA Routing:** Configured with `public/404.html` and query redirect handling to support direct URL access, refreshes, and deep links without 404 errors.
- **Automated Sitemaps & Robots:** XML sitemaps (`sitemap.xml`, `sitemap-pages.xml`, `sitemap-blog.xml`) with updated priority indices and clean canonical links.

---

## Tech Stack

- **Framework:** React 19 + React Router DOM v7
- **Bundler:** Vite 8 (ESM build with lightning-fast HMR)
- **Head & SEO:** React Helmet Async
- **Icons:** Phosphor Icons (SVG / Web Font)
- **Styling:** Vanilla CSS (`src/shelbyStyle.css`) with modular design tokens and zero heavy UI frameworks
- **Deployment:** GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

---

## Local Development

### Prerequisites
- Node.js (v18 or higher recommended)
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

This project is open-source and available under the [MIT License](LICENSE).
