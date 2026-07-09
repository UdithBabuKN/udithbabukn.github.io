import React, { useEffect } from 'react';

export default function Background3D({ activeSection }) {
    const [cameraOrbit, setCameraOrbit] = React.useState('-40deg 70deg 100%');

    const [cameraTarget, setCameraTarget] = React.useState('auto 1.0m auto');

    React.useEffect(() => {
        let modelsLoaded = false;
        const load3DModels = () => {
            // Do not load the 3D model on mobile to save data and battery
            if (modelsLoaded || window.innerWidth <= 768) return;
            modelsLoaded = true;

            // Dynamically inject the model-viewer script if it doesn't exist
            if (!document.getElementById('model-viewer-script')) {
                const script = document.createElement('script');
                script.type = 'module';
                script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
                script.id = 'model-viewer-script';
                document.body.appendChild(script);
            }

            const viewer = document.getElementById('bg-model');
            if (viewer) {
                viewer.src = '/udith3d4k.glb';
            }
        };
        const userInteractions = ['scroll', 'mousemove', 'touchstart', 'click', 'keydown'];
        const handleInteraction = () => {
            load3DModels();
            userInteractions.forEach(event => {
                window.removeEventListener(event, handleInteraction);
            });
        };
        userInteractions.forEach(event => {
            window.addEventListener(event, handleInteraction, { once: true, passive: true });
        });
        
        const timeout = setTimeout(load3DModels, 8000);
        return () => clearTimeout(timeout);
    }, []);

    React.useEffect(() => {
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
        // Lock the camera target so the model only rotates but never translates, keeping it glued to the background image
        setCameraTarget('auto 1.0m auto');
    }, [activeSection]);

    return (
        <>
            <model-viewer 
                id="bg-model" 
                src="" 
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
        </>
    );
}
