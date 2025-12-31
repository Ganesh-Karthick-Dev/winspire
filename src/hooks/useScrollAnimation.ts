/**
 * useScrollAnimation Hook
 * 
 * Connects GSAP ScrollTrigger to 3D model transforms and lighting.
 * Returns the current interpolated transform and lighting based on scroll position.
 * 
 * Automatically uses mobile-optimized keyframes on small screens.
 */

import { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    getTransformAtProgress,
    getLightingAtProgress,
    ModelTransform,
    LightingConfig,
    scrollKeyframes,
    animationSettings,
    defaultLighting
} from '@/lib/scrollAnimations';
import { mobileScrollKeyframes } from '@/lib/mobileScrollAnimations';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * Check if we're on a mobile device
 */
function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

export interface UseScrollAnimationOptions {
    /** Enable/disable the scroll animation (default: true) */
    enabled?: boolean;
    /** Scrub smoothness - higher = smoother but more lag (default: 1.5) */
    scrub?: number | boolean;
    /** Trigger element selector (default: 'body') */
    trigger?: string;
    /** Start position (default: 'top top') */
    start?: string;
    /** End position (default: 'bottom bottom') */
    end?: string;
    /** Custom keyframes to use instead of default */
    keyframes?: typeof scrollKeyframes;
    /** Damping factor for smooth interpolation (0-1) */
    dampingFactor?: number;
    /** Use easing function for interpolation */
    useEasing?: boolean;
}

