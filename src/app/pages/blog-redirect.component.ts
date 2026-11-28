import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Handles direct /blog/:slug URLs (e.g. typed without .html or redirected via 404.html)
 * without causing an infinite reload loop on typos.
 */
@Component({
  selector: 'app-blog-redirect',
  standalone: true,
  template: `
    <div style="padding: 80px 20px; text-align: center; color: var(--ca-text-primary); font-family: var(--sk-font-mono); font-weight: 700;">
      Opening article…
    </div>
  `,
})
export class BlogRedirectComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      let cancelled = false;
      this.destroyRef.onDestroy(() => {
        cancelled = true;
      });

      const pathname = window.location.pathname;
      const cleanPath = pathname.endsWith('.html') ? pathname : `${pathname}.html`;

      fetch(cleanPath)
        .then((res) => {
          if (!res.ok || !res.headers.get('content-type')?.includes('text/html')) {
            throw new Error('Not found');
          }
          return res.text();
        })
        .then((html) => {
          if (cancelled) return;
          if (!html.includes('<app-root') && html.includes('sk-article-card-sheet')) {
            document.open();
            document.write(html);
            document.close();
          } else {
            void this.router.navigateByUrl('/blog', { replaceUrl: true });
          }
        })
        .catch(() => {
          if (!cancelled) void this.router.navigateByUrl('/blog', { replaceUrl: true });
        });
    });
  }
}
