import React, { useEffect } from 'react';

export default function Background3D({ activeSection }) {
    const [cameraOrbit, setCameraOrbit] = React.useState('-40deg 70deg 100%');

    React.useEffect(() => {
        let modelsLoaded = false;
        const load3DModels = () => {
            if (modelsLoaded) return;
            modelsLoaded = true;
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
        // Step 1: Face the viewer directly
        setCameraOrbit('-40deg 70deg 100%');
        
        // Step 2: Slowly look towards the widgets (slight right)
        // Reduced the turn angle to be much slighter (closer to -40deg)
        const sectionOrbits = {
            'summary': '-55deg 70deg 100%',
            'skills': '-60deg 70deg 100%',
            'experience': '-52deg 70deg 100%',
            'education': '-54deg 70deg 100%',
            'projects': '-62deg 70deg 100%',
            'blog': '-58deg 70deg 100%',
            'contact': '-45deg 70deg 100%', // Looks mostly at viewer for contact
        };
        
        const targetOrbit = sectionOrbits[activeSection] || '-55deg 70deg 95%';
        
        const timer = setTimeout(() => {
            setCameraOrbit(targetOrbit);
        }, 1200); // Wait 1.2s before turning
        
        return () => clearTimeout(timer);
    }, [activeSection]);

    return (
        <model-viewer 
            id="bg-model" 
            src="" 
            autoplay
            camera-orbit={cameraOrbit}
            camera-target="auto 1.0m auto"
            interaction-prompt="none" 
            animation-crossfade-duration="800" 
            shadow-intensity="1"
            environment-image="neutral"
            exposure="1"
            className="bg-model-viewer">
        </model-viewer>
    );
}
