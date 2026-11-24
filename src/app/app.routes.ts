import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'work',
    loadComponent: () => import('./pages/work-page.component').then((m) => m.WorkPageComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills-page.component').then((m) => m.SkillsPageComponent),
  },
  {
    path: 'blog',
    pathMatch: 'full',
    loadComponent: () => import('./pages/articles-page.component').then((m) => m.ArticlesPageComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/blog-redirect.component').then((m) => m.BlogRedirectComponent),
  },
  { path: 'articles', redirectTo: 'blog', pathMatch: 'full' },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page.component').then((m) => m.ContactPageComponent),
  },
  { path: '**', redirectTo: '' },
];
