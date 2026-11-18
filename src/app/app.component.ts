import { Component, afterNextRender, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/footer.component';
import { NavbarComponent } from './components/navbar.component';

const LEGACY_HASH_ROUTES: Record<string, string> = {
  work: '/work',
  projects: '/work',
  about: '/about',
  bio: '/about',
  skills: '/skills',
  articles: '/blog',
  blog: '/blog',
  contact: '/contact',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <div class="sk-page-wrapper">
      <app-navbar />
      <main id="main-content">
        <router-outlet />
      </main>
      <app-footer />
    </div>
  `,
})
export class AppComponent {
  private readonly router = inject(Router);

  constructor() {
    afterNextRender(() => {
      if (window.location.pathname === '/' && window.location.hash) {
        const cleanHash = window.location.hash.toLowerCase().replace('#', '');
        const target = LEGACY_HASH_ROUTES[cleanHash];
        if (target) {
          void this.router.navigateByUrl(target, { replaceUrl: true });
        }
      }
    });
  }
}
