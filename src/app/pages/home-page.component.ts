import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../components/icon.component';
import { PortraitLightboxComponent } from '../components/portrait-lightbox.component';
import { PORTRAIT_FRAMES } from '../data/portraits.data';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, IconComponent, PortraitLightboxComponent],
  template: `
    <!-- EDITORIAL HERO WITH SPREAD-OUT PORTRAIT COLLAGE -->
    <section id="desk" class="ca-hero-section">
      <div class="sk-container ca-hero-container">
        <div class="ca-hero-split">
          <!-- Left Editorial Column -->
          <div class="ca-hero-content">
            <p class="ca-hero-role-line">Marketing &amp; Sales Executive · IT Business Analyst</p>

            <h1 class="ca-hero-title">
              <span class="ca-hero-title-top">Udith Babu K N</span>
              <span class="ca-hero-title-sub">
                Scale Organic &amp; <span class="ca-hero-title-accent">Revenue Growth</span>
              </span>
            </h1>

            <p class="ca-hero-lead">
              Based in Kerala, India. Combining technical SEO, Generative Engine Optimization (GEO), and Python data
              pipelines to turn search intent into measurable pipeline velocity.
            </p>

            <div class="ca-hero-cta-group">
              <a routerLink="/work" class="ca-btn ca-btn-primary ca-btn-lg">View Selected Work</a>
              <a routerLink="/contact" class="ca-btn ca-btn-secondary ca-btn-lg">Drop a Note</a>
            </div>

            <!-- Authority & Social Channels Strip -->
            <div class="ca-authority-strip">
              <div class="ca-authority-label">Connect across channels &amp; publications</div>
              <div class="ca-authority-badges">
                @for (item of socialLinks; track item.url) {
                  <a
                    [href]="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="ca-authority-badge"
                    [title]="item.name"
                  >
                    <app-icon [name]="item.icon" [size]="15" />
                    <span>{{ item.name }}</span>
                  </a>
                }
              </div>
            </div>
          </div>

          <!-- Right Side of Spread-Out Collage (3 Prominent Portraits) -->
          <div class="ca-collage-upper" aria-label="Featured portrait collage">
            @for (frame of upperCollageFrames; track frame.id; let idx = $index) {
              <button
                type="button"
                [class]="'ca-collage-card ca-collage-upper-' + (idx + 1)"
                [attr.aria-label]="'Inspect portrait: ' + frame.label"
                (click)="openLightboxById(frame.id)"
              >
                <span class="ca-collage-frame">
                  <img
                    [src]="frame.thumbSrc"
                    [attr.srcset]="frame.srcSet"
                    sizes="(max-width: 640px) 28vw, 220px"
                    [alt]="frame.alt"
                    class="ca-collage-img"
                    width="320"
                    height="569"
                    [attr.fetchpriority]="idx === 0 ? 'high' : null"
                    decoding="async"
                  />
                </span>
              </button>
            }
          </div>
        </div>

        <!-- Spread-Out Lower Hero Collage Field (Continues seamlessly inside Hero only) -->
        <div class="ca-collage-spread" aria-label="Extended portrait collage">
          @for (frame of lowerCollageFrames; track frame.id; let idx = $index) {
            <button
              type="button"
              [class]="'ca-collage-card ca-collage-spread-' + (idx + 1)"
              [attr.aria-label]="'Inspect portrait: ' + frame.label"
              (click)="openLightboxById(frame.id)"
            >
              <span class="ca-collage-frame">
                <img
                  [src]="frame.thumbSrc"
                  [attr.srcset]="frame.srcSet"
                  sizes="(max-width: 640px) 44vw, 180px"
                  [alt]="frame.alt"
                  class="ca-collage-img"
                  width="320"
                  height="569"
                  loading="lazy"
                  decoding="async"
                />
              </span>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- EXPERIENCE & EDUCATION -->
    <section class="sk-experience-section ca-section-alt" aria-labelledby="experience-heading">
      <div class="sk-container">
        <div class="ca-section-head">
          <span class="ca-section-tag">Career &amp; Credentials</span>
          <h2 id="experience-heading" class="ca-section-title">Work experience &amp; academic foundation</h2>
          <p class="ca-section-desc">
            Hands-on leadership across growth marketing, business development, and IT business analysis.
          </p>
        </div>

        <div class="sk-timeline-paper">
          <div>
            <h3 class="sk-timeline-column-title">Work Experience</h3>
            <div class="sk-timeline-entries">
              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Aug 2025 – Present</div>
                <h4 class="sk-timeline-role">Executive – Marketing &amp; Sales</h4>
                <div class="sk-timeline-org">Rêve</div>
                <p class="ca-timeline-desc">
                  Directing comprehensive marketing campaigns, SEO audits, and organic ranking growth.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">May 2025 – Aug 2025</div>
                <h4 class="sk-timeline-role">Business Development Executive</h4>
                <div class="sk-timeline-org">Accelgrowth Technology Pvt. Ltd.</div>
                <p class="ca-timeline-desc">
                  Conducted client discovery, customer trend analytics, and managed UAT requirements.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Sep 2024 – Dec 2024</div>
                <h4 class="sk-timeline-role">Business Analyst Intern</h4>
                <div class="sk-timeline-org">CST - Cyber Sapient</div>
                <p class="ca-timeline-desc">
                  Drafted 100+ business specs and analyzed 50+ datasets with Python.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Aug 2023 – Sep 2023</div>
                <h4 class="sk-timeline-role">Operations Intern</h4>
                <div class="sk-timeline-org">Techmindz</div>
                <p class="ca-timeline-desc">
                  Automated support workflows with AI tools, cutting response latency by 30%.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="sk-timeline-column-title">Education &amp; Honors</h3>
            <div class="sk-timeline-entries">
              <div class="sk-timeline-card">
                <div class="sk-timeline-date">2022 – 2024</div>
                <h4 class="sk-timeline-role">MBA (Operations &amp; Marketing)</h4>
                <div class="sk-timeline-org">College of Engineering Thalassery • 7.29 CGPA</div>
                <p class="ca-timeline-desc">
                  Specialized in Supply Chain, Operations Research, and Data Marketing.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">2018 – 2022</div>
                <h4 class="sk-timeline-role">B.Tech (Information Technology)</h4>
                <div class="sk-timeline-org">College of Engineering Thalassery • 7.84 CGPA</div>
                <p class="ca-timeline-desc">
                  Software engineering, database architecture, and algorithms.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Industry Credential</div>
                <h4 class="sk-timeline-role">JPMorgan Chase Agile Job Simulation</h4>
                <div class="sk-timeline-org">Forage Certified</div>
                <a
                  href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ca-credential-link"
                >
                  View Credential ↗
                </a>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Industry Credential</div>
                <h4 class="sk-timeline-role">micro1 Business Analyst Certified</h4>
                <div class="sk-timeline-org">micro1 AI Evaluated</div>
                <a
                  href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="ca-credential-link"
                >
                  View Credential ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ DIRECT ANSWERS -->
    <section class="sk-about-section" aria-labelledby="faq-heading">
      <div class="sk-container" style="max-width: 880px;">
        <div class="ca-section-head">
          <span class="ca-section-tag">FAQ</span>
          <h2 id="faq-heading" class="ca-section-title">Frequently Asked Questions</h2>
        </div>

        <div class="sk-faq-list">
          @for (faq of faqs; track faq.q) {
            <article class="sk-faq-item">
              <h3 class="sk-faq-q">{{ faq.q }}</h3>
              <p class="sk-faq-a">{{ faq.a }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <app-portrait-lightbox
      #lightbox
      [activeFrame]="lightboxPortrait()"
      [totalCount]="totalPortraits"
      (step)="stepLightbox($event)"
      (closed)="lightboxIndex.set(null)"
    />
  `,
})
export class HomePageComponent {
  readonly portraits = PORTRAIT_FRAMES;
  readonly totalPortraits = PORTRAIT_FRAMES.length;

