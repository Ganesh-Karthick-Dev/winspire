/**
 * Neura AI Page
 * 
 * Features:
 * - Same Hero section as Company/Solutions/Outcomes pages
 * - 3D Model with scroll animation
 * - Neura AI specific content sections
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import CareersContactLinks from '@/components/CareersContactLinks';
import FloatingSectionNav from '@/components/FloatingSectionNav';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/neura.module.css';

// Sections from different pages
import ServicesSection from '@/components/ServicesSection';         // From Home
import CultureSection from '@/components/solutions/CultureSection'; // From Solutions
import MissionSection from '@/components/company/MissionSection';   // From Company
import FAQSection from '@/components/solutions/FAQSection';         // From Solutions
import EnvironmentSection from '@/components/solutions/EnvironmentSection'; // From Solutions

import { neuraScrollKeyframes } from '@/lib/neuraScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as other pages
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function NeuraAI() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Neura AI page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: neuraScrollKeyframes
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
        <Layout title="Neura AI" description="Discover Winspire's Neura AI - intelligent automation for healthcare">
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
                        <span>AI Intelligence</span>
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>Neura AI</h1>
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

            {/* Mission Section - From Company */}
            <div id="mission" style={{ scrollMarginTop: '100px' }}>
                <MissionSection
                    label="Our Mission"
                    subtitle="AI-Powered Healthcare"
                    statement="Transforming Revenue Cycle With Intelligent Automation."
                    description="Neura AI leverages cutting-edge machine learning and natural language processing to automate complex healthcare workflows. Our mission is to reduce errors, improve efficiency, and maximize revenue for healthcare providers."
                />
            </div>

            {/* Culture Section - From Solutions */}
            <div id="culture" style={{ scrollMarginTop: '100px' }}>
                <CultureSection />
            </div>

            {/* Services Section - From Home */}
            <div id="services" style={{ scrollMarginTop: '100px' }}>
                <ServicesSection />
            </div>

            {/* Environment Section - From Solutions */}
            <div id="environment" style={{ scrollMarginTop: '100px' }}>
                <EnvironmentSection />
            </div>

            {/* FAQ Section - From Solutions */}
            <div id="faq" style={{ scrollMarginTop: '100px' }}>
                <FAQSection />
            </div>

            {/* Final CTA Section */}
            <div id="contact" style={{ scrollMarginTop: '100px' }}>
                <CareersContactLinks />
            </div>

            <FloatingSectionNav sections={[
                { id: 'mission', label: 'Mission' },
                { id: 'culture', label: 'Culture' },
                { id: 'services', label: 'Services' },
                { id: 'environment', label: 'Environment' },
                { id: 'faq', label: 'FAQ' },
            ]} />

        </Layout>
    );
}
