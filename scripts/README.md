# Automated Growth Engineering Scripts

This directory houses the deterministic content generation, cover rendering, SEO telemetry, and verification suites for the 150-article B2B Growth Architecture ecosystem.

---

## 1. Flagship Cover Image Pipeline (Pure Black & White / 0.000 Saturation)

Generates 1344x768 WebP cover graphics adhering to the Swiss Modernist / Monochrome architectural design standard:
- **100% Pure White Background**: `RGB(255, 255, 255)` / `#FFFFFF`.
- **True Mathematical Monochrome**: \(R = G = B\) across all pixels (zero color saturation, zero color cast).
- **Zero Diagram Collisions**: Auto-wrapping text (`draw_wrapped`), padded containers, and orthogonal node layouts.
- **Lossless WebP Encoding**: Eliminates YUV color-channel quantization artifacts.

| Script | Purpose | Coverage |
|--------|---------|----------|
| `build_all_covers.py` | **Master Runner** | Renders all 50 flagship covers in sequence. |
| `build_block1_pure_white.py` | Block 1 Generator | Posts 1–10 (Core Benchmarks & Search Dominance) |
| `build_block2_pure_white.py` | Block 2 Generator | Posts 11–20 (Agentic Commerce, RevOps & Moats) |
| `build_block3_pure_white.py` | Block 3 Generator | Posts 21–30 (Category Leadership, AEO & GEO) |
| `build_block4_pure_white.py` | Block 4 Generator | Posts 31–40 (Unit Economics & Content Moats) |
| `build_block5_pure_white.py` | Block 5 Generator | Posts 41–50 (CFO CAC Modeling, Telemetry & CGO Playbook) |

```bash
# Generate all 50 pure black & white flagship covers
python scripts/build_all_covers.py
```

---

## 2. Blog Post Generation & HTML Templates

| Script | Purpose |
|--------|---------|
| `blog_template.py` | Production HTML template engine injecting JSON-LD schemas (`BlogPosting`, `BreadcrumbList`, `FAQPage`), metadata tags, related articles, and responsive typography. |
| `generate_10_new_flagship_blogs.py` | Generates the HTML files for Posts 41–50 directly into `public/blog/`. |

---

## 3. SEO, Feeds & Discovery

| Script | Purpose | Outputs |
|--------|---------|---------|
| `generate_sitemaps.py` | Generates prioritized XML sitemaps for all 150 articles. | `public/sitemap.xml`, `public/sitemap-blog.xml` |
| `generate_rss.py` | Generates syndication feeds for all 150 articles with full metadata. | `public/rss.xml`, `public/feed.xml` |

```bash
# Re-generate sitemaps and RSS feeds
python scripts/generate_sitemaps.py
python scripts/generate_rss.py
```

---

## 4. Verification & Audit

| Script | Purpose |
|--------|---------|
| `master_audit.py` | Validates: <br>1. Pure white corner pixels `(255, 255, 255)` across all covers.<br>2. 100% pure black & white \(R = G = B\) check.<br>3. 0 duplicate MD5 hashes across all 150 blog covers.<br>4. HTML completeness across `public/blog/` and `dist/blog/`. |

```bash
# Run full system audit
python scripts/master_audit.py
```

---

## 5. Archive

- `archive/legacy_generators/`: Historical batch generators used during initial development.
- `archive/legacy_posts/`: Individual single-post Python files from early versions.

