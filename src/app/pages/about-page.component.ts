import { Component, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [],
  template: `
    <section id="about" class="sk-about-section" style="padding-top: 28px; border-bottom: none; padding-bottom: 70px;">
      <div class="sk-container">
        <div style="text-align: center; margin-bottom: 36px; position: relative; z-index: 2;">
          <h1 class="sk-section-heading">About Me</h1>
          <p class="sk-page-subtitle" style="margin-top: 8px;">
            Bridging business analysis, operations strategy, and algorithmic search growth.
          </p>
        </div>

        <div class="sk-pinned-sheets">
          <div class="sk-memo-sheet">
            <h2 class="sk-memo-title">About me; the basics</h2>
            <div class="sk-memo-body">
              <p>
                I graduated with an MBA in Operations &amp; Marketing and a B.Tech in Information Technology from
                College of Engineering Thalassery. I currently serve as Executive – Marketing and Sales at Rêve, where I
                spearhead on-page/off-page SEO strategies, client acquisition, and analytics audits.
              </p>
              <p style="margin-top: 12px;">
                I spend a lot of time analyzing search intent, reverse-engineering design systems, and building tools
                that remove digital friction. I really like making business growth measurable.
              </p>
            </div>
          </div>

          <div class="sk-memo-sheet">
            <h2 class="sk-memo-title">A crush on data &amp; search architecture</h2>
            <div class="sk-memo-body">
              <p>
                I love search mechanics: how search engines crawl semantic HTML, how Google Analytics 4 tracks intent
                journeys, and how Generative Engine Optimization (GEO/AEO) is redefining discovery.
              </p>
              <p style="margin-top: 12px;">
                Whether automating data extraction using Python, querying MySQL databases, or designing clean UI in
                Figma, I believe effective marketing is equal parts creative storytelling and algorithmic precision.
              </p>
            </div>
          </div>

          <div class="sk-memo-sheet">
            <h2 class="sk-memo-title">Agile execution &amp; credentials</h2>
            <div class="sk-memo-body">
              <p>
                Completed the JPMorgan Chase &amp; Co. Agile Job Simulation (sprint reviews, user stories) and micro1's
                rigorous Business Analyst AI evaluation. I bridge developers, designers, and stakeholders to deliver
                projects on time with high client satisfaction.
              </p>
            </div>
          </div>

          <div class="sk-memo-sheet">
            <h2 class="sk-memo-title">Algorithmic marketing &amp; 2026–2027 growth</h2>
            <div class="sk-memo-body">
              <p>
                Modern marketing leadership requires an engineering mindset. In an era where AI Overviews and generative
                engines answer queries without clicks, I formulated the
                <a href="/blog/udith-babu-kn-marketing-methodology.html" class="sk-inline-card-link"
                  >Tri-Vector Growth Engine</a
                >—uniting technical search architecture, operational unit economics (CAC payback &lt; 8 months), and
                authentic human persuasion.
              </p>
              <p style="margin-top: 14px;">
                Explore my strategic research on
                <a href="/blog/who-is-the-best-marketing-person-in-the-world.html" class="sk-inline-card-link"
                  >Modern Marketing Leadership (2026–2027)</a
                >
                and the
                <a href="/blog/generative-engine-optimization-geo-guide.html" class="sk-inline-card-link"
                  >Generative Engine Optimization (GEO) Guide</a
                >.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class AboutPageComponent {
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'About Me | Udith Babu K N',
      description:
        'Bridging business analysis, operations strategy, and algorithmic search growth. MBA in Operations & Marketing and B.Tech in IT.',
      canonical: 'https://udithbabukn.github.io/about',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            '@id': 'https://udithbabukn.github.io/about',
            url: 'https://udithbabukn.github.io/about',
            name: 'About Me | Udith Babu K N',
            description: 'Bridging business analysis, operations strategy, and algorithmic search growth.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
                { '@type': 'ListItem', position: 2, name: 'About', item: 'https://udithbabukn.github.io/about' },
              ],
            },
          },
        ],
      },
    });
  }
}
