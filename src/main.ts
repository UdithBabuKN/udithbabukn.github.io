import { initWebMcp } from './app/utils/webmcp';

initWebMcp();

// Purge any legacy Workbox service worker without blocking initial paint
const cleanupLegacySw = () => {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        void reg.unregister();
      });
    });
  }
};

if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(cleanupLegacySw, { timeout: 3000 });
  } else {
    globalThis.setTimeout(cleanupLegacySw, 1500);
  }

  let bootstrapped = false;
  const triggerEvents: Array<keyof WindowEventMap> = [
    'pointerdown',
    'keydown',
    'touchstart',
    'click',
    'focusin',
    'mousemove',
    'scroll',
  ];

  const startApp = () => {
    if (bootstrapped) return;
    bootstrapped = true;
    for (const evt of triggerEvents) {
      window.removeEventListener(evt, startApp, true);
    }
    void import('./bootstrap').then(({ bootstrapPortfolio }) => bootstrapPortfolio());
  };

  const path = window.location.pathname;
  const needsImmediateBootstrap =
    path.startsWith('/blog') ||
    path.startsWith('/contact') ||
    (path === '/' && Boolean(window.location.hash)) ||
    !document.querySelector('app-root[ng-server-context="ssg"]');

  if (needsImmediateBootstrap) {
    startApp();
  } else {
    for (const evt of triggerEvents) {
      window.addEventListener(evt, startApp, { passive: true, capture: true });
    }
  }
}
