/**
 * Book a Demo Page
 * 
 * Features:
 * - Same Hero section as Company/Solutions/Outcomes pages
 * - 3D Model with scroll animation
 * - Existing Demo sections
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import StackingCards from '@/components/StackingCards';
import DemoForm from '@/components/DemoForm';
import ZeroRiskSection from '@/components/ZeroRiskSection';
import NewsSection from '@/components/NewsSection';
import MissionSection from '@/components/company/MissionSection';
import CareersContactLinks from '@/components/CareersContactLinks';
import FloatingSectionNav from '@/components/FloatingSectionNav';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css'; // Reusing Company styles for Hero

import { bookDemoScrollKeyframes } from '@/lib/bookDemoScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as other pages
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function BookDemo() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Book Demo page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: bookDemoScrollKeyframes
    });

    // Keep rotation active, disable wobble at the end
    const enableWobble = scrollProgress <= 0.95;
    const rotateSpeed = 0.003;

    useEffect(() => {
        is3DDisabled.current = shouldDisable3D();

        const loader = document.querySelector('.loader-overlay') as HTMLElement;
        if (loader) {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');

        let ctx: gsap.Context;

        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Force video play on navigation
            const video = document.querySelector(`.${styles.heroCardVideo}`) as HTMLVideoElement;
            if (video) {
                video.muted = true;
                video.play().catch(e => console.log('Autoplay blocked', e));
            }

            // Use gsap.context for easy cleanup
            ctx = gsap.context(() => {
                const tl = gsap.timeline({ delay: 0.1 });

                // Initialize state immediately
                gsap.set(`.${styles.heroLabel}`, { y: 20, opacity: 0 });
                gsap.set(`.${styles.heroTitle}`, { y: 60, opacity: 0 });
                gsap.set(`.${styles.heroCard}`, { x: 100, opacity: 0 });

                tl.to(`.${styles.heroLabel}`, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
                tl.to(`.${styles.heroTitle}`, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.5');
                tl.to(`.${styles.heroCard}`, { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7');

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
            }, heroRef);

            // Failsafe: Ensure visibility after delay
            setTimeout(() => {
                const elements = [
                    document.querySelector(`.${styles.heroLabel}`),
                    document.querySelector(`.${styles.heroTitle}`),
                    document.querySelector(`.${styles.heroCard}`)
                ];
                elements.forEach(el => {
                    if (el) {
                        (el as HTMLElement).style.opacity = '1';
                        (el as HTMLElement).style.visibility = 'visible';
                    }
                });
                ScrollTrigger.refresh();
            }, 1000);
        };

        if (heroRef.current) {
            initAnimations();
        }

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Layout title="Book a Demo" description="Schedule a personalized demo with Winspire RCM">
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

            {/* Hero Section (Same as Company/Solutions/Outcomes) */}
            <section ref={heroRef} className={styles.heroSection}>
                {/* Content */}
                <div className={styles.heroContent}>
                    {/* Label */}
                    <div className={styles.heroLabel}>
                        <div className={styles.heroDots}>
                            <span className={styles.heroDot}></span>
                            <span className={styles.heroDot}></span>
                        </div>
                        <span>Schedule a Demo</span>
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>Book a Demo</h1>
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

            {/* Stacking Cards Section */}
            <div id="features" style={{ scrollMarginTop: '100px' }}>
                <StackingCards />
            </div>

            {/* Demo Form Section */}
            <div id="form" style={{ scrollMarginTop: '100px' }}>
                <DemoForm />
            </div>

            {/* Zero-Risk Demo Section */}
            <div id="guarantee" style={{ scrollMarginTop: '100px' }}>
                <ZeroRiskSection />
            </div>

            {/* Additional Sections */}
            <div id="mission" style={{ scrollMarginTop: '100px' }}>
                <MissionSection
                    label="Our Mission"
                    subtitle="Why Winspire RCM Exists"
                    statement={`Transforming Healthcare\nWith Technology.`}
                    description="At Winspire RCM, we believe in leveraging cutting-edge technology to revolutionize revenue cycle management. Our mission is to empower healthcare providers with AI-driven solutions that streamline operations, maximize revenue, and allow them to focus on what matters most—patient care."
                />
            </div>

            <div id="news" style={{ scrollMarginTop: '100px' }}>
                <NewsSection />
            </div>

            <CareersContactLinks />

            <FloatingSectionNav sections={[
                { id: 'features', label: 'Features' },
                { id: 'form', label: 'Book Demo' },
                { id: 'guarantee', label: 'Guarantee' },
                { id: 'mission', label: 'Mission' },
                { id: 'news', label: 'News' },
            ]} />

        </Layout>
    );
}
