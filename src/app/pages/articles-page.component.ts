import { Component, computed, inject, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../components/breadcrumbs.component';
import { IconComponent } from '../components/icon.component';
import { blogPosts } from '../data/blog-posts.data';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [BreadcrumbsComponent, IconComponent],
  template: `
    <section id="blog" class="sk-articles-section" style="padding-top: 28px; border-bottom: none; padding-bottom: 70px;">
      <div class="sk-container">
        <app-breadcrumbs [items]="breadcrumbs" />

        <div style="margin-bottom: 24px; position: relative; z-index: 2;">
          <h1 class="sk-section-heading">Blog &amp; Frameworks</h1>
          <p class="sk-page-subtitle" style="margin-top: 8px;">
            Strategic frameworks, algorithmic search architectures, and empirical revenue systems.
          </p>
        </div>

        <!-- Quick Search Bar (WebMCP Declarative Tool) -->
        <form
          role="search"
          toolname="search_articles"
          tooldescription="Search Udith Babu's articles, frameworks, and playbooks by keyword, topic, or category"
          toolautosubmit="true"
          (submit)="$event.preventDefault()"
          style="margin-bottom: 24px; max-width: 460px; position: relative;"
        >
          <span
            style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--sk-navy); display: inline-flex; pointer-events: none;"
          >
            <app-icon name="search" [size]="18" />
          </span>
          <input
            type="search"
            name="query"
            aria-label="Search articles and frameworks"
            description="Keywords or topics to search for, e.g. GEO, AEO, CAC, RevOps"
            placeholder="Search by topic, framework, or keyword..."
            [value]="searchQuery()"
            (input)="onSearchInput($event)"
            style="width: 100%; padding: 10px 18px 10px 44px; border-radius: 9999px; border: 1.5px solid var(--sk-navy); background: #FFFFFF; font-size: 0.88rem; font-family: var(--sk-font-mono); outline: none; color: var(--sk-navy); box-shadow: 2px 2px 0px var(--sk-navy);"
          />
        </form>

        <!-- Category Filter Bar -->
        <div class="sk-articles-filter-bar">
          @for (cat of categories; track cat) {
            <button
              type="button"
              [class]="'sk-filter-pill' + (selectedCategory() === cat ? ' active' : '')"
              (click)="selectCategory(cat)"
            >
              {{ cat === 'All' ? 'All (' + totalPosts + ')' : cat }}
            </button>
          }
        </div>

        <!-- Articles Grid -->
        <div class="sk-articles-grid">
          @for (post of visiblePosts(); track post.slug; let idx = $index) {
            <a
              [href]="'/blog/' + post.slug + '.html'"
              [class]="'sk-article-card' + (idx >= 6 ? ' sk-article-card-deferred' : '')"
              target="_self"
            >
              <div class="sk-article-img-container">
                <img
                  [src]="'/images/blogimages/' + post.image"
                  [alt]="post.title"
                  class="sk-article-img"
                  width="1200"
                  height="675"
                  [attr.loading]="idx < 3 ? null : 'lazy'"
                  [attr.fetchpriority]="idx === 0 ? 'high' : null"
                  decoding="async"
                />
              </div>
              <div class="sk-article-body">
                <div>
                  <span class="sk-project-tag-pill">{{ post.category }}</span>
                  <h2 class="sk-article-title" style="margin-top: 12px;">{{ post.title }}</h2>
                  <p class="sk-article-excerpt" style="margin-top: 8px;">{{ post.excerpt }}</p>
                </div>
                <div
                  style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; font-weight: 800; border-top: var(--sk-border-hairline); padding-top: 12px; margin-top: 16px; color: var(--sk-ink-muted);"
                >
                  <span>Udith Babu K N</span>
                  <span style="display: inline-flex; align-items: center; gap: 4px;">
                    <app-icon name="clock" [size]="14" />{{ post.readTime }}
                  </span>
                </div>
              </div>
            </a>
          }
        </div>

        <!-- Load More / Show Less -->
        <div class="sk-articles-load-more-wrap">
          @if (remainingCount() > 0) {
            <button type="button" class="sk-action-pill" (click)="loadMore()">
              Load More Articles ({{ remainingCount() }} remaining) ↓
            </button>
          }
          @if (visibleArticleCount() > 6) {
            <button
              type="button"
              class="sk-action-pill"
              (click)="showLess()"
              [style.margin-left]="remainingCount() > 0 ? '14px' : '0'"
            >
              Show Less ↑
            </button>
          }
        </div>
      </div>
    </section>
  `,
})
export class ArticlesPageComponent {
  readonly breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
  ];
  readonly categories = ['All', 'Sales Excellence', 'Growth & Analytics', 'Playbook', 'Foundations'];
  readonly totalPosts = blogPosts.length;

  readonly selectedCategory = signal('All');
  readonly searchQuery = signal('');
  readonly visibleArticleCount = signal(6);

  readonly filteredPosts = computed(() => {
    const cat = this.selectedCategory();
    const q = this.searchQuery().toLowerCase();
    return blogPosts.filter((post) => {
      const matchesCat = cat === 'All' || post.category === cat;
      const matchesSearch =
        !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  });

  readonly visiblePosts = computed(() => this.filteredPosts().slice(0, this.visibleArticleCount()));
  readonly remainingCount = computed(() => Math.max(0, this.filteredPosts().length - this.visibleArticleCount()));

  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Blog | Notes & Frameworks | Udith Babu K N',
      description: 'Strategic frameworks, AI search architectures, and empirical growth deep dives by Udith Babu K N.',
      canonical: 'https://udithbabukn.github.io/blog',
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['CollectionPage', 'Blog'],
            '@id': 'https://udithbabukn.github.io/blog',
            url: 'https://udithbabukn.github.io/blog',
            name: 'Blog & Strategy Notes | Udith Babu K N',
            description:
              'Strategic frameworks, algorithmic SEO architectures, and empirical growth deep dives on commercial revenue systems by Udith Babu K N.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://udithbabukn.github.io/' },
                { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://udithbabukn.github.io/blog' },
              ],
            },
          },
        ],
      },
    });
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
    this.visibleArticleCount.set(6);
  }

  selectCategory(cat: string): void {
    this.selectedCategory.set(cat);
    this.visibleArticleCount.set(6);
  }

  loadMore(): void {
    this.visibleArticleCount.update((c) => c + 6);
  }

  showLess(): void {
    this.visibleArticleCount.set(6);
  }
}
