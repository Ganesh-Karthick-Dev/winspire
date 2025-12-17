import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

export default function ScrollManager() {
    const router = useRouter();
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Initialize Lenis
        const initLenis = async () => {
            const Lenis = (await import('lenis')).default;

            const lenis = new Lenis({
                lerp: 0.08,
                smoothWheel: true,
                syncTouch: true,
            });
            lenisRef.current = lenis;

            // Sync GSAP ScrollTrigger with Lenis
            gsap.registerPlugin(ScrollTrigger);

            // Connect Lenis to ScrollTrigger using existing pattern
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        };

        if (typeof window !== 'undefined') {
            initLenis();
        }

        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                lenisRef.current = null;
            }
        };
    }, []);

    // Handle route changes for smooth scroll to top
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (lenisRef.current) {
                // Smooth scroll to top
                lenisRef.current.scrollTo(0, {
                    immediate: false,
                    duration: 1.5, // Slower duration for smooth effect
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
                });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

    return null;
}
