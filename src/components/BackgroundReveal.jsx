import { useEffect, useRef } from 'react';

export default function BackgroundReveal() {
    const canvasRef = useRef(null);
    const maskCanvasRef = useRef(null);
    const animeImageRef = useRef(null);
    const splashesRef = useRef([]);
    const animIdRef = useRef(null);
    const isRunningRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Create offscreen mask canvas
        const maskCanvas = document.createElement('canvas');
        maskCanvasRef.current = maskCanvas;

        // Preload Anime Zen Background
        const animeImg = new Image();
        animeImg.src = '/anime-zen-bg.jpg';
        animeImageRef.current = animeImg;

        // Responsive Canvas Resizing
        const resizeCanvas = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const w = window.innerWidth;
            const h = window.innerHeight;

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;

            maskCanvas.width = canvas.width;
            maskCanvas.height = canvas.height;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Animation Loop
        let lastTimestamp = performance.now();

        const renderFrame = (now) => {
            const dt = Math.min((now - lastTimestamp) / 1000, 0.1);
            lastTimestamp = now;

            const splashes = splashesRef.current;
            const ctx = canvas.getContext('2d');
            const maskCtx = maskCanvas.getContext('2d');
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            const w = canvas.width;
            const h = canvas.height;

            if (splashes.length === 0) {
                // Clear completely and idle
                ctx.clearRect(0, 0, w, h);
                maskCtx.clearRect(0, 0, w, h);
                isRunningRef.current = false;
                return;
            }

            // Clear mask canvas
            maskCtx.clearRect(0, 0, w, h);

            // Update & Draw Ink Splashes onto Mask Canvas
            for (let i = splashes.length - 1; i >= 0; i--) {
                const s = splashes[i];
                s.life -= dt;

                if (s.life <= 0) {
                    splashes.splice(i, 1);
                    continue;
                }

                // Fade calculation: stays fully opaque for first 40%, then smoothly dissolves
                const lifeRatio = s.life / s.maxLife;
                const alpha = lifeRatio > 0.6 ? 1 : lifeRatio / 0.6;
                const shrink = 0.88 + 0.12 * lifeRatio;

                // Render each watercolor droplet in this splash cluster
                for (let d = 0; d < s.droplets.length; d++) {
                    const drop = s.droplets[d];
                    const cx = (s.x + drop.ox) * dpr;
                    const cy = (s.y + drop.oy) * dpr;
                    const r = drop.r * shrink * dpr;

                    if (r <= 1) continue;

                    // Feathered radial gradient: simulates watercolor bleeding on washi paper
                    const grad = maskCtx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
                    grad.addColorStop(0, `rgba(0, 0, 0, ${alpha * 0.98})`);
                    grad.addColorStop(0.72, `rgba(0, 0, 0, ${alpha * 0.88})`);
                    grad.addColorStop(0.92, `rgba(0, 0, 0, ${alpha * 0.35})`);
                    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

                    maskCtx.fillStyle = grad;
                    maskCtx.beginPath();

                    // Organic jagged perimeter polygon
                    const numPts = drop.points.length;
                    for (let p = 0; p < numPts; p++) {
                        const angle = (p / numPts) * Math.PI * 2;
                        const pr = r * drop.points[p];
                        const px = cx + Math.cos(angle) * pr;
                        const py = cy + Math.sin(angle) * pr;
                        if (p === 0) maskCtx.moveTo(px, py);
                        else maskCtx.lineTo(px, py);
                    }
                    maskCtx.closePath();
                    maskCtx.fill();
                }
            }

            // Draw Anime Zen Background onto main canvas (background-size: cover)
            ctx.clearRect(0, 0, w, h);

            if (animeImg.complete && animeImg.naturalWidth > 0) {
                const imgRatio = animeImg.naturalWidth / animeImg.naturalHeight;
                const screenRatio = w / h;
                let rw, rh, ox, oy;

                if (screenRatio > imgRatio) {
                    rw = w;
                    rh = w / imgRatio;
                    ox = 0;
                    oy = (h - rh) / 2;
                } else {
                    rh = h;
                    rw = h * imgRatio;
                    ox = (w - rw) / 2;
                    oy = 0;
                }

                ctx.drawImage(animeImg, ox, oy, rw, rh);
            }

            // Mask Anime background using destination-in (only keep where ink splashed)
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(maskCanvas, 0, 0);
            ctx.globalCompositeOperation = 'source-over';

            animIdRef.current = requestAnimationFrame(renderFrame);
        };

        const startLoop = () => {
            if (!isRunningRef.current) {
                isRunningRef.current = true;
                lastTimestamp = performance.now();
                animIdRef.current = requestAnimationFrame(renderFrame);
            }
        };

        // Create an organic Sumi watercolor ink splash cluster
        const spawnInkSplash = (x, y, speed) => {
            const baseRadius = Math.min(Math.max(75 + speed * 15, 65), 140);
            const dropletCount = 5 + Math.floor(Math.random() * 4);
            const droplets = [];

            // Central main pool
            droplets.push({
                ox: (Math.random() - 0.5) * 8,
                oy: (Math.random() - 0.5) * 8,
                r: baseRadius,
                points: generateOrganicPolygon(16, 0.16)
            });

            // Satellite droplets spattered outward
            for (let i = 0; i < dropletCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = (baseRadius * 0.45) + Math.random() * (baseRadius * 0.65);
                const satRadius = 16 + Math.random() * (baseRadius * 0.38);
                droplets.push({
                    ox: Math.cos(angle) * dist,
                    oy: Math.sin(angle) * dist,
                    r: satRadius,
                    points: generateOrganicPolygon(12, 0.22)
                });
            }

            splashesRef.current.push({
                x,
                y,
                droplets,
                life: 2.2, // ~2.2 seconds total lifetime
                maxLife: 2.2
            });

            // Keep array capped to prevent excess memory
            if (splashesRef.current.length > 55) {
                splashesRef.current.shift();
            }

            startLoop();
        };

        // Pointer tracking for organic ink splashes on movement
        let lastX = null;
        let lastY = null;
        let lastTime = 0;

        const handlePointerMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;
            const now = performance.now();

            if (lastX === null) {
                lastX = x;
                lastY = y;
                lastTime = now;
                spawnInkSplash(x, y, 0);
                return;
            }

            const dist = Math.hypot(x - lastX, y - lastY);
            // Spawn if moved at least 16px or after 50ms of motion
            if (dist >= 16 || (now - lastTime > 50 && dist > 4)) {
                const speed = Math.min(dist / Math.max(now - lastTime, 1), 3.5);
                spawnInkSplash(x, y, speed);
                lastX = x;
                lastY = y;
                lastTime = now;
            }
        };

        window.addEventListener('pointermove', handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('pointermove', handlePointerMove);
            if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="zen-ink-splash-canvas"
            aria-hidden="true"
        />
    );
}

// Generate an irregular organic perimeter for watercolor blotch
function generateOrganicPolygon(numPoints, jitter) {
    const points = [];
    const seed = Math.random() * 10;
    for (let i = 0; i < numPoints; i++) {
        const harmonic = Math.sin(i * 1.8 + seed) * jitter;
        const randomVar = (Math.random() - 0.5) * jitter;
        points.push(1 + harmonic + randomVar);
    }
    return points;
}
