/**
 * WebGLCanvas Component
 * 
 * Full-screen fixed canvas for Three.js rendering.
 * Hidden until .ready class is added after warmup completes.
 * 
 * Features:
 * - pointer-events: none to allow DOM interaction
 * - Injected only after requestIdleCallback
 * - Resize handling
 */

import { useRef, forwardRef, useImperativeHandle } from 'react';

export interface WebGLCanvasRef {
    canvas: HTMLCanvasElement | null;
}

interface WebGLCanvasProps {
    /** Additional CSS class */
    className?: string;
    /** Callback when canvas is ready */
    onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

const WebGLCanvas = forwardRef<WebGLCanvasRef, WebGLCanvasProps>(
    function WebGLCanvas({ className = '', onCanvasReady }, ref) {
        const canvasRef = useRef<HTMLCanvasElement>(null);

        // Expose canvas ref to parent
        useImperativeHandle(ref, () => ({
            canvas: canvasRef.current,
        }));

        // Notify parent when canvas is mounted
        const handleRef = (canvas: HTMLCanvasElement | null) => {
            if (canvas && onCanvasReady) {
                onCanvasReady(canvas);
            }
        };

        return (
            <canvas
                ref={(el) => {
                    (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = el;
                    handleRef(el);
                }}
                className={`webgl-canvas ${className}`}
                aria-hidden="true"
                role="img"
                aria-label="3D model visualization"
            />
        );
    }
);

export default WebGLCanvas;
