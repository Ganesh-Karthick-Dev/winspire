/**
 * Loader Manager
 * 
 * Manages the loading overlay UI, progress updates, and fade-out sequence.
 * Works with the static HTML loader injected in _document.tsx.
 * 
 * Fade Order: Loader → Poster → Canvas
 */

import { animationTimings } from '@/config/animations';

// Track load start time to implement minimum display duration
let loadStartTime: number = 0;

/**
 * Reset loader to 0% on every page mount
 * Should be called in useEffect on page load
 */
export function resetLoaderToZero(): void {
    loadStartTime = Date.now();

    const progressEl = document.querySelector('.loader-progress');
    const barEl = document.querySelector('.loader-bar-fill');
    const overlayEl = document.querySelector('.loader-overlay');

    if (progressEl) {
        progressEl.textContent = '0%';
    }
    if (barEl instanceof HTMLElement) {
        barEl.style.width = '0%';
    }
    if (overlayEl instanceof HTMLElement) {
        overlayEl.style.opacity = '1';
        overlayEl.style.visibility = 'visible';
    }
}

/**
 * Update the loader UI with current progress
 * @param percent - Loading progress (0-100)
 */
export function updateLoaderUI(percent: number): void {
    const clampedPercent = Math.min(100, Math.max(0, Math.round(percent)));

    const progressEl = document.querySelector('.loader-progress');
    const barEl = document.querySelector('.loader-bar-fill');

    if (progressEl) {
        progressEl.textContent = `${clampedPercent}%`;
    }
    if (barEl instanceof HTMLElement) {
        barEl.style.width = `${clampedPercent}%`;
    }
}

/**
 * Animate loader out with GSAP (dynamically imported)
 * Respects minimum display time for UX smoothness
 */
export async function animateLoaderOut(): Promise<void> {
    const elapsed = Date.now() - loadStartTime;
    const remaining = Math.max(0, animationTimings.loaderMinDisplay - elapsed);

    // Wait for minimum display time
    if (remaining > 0) {
        await new Promise(resolve => setTimeout(resolve, remaining));
    }

    // Dynamically import GSAP for animation
    const { gsap } = await import('gsap');

    const overlayEl = document.querySelector('.loader-overlay');
    if (overlayEl) {
        await new Promise<void>(resolve => {
            gsap.to(overlayEl, {
                opacity: 0,
                duration: animationTimings.loaderFadeOut / 1000,
                ease: 'power2.out',
                onComplete: () => {
                    if (overlayEl instanceof HTMLElement) {
                        overlayEl.style.visibility = 'hidden';
                    }
                    resolve();
                },
            });
        });
    }
}

/**
 * Fade out the poster layer after loader
 */
export async function animatePosterOut(): Promise<void> {
    const { gsap } = await import('gsap');

    const posterEl = document.querySelector('.poster-layer');
    if (posterEl) {
        await new Promise<void>(resolve => {
            gsap.to(posterEl, {
                opacity: 0,
                duration: animationTimings.posterFadeOut / 1000,
                ease: 'power2.out',
                onComplete: () => {
                    if (posterEl instanceof HTMLElement) {
                        posterEl.style.visibility = 'hidden';
                    }
                    resolve();
                },
            });
        });
    }
}

/**
 * Show the canvas by adding .ready class
 */
export function showCanvas(): void {
    const canvasEl = document.querySelector('canvas');
    if (canvasEl) {
        canvasEl.classList.add('ready');
    }
}

/**
 * Complete fade sequence after loading
 * Order: Loader fades → Poster fades → Canvas appears
 */
export async function finishLoader(): Promise<void> {
    // Ensure progress shows 100%
    updateLoaderUI(100);

    // Wait a frame for the 100% to render
    await new Promise(resolve => requestAnimationFrame(resolve));

    // Execute fade sequence
    await animateLoaderOut();
    showCanvas();
    await animatePosterOut();
}

/**
 * Handle fast cache loads gracefully
 * If load is very fast, animate progress smoothly to 100%
 * @param actualPercent - The actual loaded percentage
 */
export async function handleFastLoad(actualPercent: number): Promise<void> {
    const elapsed = Date.now() - loadStartTime;

    if (actualPercent === 100 && elapsed < animationTimings.fastLoadThreshold) {
        // Import GSAP and animate progress smoothly
        const { gsap } = await import('gsap');
        const proxy = { value: 0 };

        await new Promise<void>(resolve => {
            gsap.to(proxy, {
                value: 100,
                duration: 0.5,
                ease: 'power2.out',
                onUpdate: () => updateLoaderUI(proxy.value),
                onComplete: resolve,
            });
        });
    } else {
        updateLoaderUI(actualPercent);
    }
}
