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
    /** Enable wobble/bobbing effect while rotating */
    enableWobble?: boolean;
    /** Callback when model is loaded and ready */
    onModelReady?: (state: ThreeState) => void;
    /** Callback for errors */
    onError?: (error: Error) => void;
    className?: string;
}

export default function GLTFViewer({
    url = modelSettings.defaultModelUrl,
    manualTransform,
    rotateSpeed = modelSettings.animation.rotateSpeed,
    enableWobble = true,
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
    const visionObserverRef = useRef<IntersectionObserver | null>(null);

    // Store base rotation from GSAP
    const baseRotationX = useRef(0);
    const baseRotationY = useRef(0);
    const baseRotationZ = useRef(0);

    // === REFS FOR LIVE UPDATES (avoids stale closures in animation loop) ===
    const manualTransformRef = useRef(manualTransform);
    const rotateSpeedRef = useRef(rotateSpeed);
    const enableWobbleRef = useRef(enableWobble);



    // Keep refs in sync with props
    useEffect(() => {
        manualTransformRef.current = manualTransform;
        rotateSpeedRef.current = rotateSpeed;
        enableWobbleRef.current = enableWobble;
    }, [manualTransform, rotateSpeed, enableWobble]);

    // Mouse move handler for interactive rotation
    const handleMouseMove = useCallback((event: MouseEvent) => {
        // Normalize mouse position to -1 to 1
        mouseX.current = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY.current = (event.clientY / window.innerHeight) * 2 - 1;
    }, []);

    // Helper: Convert degrees to radians
    const toRadians = (deg: number) => (deg * Math.PI) / 180;

    // Setup IntersectionObserver for vision section (PERFORMANCE: replaces per-frame DOM queries)
    const setupVisionObserver = useCallback(() => {
        if (visionObserverRef.current) return;
        const visionSection = document.getElementById('vision');
        if (!visionSection) return;

        visionObserverRef.current = new IntersectionObserver(
            (entries) => {
                isAtVisionSection.current = entries[0].isIntersecting;
            },
            { threshold: 0.5 }
        );
        visionObserverRef.current.observe(visionSection);
    }, []);

    // Smooth rotation update in animation loop
    // Uses REFS to always read the latest values (avoids stale closures)
    const updateRotation = useCallback(() => {
        if (!stateRef.current?.model) return;

        const model = stateRef.current.model;
        const currentTransform = manualTransformRef.current;
        const currentSpeed = rotateSpeedRef.current;

        // Continuous smooth rotation - Z-axis (Wheel spin)
        continuousRotation.current += currentSpeed;

        // Wobble/bobbing effect - Floating sensation
        // Enable wobble if prop is true (default)
        const wobbleAmount = enableWobbleRef.current ? 0.05 : 0;
        const wobbleSpeed = 1.5;

        // Rotation wobble
        const wobbleX = Math.sin(continuousRotation.current * wobbleSpeed) * wobbleAmount;
        const wobbleY = Math.cos(continuousRotation.current * wobbleSpeed * 0.8) * wobbleAmount;

        // Position bobbing (Floating up and down)
        const bobbingAmount = enableWobbleRef.current ? 0.2 : 0;
        const bobbingY = Math.sin(continuousRotation.current * wobbleSpeed * 0.5) * bobbingAmount;

        if (currentTransform) {
            // MODE A: Manual Control (Home Page)
            const radX = toRadians(currentTransform.rotation.x);
            const radY = toRadians(currentTransform.rotation.y);
            const radZ = toRadians(currentTransform.rotation.z);

            model.rotation.x = radX + wobbleX;
            model.rotation.y = radY + wobbleY;
            model.rotation.z = radZ - continuousRotation.current;

            // Update Position & Scale
            model.position.x = currentTransform.position.x;
            model.position.y = currentTransform.position.y + bobbingY; // Add bobbing
            model.position.z = currentTransform.position.z;
            model.scale.setScalar(currentTransform.scale);
        } else {
            // MODE B: Internal Control (Animation/GSAP driven)
            model.rotation.x = baseRotationX.current + wobbleX;
            model.rotation.y = baseRotationY.current + wobbleY;
            model.rotation.z = baseRotationZ.current - continuousRotation.current;

            // Note: For Mode B, position is usually handled by GSAP/ScrollTrigger directly on the group
            // But if we want floating here too, we might need to apply it to the model inside the wrapper
            // However, `baseRotation` logic only handles rotation. 
            // Position is handled by `useScrollAnimation` updating the wrapper.
            // To add bobbing here for Mode B, we would need basePosition refs which we don't track yet.
            // For now, let's stick to rotation wobble for Mode B to avoid fighting GSAP.
        }
    }, []); // No dependencies - reads from refs

    // Store base rotation when GSAP updates it
    const captureBaseRotation = useCallback(() => {
        if (!stateRef.current?.model) return;

        // If Manual Transform is active, DO NOT capture from model.
        if (manualTransformRef.current) return;

        const model = stateRef.current.model;

        if (!isAtVisionSection.current) {
            baseRotationX.current = model.rotation.x;
            baseRotationY.current = model.rotation.y;
            baseRotationZ.current = model.rotation.z + continuousRotation.current;
        }
    }, []); // No dependencies - reads from ref

    // Track previous manual transform for delta updates
    const prevManualTransform = useRef(manualTransform);

    // Handle Live Updates (HMR/Prop changes)
    // Mobile scaling is now handled in useScrollAnimation with dedicated keyframes
    useEffect(() => {
        if (!stateRef.current?.model || !manualTransform) return;

        const model = stateRef.current.model;

        // Update Scale directly from transform
        model.scale.setScalar(manualTransform.scale);

        // Update Position (Absolute approach for reliable positioning)
        // Use the keyframe position values directly
        model.position.x = manualTransform.position.x;
        model.position.y = manualTransform.position.y;
        model.position.z = manualTransform.position.z;

        // Update ref
        prevManualTransform.current = manualTransform;

    }, [manualTransform]);

    // Initialize Three.js scene
    const initializeScene = useCallback(async (canvas: HTMLCanvasElement) => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        // ... existing initialization code ...
        try {
            // Prepare config with converted radians
            const finalConfig = manualTransform ? {
                ...manualTransform,
                rotation: {
                    x: toRadians(manualTransform.rotation.x),
                    y: toRadians(manualTransform.rotation.y),
                    z: toRadians(manualTransform.rotation.z),
                }
            } : undefined;

            // Initialize Three.js and load model
            const state = await initializeThreeScene(canvas, url, finalConfig);
            stateRef.current = state;

            // Initialize base rotation refs from the config immediately
            if (manualTransform) {
                baseRotationX.current = toRadians(manualTransform.rotation.x);
                baseRotationY.current = toRadians(manualTransform.rotation.y);
                baseRotationZ.current = toRadians(manualTransform.rotation.z);
            }

            // Set up resize handler (pass null for model to prevent it from overriding our manual scale/position)
            const handleResize = createResizeHandler(state.renderer, state.camera, null, finalConfig);
            window.addEventListener('resize', handleResize);
            handleResize(); // Trigger once to set initial mobile/desktop position

            // Set up mouse tracking
            window.addEventListener('mousemove', handleMouseMove);

            // Set up IntersectionObserver for vision section (PERFORMANCE)
            setupVisionObserver();

            // Start animation loop with rotation updates
            const animation = createAnimationLoop(
                state.renderer,
                state.scene,
                state.camera,
                () => {
                    // PERFORMANCE: Removed checkVisionSection - now using IntersectionObserver
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
                if (visionObserverRef.current) {
                    visionObserverRef.current.disconnect();
                }
                animation.stop();
                state.renderer.dispose();
            };
        } catch (error) {
            console.error('Failed to initialize 3D scene:', error);
            if (onError) {
                onError(error instanceof Error ? error : new Error('Failed to initialize 3D scene'));
            }
        }
    }, [url, onModelReady, onError, handleMouseMove, setupVisionObserver, captureBaseRotation, updateRotation]);

    // Handle canvas ready
    const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
        canvasRef.current = canvas;

        // Schedule initialization during idle time
        // Note: Loader is now controlled by the page, not the component
        scheduleIdleLoad(() => {
            if (canvasRef.current) {
                initializeScene(canvasRef.current);
            }
        });
    }, [initializeScene]);

    useEffect(() => {
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (visionObserverRef.current) {
                visionObserverRef.current.disconnect();
            }
            if (animationRef.current) {
                animationRef.current.stop();
            }
            if (stateRef.current) {
                stateRef.current.renderer.dispose();
            }
        };
    }, [handleMouseMove]);

    return (
        <div
            className={`gltf-viewer-container fixed top-0 left-0 w-full h-full pointer-events-none ${className || ''}`}
            style={{ zIndex: 0 }}
        >
            <WebGLCanvas onCanvasReady={handleCanvasReady} className="w-full h-full" />
        </div>
    );
}
