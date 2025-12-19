/**
 * Three.js Settings Configuration
 * 
 * Centralized renderer, camera, and performance settings.
 * Designed for optimal performance across devices.
 */

/**
 * Renderer settings
 */
export const rendererSettings = {
    // Clamp pixel ratio to prevent high-DPI performance issues
    maxPixelRatio: 1.5,
    maxPixelRatioMobile: 1.0,

    // WebGL context attributes
    contextAttributes: {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance' as WebGLPowerPreference,
        stencil: false,
        depth: true,
    },

    // Output settings
    outputSettings: {
        toneMapping: 'ACESFilmic', // Maps to THREE.ACESFilmicToneMapping
        toneMappingExposure: 1.0,
    },
} as const;

/**
 * Camera defaults
 */
export const cameraSettings = {
    fov: 35,
    near: 0.1,
    far: 100,
    initialPosition: { x: 0, y: 0, z: 3 },  // Closer to model
} as const;

/**
 * Model loading settings
 */
export const modelSettings = {
    // Draco decoder path (relative to public folder)
    dracoDecoderPath: '/draco/',

    // Default model URL
    defaultModelUrl: '/models/Winspire Logo.glb',

    // Scale multiplier for the model (larger for logo visibility)
    defaultScale: 150,

    // Center model in scene
    centerModel: true,

    // Debug: Show Axes Helper (X:Red, Y:Green, Z:Blue)
    showAxes: false,

    // ========================================================================
    // MANUAL CONTROLS
    // Edit these values to fine-tune the model's appearance
    // ========================================================================
    manualTransform: {
        // Size of the model (Default: 125)
        scale: 180,

        // Position offset from center (x=0, y=0, z=0 is center)
        position: {
            x: 0,
            y: 0,
            z: 0
        },

        // Initial Rotation (in DEGREES)
        // 0, 0, 0 = Upright facing forward
        // X: Tilt forward/backward
        // Y: Rotate left/right (Starting angle)
        // Z: Tilt side-to-side (Banking)
        rotation: {
            x: 2.823,
            y: 2.456,
            z: 23.23
        },
    },

    animation: {
        // Speed of the idle rotation (0 = stop, 0.003 = slow, 0.01 = fast)
        rotateSpeed: 0,
    }
} as const;

/**
 * Performance thresholds for device detection
 */
export const performanceThresholds = {
    // Minimum hardware concurrency for "good" device
    minCores: 4,

    // Minimum device memory (GB) for "good" device
    minMemory: 4,

    // If either is below threshold, consider "low-end"
    lowEndCores: 2,
    lowEndMemory: 2,
} as const;

/**
 * Lighting defaults for the scene
 */
export const lightingSettings = {
    ambient: {
        color: 0xffffff,
        intensity: 1.0,  // Increased for logo visibility
    },
    directional: {
        color: 0xffffff,
        intensity: 1.5,  // Increased for logo visibility
        position: { x: 5, y: 5, z: 5 },
    },
} as const;
