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
import PeopleSection from '@/components/solutions/PeopleSection';
import TeamCarouselSection from '@/components/solutions/TeamCarouselSection';
import EnvironmentSection from '@/components/solutions/EnvironmentSection';
import MaterialsSection from '@/components/solutions/MaterialsSection';
import FAQSection from '@/components/solutions/FAQSection';
import CultureSection from '@/components/solutions/CultureSection';
import EntrySection from '@/components/solutions/EntrySection';
import FloatingSectionNav from '@/components/FloatingSectionNav'; // Import added
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

        let ctx: gsap.Context;

        // Initialize GSAP animations for Hero
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

                {/* Image Card - half in, half out */}
                <div className={styles.heroCard}>
                    <img
                        className={styles.heroCardVideo}
                        src="/poster/qefqe.webp"
                        alt="Solutions"
                    />
                </div>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                    <span>Scroll</span>
                    <span>↓</span>
                </div>
            </section>

            {/* Carousel Section */}
            <div id="message" style={{ scrollMarginTop: '100px' }}>
                <SolutionsCarousel />
            </div>

            {/* Groups/Career Section */}
            <div id="categories" style={{ scrollMarginTop: '100px' }}>
                <GroupsSection />
            </div>

            {/* People Section */}
            <div id="people" style={{ scrollMarginTop: '100px' }}>
                <PeopleSection />
            </div>

            {/* Team Carousel (Expanded View) - Part of People usually */}
            <TeamCarouselSection />

            {/* Environment / Work Style Section */}
            <div id="environment" style={{ scrollMarginTop: '100px' }}>
                <EnvironmentSection />
            </div>

            {/* Materials Section */}
            <div id="materials" style={{ scrollMarginTop: '100px' }}>
                <MaterialsSection />
            </div>

            {/* FAQ Section */}
            <div id="faq" style={{ scrollMarginTop: '100px' }}>
                <FAQSection />
            </div>

            {/* Culture Section */}
            <div id="culture" style={{ scrollMarginTop: '100px' }}>
                <CultureSection />
            </div>

            {/* Final CTA Section */}
            <div id="entry" style={{ scrollMarginTop: '100px' }}>
                <EntrySection />
            </div>

            <FloatingSectionNav
                sections={[
                    { id: 'message', label: 'Message' },
                    { id: 'categories', label: 'Job Categories' },
                    { id: 'people', label: 'People' },
                    { id: 'environment', label: 'Work Environment' },
                    { id: 'materials', label: 'Recruitment Materials' },
                    { id: 'faq', label: 'FAQ' },
                    { id: 'culture', label: 'Culture Note' },
                ]}
            />

        </Layout>
    );
}
