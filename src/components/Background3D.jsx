import React, { useState, useEffect } from 'react';

export default function Background3D({ activeSection }) {
    const [cameraOrbit, setCameraOrbit] = useState('-55deg 70deg 100%');
    const [cameraTarget, setCameraTarget] = useState('auto 1.0m auto');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth <= 768);
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!document.getElementById('model-viewer-script')) {
            const script = document.createElement('script');
            script.type = 'module';
            script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
            script.id = 'model-viewer-script';
            document.body.appendChild(script);
        }
    }, []);

    useEffect(() => {
        const sectionOrbits = {
            'summary': '-55deg 70deg 100%',
            'skills': '-54deg 70deg 100%',
            'experience': '-56deg 70deg 100%',
            'education': '-55deg 70deg 100%',
            'projects': '-54deg 70deg 100%',
            'certifications': '-55deg 70deg 100%',
            'faq': '-54deg 70deg 100%',
            'blog': '-56deg 70deg 100%',
            'contact': '-55deg 70deg 100%',
        };
        
        setCameraOrbit(sectionOrbits[activeSection] || '-55deg 70deg 100%');
        setCameraTarget('auto 1.0m auto');
    }, [activeSection]);

    if (isMobile) {
        return null;
    }

    return (
        <model-viewer 
            id="bg-model" 
            src="/udith3d4k.glb" 
            autoplay
            camera-orbit={cameraOrbit}
            camera-target={cameraTarget}
            interpolation-decay="100"
            interaction-prompt="none" 
            animation-crossfade-duration="800" 
            shadow-intensity="1"
            environment-image="neutral"
            exposure="1"
            className="bg-model-viewer">
        </model-viewer>
    );
}
