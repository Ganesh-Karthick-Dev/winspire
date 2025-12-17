/**
 * GLTFViewer Component
 * 
 * Handles the complete 3D scene lifecycle:
 * - Dynamic loading of Three.js (code-split)
 * - GLTF model loading with Draco decoder
 * - Progress tracking via LoadingManager
 * - Warmup sequence (shader compilation, first frame)
 * - Animation loop
 * - Mouse cursor tracking for interactive rotation
 * - Continuous rotation at vision section
 * 
 * This component is dynamically imported with ssr: false.
 */

import { useEffect, useRef, useCallback } from 'react';
import { modelSettings } from '@/config/three-settings';
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
    /** Optional manual transform for the model */
    manualTransform?: {
        scale: number;
        position: { x: number; y: number; z: number };
        rotation: { x: number; y: number; z: number };
    };
    /** Speed of idle rotation */
    rotateSpeed?: number;
    /** Callback when model is loaded and ready */
    onModelReady?: (state: ThreeState) => void;
    /** Callback for errors */
    onError?: (error: Error) => void;
    className?: string; // Explicitly included in interface
}

export default function GLTFViewer({
    url = modelSettings.defaultModelUrl,
    manualTransform,
    rotateSpeed = modelSettings.animation.rotateSpeed,
    onModelReady,
    onError,
    className,
}: GLTFViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const stateRef = useRef<ThreeState | null>(null);
    const animationRef = useRef<{ start: () => void; stop: () => void } | null>(null);
    const isInitializedRef = useRef(false);

    // Mouse tracking refs
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const currentMouseX = useRef(0);
    const currentMouseY = useRef(0);

    // Continuous rotation ref
    const continuousRotation = useRef(0);
    const isAtVisionSection = useRef(false);

    // Store base rotation from GSAP
    const baseRotationX = useRef(0);
    const baseRotationY = useRef(0);
    const baseRotationZ = useRef(0);

    // Mouse move handler for interactive rotation
    const handleMouseMove = useCallback((event: MouseEvent) => {
        // Normalize mouse position to -1 to 1
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY.current = (event.clientY / window.innerHeight) * 2 - 1;
    }, []);

    // Check if user has scrolled to vision section
    const checkVisionSection = useCallback(() => {
        const visionSection = document.getElementById('vision');
        if (visionSection) {
            const rect = visionSection.getBoundingClientRect();
            // Consider "at vision" when section is 50% visible
            isAtVisionSection.current = rect.top < window.innerHeight * 0.5 && rect.bottom > 0;
        }
    }, []);

    // Smooth rotation update in animation loop
    const updateRotation = useCallback(() => {
        if (!stateRef.current?.model) return;

        const model = stateRef.current.model;

        // Continuous smooth rotation - Y-axis (horizontal turntable spin)
        // Controlled by settings or prop
        continuousRotation.current += rotateSpeed;

        // Apply rotation: Y-axis for turntable effect
        model.rotation.x = baseRotationX.current;
        model.rotation.y = baseRotationY.current + continuousRotation.current;
        model.rotation.z = baseRotationZ.current;
    }, [rotateSpeed]);

    // Store base rotation when GSAP updates it
    const captureBaseRotation = useCallback(() => {
        if (!stateRef.current?.model) return;

        const model = stateRef.current.model;

        // Capture base rotation (subtract continuous from Y)
        if (!isAtVisionSection.current) {
            baseRotationX.current = model.rotation.x;
            baseRotationY.current = model.rotation.y - continuousRotation.current;
            baseRotationZ.current = model.rotation.z;
        }
    }, []);

    // Track previous manual transform for delta updates
    const prevManualTransform = useRef(manualTransform);

    // Handle Live Updates (HMR/Prop changes)
    useEffect(() => {
        if (!stateRef.current?.model || !manualTransform) return;

        const model = stateRef.current.model;
        const prev = prevManualTransform.current;

        // 1. Update Rotation
        // Directly update base refs so animation loop picks them up
        baseRotationX.current = manualTransform.rotation.x;
        // For Y, we update the base, and the continuous rotation continues on top of it
        baseRotationY.current = manualTransform.rotation.y;
        baseRotationZ.current = manualTransform.rotation.z;

        // 2. Update Scale
        if (manualTransform.scale !== prev?.scale) {
            model.scale.setScalar(manualTransform.scale);
        }

        // 3. Update Position (Delta approach to preserve centering)
        if (prev) {
            const dx = manualTransform.position.x - prev.position.x;
            const dy = manualTransform.position.y - prev.position.y;
            const dz = manualTransform.position.z - prev.position.z;

            model.position.x += dx;
            model.position.y += dy;
            model.position.z += dz;
        }

        // Update ref
        prevManualTransform.current = manualTransform;

    }, [manualTransform]);

    // Initialize Three.js scene
    const initializeScene = useCallback(async (canvas: HTMLCanvasElement) => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        // ... existing initialization code ...
        try {
            // Initialize Three.js and load model
            const state = await initializeThreeScene(canvas, url, manualTransform);
            stateRef.current = state;

            // Initialize base rotation refs from the config immediately
            if (manualTransform) {
                baseRotationX.current = manualTransform.rotation.x;
                baseRotationY.current = manualTransform.rotation.y;
                baseRotationZ.current = manualTransform.rotation.z;
            }

            // Set up resize handler
            const handleResize = createResizeHandler(state.renderer, state.camera, state.model, manualTransform);
            window.addEventListener('resize', handleResize);
            handleResize(); // Trigger once to set initial mobile/desktop position

            // Set up mouse tracking
            window.addEventListener('mousemove', handleMouseMove);

            // Set up scroll tracking for vision section
            window.addEventListener('scroll', checkVisionSection);

            // Start animation loop with rotation updates
            const animation = createAnimationLoop(
                state.renderer,
                state.scene,
                state.camera,
                () => {
                    checkVisionSection();
                    captureBaseRotation();
                    updateRotation();
                }
            );
            animationRef.current = animation;
            animation.start();

            // Notify parent
            if (onModelReady) {
                onModelReady(state);
            }

            // Return cleanup function
            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('scroll', checkVisionSection);
                animation.stop();
                state.renderer.dispose();
            };
        } catch (error) {
            console.error('Failed to initialize 3D scene:', error);
            if (onError) {
                onError(error instanceof Error ? error : new Error('Failed to initialize 3D scene'));
            }
        }
    }, [url, manualTransform, onModelReady, onError, handleMouseMove, checkVisionSection, captureBaseRotation, updateRotation]);

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
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', checkVisionSection);
            if (animationRef.current) {
                animationRef.current.stop();
            }
            if (stateRef.current) {
                stateRef.current.renderer.dispose();
            }
        };
    }, [handleMouseMove, checkVisionSection]);

    return <WebGLCanvas onCanvasReady={handleCanvasReady} className={className} />;
}
