import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { initWebMcp } from './app/utils/webmcp';

// Purge any legacy Workbox service worker from returning visitors' browsers
if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((reg) => {
      void reg.unregister();
    });
  });
}

initWebMcp();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
