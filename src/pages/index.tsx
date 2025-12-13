/**
 * Home Page (index.tsx)
 * 
 * Main single-page layout integrating:
 * - GLTFViewer (dynamically imported, SSR disabled)
 * - Poster (LCP target)
 * - Lenis smooth scrolling
 * - GSAP ScrollTrigger animations
 * - 3D model scroll-driven transforms
 * 
 * SEO Architecture:
 * - All text content is SSR-rendered
 * - 3D components load after hydration via requestIdleCallback
 * - Poster image is the LCP target (not 3D)
 */

import dynamic from 'next/dynamic';
import { useEffect, useRef, useCallback } from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import MarqueeText from '@/components/MarqueeText';
import Section from '@/components/Section';
import VisionSection from '@/components/VisionSection';
import { resetLoaderToZero } from '@/lib/loaderManager';
import { shouldDisable3D, prefersReducedMotion } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';

/**
 * Dynamically import GLTFViewer with SSR disabled.
 * Shows Poster as fallback while loading.
 */
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Home() {
    // Ref to store Three.js state for GSAP animations
    const threeStateRef = useRef<ThreeState | null>(null);

    // Track if 3D should be disabled
    const is3DDisabled = useRef(false);

    /**
     * Handle model ready callback
     * Sets up GSAP scroll-driven animations for the 3D model
     */
    const handleModelReady = useCallback((state: ThreeState) => {
        threeStateRef.current = state;

        // Set up scroll-driven 3D animations if motion is allowed
        if (!prefersReducedMotion()) {
            setupScrollAnimations(state);
        }
    }, []);

    /**
     * Set up Lenis smooth scroll and GSAP ScrollTrigger
     */
    useEffect(() => {
        // Reset loader on every page mount (no caching)
        resetLoaderToZero();

        // Check if 3D should be disabled
        is3DDisabled.current = shouldDisable3D();

        // Skip animations if reduced motion preferred
        if (prefersReducedMotion()) {
            return;
        }

        let lenis: import('lenis').default | undefined;
        let rafId: number;

        const setupScrolling = async () => {
            try {
                // Dynamically import Lenis and GSAP
                const [LenisModule, { gsap }, { ScrollTrigger }] = await Promise.all([
                    import('lenis'),
                    import('gsap'),
                    import('gsap/ScrollTrigger'),
                ]);

                gsap.registerPlugin(ScrollTrigger);

                // Apply ScrollTrigger defaults for SEO-friendly animations
                ScrollTrigger.defaults({
                    anticipatePin: 1,
                    markers: false,
                    invalidateOnRefresh: true,
                });

                // Initialize Lenis smooth scroll
                lenis = new LenisModule.default({
                    lerp: 0.08,
                    smoothWheel: true,
                });

                // RAF loop for Lenis
                const raf = (time: number) => {
                    lenis?.raf(time);
                    rafId = requestAnimationFrame(raf);
                };
                rafId = requestAnimationFrame(raf);

                // Sync Lenis with ScrollTrigger
                lenis.on('scroll', ScrollTrigger.update);

                // ScrollerProxy for Lenis
                ScrollTrigger.scrollerProxy(document.body, {
                    scrollTop(value?: number) {
                        if (typeof value === 'number') {
                            lenis?.scrollTo(value);
                        }
                        return lenis?.scroll ?? 0;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                        };
                    },
                });

                // Refresh ScrollTrigger after setup
                ScrollTrigger.refresh();

            } catch (error) {
                console.error('Failed to initialize scroll system:', error);
            }
        };

        setupScrolling();

        return () => {
            if (rafId) cancelAnimationFrame(rafId);
            lenis?.destroy();
        };
    }, []);

    return (
        <Layout
            title="Home"
            description="Experience stunning 3D visuals with smooth scroll animations. Built with Next.js, Three.js, and GSAP for optimal performance."
        >
            {/* Page wrapper for z-index stacking */}
            <div className="page-wrapper">
                {/* 
          3D Viewer - loaded dynamically after hydration
          Uses requestIdleCallback for non-blocking initialization
        */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        url="/models/Winspire Logo.glb"
                        onModelReady={handleModelReady}
                    />
                )}

                {/* 
          Hero Section
          - SSR-rendered content for SEO
          - Trigger area for initial 3D animation
        */}
                <Hero
                    title={`Immersive 3D
Experience`}
                    subtitle="Explore stunning visuals with smooth scroll animations. Built for performance and accessibility."
                    ctaText="Explore Features"
                    ctaHref="#features"
                />

                {/* Marquee Text - scroll-driven horizontal animation */}
                <MarqueeText text="Get Results. Not Just Promise." />

                {/* 
          Content Sections
          - All text SSR-rendered for SEO
          - GSAP entry animations on scroll
        */}
                <Section id="features" title="Features">
                    <p className="section-text">
                        This site demonstrates advanced WebGL techniques combined with
                        modern web standards. The 3D model uses Draco compression for
                        optimal file size, while GSAP ScrollTrigger creates seamless
                        scroll-driven animations.
                    </p>
                </Section>

                <Section id="performance" title="Performance">
                    <p className="section-text">
                        Built with performance as a priority. The 3D model loads after
                        initial paint, ensuring fast LCP scores. Code-splitting keeps
                        the initial bundle lean, and reduced motion preferences are
                        respected for accessibility.
                    </p>
                </Section>

                <Section id="technology" title="Technology">
                    <p className="section-text">
                        Powered by Next.js for SEO-friendly server rendering, Three.js
                        for WebGL graphics, GSAP for smooth animations, and Lenis for
                        buttery smooth scrolling. All working together seamlessly.
                    </p>
                </Section>

                <Section id="cta" title="Get Started">
                    <p className="section-text">
                        Ready to create your own immersive 3D experience? Check out the
                        documentation to learn how to customize the model, animations,
                        and styling to match your brand.
                    </p>
                </Section>

                {/* Vision Section - before footer */}
                <VisionSection />
            </div>
        </Layout>
    );
}

