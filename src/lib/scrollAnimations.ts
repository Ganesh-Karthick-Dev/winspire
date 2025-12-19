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
    rotationSpeed: 0.005,

    /**
     * Scroll scrub smoothness (for ScrollTrigger)
     * Higher = smoother but more lag
     * Recommended: 1 - 2
     */
    scrubSmoothness: 2.5,
};


export const scrollKeyframes: ScrollKeyframe[] = [
    {
        "scrollProgress": 0,
        "label": "Hero",
        "transform": {
            "position": {
                "x": 0,
                "y": 0.06,
                "z": 0
            },
            "rotation": {
                "x": -22.177,
                "y": 37.456,
                "z": 23.23
            },
            "scale": 10
        }
    },
    {
        "scrollProgress": 0.07, // Fixed: was 7.44, should be 0-1 range
        "label": "space between hero and about",
        "transform": {
            "position": {
                "x": 0,
                "y": 0.06,
                "z": 0
            },
            "rotation": {
                "x": -22.177,
                "y": 77.456,
                "z": 23.23
            },
            "scale": 158
        }
    },
    {
        "scrollProgress": 0.14, // Fixed: was 14.07, should be 0-1 range
        "label": "about us section",
        "transform": {
            "position": {
                "x": 0.4,
                "y": 0.06,
                "z": 0
            },
            "rotation": {
                "x": 27.823,
                "y": 122.456,
                "z": 23.23
            },
            "scale": 158
        }
    },
    {
        "scrollProgress": 0.219,
        "label": "global section",
        "transform": {
            "position": {
                "x": 1,
                "y": 0.06,
                "z": 0
            },
            "rotation": {
                "x": -92.177,
                "y": 37.456,
                "z": 23.23
            },
            "scale": 175
        }
    },
    {
    "scrollProgress": 0.2870,
    "label": "global section middle",
    "transform": {
        "position": {
            "x": 0.8,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -77.177,
            "y": 2.456,
            "z": 23.23
        },
        "scale": 158
    }
},
{
    "scrollProgress": 0.430,
    "label": "service section",
    "transform": {
        "position": {
            "x": 1.2,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -52.177,
            "y": -92.544,
            "z": 23.23
        },
        "scale": 158
    }
},
{
    "scrollProgress": 0.565,
    "label": "environment",
    "transform": {
        "position": {
            "x": 0,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -2.177,
            "y": -2.544,
            "z": 23.23
        },
        "scale": 158
    }
},
{
    "scrollProgress": 0.7250,
    "label": "carears white card",
    "transform": {
        "position": {
            "x": 0,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -2.177,
            "y": 87.456,
            "z": 23.23
        },
        "scale": 158
    }
},
{
    "scrollProgress": 0.7930,
    "label": "news before",
    "transform": {
        "position": {
            "x": 0,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -47.177,
            "y": 162.456,
            "z": 8.23
        },
        "scale": 100
    }
},
{
    "scrollProgress": 0.8770,
    "label": "after news",
    "transform": {
        "position": {
            "x": 0,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -47.177,
            "y": 260,
            "z": 8.23
        },
        "scale": 100
    }
},
{
    "scrollProgress": 0.9780,
    "label": "footer entrance",
    "transform": {
        "position": {
            "x": 0,
            "y": 0.06,
            "z": 0
        },
        "rotation": {
            "x": -47.177,
            "y": 225,
            "z": 8.23
        },
        "scale": 100
    }
},
{
    "scrollProgress": 1.0,
    "label": "final footer",
    "transform": {
        "position": {
            "x": 0,
            "y": -0.34,
            "z": 0.6
        },
        "rotation": {
            "x": -82.177,
            "y": 180,
            "z": 8.23
        },
        "scale": 200
    }
}
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
