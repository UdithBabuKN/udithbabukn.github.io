import React from 'react';

export default function Background2D({ activeSection }) {
    return (
        <div className="bg-2d-model-layer" aria-hidden="true">
            <img 
                src="/udith2d.png" 
                alt="Udith Babu K N - 2D Model" 
                className={`bg-2d-model section-${activeSection || 'summary'}`}
                loading="eager"
                fetchPriority="high"
            />
        </div>
    );
}
