/**
 * Temp Company Page - About Us / Who We Are
 * 
 * Modern hero section with 3D model background and smooth scroll animations.
 * Follows the same structure as company.tsx.
 */

'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import Layout from '@/components/Layout';
import { shouldDisable3D } from '@/lib/threeUtils';
import styles from '@/styles/company.module.css';

import { companyScrollKeyframes } from '@/lib/companyScrollAnimations';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

// Section Components
import OurStorySection from '@/components/temp-company/OurStorySection';
import WhyWeExistSection from '@/components/temp-company/WhyWeExistSection';
import PointOfViewSection from '@/components/temp-company/PointOfViewSection';
import HowWeWorkSection from '@/components/temp-company/HowWeWorkSection';
import RoleOfTechnologySection from '@/components/temp-company/RoleOfTechnologySection';
import WhoWeHelpSection from '@/components/temp-company/WhoWeHelpSection';
import CultureSection from '@/components/temp-company/CultureSection';
import LeadershipSection from '@/components/temp-company/LeadershipSection';
import VisionMissionSection from '@/components/temp-company/VisionMissionSection';
import FinalCTASection from '@/components/temp-company/FinalCTASection';
import { VideoScrollHero } from '@/components/ui/video-scroll-hero';

// 3D Model - same as company page
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

export default function TempCompany() {
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
        
        // Hide loader immediately without triggering it
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

                // Initialize state immediately to avoid "flash"
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

            // Failsafe: Ensure visibility after a short delay
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
        <Layout
            title="About Winspire RCMMM"
            description="Built Inside Healthcare. Designed for Predictable Outcomes. Learn about our mission, values, and team."
        >
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

            {/* Hero Section + Scaling Card */}
            <div className="relative">
                <section ref={heroRef} className={styles.heroSection}>
                    {/* Content */}
                    <div className={styles.heroContent}>
                        {/* Label */}
                        <div className={styles.heroLabel}>
                            {/* <div className={styles.heroDots}>
                                <span className={styles.heroDot}></span>
                                <span className={styles.heroDot}></span>
                            </div> */}
                            {/* <span>About Winspire RCM</span> */}
                        </div>

                        {/* Main Title */}
                        <h1 className={styles.heroTitle}>
                            Built Inside Healthcare.<br/>
                            <span className={styles.heroSubtitle}>Designed for Predictable Outcomes.</span>
                        </h1>
                    </div>

                    {/* Scroll Indicator */}
                    <div className={styles.scrollIndicator} onClick={handleScrollClick}>
                        <span>Scroll</span>
                        <span>↓</span>
                    </div>
                </section>

                {/* Scaling Card - Starts inside hero, expands to 80% */}
                <div className="absolute top-20 left-0 w-full h-[150vh] pointer-events-none z-50">
                    <VideoScrollHero 
                        videoSrc="/temp/0_Doctor_Patient_1280x672.mp4"
                        startScale={0.35}
                        maxScale={0.8}
                        className="pointer-events-auto"
                    />
                </div>
            </div>

            {/* SPACER - Adjusted to allow the 150vh animation to finish without overlap */}
            <div className="h-[100vh] pointer-events-none"></div>

            {/* Main Content Wrapper */}
            <div className="relative z-20 flex flex-col pb-12">
                
                {/* Our Story Section */}
                <div id="our-story">
                    <OurStorySection />
                </div>

                {/* Why We Exist Section */}
                <div id="why-we-exist">
                    <WhyWeExistSection />
                </div>

                {/* Our Point of View Section */}
                <div id="point-of-view">
                    <PointOfViewSection />
                </div>

                {/* How We Work Section */}
                <div id="how-we-work">
                    <HowWeWorkSection />
                </div>

                {/* Technology Section */}
                <div id="technology">
                    <RoleOfTechnologySection />
                </div>

                {/* Who We Help Section */}
                <div id="who-we-help">
                    <WhoWeHelpSection />
                </div>

                {/* Our Culture Section */}
                <div id="culture">
                    <CultureSection />
                </div>

                {/* Leadership Section */}
                <div id="leadership">
                    <LeadershipSection />
                </div>

                {/* Vision Mission Section */}
                <div id="vision-mission">
                    <VisionMissionSection />
                </div>

                {/* Final CTA Section */}
                <div id="contact">
                    <FinalCTASection />
                </div>
            </div>
        </Layout>
    );
}
