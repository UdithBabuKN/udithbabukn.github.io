import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="ca-site-header">
      <div class="ca-nav-wrap ca-nav-centered">
        <nav aria-label="Main Navigation" class="ca-nav-main">
          <ul [class]="'ca-nav-links' + (mobileOpen() ? ' mobile-open' : '')">
            @for (item of navItems; track item.path) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                  class="ca-nav-link"
                  (click)="closeMenu()"
                >
                  {{ item.name }}
                </a>
              </li>
            }
          </ul>
        </nav>

        <button
          type="button"
          class="ca-mobile-toggle"
          [attr.aria-expanded]="mobileOpen()"
          aria-label="Toggle navigation menu"
          (click)="toggleMenu()"
        >
          @if (mobileOpen()) {
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          } @else {
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          }
          <span class="ca-mobile-toggle-label">Menu</span>
        </button>
      </div>
    </header>
  `,
})
export class NavbarComponent {
  readonly mobileOpen = signal(false);

  readonly navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  toggleMenu(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.mobileOpen.set(false);
  }
}