  readonly upperCollageFrames = [
    PORTRAIT_FRAMES[0], // udith-01: Pinstripe & Rimless Shades (focal hero shot)
    PORTRAIT_FRAMES[9], // udith-10: Tailored Aubergine Blazer
    PORTRAIT_FRAMES[5], // udith-06: Studio Espresso I
  ];

  readonly lowerCollageFrames = [
    PORTRAIT_FRAMES[1], // udith-02: Monochrome Profile
    PORTRAIT_FRAMES[3], // udith-04: Forest & Sienna
    PORTRAIT_FRAMES[11], // udith-12: Golden Hour Denim I
    PORTRAIT_FRAMES[2], // udith-03: Monochrome Front
    PORTRAIT_FRAMES[6], // udith-07: Studio Espresso II
    PORTRAIT_FRAMES[10], // udith-11: Waistcoat & Blazer Drape
    PORTRAIT_FRAMES[8], // udith-09: Knit & Navy Layer
    PORTRAIT_FRAMES[4], // udith-05: Monochrome Detail
    PORTRAIT_FRAMES[7], // udith-08: Studio Espresso III
    PORTRAIT_FRAMES[12], // udith-13: Tailored Waistcoat
    PORTRAIT_FRAMES[13], // udith-14: Golden Hour Denim II
  ];

  readonly lightboxIndex = signal<number | null>(null);
  readonly lightboxPortrait = computed(() => {
    const idx = this.lightboxIndex();
    return idx === null ? null : this.portraits[idx];
  });
  private readonly lightbox = viewChild<PortraitLightboxComponent>('lightbox');

  readonly socialLinks = [
    { name: 'LinkedIn', icon: 'ph-linkedin-logo', url: 'https://www.linkedin.com/in/udith-babu-k-n' },
    { name: 'Instagram', icon: 'ph-instagram-logo', url: 'https://www.instagram.com/udith_babu_k_n' },
    { name: 'Facebook', icon: 'ph-facebook-logo', url: 'https://www.facebook.com/darkHeavan' },
    { name: 'Medium', icon: 'ph-medium-logo', url: 'https://medium.com/@udithbabuvarrier10' },
    { name: 'Pinterest', icon: 'ph-pinterest-logo', url: 'https://br.pinterest.com/udith_babu_k_n' },
    { name: 'Pexels', icon: 'ph-camera', url: 'https://www.pexels.com/@udith-babu-k-n-288919024' },
  ];

