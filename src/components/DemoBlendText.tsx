/**
 * DemoBlendText - Text with Color Blending Effect
 * 
 * Two-layer approach like reference site:
 * - Layer 1: Black text (always visible)
 * - Layer 2: Cyan text (only visible where model overlaps)
 */

'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

interface DemoBlendTextProps {
    className?: string;
    style?: React.CSSProperties;
    text1?: string;
    text2?: string;
}

export default function DemoBlendText({
    className,
    style,
    text1 = "Zero Risk",
    text2 = "High Clarity"
}: DemoBlendTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<number>(0);
    const [isReady, setIsReady] = useState(false);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        // Get webgl canvas
        const webglCanvas = document.querySelector('.webgl-canvas.ready') as HTMLCanvasElement;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // DPR scaling
        const dpr = Math.min(window.devicePixelRatio, 2);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;

        // Text settings
        const fontSize = Math.min(width * 0.14, 150);
        const centerX = width / 2;
        const centerY = height / 3;

        ctx.font = `900 ${fontSize}px Outfit, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // === LAYER 1: Draw BLACK text (always visible) ===
        ctx.fillStyle = '#000000';
        ctx.fillText('Zero Risk High Clarity', centerX, centerY - fontSize * 0.4);

        // === LAYER 2: Draw CYAN text where model exists === 
        if (webglCanvas && webglCanvas.width > 0) {
            ctx.save();

            // Create a temporary canvas for the model mask
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvas.width;
            tempCanvas.height = canvas.height;
            const tempCtx = tempCanvas.getContext('2d');

            if (tempCtx) {
                // Scale temp context
                tempCtx.scale(dpr, dpr);

                // Draw model to temp canvas
                try {
                    tempCtx.drawImage(webglCanvas, 0, 0, width, height);
                } catch (e) {
                    // Cross-origin error
                }

                // Draw cyan text
                tempCtx.globalCompositeOperation = 'source-in';

                const gradient = tempCtx.createLinearGradient(
                    centerX - 300, centerY,
                    centerX + 300, centerY
                );
                gradient.addColorStop(0, '#00d4ff');
                gradient.addColorStop(0.5, '#0099ff');
                gradient.addColorStop(1, '#00d4ff');
                tempCtx.fillStyle = gradient;
                tempCtx.font = `900 ${fontSize}px Outfit, sans-serif`;
                tempCtx.textAlign = 'center';
                tempCtx.textBaseline = 'middle';
                tempCtx.fillText('Zero Risk High Clarity', centerX, centerY - fontSize * 0.4);

                // Draw temp canvas on main canvas
                ctx.drawImage(tempCanvas, 0, 0);
            }

            ctx.restore();
        }

        // Continue animation loop
        frameRef.current = requestAnimationFrame(draw);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Set canvas size
        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.scale(dpr, dpr);
            }
        };

        resize();
        window.addEventListener('resize', resize);

        // Start animation
        const checkReady = setInterval(() => {
            const webgl = document.querySelector('.webgl-canvas.ready');
            if (webgl) {
                setIsReady(true);
                clearInterval(checkReady);
                frameRef.current = requestAnimationFrame(draw);
            }
        }, 100);

        const timeout = setTimeout(() => {
            setIsReady(true);
            clearInterval(checkReady);
            frameRef.current = requestAnimationFrame(draw);
        }, 2000);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(frameRef.current);
            clearInterval(checkReady);
            clearTimeout(timeout);
        };
    }, [draw]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 5,
                pointerEvents: 'none',
                opacity: isReady ? 1 : 0,
                transition: 'opacity 0.3s ease',
                ...style,
            }}
        />
    );
}