/**
 * Set up scroll-driven animations for the 3D model
 * Uses GSAP to animate camera and model based on scroll position
 */
async function setupScrollAnimations(state: ThreeState) {
    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    const { model, camera } = state;
    if (!model) return;

    // Hero section: animate camera zoom
    gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            pin: true,
            anticipatePin: 1,
        },
    }).to(camera.position, {
        z: 2.5,
        ease: 'none',
    });

    // Features section: rotate model
    gsap.timeline({
        scrollTrigger: {
            trigger: '#features',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    }).to(model.rotation, {
        y: Math.PI * 0.5,
        ease: 'none',
    });

    // Performance section: continue rotation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#performance',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    }).to(model.rotation, {
        y: Math.PI,
        ease: 'none',
    });

    // Technology section: continue rotation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#technology',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    }).to(model.rotation, {
        y: Math.PI * 1.5,
        ease: 'none',
    });

    // CTA section: complete rotation
    gsap.timeline({
        scrollTrigger: {
            trigger: '#cta',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
        },
    }).to(model.rotation, {
        y: Math.PI * 2,
        ease: 'none',
    });

    // Vision section: move model to left and scale down
    gsap.timeline({
        scrollTrigger: {
            trigger: '#vision',
            start: 'top bottom',
            end: 'center center',
            scrub: true,
        },
    })
        .to(model.position, {
            x: -0.9,  // Move to left side (not too far)
            y: 0.3,
            ease: 'power2.out',
        }, 0)
        .to(model.scale, {
            x: -35.9,  // Scale down (initial is 0.01, so 0.005 = 50% smaller)
            y: -35.9,
            z: -35.9,
            ease: 'power2.out',
        }, 0)
        .to(model.rotation, {
            x : Math.PI * 1.003,
            y: Math.PI * 2,  // Slight rotation
            ease: 'none',
        }, 0);
}
