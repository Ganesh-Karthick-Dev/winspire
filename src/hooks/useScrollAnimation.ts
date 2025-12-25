/**
 * useScrollAnimation Hook
 * 
 * Connects GSAP ScrollTrigger to 3D model transforms and lighting.
 * Returns the current interpolated transform and lighting based on scroll position.
 * 
 * Automatically uses mobile-optimized keyframes on small screens.
 */

import { useEffect, useState, useCallback } from 'react';
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);

    // Use custom keyframes if provided, otherwise auto-select based on device
    const activeKeyframes = customKeyframes || (isMobile ? mobileScrollKeyframes : scrollKeyframes);

    // Initialize with first keyframe values
    const firstKeyframe = activeKeyframes[0];
    const [transform, setTransform] = useState<ModelTransform>({
        position: { ...firstKeyframe.transform.position },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale,
    });

    // Initialize lighting state
    const [lighting, setLighting] = useState<LightingConfig>(
        firstKeyframe.lighting || defaultLighting
    );

    const [scrollProgress, setScrollProgress] = useState(0);

    // Memoized update function
    const updateTransform = useCallback((progress: number) => {
        setScrollProgress(progress);
        setTransform(getTransformAtProgress(progress, activeKeyframes));
        setLighting(getLightingAtProgress(progress, activeKeyframes));
    }, [activeKeyframes]);

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

        // Handle resize - switch between mobile/desktop keyframes
        const handleResize = () => {
            const nowMobile = isMobileDevice();
            if (nowMobile !== isMobile) {
                setIsMobile(nowMobile);
            }
            // Re-update transform with current progress
            updateTransform(scrollTrigger.progress || 0);
        };
        window.addEventListener('resize', handleResize);

        // Debug log
        console.log('🎬 ScrollAnimation initialized', {
            isMobile,
            keyframesCount: activeKeyframes.length,
            firstScale: activeKeyframes[0].transform.scale,
        });

        return () => {
            scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
        };
    }, [enabled, scrub, trigger, start, end, updateTransform, isMobile, activeKeyframes]);

    return {
        /** Current interpolated transform values */
        transform,
        /** Current interpolated lighting values */
        lighting,
        /** Current scroll progress (0-1) */
        scrollProgress,
        /** Whether mobile keyframes are being used */
        isMobile,
        /** Current keyframe label (if any) */
        currentLabel: activeKeyframes.find(
            (kf, i, arr) =>
                scrollProgress >= kf.scrollProgress &&
                (i === arr.length - 1 || scrollProgress < arr[i + 1].scrollProgress)
        )?.label,
    };
}

export default useScrollAnimation;
