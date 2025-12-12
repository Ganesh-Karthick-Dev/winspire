/**
 * GLTFViewer Component
 * 
 * Handles the complete 3D scene lifecycle:
 * - Dynamic loading of Three.js (code-split)
 * - GLTF model loading with Draco decoder
 * - Progress tracking via LoadingManager
 * - Warmup sequence (shader compilation, first frame)
 * - Animation loop
 * 
 * This component is dynamically imported with ssr: false.
 */

import { useEffect, useRef, useCallback } from 'react';
import WebGLCanvas from './WebGLCanvas';
import { resetLoaderToZero } from '@/lib/loaderManager';
import {
    initializeThreeScene,
    createResizeHandler,
    createAnimationLoop,
    type ThreeState
} from '@/lib/threeManager';
import { scheduleIdleLoad } from '@/lib/threeUtils';

interface GLTFViewerProps {
    /** URL to the GLTF/GLB model */
    url?: string;
    /** Callback when model is loaded and ready */
    onModelReady?: (state: ThreeState) => void;
    /** Callback for errors */
    onError?: (error: Error) => void;
}

export default function GLTFViewer({
    url = '/models/hero-draco.glb',
    onModelReady,
    onError,
}: GLTFViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const stateRef = useRef<ThreeState | null>(null);
    const animationRef = useRef<{ start: () => void; stop: () => void } | null>(null);
    const isInitializedRef = useRef(false);

    // Initialize Three.js scene
    const initializeScene = useCallback(async (canvas: HTMLCanvasElement) => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        try {
            // Initialize Three.js and load model
            const state = await initializeThreeScene(canvas, url);
            stateRef.current = state;

            // Set up resize handler
            const handleResize = createResizeHandler(state.renderer, state.camera);
            window.addEventListener('resize', handleResize);

            // Start animation loop
            const animation = createAnimationLoop(state.renderer, state.scene, state.camera);
            animationRef.current = animation;
            animation.start();

            // Notify parent
            if (onModelReady) {
                onModelReady(state);
            }

            // Return cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                animation.stop();
                state.renderer.dispose();
            };
        } catch (error) {
            console.error('Failed to initialize 3D scene:', error);
            if (onError) {
                onError(error instanceof Error ? error : new Error('Failed to initialize 3D scene'));
            }
        }
    }, [url, onModelReady, onError]);

    // Handle canvas ready
    const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
        canvasRef.current = canvas;

        // Reset loader and schedule initialization during idle time
        resetLoaderToZero();

        scheduleIdleLoad(() => {
            if (canvasRef.current) {
                initializeScene(canvasRef.current);
            }
        });
    }, [initializeScene]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
            if (stateRef.current) {
                stateRef.current.renderer.dispose();
            }
        };
    }, []);

    return <WebGLCanvas onCanvasReady={handleCanvasReady} />;
}
