/**
 * Animation Configuration
 * 
 * GSAP animation presets and ScrollTrigger defaults.
 * Designed for SEO-friendly animations (no CLS, no layout shifts).
 */

import type { gsap as GSAPType } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

/**
 * ScrollTrigger defaults - applied globally
 * These settings help prevent layout shifts and improve performance
 */
export const scrollTriggerDefaults = {
    anticipatePin: 1,        // Reduces jank during pinning
    markers: false,          // Disable in production
    invalidateOnRefresh: true, // Recalculate on resize
} as const;

/**
 * Section entry animation preset
 * Uses only opacity and transform (GPU-accelerated, no CLS)
 */
export const sectionEntryAnimation = {
    initial: {
        opacity: 0,
        y: 60,
    },
    animate: {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
    },
    scrollTrigger: {
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
    },
} as const;

/**
 * Hero pinning animation defaults
 * Camera movement tied to scroll progress
 */
export const heroPinAnimation = {
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    pin: true,
    anticipatePin: 1,
} as const;

/**
 * 3D model animation presets
 * Used with GSAP to animate Three.js objects
 */
export const modelAnimations = {
    // Initial camera position
    cameraInitial: {
        z: 5,
        y: 0,
    },
    // Camera position after hero scroll
    cameraHeroEnd: {
        z: 2.5,
        y: 0,
    },
    // Model rotation ranges
    rotation: {
        initial: { x: 0, y: 0, z: 0 },
        section1End: { x: 0, y: Math.PI * 0.5, z: 0 },
        section2End: { x: 0, y: Math.PI, z: 0 },
        section3End: { x: 0, y: Math.PI * 1.5, z: 0 },
    },
} as const;

/**
 * Timing constants (in milliseconds)
 */
export const animationTimings = {
    loaderMinDisplay: 700,    // Minimum time loader is shown
    loaderFadeOut: 600,       // Loader fade duration
    posterFadeOut: 800,       // Poster fade duration
    canvasFadeIn: 500,        // Canvas fade in duration
    fastLoadThreshold: 300,   // If load < this, animate progress to 100
} as const;

/**
 * Apply ScrollTrigger defaults on initialization
 */
export function applyScrollTriggerDefaults(
    gsap: typeof GSAPType,
    ScrollTrigger: typeof ScrollTriggerType
): void {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults(scrollTriggerDefaults);
}
