import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="ca-site-header">
      <div class="ca-nav-wrap ca-nav-centered">
        <button
          type="button"
          class="ca-nav-toggle"
          [attr.aria-expanded]="menuOpen()"
          aria-controls="primary-nav"
          aria-label="Toggle navigation menu"
          (click)="toggleMenu()"
        >
          @if (menuOpen()) {
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span>Close</span>
          } @else {
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="4" y1="7" x2="20" y2="7"></line>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="17" x2="20" y2="17"></line>
            </svg>
            <span>Menu</span>
          }
        </button>

        <nav
          id="primary-nav"
          aria-label="Main Navigation"
          class="ca-nav-main"
          [class.is-open]="menuOpen()"
          [style.display]="menuOpen() ? 'block' : null"
        >
          <ul class="ca-nav-links">
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
      </div>
    </header>
  `,
})
export class NavbarComponent {
  private readonly host = inject(ElementRef<HTMLElement>);
  readonly menuOpen = signal(false);

  readonly navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.closeMenu();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen() && !this.host.nativeElement.contains(event.target as Node)) {
      this.closeMenu();
    }
  }
}
