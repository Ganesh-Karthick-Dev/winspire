/**
 * Scroll Animation Configuration
 * 
 * Define keyframes for model position, rotation, scale at scroll points.
 * Also controls lighting intensity and position.
 * Uses GSAP ScrollTrigger for smooth interpolation.
 */

export interface ModelTransform {
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number }; // degrees
    scale: number;
}

export interface LightingConfig {
    /** Front light intensity (0-5, default: 3.5) */
    frontIntensity: number;
    /** Ambient light intensity (0-5, default: 2.0) */
    ambientIntensity: number;
    /** Front light position relative to camera */
    frontPosition: { x: number; y: number; z: number };
}

export interface ScrollKeyframe {
    /** Scroll progress from 0 (top) to 1 (bottom of page) */
    scrollProgress: number;
    /** Transform values at this scroll position */
    transform: ModelTransform;
    /** Lighting values at this scroll position */
    lighting?: LightingConfig;
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
    smoothTime: 2.5,

    /**
     * Continuous rotation speed (radians per frame)
     * 0 = no rotation, 0.003 = slow, 0.01 = fast
     */
    rotationSpeed: 0.005,

    /**
     * Scroll scrub smoothness (for ScrollTrigger)
     * Higher = smoother but more lag
     * Values: 1-2 (snappy), 3-5 (smooth), 6-10 (buttery), 10+ (ultra smooth)
     */
    scrubSmoothness: 6,

    /**
     * Damping factor for extra smoothness (0-1)
     * Lower = smoother but more lag, Higher = more responsive
     * Recommended: 0.08-0.15 for buttery smooth
     */
    dampingFactor: 0.10,
};


