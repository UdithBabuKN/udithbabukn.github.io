import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../components/icon.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <!-- HERO SECTION: "UDITH'S DESK." -->
    <section id="desk" class="sk-desk-hero">
      <div class="sk-container">
        <div class="sk-desk-header-center">
          <h1 class="sk-desk-headline">Udith's desk.</h1>
          <p class="sk-desk-subline">
            Udith Babu K N; Marketing &amp; Sales Executive and IT Business Analyst from Kerala, India, currently
            driving organic scale and operational growth.
          </p>
        </div>

        <!-- Interactive Illustrated Desk Mat -->
        <div class="sk-desk-stage">
          <div class="sk-desk-top-row">
            <div class="sk-speech-bubble-widget">
              <div class="sk-speech-text">{{ minicomMessages[minicomIndex()] }}</div>

              <div class="sk-minicom-nav" style="justify-content: space-between; align-items: center;">
                <div class="sk-minicom-dots">
                  @for (msg of minicomMessages; track $index) {
                    <button
                      type="button"
                      [class]="'sk-minicom-dot' + (minicomIndex() === $index ? ' active' : '')"
                      [attr.aria-label]="'Show note ' + ($index + 1)"
                      [attr.aria-current]="minicomIndex() === $index ? 'true' : null"
                      (click)="minicomIndex.set($index)"
                    ></button>
                  }
                </div>
                <div style="display: flex; gap: 8px;">
                  <button type="button" class="sk-minicom-btn" (click)="prevMinicom()" aria-label="Previous note">←</button>
                  <button type="button" class="sk-minicom-btn" (click)="nextMinicom()" aria-label="Next note">Next →</button>
                </div>
              </div>
            </div>

            <div class="sk-status-note">
              <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #000000;">
                <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true" style="flex-shrink: 0;">
                  <path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146"/>
                </svg>
                <span>Current Focus</span>
              </div>
              <div style="font-family: var(--sk-font-serif); font-weight: 800; font-size: 1.25rem; margin-top: 6px; color: #000000;">
                Open for Marketing Executive &amp; Growth Roles
              </div>
            </div>
          </div>

          <!-- Fidget & Desk Objects Row -->
          <div class="sk-desk-items-scene">
            <div class="sk-desk-item-card">
              <span class="sk-desk-item-detail">[01 // GSC.350+]</span>
              <div class="sk-metric-big">350+</div>
              <div class="sk-desk-item-title">Daily Organic Clicks</div>
              <p style="font-size: 0.84rem; margin: 0; color: var(--sk-ink-muted);">
                Scaled organic search traffic from 90 to 350+ via technical crawl optimization.
              </p>
            </div>

            <div class="sk-desk-item-card">
              <span class="sk-desk-item-detail">[02 // MBA.BTECH]</span>
              <div class="sk-metric-big">MBA &amp; B.Tech</div>
              <div class="sk-desk-item-title">Dual Degree Focus</div>
              <p style="font-size: 0.84rem; margin: 0; color: var(--sk-ink-muted);">
                Operations &amp; Marketing (72.9%) + Information Technology (78.4%).
              </p>
            </div>

            <div class="sk-desk-item-card">
              <span class="sk-desk-item-detail">[03 // QA.98%]</span>
              <div class="sk-metric-big">98%</div>
              <div class="sk-desk-item-title">UAT Compliance</div>
              <p style="font-size: 0.84rem; margin: 0; color: var(--sk-ink-muted);">
                100+ business requirements documented and approved at Cyber Sapient.
              </p>
            </div>

            <div class="sk-desk-item-card">
              <span class="sk-desk-item-detail">[04 // AI.-30%]</span>
              <div class="sk-metric-big">-30%</div>
              <div class="sk-desk-item-title">Triage Time</div>
              <p style="font-size: 0.84rem; margin: 0; color: var(--sk-ink-muted);">
                Streamlined customer service workflows using AI integrations at Techmindz.
              </p>
            </div>
          </div>

          <div class="sk-desk-bottom-row" style="justify-content: center;">
            <a routerLink="/work" class="sk-action-pill view-work-pill">View Work ↓</a>
          </div>
        </div>

        <!-- Social Links Ribbon -->
        <div style="margin-top: 36px; text-align: center;">
          <span
            style="font-size: 0.84rem; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #FFFFFF; text-shadow: 0 2px 6px rgba(0, 0, 0, 0.9), 0 1px 2px #000000;"
          >
            Connect Across Channels
          </span>

          <div class="sk-socials-grid">
            @for (item of socialLinks; track item.url) {
              <a
                [href]="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="sk-social-pill"
                [title]="item.name"
              >
                <app-icon [name]="item.icon" [size]="16" />
                <span>{{ item.name }}</span>
              </a>
            }
          </div>
        </div>
      </div>
    </section>

    <!-- EXPERIENCE & EDUCATION (Timeline Paper) -->
    <section class="sk-experience-section" style="padding: 60px 0 20px;">
      <div class="sk-container">
        <div class="sk-timeline-paper">
          <div>
            <h2 class="sk-timeline-column-title">Work Experience</h2>
            <div class="sk-timeline-entries">
              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Aug 2025 – Present</div>
                <h3 class="sk-timeline-role">Executive – Marketing &amp; Sales</h3>
                <div class="sk-timeline-org">Rêve</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Directing comprehensive marketing campaigns, SEO audits, and organic ranking growth.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">May 2025 – Aug 2025</div>
                <h3 class="sk-timeline-role">Business Development Executive</h3>
                <div class="sk-timeline-org">Accelgrowth Technology Pvt. Ltd.</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Conducted client discovery, customer trend analytics, and managed UAT requirements.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Sep 2024 – Dec 2024</div>
                <h3 class="sk-timeline-role">Business Analyst Intern</h3>
                <div class="sk-timeline-org">CST - Cyber Sapient</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Drafted 100+ business specs and analyzed 50+ datasets with Python.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Aug 2023 – Sep 2023</div>
                <h3 class="sk-timeline-role">Operations Intern</h3>
                <div class="sk-timeline-org">Techmindz</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Automated support workflows with AI tools, cutting response latency by 30%.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="sk-timeline-column-title">Education &amp; Honors</h2>
            <div class="sk-timeline-entries">
              <div class="sk-timeline-card">
                <div class="sk-timeline-date">2022 – 2024</div>
                <h3 class="sk-timeline-role">MBA (Operations &amp; Marketing)</h3>
                <div class="sk-timeline-org">College of Engineering Thalassery • 7.29 CGPA</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Specialized in Supply Chain, Operations Research, and Data Marketing.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">2018 – 2022</div>
                <h3 class="sk-timeline-role">B.Tech (Information Technology)</h3>
                <div class="sk-timeline-org">College of Engineering Thalassery • 7.84 CGPA</div>
                <p style="font-size: 0.86rem; margin-top: 6px; color: var(--sk-ink-muted);">
                  Software engineering, database architecture, and algorithms.
                </p>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Industry Credential</div>
                <h3 class="sk-timeline-role">JPMorgan Chase Agile Job Simulation</h3>
                <div class="sk-timeline-org">Forage Certified</div>
                <a
                  href="https://drive.google.com/file/d/1H1VZzktMJv3bnaK4FfB7O6NTazp3L6CK/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color: #FFFFFF; background: #000000; border: 1px solid #000000; border-radius: 4px; padding: 3px 10px; font-weight: 800; font-size: 0.80rem; display: inline-block; margin-top: 8px; text-decoration: none;"
                >
                  View Credential ↗
                </a>
              </div>

              <div class="sk-timeline-card">
                <div class="sk-timeline-date">Industry Credential</div>
                <h3 class="sk-timeline-role">micro1 Business Analyst Certified</h3>
                <div class="sk-timeline-org">micro1 AI Evaluated</div>
                <a
                  href="https://drive.google.com/file/d/11k8iMDoCFEd-BMV-rPB-I52-clnJZOyO/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  style="color: #FFFFFF; background: #000000; border: 1px solid #000000; border-radius: 4px; padding: 3px 10px; font-weight: 800; font-size: 0.80rem; display: inline-block; margin-top: 8px; text-decoration: none;"
                >
                  View Credential ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ ACCORDION (native <details>/<summary>, keyboard & find-in-page accessible) -->
    <section class="sk-about-section" aria-labelledby="faq-heading" style="border-bottom: none; padding-bottom: 60px;">
      <div class="sk-container" style="max-width: 880px;">
        <h2 id="faq-heading" class="sk-section-heading" style="text-align: center; margin-bottom: 30px;">
          Frequently Asked Questions
        </h2>

        <div class="sk-faq-list">
          @for (faq of faqs; track faq.q) {
            <details class="sk-faq-item">
              <summary class="sk-faq-summary">{{ faq.q }}</summary>
              <p class="sk-faq-a">{{ faq.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class HomePageComponent {
  readonly minicomIndex = signal(0);

  readonly minicomMessages = [
    "Hi! Step up to Udith's desk! Marketing & Sales Executive and IT Business Analyst.",
    'Dual Degree: MBA in Operations & Marketing + B.Tech in Information Technology.',
    'Google Search impact: Scaled organic clicks from 90 to 350+ peak daily!',
    'Shipped 5+ live production web tools with Python, MySQL, and Angular.',
    'Say hi or discuss high-impact roles: udithbabuvarrier@gmail.com',
  ];

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
            dateModified: '2026-11-18',
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
                url: 'https://udithbabukn.github.io/picofme.webp',
                caption: 'Udith Babu K N',
                width: '512',
                height: '512',
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

  nextMinicom(): void {
    this.minicomIndex.update((i) => (i + 1) % this.minicomMessages.length);
  }

  prevMinicom(): void {
    this.minicomIndex.update((i) => (i - 1 + this.minicomMessages.length) % this.minicomMessages.length);
  }
}
