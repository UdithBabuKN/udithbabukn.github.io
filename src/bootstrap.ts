import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

function ensureFullStylesheet(): void {
  if (typeof document === 'undefined') return;
  const meta = document.head.querySelector<HTMLMetaElement>('meta[name="app-full-styles"]');
  const href = meta?.content;
  if (!href || document.head.querySelector(`link[rel="stylesheet"][href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

export function bootstrapPortfolio(): Promise<void> {
  ensureFullStylesheet();
  return bootstrapApplication(AppComponent, appConfig)
    .then(() => undefined)
    .catch((err) => {
      console.error(err);
    });
}