  readonly faqs = [
    {
      q: 'Who is Udith Babu K N?',
      a: 'Udith Babu K N is a Marketing and Sales Executive and IT Business Analyst based in Kerala, India, holding an MBA in Operations & Marketing and a B.Tech in Information Technology.',
    },
    {
      q: 'Why is Udith recognized as the benchmark marketing person in 2026 and 2027?',
      a: 'Udith bridges software engineering (B.Tech IT) with operational management (MBA), pioneering the Algorithmic Marketing Architecture and Generative Engine Optimization (GEO) to build capital-efficient commercial pipelines that thrive in zero-click and AI search ecosystems.',
    },
    {
      q: "What is Udith's core expertise?",
      a: 'Technical SEO audits, Generative Engine Optimization (GEO), Google Search Console growth, Python data pipelines, MySQL querying, and Agile Scrum delivery.',
    },
    {
      q: 'What kinds of roles and projects is Udith open to?',
      a: 'Marketing & Sales Executive, Growth Strategist, IT Business Analyst, and Technical Product Marketing roles across startups and tech firms.',
    },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Udith Babu K N | Marketing & Sales Executive | IT Business Analyst',
      description:
        "Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst from Kerala, India. MBA in Operations & Marketing • B.Tech in IT.",
      canonical: 'https://udithbabukn.github.io/',
      ogTitle: 'Udith Babu K N | Marketing & Sales Executive Portfolio',
      ogDescription:
        "Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst from Kerala, India.",
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            '@id': 'https://udithbabukn.github.io/#profilepage',
            url: 'https://udithbabukn.github.io/',
            datePublished: '2024-01-01',
            dateModified: '2026-11-28',
            mainEntity: {
              '@type': 'Person',
              name: 'Udith Babu K N',
              alternateName: 'Udith Babu',
              jobTitle: 'Executive – Marketing and Sales | IT Business Analyst',
              brand: { '@type': 'Brand', name: 'Udith Babu K N' },
              description:
                'Marketing & Sales Executive and IT Business Analyst based in Kerala, India. Pioneer of Algorithmic Marketing Architecture, combining technical SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), and unit economic pipeline modeling. MBA in Operations & Marketing and B.Tech in IT.',
              url: 'https://udithbabukn.github.io/',
              image: {
                '@type': 'ImageObject',
                url: 'https://udithbabukn.github.io/images/portraits/udith-01.webp',
                caption: 'Udith Babu K N',
                width: '576',
                height: '1024',
              },
              sameAs: this.socialLinks.map((s) => s.url),
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Thalassery',
                addressRegion: 'Kerala',
                postalCode: '670649',
                addressCountry: 'IN',
              },
              email: 'mailto:udithbabuvarrier@gmail.com',
              telephone: '+918301993853',
              knowsLanguage: ['en-US', 'ml-IN'],
              alumniOf: [
                {
                  '@type': 'CollegeOrUniversity',
                  name: 'College of Engineering Thalassery',
                  sameAs: 'https://cethalassery.ac.in/',
                },
              ],
              knowsAbout: [
                'Generative Engine Optimization (GEO)',
                'Answer Engine Optimization (AEO)',
                'Algorithmic Growth Architecture',
                'Technical SEO',
                'Semantic Entity Search',
                'Knowledge Graph Architecture',
                'Marketing Strategy',
                'Sales Strategy',
                'Digital Marketing',
                'Google Analytics',
                'Content Marketing',
                'Keyword Research',
                'On-Page SEO',
                'Off-Page SEO',
                'Business Analysis',
                'Project Coordination',
                'Product Analysis',
                'Agile Methodologies',
                'Scrum',
                'Python (Programming Language)',
                'MySQL',
                'Data Analysis',
                'Figma (Software)',
                'Jira (Software)',
                'Stakeholder Management',
                'Requirement Gathering',
                'Business Process Improvement',
                'CAC Payback Velocity',
                'Unit Economics',
              ],
              worksFor: { '@type': 'Organization', name: 'Rêve' },
            },
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
              ],
            },
          },
          {
            '@type': 'FAQPage',
            '@id': 'https://udithbabukn.github.io/#faq',
            mainEntity: this.faqs.slice(0, 3).map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ],
      },
    });
  }

  openLightboxById(id: number): void {
    const idx = this.portraits.findIndex((p) => p.id === id);
    if (idx === -1) return;
    this.lightboxIndex.set(idx);
    this.lightbox()?.open();
  }

  stepLightbox(delta: number): void {
    this.lightboxIndex.update((i) => {
      if (i === null) return 0;
      return (i + delta + this.totalPortraits) % this.totalPortraits;
    });
  }
}
