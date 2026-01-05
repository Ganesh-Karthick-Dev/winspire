import { ScrollKeyframe } from './scrollAnimations';

/**
 * Neura AI Page Scroll Keyframes
 * 
 * Logic:
 * 1. 0% - 75%: Keep model in default "Hero" position (centered, with idle wobble).
 * 2. 75% - 100%: Transition to "Footer" position (rotated, scaled up).
 * 
 * Matches Company/Solutions/Outcomes page behavior.
 */
export const neuraScrollKeyframes: ScrollKeyframe[] = [
    {
        scrollProgress: 0,
        label: "Default Start",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
            rotation: { x: -22.177, y: 37.456, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 0.35,
        label: "Drift Right",
        transform: {
            position: { x: 0.5, y: 0.1, z: 0.5 }, // Slight move right & up
            rotation: { x: -15, y: 45, z: 20 },   // Gentle tilt change
            scale: 10.5
        }
    },
    {
        scrollProgress: 0.75,
        label: "Hold Position",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },    // Return to center
            rotation: { x: -22.177, y: 37.456, z: 23.23 },
            scale: 10
        }
    },
    {
        scrollProgress: 1.0,
        label: "Footer End",
        transform: {
            position: { x: 0, y: -0.34, z: 0.6 },
            rotation: { x: -82.177, y: 180, z: 8.23 },
            scale: 15
        }
    }
];
