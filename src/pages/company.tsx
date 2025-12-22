/**
 * Company Page - About Us / Who We Are
 * 
 * Modern hero section with 3D model, video card,
 * and smooth scroll animations.
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css';

// 3D Model - same as home page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Company() {
    const heroRef = useRef<HTMLElement>(null);
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

        // Initialize GSAP animations
        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Hero content entry animations
            const tl = gsap.timeline({ delay: 0.2 });

            // Label fade in
            tl.from(`.${styles.heroLabel}`, {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Title reveal
            tl.from(`.${styles.heroTitle}`, {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.5');

            // Card slide in
            tl.from(`.${styles.heroCard}`, {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            }, '-=0.7');

            // Scroll indicator fade in
            tl.from(`.${styles.scrollIndicator}`, {
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out',
            }, '-=0.4');

            // Scroll-based parallax for card
            ScrollTrigger.create({
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.5,
                onUpdate: (self) => {
                    const card = document.querySelector(`.${styles.heroCard}`) as HTMLElement;
                    if (card) {
                        // Card starts at translateY(50%), parallax moves it up slightly
                        const yMove = 50 - (self.progress * 30);
                        card.style.transform = `translateY(${yMove}%)`;
                    }
                }
            });
        };

        initAnimations();
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <Layout title="About Us" description="Learn about Winspire RCM - our mission, values, and team">

            {/* 3D Model - FIXED behind everything */}
            {!is3DDisabled.current && (
                <div className={styles.modelContainer}>
                    <GLTFViewer
                        manualTransform={{
                            scale: 10,
                            position: { x: 0.5, y: 0.3, z: 0 },
                            rotation: { x: 0, y: 0, z: 1 }
                        }}
                        rotateSpeed={0.003}
                        className="w-full h-full"
                    />
                </div>
            )}

            {/* Hero Section */}
            <section ref={heroRef} className={styles.heroSection}>
                {/* Content */}
                <div className={styles.heroContent}>
                    {/* Label */}
                    <div className={styles.heroLabel}>
                        <div className={styles.heroDots}>
                            <span className={styles.heroDot}></span>
                            <span className={styles.heroDot}></span>
                        </div>
                        <span>About Winspire</span>
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>About Us</h1>
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

                {/* 3D Geometric Shapes at bottom left */}
                <div className={styles.geometricShapes}>
                    {/* Cube 1 - larger, back */}
                    <div className={`${styles.cube} ${styles.cube1}`}>
                        <div className={`${styles.cubeFace} ${styles.cubeFront}`}></div>
                        <div className={`${styles.cubeFace} ${styles.cubeTop}`}></div>
                        <div className={`${styles.cubeFace} ${styles.cubeRight}`}></div>
                    </div>
                    {/* Cube 2 - smaller, front */}
                    <div className={`${styles.cube} ${styles.cube2}`}>
                        <div className={`${styles.cubeFace} ${styles.cubeFront}`}></div>
                        <div className={`${styles.cubeFace} ${styles.cubeTop}`}></div>
                        <div className={`${styles.cubeFace} ${styles.cubeRight}`}></div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                    <span>Scroll</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <polyline points="19 12 12 19 5 12"></polyline>
                    </svg>
                </div>
            </section>

        </Layout>
    );
}
