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
      {/* Light theme hands (Dark Forest Green) */}
      <img
        src="/ascii-hand-left-green.png"
        alt=""
        className="sk-static-hand sk-hand-left sk-hand-green"
        loading="eager"
        decoding="async"
      />
      <img
        src="/ascii-hand-right-green.png"
        alt=""
        className="sk-static-hand sk-hand-right sk-hand-green"
        loading="eager"
        decoding="async"
      />

      {/* Dark theme hands (White) */}
      <img
        src="/ascii-hand-left-white.png"
        alt=""
        className="sk-static-hand sk-hand-left sk-hand-white"
        loading="eager"
        decoding="async"
      />
      <img
        src="/ascii-hand-right-white.png"
        alt=""
        className="sk-static-hand sk-hand-right sk-hand-white"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
