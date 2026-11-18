import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  update(config: SeoConfig): void {
    const ogTitle = config.ogTitle ?? config.title;
    const ogDesc = config.ogDescription ?? config.description;

    if (this.title.getTitle() !== config.title) {
      this.title.setTitle(config.title);
    }

    const setMetaIfChanged = (selector: string, tag: { name?: string; property?: string; content: string }) => {
      const existing = this.doc.head.querySelector<HTMLMetaElement>(selector);
      if (existing?.getAttribute('content') === tag.content) return;
      this.meta.updateTag(tag);
    };

    setMetaIfChanged('meta[name="description"]', { name: 'description', content: config.description });
    setMetaIfChanged('meta[property="og:title"]', { property: 'og:title', content: ogTitle });
    setMetaIfChanged('meta[property="og:description"]', { property: 'og:description', content: ogDesc });
    setMetaIfChanged('meta[property="og:url"]', { property: 'og:url', content: config.canonical });
    setMetaIfChanged('meta[name="twitter:title"]', { name: 'twitter:title', content: ogTitle });
    setMetaIfChanged('meta[name="twitter:description"]', { name: 'twitter:description', content: ogDesc });

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    if (link.getAttribute('href') !== config.canonical) {
      link.setAttribute('href', config.canonical);
    }

    const existingSchema = this.doc.querySelector('script[data-route-schema="true"]');
    const serialized = config.schema ? JSON.stringify(config.schema) : null;
    if (existingSchema && serialized !== null && existingSchema.textContent === serialized) {
      return;
    }
    if (existingSchema) existingSchema.remove();

    if (serialized !== null) {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-route-schema', 'true');
      script.textContent = serialized;
      this.doc.head.appendChild(script);
    }
  }
}
