import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [BreadcrumbsComponent],
  template: `
    <section id="skills" class="sk-skills-section" style="padding-top: 28px; border-bottom: none; padding-bottom: 70px;">
      <div class="sk-container">
        <app-breadcrumbs [items]="breadcrumbs" />

        <div style="margin-bottom: 36px; position: relative; z-index: 2;">
          <h1 class="sk-section-heading">Toolbox &amp; Methods</h1>
          <p class="sk-page-subtitle" style="margin-top: 8px;">
            Hand-picked capabilities across growth marketing, technical analysis, and project execution.
          </p>
        </div>

        <div class="sk-sticky-grid">
          @for (group of skillGroups; track group.title) {
            <div class="sk-sticky-note">
              <h2 class="sk-sticky-title">{{ group.title }}</h2>
              <div class="sk-sticky-chips">
                @for (chip of group.chips; track chip) {
                  <span class="sk-sticky-chip">{{ chip }}</span>
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class SkillsPageComponent {
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Skills', path: '/skills' },
  ];

  readonly skillGroups = [
    {
      title: 'Marketing & SEO',
      chips: ['Technical SEO', 'AEO & GEO Strategy', 'Google Analytics 4', 'Content Marketing', 'Keyword Research'],
    },
    {
      title: 'Core Technologies',
      chips: ['Python', 'MySQL Database', 'JavaScript', 'Data Scraping', 'Vibe Coding'],
    },
    {
      title: 'Project & Design',
      chips: ['Jira Sprints', 'Trello Boards', 'Figma UI/UX', 'AI Video Gen', 'Poster Design'],
    },
    {
      title: 'Business & Analysis',
      chips: ['Stakeholder Alignment', 'Scrum Facilitation', 'Root-Cause Analysis', 'CRM Handling', 'MS Excel Models'],
    },
  ];

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Skills | Toolbox & Methods | Udith Babu K N',
      description:
        'Hand-picked capabilities across growth marketing, technical analysis, and project execution by Udith Babu K N.',
      canonical: 'https://udithbabukn.github.io/skills',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            '@id': 'https://udithbabukn.github.io/skills',
            url: 'https://udithbabukn.github.io/skills',
            name: 'Skills | Toolbox & Methods | Udith Babu K N',
            description: 'Hand-picked capabilities across growth marketing, technical analysis, and project execution.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
                { '@type': 'ListItem', position: 2, name: 'Skills', item: 'https://udithbabukn.github.io/skills' },
              ],
            },
          },
        ],
      },
    });
  }
}
