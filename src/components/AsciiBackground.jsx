import React from 'react';

/**
 * AsciiBackground Component
 * Renders the Michelangelo Creation of Adam reaching hands
 * in a completely static, high-performance manner with zero animation loops,
 * zero particles, and zero CPU/GPU overhead.
 */
export default function AsciiBackground() {
  return (
    <div className="sk-static-background" aria-hidden="true">
      {/* Light theme hands (Dark Forest Green) - High Priority LCP */}
      <img
        src="/ascii-hand-left-green.webp"
        alt=""
        className="sk-static-hand sk-hand-left sk-hand-green"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="480"
        height="300"
      />
      <img
        src="/ascii-hand-right-green.webp"
        alt=""
        className="sk-static-hand sk-hand-right sk-hand-green"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        width="454"
        height="300"
      />

      {/* Dark theme hands (White) - Lazy Loaded for Dark Mode */}
      <img
        src="/ascii-hand-left-white.webp"
        alt=""
        className="sk-static-hand sk-hand-left sk-hand-white"
        loading="lazy"
        decoding="async"
        width="480"
        height="300"
      />
      <img
        src="/ascii-hand-right-white.webp"
        alt=""
        className="sk-static-hand sk-hand-right sk-hand-white"
        loading="lazy"
        decoding="async"
        width="454"
        height="300"
      />
    </div>
  );
}
