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

/**
 * Get mobile scale factor based on window width
 */
function getMobileScaleFactor(): number {
    if (typeof window === 'undefined') return 1.0;

    if (window.innerWidth < 480) {
        return 0.25; // 25% scale on very small mobile
    }
    if (window.innerWidth < 768) {
        return 0.35; // 35% scale on mobile
    }
    return 1.0; // Full scale on desktop
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

    // Initialize with first keyframe values (with mobile scale applied)
    const firstKeyframe = keyframes[0];
    const initialMobileFactor = getMobileScaleFactor();

    const [transform, setTransform] = useState<ModelTransform>({
        position: {
            x: initialMobileFactor < 1 ? 0 : firstKeyframe.transform.position.x,
            y: firstKeyframe.transform.position.y + (initialMobileFactor < 1 ? 0.3 : 0),
            z: firstKeyframe.transform.position.z
        },
        rotation: { ...firstKeyframe.transform.rotation },
        scale: firstKeyframe.transform.scale * initialMobileFactor,
    });

    // Initialize lighting state
    const [lighting, setLighting] = useState<LightingConfig>(
        firstKeyframe.lighting || defaultLighting
    );

    const [scrollProgress, setScrollProgress] = useState(0);

    // Memoized update function - applies mobile scale factor on every update
    const updateTransform = useCallback((progress: number) => {
        setScrollProgress(progress);

        const baseTransform = getTransformAtProgress(progress, keyframes);
        const mobileFactor = getMobileScaleFactor();

        // Apply mobile adjustments
        setTransform({
            position: {
                x: mobileFactor < 1 ? 0 : baseTransform.position.x, // Center on mobile
                y: baseTransform.position.y + (mobileFactor < 1 ? 0.3 : 0), // Move up on mobile
                z: baseTransform.position.z,
            },
            rotation: baseTransform.rotation,
            scale: baseTransform.scale * mobileFactor, // Apply mobile scale factor
        });

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

        // Also listen for resize to update mobile factor
        const handleResize = () => {
            // Re-calculate with current scroll progress
            const currentProgress = scrollTrigger.progress || 0;
            updateTransform(currentProgress);
        };
        window.addEventListener('resize', handleResize);

        // Debug log
        console.log('🎬 ScrollAnimation initialized', {
            trigger,
            start,
            end,
            scrub,
            keyframes: keyframes.length,
            mobileFactor: getMobileScaleFactor(),
        });

        return () => {
            scrollTrigger.kill();
            window.removeEventListener('resize', handleResize);
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

