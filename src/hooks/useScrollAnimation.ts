/**
 * useScrollAnimation Hook
 * 
 * Connects GSAP ScrollTrigger to 3D model transforms and lighting.
 * Returns the current interpolated transform and lighting based on scroll position.
 * 
 * Usage:
 * ```tsx
 * const { transform, lighting } = useScrollAnimation();
 * <GLTFViewer manualTransform={transform} lighting={lighting} />
 * ```
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

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
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
    /** Custom keyframes to use instead of default (default: scrollKeyframes) */
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
        keyframes = scrollKeyframes, // Default to Home page keyframes
    } = options;

    // Initialize with first keyframe values
    const firstKeyframe = keyframes[0];
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
        setTransform(getTransformAtProgress(progress, keyframes));
        setLighting(getLightingAtProgress(progress, keyframes));
    }, [keyframes]);

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

        // Debug log
        console.log('🎬 ScrollAnimation initialized', {
            trigger,
            start,
            end,
            scrub,
            keyframes: keyframes.length,
        });

        return () => {
            scrollTrigger.kill();
        };
    }, [enabled, scrub, trigger, start, end, updateTransform, keyframes]);

    return {
        /** Current interpolated transform values */
        transform,
        /** Current interpolated lighting values */
        lighting,
        /** Current scroll progress (0-1) */
        scrollProgress,
        /** Current keyframe label (if any) */
        currentLabel: keyframes.find(
            (kf, i, arr) =>
                scrollProgress >= kf.scrollProgress &&
                (i === arr.length - 1 || scrollProgress < arr[i + 1].scrollProgress)
        )?.label,
    };
}

export default useScrollAnimation;