/**
 * Hook to animate 3D model transforms and lighting based on scroll position
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
    const {
        enabled = true,
        scrub = animationSettings.scrubSmoothness,
        trigger = 'body',
        start = 'top top',
        end = 'bottom bottom',
        keyframes: customKeyframes,
        dampingFactor = animationSettings.dampingFactor,
        useEasing = false,
    } = options;

    // Determine which keyframes to use - mobile or desktop
    // Start with false to match SSR, will update after hydration
    const [isMobile, setIsMobile] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const mobile = isMobileDevice();
        setIsMobile(mobile);
        setIsHydrated(true);
    }, []);

    // Use custom keyframes if provided, otherwise auto-select based on device
    // After hydration, use the correct keyframes
    const activeKeyframes = customKeyframes || (isHydrated && isMobile ? mobileScrollKeyframes : scrollKeyframes);

    // Initialize with first keyframe values - USE REFS to avoid re-renders
    const firstKeyframe = activeKeyframes[0];

    // Current (displayed) transform - smoothly interpolates toward target
    const transformRef = useRef<ModelTransform>({
        position: { ...firstKeyframe.transform.position },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale,
    });

    // Target transform - set directly by scroll position
    const targetTransformRef = useRef<ModelTransform>({
        position: { ...firstKeyframe.transform.position },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale,
    });

    // Initialize lighting refs
    const lightingRef = useRef<LightingConfig>(
        firstKeyframe.lighting || defaultLighting
    );
    const targetLightingRef = useRef<LightingConfig>(
        firstKeyframe.lighting || defaultLighting
    );

    const scrollProgressRef = useRef(0);
    const rafIdRef = useRef<number>(0);

    // Smooth lerp helper
    const lerpValue = (current: number, target: number, factor: number) =>
        current + (target - current) * factor;

    // Smooth interpolation loop - runs every frame
    const smoothUpdate = useCallback(() => {
        const current = transformRef.current;
        const target = targetTransformRef.current;
        const currentLighting = lightingRef.current;
        const targetLighting = targetLightingRef.current;

        // Smoothly interpolate toward target
        // PERFORMANCE: Mutate object in place so consumers (GLTFViewer) see updates without React re-renders
        const t = transformRef.current;
        t.position.x = lerpValue(current.position.x, target.position.x, dampingFactor);
        t.position.y = lerpValue(current.position.y, target.position.y, dampingFactor);
        t.position.z = lerpValue(current.position.z, target.position.z, dampingFactor);

        t.rotation.x = lerpValue(current.rotation.x, target.rotation.x, dampingFactor);
        t.rotation.y = lerpValue(current.rotation.y, target.rotation.y, dampingFactor);
        t.rotation.z = lerpValue(current.rotation.z, target.rotation.z, dampingFactor);

        t.scale = lerpValue(current.scale, target.scale, dampingFactor);

        // Smoothly interpolate lighting
        lightingRef.current = {
            frontIntensity: lerpValue(currentLighting.frontIntensity, targetLighting.frontIntensity, dampingFactor),
            ambientIntensity: lerpValue(currentLighting.ambientIntensity, targetLighting.ambientIntensity, dampingFactor),
            frontPosition: {
                x: lerpValue(currentLighting.frontPosition.x, targetLighting.frontPosition.x, dampingFactor),
                y: lerpValue(currentLighting.frontPosition.y, targetLighting.frontPosition.y, dampingFactor),
                z: lerpValue(currentLighting.frontPosition.z, targetLighting.frontPosition.z, dampingFactor),
            },
        };

        // Continue the animation loop
        rafIdRef.current = requestAnimationFrame(smoothUpdate);
    }, [dampingFactor]);

    // Update TARGET transform (called by ScrollTrigger)
    const updateTargetTransform = useCallback((progress: number) => {
        scrollProgressRef.current = progress;
        targetTransformRef.current = getTransformAtProgress(progress, activeKeyframes, useEasing);
        targetLightingRef.current = getLightingAtProgress(progress, activeKeyframes);
    }, [activeKeyframes, useEasing]);

    // Update transform immediately when keyframes change (e.g., mobile/desktop switch)
    useEffect(() => {
        if (isHydrated) {
            updateTargetTransform(scrollProgressRef.current);
        }
    }, [activeKeyframes, isHydrated, updateTargetTransform]);

    // Start the smooth animation loop
    useEffect(() => {
        if (typeof window === 'undefined') return;

        rafIdRef.current = requestAnimationFrame(smoothUpdate);

        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [smoothUpdate]);

    useEffect(() => {
        // Skip on server or if disabled
        if (typeof window === 'undefined' || !enabled) {
            return;
        }

        // Create ScrollTrigger - updates TARGET, not displayed values
        const scrollTrigger = ScrollTrigger.create({
            trigger,
            start,
            end,
            scrub,
            onUpdate: (self) => {
                updateTargetTransform(self.progress);
            },
        });

        // Handle resize - switch between mobile/desktop keyframes
        const handleResize = () => {
            const nowMobile = isMobileDevice();
            if (nowMobile !== isMobile) {
                setIsMobile(nowMobile);
            }
            // Re-update transform with current progress
            updateTargetTransform(scrollTrigger.progress || 0);
        };
        window.addEventListener('resize', handleResize);

        // Debug log
        console.log('🎬 ScrollAnimation initialized with damping', {
            isMobile,
            isHydrated,
            keyframesCount: activeKeyframes.length,
            dampingFactor,
            useEasing,
        });

        return () => {
            scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [enabled, scrub, trigger, start, end, updateTargetTransform, isMobile, isHydrated, activeKeyframes, dampingFactor, useEasing]);

    // Return a stable object with refs - GLTFViewer reads from refs directly
    return useMemo(() => ({
        /** Current interpolated transform values (read from ref) */
        get transform() { return transformRef.current; },
        /** Current interpolated lighting values (read from ref) */
        get lighting() { return lightingRef.current; },
        /** Current scroll progress (0-1) */
        get scrollProgress() { return scrollProgressRef.current; },
        /** Whether mobile keyframes are being used */
        isMobile,
        /** Current keyframe label (if any) */
        get currentLabel() {
            return activeKeyframes.find(
                (kf, i, arr) =>
                    scrollProgressRef.current >= kf.scrollProgress &&
                    (i === arr.length - 1 || scrollProgressRef.current < arr[i + 1].scrollProgress)
            )?.label;
        },
    }), [isMobile, activeKeyframes]);
}

export default useScrollAnimation;
