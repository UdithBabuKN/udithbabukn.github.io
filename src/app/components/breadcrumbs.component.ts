import { Component, inject, input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (items().length > 0) {
      <nav aria-label="Breadcrumb" class="sk-breadcrumb-nav">
        <ol class="sk-breadcrumb-list" itemscope itemtype="https://schema.org/BreadcrumbList">
          @for (item of items(); track item.path; let idx = $index; let last = $last) {
            <li
              [class]="'sk-breadcrumb-item' + (last ? ' current' : '')"
              itemprop="itemListElement"
              itemscope
              itemtype="https://schema.org/ListItem"
            >
              @if (!last) {
                <a [routerLink]="item.path" itemprop="item" class="sk-breadcrumb-link">
                  <span itemprop="name">{{ item.label }}</span>
                </a>
                <meta itemprop="position" [attr.content]="idx + 1" />
                <span class="sk-breadcrumb-sep" aria-hidden="true">/</span>
              } @else {
                <span itemprop="name" class="sk-breadcrumb-current" aria-current="page">
                  {{ item.label }}
                </span>
                <link itemprop="item" [href]="canonicalUrl(item.path)" />
                <meta itemprop="position" [attr.content]="idx + 1" />
              }
            </li>
          }
        </ol>
      </nav>
    }
  `,
})
export class BreadcrumbsComponent {
  readonly items = input<BreadcrumbItem[]>([]);
  private readonly sanitizer = inject(DomSanitizer);

  canonicalUrl(path: string): SafeResourceUrl {
    const safePath = path.startsWith('/') ? path : '/';
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://udithbabukn.github.io' + safePath);
  }
}
