/**
 * Smooth Scroll Provider
 * 
 * Uses Lenis for buttery smooth scrolling with GSAP ScrollTrigger integration.
 */

'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with smooth settings
        const lenis = new Lenis({
            duration: 1.2,           // Scroll animation duration (higher = smoother)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame to GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP's default lag smoothing
        gsap.ticker.lagSmoothing(0);

        // Cleanup
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    return <>{children}</>;
}
