/**
 * Company Page
 * 
 * Using same pattern as book-demo.tsx which works
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Layout from '@/components/Layout';
import ContentSection from '@/components/company/ContentSection';
import { shouldDisable3D } from '@/lib/threeUtils';
import type { ThreeState } from '@/lib/threeManager';
import styles from '@/styles/company.module.css';

// 3D Model - same as book-demo
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Company() {
    const is3DDisabled = useRef(false);

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        // Hide loader
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');

        // Initialize animations
        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Hero text entry
            const heroText = document.querySelector('.company-hero-text');
            if (heroText) {
                gsap.fromTo(heroText,
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
                );
            }

            // Pin the hero section
            ScrollTrigger.create({
                trigger: '.company-hero',
                start: 'top top',
                end: '+=30%',
                pin: true,
                pinSpacing: true,
            });

            // Main timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.company-hero',
                    start: 'top top',
                    end: '+=30%',
                    scrub: 0.5,
                }
            });

            // 2. Frosty card shrink + Text shrink - synced together
            const frostyCard = document.querySelector('.company-frosty-card') as HTMLElement;
            const heroTextEl = document.querySelector('.company-hero-text') as HTMLElement;
            if (frostyCard) {
                ScrollTrigger.create({
                    trigger: '.company-hero',
                    start: 'top top',
                    end: '+=30%',
                    scrub: 0.5,
                    onUpdate: (self) => {
                        const progress = self.progress;

                        // Frosty card shrink to smaller centered size
                        frostyCard.style.top = `${progress * 38}%`;
                        frostyCard.style.left = `${progress * 40}%`;
                        frostyCard.style.right = `${progress * 40}%`;
                        frostyCard.style.bottom = `${progress * 10}%`;
                        frostyCard.style.borderRadius = `${progress * 28}px`;

                        // Text shrink and stay at bottom of card
                        if (heroTextEl) {
                            const scale = 1 - (progress * 0.7); // 1 -> 0.3
                            const bottomPos = 3 + (progress * 5); // 3% -> 8% (stay near bottom)
                            heroTextEl.style.transform = `scale(${scale})`;
                            heroTextEl.style.bottom = `${bottomPos}%`;
                            heroTextEl.style.opacity = `${1 - (progress * 0.3)}`;
                        }
                    }
                });
            }

            // 3. Images slide in smoothly (after card shrinks)
            // Left images - slide from left
            tl.fromTo('.company-img-1',
                { x: -200, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
                0.55
            );
            tl.fromTo('.company-img-2',
                { x: -200, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
                0.6
            );
            // Right images - slide from right
            tl.fromTo('.company-img-3',
                { x: 200, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
                0.65
            );
            tl.fromTo('.company-img-4',
                { x: 200, opacity: 0, scale: 0.9 },
                { x: 0, opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' },
                0.7
            );

            // 4. Tagline fades in after grid forms
            tl.fromTo('.company-tagline',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
                0.8
            );
        };

        initAnimations();
    }, []);

    // Model animation - same pattern as book-demo
    const handleModelReady = useCallback(async (state: ThreeState) => {
        if (!state.model) return;

        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Initial position
        gsap.to(state.model.position, { x: 0, y: 0.2, duration: 1.5, ease: 'power2.out' });
        gsap.to(state.model.scale, { x: 180, y: 180, z: 180, duration: 1.5, ease: 'power2.out' });
        gsap.to(state.model.rotation, { x: 0.5, z: -0.05, duration: 1.5, ease: 'power2.out' });

        // Continuous rotation
        const rotate = () => {
            if (state.model) state.model.rotation.y += 0.002;
            requestAnimationFrame(rotate);
        };
        rotate();

        // Model shrink on scroll (synced with frosty card)
        ScrollTrigger.create({
            trigger: '.company-hero',
            start: 'top top',
            end: '+=30%',
            scrub: 0.5,
            onUpdate: (self) => {
                // Shrink from 180 to 45 (smaller final size)
                const newScale = 180 - (self.progress * 135);
                state.model!.scale.set(newScale, newScale, newScale);

                // Move model down to center in card (0.2 -> -0.3)
                state.model!.position.y = 0.2 - (self.progress * 0.5);

                // Adjust tilt to face forward perfectly
                state.model!.rotation.x = 0.5 + (self.progress * 0.6); // 0.5 -> 1.1 (faces straight forward)
                state.model!.rotation.z = -0.05 + (self.progress * 0.05); // -0.05 -> 0
            }
        });
    }, []);

    return (
        <Layout title="Company" description="About Winspire RCM">
            {/* Hero Section */}
            <section className={`${styles.heroSection} company-hero`}>
                {/* 3D Model */}
                {!is3DDisabled.current && (
                    <GLTFViewer
                        url="/models/Winspire glossy Logo.glb"
                        onModelReady={handleModelReady}
                        className="absolute inset-0 w-full h-full"
                    />
                )}

                {/* Frosty Card */}
                <div className={`${styles.frostyCard} company-frosty-card`}></div>

                {/* Hero Text */}
                <h1 className={`${styles.heroTitle} company-hero-text`}>
                    Who We Are
                </h1>

                {/* Grid Images */}
                <div className={`${styles.gridImage} ${styles.topLeft} company-img-1`}>
                    <Image src="/images/company/grid-1.png" alt="Image 1" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={`${styles.gridImage} ${styles.bottomLeft} company-img-2`}>
                    <Image src="/images/company/grid-3.png" alt="Image 2" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={`${styles.gridImage} ${styles.topRight} company-img-3`}>
                    <Image src="/images/company/grid-2.png" alt="Image 3" fill style={{ objectFit: 'cover' }} />
                </div>
                <div className={`${styles.gridImage} ${styles.bottomRight} company-img-4`}>
                    <Image src="/images/company/grid-4.png" alt="Image 4" fill style={{ objectFit: 'cover' }} />
                </div>
            </section>

            {/* Content Section */}
            <ContentSection />
        </Layout>
    );
}
