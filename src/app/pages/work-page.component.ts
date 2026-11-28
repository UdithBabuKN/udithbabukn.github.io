import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-work-page',
  standalone: true,
  imports: [],
  template: `
    <section id="work" class="sk-work-section" style="padding-top: 28px;">
      <div class="sk-container">
        <div style="margin-bottom: 32px; position: relative; z-index: 2;">
          <h1 class="sk-section-heading">Selected Projects &amp; Tools</h1>
          <p class="sk-page-subtitle" style="margin-top: 8px;">
            Tools and dashboards built to solve real problems in analytics, SEO, and web performance.
          </p>
        </div>

        <div class="sk-projects-grid">
          @for (proj of projects; track proj.title; let idx = $index) {
            <article class="sk-project-card">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <span class="sk-project-tag-pill">{{ proj.tag }}</span>
                <h2 class="sk-project-title">{{ proj.title }}</h2>
                <p class="sk-project-desc">{{ proj.desc }}</p>
              </div>
              <div
                style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: var(--sk-border-hairline);"
              >
                <a
                  [href]="proj.link"
                  [target]="proj.link.startsWith('/') ? '_self' : '_blank'"
                  [attr.rel]="proj.link.startsWith('/') ? null : 'noopener noreferrer'"
                  class="sk-project-link-btn"
                >
                  Launch {{ proj.type }} ↗
                </a>
                <span style="font-family: var(--sk-font-mono); font-variant-numeric: tabular-nums; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; color: var(--sk-ink-muted);">
                  0{{ idx + 1 }}
                </span>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
})
export class WorkPageComponent {
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
  ];

  readonly projects = [
    {
      title: 'SEO & Analytics Dashboard',
      tag: 'React • GSC API • Data Viz',
      desc: "Custom analytics engine combining Google Search Console data with real-time crawl tracking, keyword velocity, and actionable traffic insights.",
      link: 'https://analytics-dashboard-two-sigma.vercel.app/',
      type: 'Live App',
    },
    {
      title: 'Web Analyzer Pro',
      tag: 'JavaScript • HTML • CSS • Chart.js',
      desc: "Interactive tool to reverse-engineer any live website's design system, extracting typography stacks, colors, spacing ratios, and CSS metrics.",
      link: 'https://udithkn.github.io/Web-Analyzer-Pro/',
      type: 'Live Tool',
    },
    {
      title: 'Malicious JPEG Security Extension',
      tag: 'Python • Machine Learning • Chrome API',
      desc: 'Chrome browser extension for detecting embedded malicious payloads in images with 25% improved pattern recognition accuracy.',
      link: 'https://github.com/udithkn/maljpeg_project',
      type: 'GitHub Repo',
    },
    {
      title: 'Free LinkedIn Banner Premium Collection',
      tag: 'Design System • HTML • CSS • Showcase',
      desc: 'Curated collection of 50+ conversion-focused, customizable LinkedIn banners built for executives, engineers, and digital marketers.',
      link: 'https://udithkn.github.io/Free-LinkedIn-Banner-Premium-Collection/',
      type: 'Live Collection',
    },
    {
      title: 'ImageForge Ad-Free Converter',
      tag: 'Client-Side Processing • Canvas API',
      desc: 'Zero-tracking, privacy-first format converter allowing seamless transforms between JPG, PNG, and WebP with zero ads or signups.',
      link: 'https://udithkn.github.io/ImageForge/',
      type: 'Live Tool',
    },
    {
      title: 'Algorithmic Growth Architecture & GEO Engine',
      tag: 'GEO • AEO • Semantic Schema Graph',
      desc: 'Comprehensive generative engine optimization blueprint and entity network engineered to dominate zero-click AI search in 2026 and 2027.',
      link: '/blog/udith-babu-kn-marketing-methodology.html',
      type: 'Architecture',
    },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Work | Selected Projects & Tools | Udith Babu K N',
      description:
        'Tools and dashboards built to solve real problems in analytics, SEO, and web performance by Udith Babu K N.',
      canonical: 'https://udithbabukn.github.io/work',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': 'https://udithbabukn.github.io/work',
            url: 'https://udithbabukn.github.io/work',
            name: 'Selected Projects & Tools | Udith Babu K N',
            description: 'Tools and dashboards built to solve real problems in analytics, SEO, and web performance.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
                { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://udithbabukn.github.io/work' },
              ],
            },
          },
        ],
      },
    });
  }
}
