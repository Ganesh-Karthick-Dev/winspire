/**
 * Three.js Utility Functions
 * 
 * Helper functions for device detection, pixel ratio clamping,
 * and accessibility checks (reduced motion, low-end device detection).
 */

import { performanceThresholds, rendererSettings } from '@/config/three-settings';

/**
 * Clamp device pixel ratio to prevent performance issues on high-DPI displays
 * @param max - Maximum allowed pixel ratio (default from config)
 * @returns Clamped pixel ratio
 */
export function clampDevicePixelRatio(max: number = rendererSettings.maxPixelRatio): number {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio, max);
}

/**
 * Check if the device is low-end based on hardware specs
 * Uses navigator.hardwareConcurrency and navigator.deviceMemory
 * @returns true if device appears to be low-end (should disable 3D completely)
 */
export function isLowEndDevice(): boolean {
    if (typeof navigator === 'undefined') return false;

    const cores = navigator.hardwareConcurrency || 4;
    // deviceMemory is not available in all browsers
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

    return cores <= performanceThresholds.lowEndCores || memory <= performanceThresholds.lowEndMemory;
}

/**
 * Check if the device needs performance optimizations (but can still run 3D)
 * More aggressive threshold than isLowEndDevice - catches mid-tier devices
 * @returns true if device should use reduced quality rendering
 */
export function isLowPerformanceDevice(): boolean {
    if (typeof navigator === 'undefined') return false;

    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;

    // Trigger for devices with ≤4 cores or ≤4GB RAM (catches more mid-tier devices)
    return cores <= performanceThresholds.minCores || memory <= performanceThresholds.minMemory;
}

/**
 * Check if user prefers reduced motion
 * @returns true if prefers-reduced-motion is set to 'reduce'
 */
export function prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Determine if 3D should be disabled
 * Combines low-end device check and reduced motion preference
 * @returns true if 3D should not be initialized
 */
export function shouldDisable3D(): boolean {
    return isLowEndDevice() || prefersReducedMotion();
}

/**
 * Schedule a callback to run during browser idle time
 * Falls back to setTimeout if requestIdleCallback is not available
 * @param callback - Function to execute during idle time
 * @param options - requestIdleCallback options
 */
export function scheduleIdleLoad(
    callback: () => void,
    options?: IdleRequestOptions
): void {
    if (typeof window === 'undefined') return;

    if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number })
            .requestIdleCallback(callback, options || { timeout: 2000 });
    } else {
        // Fallback for Safari and older browsers
        setTimeout(callback, 1);
    }
}

/**
 * Check if WebGL is available
 * @returns true if WebGL is supported
 */
export function isWebGLAvailable(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const canvas = document.createElement('canvas');
        return !!(
            window.WebGLRenderingContext &&
            (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
    } catch {
        return false;
    }
}

/**
 * Check if device is mobile based on viewport and user agent
 * @returns true if likely a mobile device
 */
export function isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallViewport = window.innerWidth < 768;

    return isTouchDevice && isSmallViewport;
}

/**
 * Get appropriate pixel ratio for current device
 * @returns Optimal pixel ratio based on device type
 */
export function getOptimalPixelRatio(): number {
    if (isMobileDevice()) {
        return clampDevicePixelRatio(rendererSettings.maxPixelRatioMobile);
    }
    return clampDevicePixelRatio(rendererSettings.maxPixelRatio);
}