// ============================================================================
// SCROLL KEYFRAMES - Extra smooth with many intermediate keyframes
// ============================================================================
export const scrollKeyframes: ScrollKeyframe[] = [
    // ============ HERO SECTION ============
    {
        scrollProgress: 0,
        label: "Hero",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 37.456, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.027,
        label: "Hero mid",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 45, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.054,
        label: "Hero end",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 52.456, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.072,
        label: "Hero to about 1",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 57, z: 23.23 },
            scale: 11.5
        }
    },
    {
        scrollProgress: 0.091,
        label: "Hero about mid",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 62.456, z: 23.23 },
            scale: 13
        }
    },

    // ============ ABOUT SECTION TRANSITION (extra smooth) ============
    {
        scrollProgress: 0.105,
        label: "About trans 1",
        transform: {
            position: { x: 0.15, y: 0.06, z: 0 },
            rotation: { x: -37, y: 61, z: 23.23 },
            scale: 13.5
        }
    },
    {
        scrollProgress: 0.12,
        label: "About trans 2",
        transform: {
            position: { x: 0.3, y: 0.06, z: 0 },
            rotation: { x: -52, y: 60, z: 23.23 },
            scale: 14
        }
    },
    {
        scrollProgress: 0.135,
        label: "About trans 3",
        transform: {
            position: { x: 0.48, y: 0.06, z: 0 },
            rotation: { x: -67, y: 59, z: 23.23 },
            scale: 14.25
        }
    },
    {
        scrollProgress: 0.15,
        label: "About trans 4",
        transform: {
            position: { x: 0.65, y: 0.06, z: 0 },
            rotation: { x: -82, y: 58, z: 23.23 },
            scale: 14.5
        }
    },
    {
        scrollProgress: 0.164,
        label: "About trans 5",
        transform: {
            position: { x: 0.82, y: 0.06, z: 0 },
            rotation: { x: -97, y: 57.7, z: 23.23 },
            scale: 14.75
        }
    },
    {
        scrollProgress: 0.178,
        label: "Aboutus center",
        transform: {
            position: { x: 1, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 57.456, z: 23.23 },
            scale: 15
        }
    },

    // ============ ABOUT SECTION CONTENT ============
    {
        scrollProgress: 0.195,
        label: "About content 1",
        transform: {
            position: { x: 0.95, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 47, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.21,
        label: "About mid 1",
        transform: {
            position: { x: 0.9, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 37, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.228,
        label: "About mid 1b",
        transform: {
            position: { x: 0.85, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 27, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.245,
        label: "About part 2",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 17.456, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.265,
        label: "About mid 2a",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 11, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.28,
        label: "About mid 2",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: 5, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.30,
        label: "About mid 2b",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -0.5, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.32,
        label: "About mid 3",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -6, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.34,
        label: "About mid 3b",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -12, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.358,
        label: "About end",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -17.544, z: 23.23 },
            scale: 15
        }
    },

    // ============ SERVICE SECTION (extra smooth) ============
    {
        scrollProgress: 0.368,
        label: "Service pre 1",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -26, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.377,
        label: "Service trans 1",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -35, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.386,
        label: "Service trans 1b",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -44, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.396,
        label: "Service start",
        transform: {
            position: { x: 0.8, y: 0.06, z: 0 },
            rotation: { x: -112.177, y: -52.544, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.403,
        label: "Service trans 2a",
        transform: {
            position: { x: 0.82, y: 0.06, z: 0 },
            rotation: { x: -120, y: -56, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.41,
        label: "Service trans 2",
        transform: {
            position: { x: 0.85, y: 0.06, z: 0 },
            rotation: { x: -127, y: -60, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.417,
        label: "Service trans 2b",
        transform: {
            position: { x: 0.87, y: 0.06, z: 0 },
            rotation: { x: -135, y: -63, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.424,
        label: "Service trans 3",
        transform: {
            position: { x: 0.9, y: 0.06, z: 0 },
            rotation: { x: -142, y: -67, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.431,
        label: "Service trans 3b",
        transform: {
            position: { x: 0.92, y: 0.06, z: 0 },
            rotation: { x: -150, y: -71, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.438,
        label: "Service trans 4",
        transform: {
            position: { x: 0.95, y: 0.06, z: 0 },
            rotation: { x: -157, y: -75, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.445,
        label: "Service trans 4b",
        transform: {
            position: { x: 0.97, y: 0.06, z: 0 },
            rotation: { x: -165, y: -79, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.452,
        label: "Service mid",
        transform: {
            position: { x: 1, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -82.544, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.464,
        label: "Service end trans 0",
        transform: {
            position: { x: 0.92, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -88, z: 23.23 },
            scale: 14.4
        }
    },
    {
        scrollProgress: 0.476,
        label: "Service end trans 1",
        transform: {
            position: { x: 0.85, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -93, z: 23.23 },
            scale: 13.75
        }
    },
    {
        scrollProgress: 0.488,
        label: "Service end trans 1b",
        transform: {
            position: { x: 0.77, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -99, z: 23.23 },
            scale: 13.1
        }
    },
    {
        scrollProgress: 0.50,
        label: "Service end trans 2",
        transform: {
            position: { x: 0.7, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -105, z: 23.23 },
            scale: 12.5
        }
    },
    {
        scrollProgress: 0.512,
        label: "Service end trans 2b",
        transform: {
            position: { x: 0.62, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -111, z: 23.23 },
            scale: 11.85
        }
    },
    {
        scrollProgress: 0.523,
        label: "Service end trans 3",
        transform: {
            position: { x: 0.55, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -116, z: 23.23 },
            scale: 11.25
        }
    },
    {
        scrollProgress: 0.535,
        label: "Service end trans 3b",
        transform: {
            position: { x: 0.47, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -122, z: 23.23 },
            scale: 10.6
        }
    },
    {
        scrollProgress: 0.546,
        label: "Service end",
        transform: {
            position: { x: 0.4, y: 0.06, z: 0 },
            rotation: { x: -172.177, y: -127.544, z: 23.23 },
            scale: 10
        }
    },

    // ============ INTELLIGENT/CENTER SECTION (extra smooth) ============
    {
        scrollProgress: 0.553,
        label: "Intel trans 0",
        transform: {
            position: { x: 0.35, y: 0.06, z: 0 },
            rotation: { x: -173, y: -133, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.56,
        label: "Intel trans 1",
        transform: {
            position: { x: 0.3, y: 0.06, z: 0 },
            rotation: { x: -174, y: -140, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.567,
        label: "Intel trans 1b",
        transform: {
            position: { x: 0.25, y: 0.06, z: 0 },
            rotation: { x: -175, y: -146, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.575,
        label: "Intel trans 2",
        transform: {
            position: { x: 0.2, y: 0.06, z: 0 },
            rotation: { x: -176, y: -152, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.582,
        label: "Intel trans 2b",
        transform: {
            position: { x: 0.15, y: 0.06, z: 0 },
            rotation: { x: -177, y: -158, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.589,
        label: "Intel trans 3",
        transform: {
            position: { x: 0.1, y: 0.06, z: 0 },
            rotation: { x: -178, y: -165, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.596,
        label: "Intel trans 3b",
        transform: {
            position: { x: 0.05, y: 0.06, z: 0 },
            rotation: { x: -179, y: -171, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.603,
        label: "Intelligent center",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -180, y: -177.544, z: 23.23 },
            scale: 10
        }
    },

    // ============ CAREER SECTION (extra smooth) ============
    {
        scrollProgress: 0.609,
        label: "Career trans 0",
        transform: {
            position: { x: -0.025, y: 0.06, z: 0 },
            rotation: { x: -183, y: -181, z: 23.23 },
            scale: 9.6
        }
    },
    {
        scrollProgress: 0.615,
        label: "Career trans 1",
        transform: {
            position: { x: -0.05, y: 0.06, z: 0 },
            rotation: { x: -186, y: -185, z: 23.23 },
            scale: 9.25
        }
    },
    {
        scrollProgress: 0.622,
        label: "Career trans 2",
        transform: {
            position: { x: -0.1, y: 0.06, z: 0 },
            rotation: { x: -192, y: -192, z: 23.23 },
            scale: 8.5
        }
    },
    {
        scrollProgress: 0.628,
        label: "Career trans 2b",
        transform: {
            position: { x: -0.125, y: 0.06, z: 0 },
            rotation: { x: -195, y: -196, z: 23.23 },
            scale: 8.1
        }
    },
    {
        scrollProgress: 0.634,
        label: "Career trans 3",
        transform: {
            position: { x: -0.15, y: 0.06, z: 0 },
            rotation: { x: -198, y: -200, z: 23.23 },
            scale: 7.75
        }
    },
    {
        scrollProgress: 0.641,
        label: "Career start",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -207.544, z: 23.23 },
            scale: 7
        }
    },
    // ============ CAREER SECTION MIDDLE ============
    {
        scrollProgress: 0.660,
        label: "carear mid",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -262.544, z: 23.23 },
            scale: 7
        }
    },
    {
        scrollProgress: 0.682,
        label: "carear mid trans 1",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -271.294, z: 23.23 },
            scale: 6.75
        }
    },
    {
        scrollProgress: 0.704,
        label: "carear mid trans 2",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -280.044, z: 23.23 },
            scale: 6.5
        }
    },
    {
        scrollProgress: 0.726,
        label: "carear mid trans 3",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -288.794, z: 23.23 },
            scale: 6.25
        }
    },
    {
        scrollProgress: 0.748,
        label: "news start",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -205, y: -297.544, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.766,
        label: "news start trans 1",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -217.5, y: -310.044, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.784,
        label: "news mid",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -322.544, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.804,
        label: "news mid trans 1",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -335.87, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.824,
        label: "news mid trans 2",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -349.21, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.844,
        label: "news end",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -362.544, z: 23.23 },
            scale: 6
        }
    },
    {
        scrollProgress: 0.856,
        label: "news end trans 1",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -370.044, z: 23.23 },
            scale: 7.5
        }
    },
    {
        scrollProgress: 0.868,
        label: "contact start",
        transform: {
            position: { x: -0.2, y: 0.06, z: 0 },
            rotation: { x: -230, y: -377.544, z: 23.23 },
            scale: 9
        }
    },
    {
        scrollProgress: 0.889,
        label: "contact trans 1",
        transform: {
            position: { x: -0.15, y: 0.06, z: 0 },
            rotation: { x: -217.5, y: -351.908, z: 23.23 },
            scale: 9.75
        }
    },
    {
        scrollProgress: 0.910,
        label: "contact trans 2",
        transform: {
            position: { x: -0.10, y: 0.06, z: 0 },
            rotation: { x: -205, y: -326.272, z: 23.23 },
            scale: 10.5
        }
    },
    {
        scrollProgress: 0.931,
        label: "contact trans 3",
        transform: {
            position: { x: -0.05, y: 0.06, z: 0 },
            rotation: { x: -192.5, y: -300.636, z: 23.23 },
            scale: 11.25
        }
    },
    {
        scrollProgress: 0.952,
        label: "contact end",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -180, y: -275, z: 23.23 },
            scale: 12
        }
    },
    {
        scrollProgress: 0.958,
        label: "footer trans 0a",
        transform: {
            position: { x: 0, y: 0.01, z: 0 },
            rotation: { x: -190, y: -285.6, z: 23.23 },
            scale: 13
        }
    },
    {
        scrollProgress: 0.964,
        label: "footer trans 0b",
        transform: {
            position: { x: 0, y: -0.04, z: 0 },
            rotation: { x: -200, y: -296.2, z: 23.23 },
            scale: 14
        }
    },
    {
        scrollProgress: 0.970,
        label: "footer trans 1",
        transform: {
            position: { x: 0, y: -0.09, z: 0 },
            rotation: { x: -210, y: -306.9, z: 23.23 },
            scale: 15
        }
    },
    {
        scrollProgress: 0.976,
        label: "footer trans 1b",
        transform: {
            position: { x: 0, y: -0.14, z: 0 },
            rotation: { x: -220, y: -317.5, z: 23.23 },
            scale: 16
        }
    },
    {
        scrollProgress: 0.982,
        label: "footer trans 2",
        transform: {
            position: { x: 0, y: -0.19, z: 0 },
            rotation: { x: -230, y: -328.1, z: 23.23 },
            scale: 17
        }
    },
    {
        scrollProgress: 0.988,
        label: "footer trans 2b",
        transform: {
            position: { x: 0, y: -0.24, z: 0 },
            rotation: { x: -240, y: -338.8, z: 23.23 },
            scale: 18
        }
    },
    {
        scrollProgress: 0.994,
        label: "footer trans 3",
        transform: {
            position: { x: 0, y: -0.29, z: 0 },
            rotation: { x: -250, y: -349.4, z: 23.23 },
            scale: 19
        }
    },
    {
        scrollProgress: 1.0,
        label: "footer end",
        transform: {
            position: { x: 0, y: -0.34, z: 0 },
            rotation: { x: -260, y: -360, z: 23.23 },
            scale: 20
        }
    }

];

/**
 * Easing functions for smooth interpolation
 */

/** Smoothstep - buttery smooth ease in/out (recommended) */
export function smoothstep(t: number): number {
    return t * t * (3 - 2 * t);
}

/** Smoother step - even smoother than smoothstep */
export function smootherstep(t: number): number {
    return t * t * t * (t * (t * 6 - 15) + 10);
}

/** Ease out cubic - smooth deceleration */
export function easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
}

/** Ease in out cubic - smooth acceleration and deceleration */
export function easeInOutCubic(t: number): number {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Helper: Interpolate between two transforms with smooth easing
 */
export function lerpTransform(
    a: ModelTransform,
    b: ModelTransform,
    t: number,
    useEasing: boolean = true
): ModelTransform {
    // Apply smooth easing to the interpolation factor
    const easedT = useEasing ? smootherstep(t) : t;
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;

    return {
        position: {
            x: lerp(a.position.x, b.position.x, easedT),
            y: lerp(a.position.y, b.position.y, easedT),
            z: lerp(a.position.z, b.position.z, easedT),
        },
        rotation: {
            x: lerp(a.rotation.x, b.rotation.x, easedT),
            y: lerp(a.rotation.y, b.rotation.y, easedT),
            z: lerp(a.rotation.z, b.rotation.z, easedT),
        },
        scale: lerp(a.scale, b.scale, easedT),
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

    // Use smooth easing for buttery transitions
    return lerpTransform(startFrame.transform, endFrame.transform, localProgress, true);
}

// ============================================================================
// LIGHTING DEFAULTS AND HELPERS
// ============================================================================

/** Default lighting configuration */
export const defaultLighting: LightingConfig = {
    frontIntensity: 3.5,
    ambientIntensity: 2.0,
    frontPosition: { x: 0, y: 0, z: 1 }
};

/**
 * Helper: Interpolate between two lighting configs with smooth easing
 */
export function lerpLighting(
    a: LightingConfig,
    b: LightingConfig,
    t: number,
    useEasing: boolean = true
): LightingConfig {
    // Apply smooth easing to the interpolation factor
    const easedT = useEasing ? smootherstep(t) : t;
    const lerp = (x: number, y: number, t: number) => x + (y - x) * t;

    return {
        frontIntensity: lerp(a.frontIntensity, b.frontIntensity, easedT),
        ambientIntensity: lerp(a.ambientIntensity, b.ambientIntensity, easedT),
        frontPosition: {
            x: lerp(a.frontPosition.x, b.frontPosition.x, easedT),
            y: lerp(a.frontPosition.y, b.frontPosition.y, easedT),
            z: lerp(a.frontPosition.z, b.frontPosition.z, easedT),
        },
    };
}

/**
 * Get interpolated lighting for a given scroll progress
 */
export function getLightingAtProgress(
    progress: number,
    keyframes: ScrollKeyframe[] = scrollKeyframes
): LightingConfig {
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

    // Get lighting from keyframes (use defaults if not specified)
    const startLighting = startFrame.lighting || defaultLighting;
    const endLighting = endFrame.lighting || defaultLighting;

    // Calculate local progress between the two keyframes
    const range = endFrame.scrollProgress - startFrame.scrollProgress;
    const localProgress = range > 0
        ? (clampedProgress - startFrame.scrollProgress) / range
        : 0;

    // Use smooth easing for buttery transitions
    return lerpLighting(startLighting, endLighting, localProgress, true);
}
