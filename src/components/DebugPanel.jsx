import { useState, useEffect, useRef } from 'react';

export default function DebugPanel() {
    const [params, setParams] = useState({
        tx: 0,
        ty: 6.6,
        tw: 38,
        th: 78.3
    });

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .bg-model-viewer {
                left: calc(var(--img-x) + var(--img-w) * ${params.tx / 100}) !important;
                top: calc(var(--img-y) + var(--img-h) * ${params.ty / 100}) !important;
                width: calc(var(--img-w) * ${params.tw / 100}) !important;
                height: calc(var(--img-h) * ${params.th / 100}) !important;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, [params]);

    const handleChange = (e) => {
        setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
    };

    return (
        <div style={{ position: 'fixed', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.8)', color: 'white', padding: '15px', zIndex: 99999, borderRadius: '8px', fontSize: '12px' }}>
            <h3 style={{ margin: '0 0 10px 0', color: 'white' }}>Place 3D Model</h3>
            {['tx', 'ty', 'tw', 'th'].map(key => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                    <label style={{ width: '30px' }}>{key}</label>
                    <input type="range" name={key} min={0} max={100} step={0.1} value={params[key]} onChange={handleChange} style={{ width: '150px', margin: '0 10px' }} />
                    <span style={{ width: '40px' }}>{params[key]}</span>
                </div>
            ))}
            <div style={{ color: '#0f0', fontWeight: 'bold', marginTop: '10px' }}>
                tx: {params.tx}, ty: {params.ty}, tw: {params.tw}, th: {params.th}
            </div>
            <div style={{ marginTop: '10px' }}>Position the model over the person, then send me these green values!</div>
        </div>
    );
}
