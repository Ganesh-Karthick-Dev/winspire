import { ScrollKeyframe } from './scrollAnimations';

/**
 * Company Page Scroll Keyframes
 * 
 * Logic:
 * 1. 0% - 89%: Keep model in default "Hero" position (centered, with idle wobble).
 * 2. 90% - 100%: Transition to "Footer" position (rotated, scaled up).
 */
export const companyScrollKeyframes: ScrollKeyframe[] = [
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
        scrollProgress: 0.75,
        label: "Hold Position",
        transform: {
            position: { x: 0, y: 0.06, z: 0 },
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
