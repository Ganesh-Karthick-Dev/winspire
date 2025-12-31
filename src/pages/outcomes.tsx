/**
 * Outcomes Page
 * 
 * Features:
 * - Same Hero section as Company/Solutions pages
 * - 3D Model with scroll animation
 * - Existing Outcomes content sections
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import OutcomesVision from '@/components/outcomes/OutcomesVision';
import OutcomesCarousel from '@/components/outcomes/OutcomesCarousel';
import OutcomesTeam from '@/components/outcomes/OutcomesTeam';
import ValuesSection from '@/components/company/ValuesSection';
import FAQSection from '@/components/solutions/FAQSection';
import MaterialsSection from '@/components/solutions/MaterialsSection';
import CareersContactLinks from '@/components/CareersContactLinks';
import FloatingSectionNav from '@/components/FloatingSectionNav';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css'; // Reusing Company styles for Hero

import { outcomesScrollKeyframes } from '@/lib/outcomesScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as other pages
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Outcomes() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Outcomes page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: outcomesScrollKeyframes
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
        <Layout title="Outcomes" description="Measurable results with Winspire RCM">
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

            {/* Hero Section (Same as Company/Solutions) */}
            <section ref={heroRef} className={styles.heroSection}>
                {/* Content */}
                <div className={styles.heroContent}>
                    {/* Label */}
                    <div className={styles.heroLabel}>
                        <div className={styles.heroDots}>
                            <span className={styles.heroDot}></span>
                            <span className={styles.heroDot}></span>
                        </div>
                        <span>Our Impact</span>
                    </div>

                    {/* Main Title */}
                    <h1 className={styles.heroTitle}>Outcomes</h1>
                </div>

                {/* Image Card - half in, half out */}
                <div className={styles.heroCard}>
                    <img
                        className={styles.heroCardVideo}
                        src="/poster/qefqe.webp"
                        alt="Outcomes"
                    />
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                    <span>Scroll</span>
                    <span>↓</span>
                </div>
            </section>

            {/* Existing Outcomes Content Sections */}
            <div id="vision" style={{ scrollMarginTop: '100px' }}>
                <OutcomesVision />
            </div>

            {/* Title Section - Introduces the Five Dimensions */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 30,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '200px',
                    paddingBottom: '200px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    textAlign: 'center',
                }}
            >
                <h2
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                        fontWeight: 700,
                        color: 'white',
                        maxWidth: '56rem',
                        lineHeight: 1.2,
                    }}
                >
                    The Five Dimensions of Revenue Performance We Transform.
                </h2>
            </div>

            <div id="results" style={{ scrollMarginTop: '100px' }}>
                <OutcomesCarousel />
            </div>

            <div id="team" style={{ scrollMarginTop: '100px' }}>
                <OutcomesTeam />
            </div>

            {/* Additional Sections from Other Pages */}
            <div id="values" style={{ scrollMarginTop: '100px' }}>
                <ValuesSection />
            </div>

            <div id="faq" style={{ scrollMarginTop: '100px' }}>
                <FAQSection />
            </div>

            <div id="materials" style={{ scrollMarginTop: '100px' }}>
                <MaterialsSection />
            </div>

            <CareersContactLinks />

            <FloatingSectionNav sections={[
                { id: 'vision', label: 'Vision' },
                { id: 'results', label: 'Results' },
                { id: 'team', label: 'Team' },
                { id: 'values', label: 'Values' },
                { id: 'faq', label: 'FAQ' },
                { id: 'materials', label: 'Materials' },
            ]} />

        </Layout>
    );
}
