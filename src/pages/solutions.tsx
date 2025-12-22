/**
 * Solutions Page
 * 
 * Features:
 * - Identical Hero section to Company page
 * - 3D Model with independent scroll animation
 * - Final CTA Section
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import CareersContactLinks from '@/components/CareersContactLinks';
import SolutionsCarousel from '@/components/solutions/SolutionsCarousel';
import GroupsSection from '@/components/solutions/GroupsSection';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css'; // Reusing Company styles for identical Hero

import { solutionsScrollKeyframes } from '@/lib/solutionsScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as home page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Solutions() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Solutions page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: solutionsScrollKeyframes
    });

    // Keep rotation (spin) active, but disable wobble at the very end (identical to Company page)
    const enableWobble = scrollProgress <= 0.95;
    const rotateSpeed = 0.003;

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        // Hide loader
        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');

        // Initialize GSAP animations for Hero
        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({ delay: 0.2 });
            tl.from(`.${styles.heroLabel}`, { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' });
            tl.from(`.${styles.heroTitle}`, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5');
            tl.from(`.${styles.heroCard}`, { x: 100, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.7');

            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
                onUpdate: (self) => {
                    const card = document.querySelector(`.${styles.heroCard}`) as HTMLElement;
                    if (card) {
                        const yMove = 20 - (self.progress * 15);
                        card.style.transform = `translateY(${yMove}%)`;
                    }
                }
            });
        };

        initAnimations();
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Layout title="Solutions" description="Discover Winspire's AI-driven RCM solutions">
            {/* 3D Model - FIXED behind everything */}
            {!is3DDisabled.current && (
                <div className={styles.modelContainer}>
                    <GLTFViewer
                        manualTransform={transform}
                        rotateSpeed={rotateSpeed}
                        enableWobble={enableWobble}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Hero Section (Reused from Company Page) */}
            <section ref={heroRef} className={styles.heroSection}>
                {/* Content */}
                <div className={styles.heroContent}>
                    {/* Label */}
                    <div className={styles.heroLabel}>
                        <div className={styles.heroDots}>
                            <span className={styles.heroDot}></span>
                            <span className={styles.heroDot}></span>
                        </div>
                        {/* Updated Label Text */}
                        <span>Our Solutions</span>
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>Solutions</h1>
                </div>

                {/* Video Card - half in, half out */}
                <div className={styles.heroCard}>
                    <video
                        className={styles.heroCardVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/video/sample/section2_video.mp4" type="video/mp4" />
                    </video>
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                    <span>Scroll</span>
                    <span>↓</span>
                </div>
            </section>

            {/* Carousel Section */}
            <SolutionsCarousel />

            {/* Groups/Career Section */}
            <GroupsSection />

            {/* Spacer for scroll length (Placeholder for future content) */}
            <div style={{ height: '20vh', position: 'relative', zIndex: 10 }}></div>

            {/* Final CTA Section */}
            <CareersContactLinks />

        </Layout>
    );
}
