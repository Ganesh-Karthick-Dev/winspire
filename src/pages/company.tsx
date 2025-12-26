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
import MissionSection from '@/components/company/MissionSection';
import VisionSection from '@/components/company/VisionSection';
import ValuesSection from '@/components/company/ValuesSection';
import BoardSection from '@/components/company/BoardSection';
import AwardSection from '@/components/company/AwardSection';
import CorporateProfile from '@/components/company/CorporateProfile';
import AccessSection from '@/components/company/AccessSection';
import CareersContactLinks from '@/components/CareersContactLinks';
import FloatingSectionNav from '@/components/FloatingSectionNav'; // Import added
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css';

import { companyScrollKeyframes } from '@/lib/companyScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// 3D Model - same as home page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function Company() {
    const heroRef = useRef<HTMLElement>(null);
    const is3DDisabled = useRef(false);

    // Use custom scroll animation for Company page
    const { transform, lighting, scrollProgress } = useScrollAnimation({
        keyframes: companyScrollKeyframes
    });

    // Keep rotation (spin) active, but disable wobble at the very end
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

                // Initialize state immediately to avoid "flash" but ensure visibility if animation fails
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

            // Failsafe: Ensure visibility after a short delay in case GSAP hangs
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
            if (ctx) ctx.revert(); // Cleanup GSAP animations/triggers
        };
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <Layout title="About Us" description="Learn about Winspire RCM - our mission, values, and team">
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
                        <span >About Winspire</span>
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



                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                    <span>Scroll</span>
                    <span>↓</span>
                </div>
            </section>

            {/* Mission Section */}
            <div id="mission" style={{ scrollMarginTop: '100px' }}>
                <MissionSection
                    label="Mission"
                    subtitle="Our purpose and commitment"
                    statement={`Transforming Healthcare
With Technology.`}
                    description="At Winspire RCM, we believe in leveraging cutting-edge technology to revolutionize revenue cycle management. Our mission is to empower healthcare providers with AI-driven solutions that streamline operations, maximize revenue, and allow them to focus on what matters most—patient care. We are committed to delivering exceptional results through innovation, transparency, and unwavering dedication to our clients' success."
                />
            </div>

            {/* Vision Section */}
            <div id="vision" style={{ scrollMarginTop: '100px' }}>
                <VisionSection
                    label="Vision"
                    subtitle="Our future outlook"
                    statementLines={['Bridging Healthcare With', 'Intelligent Technology']}
                    descriptions={[
                        'Our vision is to create a future where healthcare operations are intelligent, connected, and continuously optimized through AI-driven systems. By bridging real-world processes with digital intelligence, we aim to transform how healthcare organizations understand, manage, and improve their financial performance.',
                        "We envision a unified platform that acts as a digital twin of the healthcare revenue ecosystem, connecting data, workflows, and insights in real time. This approach enables proactive decision-making, adaptive operations, and sustainable growth, helping healthcare providers stay resilient in an ever-evolving industry.",
                    ]}
                />
            </div>

            {/* Values Section */}
            <div id="values" style={{ scrollMarginTop: '100px' }}>
                <ValuesSection />
            </div>

            {/* Board Members Section */}
            <div id="board" style={{ scrollMarginTop: '100px' }}>
                <BoardSection />
            </div>

            {/* Award Section */}
            <div id="awards" style={{ scrollMarginTop: '100px' }}>
                <AwardSection />
            </div>

            {/* Corporate Profile Section */}
            <div id="profile" style={{ scrollMarginTop: '100px' }}>
                <CorporateProfile />
            </div>

            {/* Access Section */}
            <div id="access" style={{ scrollMarginTop: '100px' }}>
                <AccessSection />
            </div>

            {/* Final CTA Section */}
            <div id="contact" style={{ scrollMarginTop: '100px' }}>
                <CareersContactLinks />
            </div>

            <FloatingSectionNav sections={[
                { id: 'mission', label: 'Mission' },
                { id: 'vision', label: 'Vision' },
                { id: 'values', label: 'Values' },
                { id: 'board', label: 'Board Members' },
                { id: 'awards', label: 'Award' },
                { id: 'profile', label: 'Corporate Profile' },
                { id: 'access', label: 'Access' },
            ]} />

        </Layout>
    );
}
