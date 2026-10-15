import React, { useEffect, useRef } from 'react';

/**
 * AsciiBackground Component
 * Renders the iconic Michelangelo Creation of Adam reaching hands
 * in authentic ASCII character arrangement as an ambient, interactive background.
 * Unified layout: Left hand anchored to left-most edge, Right hand anchored to right-most edge,
 * pointing towards each other across the center on BOTH desktop and mobile.
 */
export default function AsciiBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let cssWidth = window.innerWidth;
    let cssHeight = window.innerHeight;
    let scrollY = window.scrollY;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Preload top hands assets (green for light theme, white for dark theme)
    const imgLeftGreen = new Image();
    imgLeftGreen.src = '/ascii-hand-left-green.png';

    const imgRightGreen = new Image();
    imgRightGreen.src = '/ascii-hand-right-green.png';

    const imgLeftWhite = new Image();
    imgLeftWhite.src = '/ascii-hand-left-white.png';

    const imgRightWhite = new Image();
    imgRightWhite.src = '/ascii-hand-right-white.png';

    let loadedCount = 0;
    let imagesLoaded = false;
    const onLoad = () => {
      loadedCount++;
      if (loadedCount >= 2) {
        imagesLoaded = true;
      }
    };

    imgLeftGreen.onload = onLoad;
    imgRightGreen.onload = onLoad;
    imgLeftWhite.onload = onLoad;
    imgRightWhite.onload = onLoad;

    // Dimensions setup with Device Pixel Ratio
    const setupDimensions = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      canvas.width = Math.floor(cssWidth * dpr);
      canvas.height = Math.floor(cssHeight * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupDimensions();
    window.addEventListener('resize', setupDimensions);
    window.addEventListener('orientationchange', setupDimensions);

    // Mouse and Touch tracking for parallax & illumination
    let mouse = {
      x: cssWidth / 2,
      y: cssHeight / 3,
      targetX: cssWidth / 2,
      targetY: cssHeight / 3
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
      }
    };
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Floating ambient ASCII particles in surrounding space
    const particleChars = ['·', ':', '+', '*', '°', '~', 'x', '%', '▪'];
    const particleCount = 24;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * cssWidth,
      y: Math.random() * cssHeight,
      speedY: 0.15 + Math.random() * 0.35,
      char: particleChars[Math.floor(Math.random() * particleChars.length)],
      alpha: 0.12 + Math.random() * 0.28,
      size: 9 + Math.floor(Math.random() * 4)
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      // Theme detection
      const isDark =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.body.classList.contains('dark');

      const leftImg = isDark ? imgLeftWhite : imgLeftGreen;
      const rightImg = isDark ? imgRightWhite : imgRightGreen;

      // Smooth mouse / touch lerping
      mouse.x += (mouse.targetX - mouse.x) * 0.06;
      mouse.y += (mouse.targetY - mouse.y) * 0.06;

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const isMobile = cssWidth < 768;

      // Subtle breath and float offsets
      const floatOffset = prefersReducedMotion ? 0 : Math.sin(time * 1.2) * 5;
      const mouseParallaxX = ((mouse.x / cssWidth) - 0.5) * 16;
      const mouseParallaxY = ((mouse.y / cssHeight) - 0.5) * 12;
      const scrollParallax = -scrollY * 0.14;

      // Draw background ambient ASCII particles
      if (!prefersReducedMotion) {
        ctx.font = '600 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.y -= p.speedY;
          if (p.y < -20) {
            p.y = cssHeight + 20;
            p.x = Math.random() * cssWidth;
          }
          ctx.fillStyle = isDark
            ? `rgba(230, 245, 235, ${p.alpha.toFixed(3)})`
            : `rgba(20, 69, 47, ${p.alpha.toFixed(3)})`;
          ctx.font = `${p.size}px "JetBrains Mono", monospace`;
          ctx.fillText(p.char, p.x, p.y);
        }
      }

      // =========================================================================
      // MICHELANGELO CREATION OF ADAM HANDS (LEFT-MOST AND RIGHT-MOST EDGES)
      // =========================================================================
      if (imagesLoaded) {
        ctx.save();

        const handRatio = isMobile ? 0.47 : Math.min(0.44, 720 / cssWidth);
        const handW = Math.min(cssWidth * handRatio, 740);

        // Left Hand - strictly at left-most edge (x: 0)
        const leftW = handW;
        const leftH = leftW * (300 / 480);
        const leftX = mouseParallaxX * 0.35;
        const leftY = Math.max(isMobile ? 50 : 28, cssHeight * 0.10) + floatOffset + scrollParallax;

        // Right Hand - strictly at right-most edge (x: cssWidth - rightW)
        const rightW = handW * (454 / 480);
        const rightH = rightW * (300 / 454);
        const rightX = cssWidth - rightW + mouseParallaxX * 0.35;
        const rightY = leftY + leftH * (isMobile ? 0.12 : 0.20) - floatOffset;

        const distToLeft = Math.hypot(mouse.x - (leftX + leftW / 2), mouse.y - (leftY + leftH / 2));
        const leftBoost = Math.max(0, 1 - distToLeft / (isMobile ? 220 : 360)) * 0.20;
        const baseAlpha = isMobile ? 0.86 : 0.80;

        ctx.globalAlpha = Math.min(1.0, baseAlpha + leftBoost);
        ctx.drawImage(leftImg, leftX, leftY, leftW, leftH);

        const distToRight = Math.hypot(mouse.x - (rightX + rightW / 2), mouse.y - (rightY + rightH / 2));
        const rightBoost = Math.max(0, 1 - distToRight / (isMobile ? 220 : 360)) * 0.20;

        ctx.globalAlpha = Math.min(1.0, baseAlpha + rightBoost);
        ctx.drawImage(rightImg, rightX, rightY, rightW, rightH);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setupDimensions);
      window.removeEventListener('orientationchange', setupDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="sk-ascii-hands-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
}
