/**
 * Mobile Scroll Animation Configuration
 * 
 * Dedicated keyframes for mobile devices with smaller scale values.
 * Scale is reduced to ~30% of desktop for better mobile display.
 */

import { ScrollKeyframe } from './scrollAnimations';

// Mobile scale factor - applied to all keyframes
const MOBILE_SCALE_FACTOR = 0.3;

export const mobileScrollKeyframes: ScrollKeyframe[] = [
    {
        scrollProgress: 0,
        label: "Hero",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -22.177, y: 37.456, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR // = 3
        }
    },
    {
        scrollProgress: 0.07,
        label: "space between hero and about",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -22.177, y: 77.456, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.14,
        label: "about us section",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: 27.823, y: 122.456, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.219,
        label: "global section",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -92.177, y: 37.456, z: 23.23 },
            scale: 12.5 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.287,
        label: "global section middle",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -77.177, y: 2.456, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.43,
        label: "service section",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -52.177, y: -92.544, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.565,
        label: "environment",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -2.177, y: -2.544, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.725,
        label: "careers white card",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -2.177, y: 87.456, z: 23.23 },
            scale: 10 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.793,
        label: "news before",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -47.177, y: 162.456, z: 8.23 },
            scale: 7 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.877,
        label: "after news",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -47.177, y: 260, z: 8.23 },
            scale: 7 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 0.978,
        label: "footer entrance",
        transform: {
            position: { x: 0, y: 0.5, z: 0 },
            rotation: { x: -47.177, y: 225, z: 8.23 },
            scale: 7 * MOBILE_SCALE_FACTOR
        }
    },
    {
        scrollProgress: 1.0,
        label: "final footer",
        transform: {
            position: { x: 0, y: 0.1, z: 0.6 },
            rotation: { x: -82.177, y: 180, z: 8.23 },
            scale: 15 * MOBILE_SCALE_FACTOR
        }
    }
];
