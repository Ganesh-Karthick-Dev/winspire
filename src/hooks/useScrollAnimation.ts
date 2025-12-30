/**
 * useScrollAnimation Hook
 * 
 * Connects GSAP ScrollTrigger to 3D model transforms and lighting.
 * Returns the current interpolated transform and lighting based on scroll position.
 * 
 * Automatically uses mobile-optimized keyframes on small screens.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
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

    // Initialize with first keyframe values - USE REFS to avoid re-renders on scroll
    const firstKeyframe = activeKeyframes[0];
    const transformRef = useRef<ModelTransform>({
        position: { ...firstKeyframe.transform.position },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale,
    });

    // Initialize lighting ref
    const lightingRef = useRef<LightingConfig>(
        firstKeyframe.lighting || defaultLighting
    );

    const scrollProgressRef = useRef(0);

    // Minimal re-render trigger - only updates when explicitly needed (e.g., keyframe switch)
    const [, setTick] = useState(0);

    // Memoized update function - updates refs directly, no React re-renders
    const updateTransform = useCallback((progress: number) => {
        scrollProgressRef.current = progress;
        transformRef.current = getTransformAtProgress(progress, activeKeyframes);
        lightingRef.current = getLightingAtProgress(progress, activeKeyframes);
    }, [activeKeyframes]);

    // Update transform immediately when keyframes change (e.g., mobile/desktop switch)
    useEffect(() => {
        if (isHydrated) {
            // Apply the current scroll position with new keyframes
            updateTransform(scrollProgressRef.current);
            // Trigger a re-render to update consumers with new ref values
            setTick(t => t + 1);
        }
    }, [activeKeyframes, isHydrated, updateTransform]);

    useEffect(() => {
        // Skip on server or if disabled
        if (typeof window === 'undefined' || !enabled) {
            return;
        }

        // Create ScrollTrigger
        const scrollTrigger = ScrollTrigger.create({
            trigger,
            start,
            end,
            scrub,
            onUpdate: (self) => {
                updateTransform(self.progress);
            },
        });

        // Debounced resize handler - prevents excessive calls during resize
        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const nowMobile = isMobileDevice();
                if (nowMobile !== isMobile) {
                    setIsMobile(nowMobile);
                }
                // Re-update transform with current progress
                updateTransform(scrollTrigger.progress || 0);
            }, 100); // 100ms debounce
        };
        window.addEventListener('resize', handleResize);

        // Debug log (can be removed in production)
        console.log('🎬 ScrollAnimation initialized', {
            isMobile,
            isHydrated,
            keyframesCount: activeKeyframes.length,
            firstScale: activeKeyframes[0].transform.scale,
            firstY: activeKeyframes[0].transform.position.y,
        });

        return () => {
            clearTimeout(resizeTimeout);
            scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [enabled, scrub, trigger, start, end, updateTransform, isMobile, isHydrated, activeKeyframes]);

    return {
        /** Current interpolated transform values (read from ref) */
        transform: transformRef.current,
        /** Current interpolated lighting values (read from ref) */
        lighting: lightingRef.current,
        /** Current scroll progress (0-1) */
        scrollProgress: scrollProgressRef.current,
        /** Whether mobile keyframes are being used */
        isMobile,
        /** Current keyframe label (if any) */
        currentLabel: activeKeyframes.find(
            (kf, i, arr) =>
                scrollProgressRef.current >= kf.scrollProgress &&
                (i === arr.length - 1 || scrollProgressRef.current < arr[i + 1].scrollProgress)
        )?.label,
    };
}

export default useScrollAnimation;
