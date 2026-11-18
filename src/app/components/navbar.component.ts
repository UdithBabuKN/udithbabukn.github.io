import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="sk-header">
      <div class="sk-container sk-header-inner">
        <nav aria-label="Main Navigation">
          <ul class="sk-nav-pills">
            @for (item of navItems; track item.path; let idx = $index) {
              <li>
                <a
                  [routerLink]="item.path"
                  routerLinkActive="active"
                  [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                  [class]="'sk-nav-pill-btn ' + item.pillClass + ' dispersed-item-' + idx"
                >
                  <span class="sk-nav-index-tag">{{ item.id }}.</span>
                  <span>{{ item.name }}</span>
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
  readonly navItems = [
    { id: '01', name: 'Home', path: '/', pillClass: 'pill-home' },
    { id: '02', name: 'Work', path: '/work', pillClass: 'pill-work' },
    { id: '03', name: 'About', path: '/about', pillClass: 'pill-about' },
    { id: '04', name: 'Skills', path: '/skills', pillClass: 'pill-skills' },
    { id: '05', name: 'Blog', path: '/blog', pillClass: 'pill-blog pill-articles' },
    { id: '06', name: 'Contact', path: '/contact', pillClass: 'pill-contact' },
  ];
}
