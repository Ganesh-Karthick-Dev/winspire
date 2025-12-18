/**
 * Scroll Animation Configuration
 * 
 * Define keyframes for model position, rotation, scale at scroll points.
 * Uses GSAP ScrollTrigger for smooth interpolation.
 */

export interface ModelTransform {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number }; // degrees
    scale: number;
}

export interface ScrollKeyframe {
    /** Scroll progress from 0 (top) to 1 (bottom of page) */
    scrollProgress: number;
    /** Transform values at this scroll position */
    transform: ModelTransform;
    /** Optional label for debugging/reference */
    label?: string;
}

// ============================================================================
// ANIMATION SETTINGS
// Adjust these values to control animation behavior
// ============================================================================
export const animationSettings = {
    /**
     * Smooth time for GSAP transitions (seconds)
     * Higher = slower/smoother, Lower = faster/snappier
     * Recommended: 0.5 - 1.5
     */
    smoothTime: 0.8,

    /**
     * Continuous rotation speed (radians per frame)
     * 0 = no rotation, 0.003 = slow, 0.01 = fast
     */
    rotationSpeed: 0.003,

    /**
     * Scroll scrub smoothness (for ScrollTrigger)
     * Higher = smoother but more lag
     * Recommended: 1 - 2
     */
    scrubSmoothness: 1.5,
};


export const scrollKeyframes: ScrollKeyframe[] = [
    {
        scrollProgress: 0,
        label: "Hero",
        transform: {
            position: {
                x: 0,
                y: 0.04,
                z: 0
            },
            rotation: {
                x: -22.177,
                y: 37.456,
                z: 23.23
            },
            scale: 150
        }
    },
    {
        scrollProgress: 0.3,
        label: 'features',
        transform: {
            position: { x: 1, y: 0.5, z: 0 },
            rotation: { x: 10, y: 45, z: 0 },
            scale: 120,
        },
    },
    {
        scrollProgress: 0.6,
        label: 'about',
        transform: {
            position: { x: -1, y: 0, z: 0 },
            rotation: { x: 0, y: 90, z: 15 },
            scale: 140,
        },
    },
    {
        scrollProgress: 1,
        label: 'footer',
        transform: {
            position: { x: 0, y: 0, z: 0 },
            rotation: { x: 0, y: 180, z: 0 },
            scale: 100,
        },
    },
];

/**
 * Helper: Interpolate between two transforms
 */
export function lerpTransform(
    a: ModelTransform,
    b: ModelTransform,
    t: number
): ModelTransform {
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;

    return {
        position: {
            x: lerp(a.position.x, b.position.x, t),
            y: lerp(a.position.y, b.position.y, t),
            z: lerp(a.position.z, b.position.z, t),
        },
        rotation: {
            x: lerp(a.rotation.x, b.rotation.x, t),
            y: lerp(a.rotation.y, b.rotation.y, t),
            z: lerp(a.rotation.z, b.rotation.z, t),
        },
        scale: lerp(a.scale, b.scale, t),
    };
}

/**
 * Get interpolated transform for a given scroll progress
 */
export function getTransformAtProgress(
    progress: number,
    keyframes: ScrollKeyframe[] = scrollKeyframes
): ModelTransform {
    // Clamp progress to 0-1
    const clampedProgress = Math.max(0, Math.min(1, progress));

    // Find the two keyframes to interpolate between
    let startFrame = keyframes[0];
    let endFrame = keyframes[keyframes.length - 1];

    for (let i = 0; i < keyframes.length - 1; i++) {
        if (clampedProgress >= keyframes[i].scrollProgress &&
            clampedProgress <= keyframes[i + 1].scrollProgress) {
            startFrame = keyframes[i];
            endFrame = keyframes[i + 1];
            break;
        }
    }

    // Calculate local progress between the two keyframes
    const range = endFrame.scrollProgress - startFrame.scrollProgress;
    const localProgress = range > 0
        ? (clampedProgress - startFrame.scrollProgress) / range
        : 0;

    return lerpTransform(startFrame.transform, endFrame.transform, localProgress);
}
