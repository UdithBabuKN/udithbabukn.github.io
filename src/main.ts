// Defer non-critical background setup until after load + idle so initial TBT stays near zero
const runDeferredSetup = () => {
  void import('./app/utils/webmcp').then(({ initWebMcp }) => initWebMcp());
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((reg) => {
        void reg.unregister();
      });
    });
  }
};

if (typeof window !== 'undefined') {
  const scheduleDeferred = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(runDeferredSetup, { timeout: 3500 });
    } else {
      globalThis.setTimeout(runDeferredSetup, 2000);
    }
  };
  if (document.readyState === 'complete') {
    globalThis.setTimeout(scheduleDeferred, 1500);
  } else {
    window.addEventListener('load', () => globalThis.setTimeout(scheduleDeferred, 1500), { once: true });
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
