'use client';

import { useRef, useEffect } from 'react';
import styles from './MissionVision.module.css';

export default function MissionVision() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: gsap.Context;

        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Scroll-based color inversion
                gsap.to(sectionRef.current, {
                    backgroundColor: '#1a1a2e',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top center',
                        end: 'top top+=100px',
                        scrub: 1
                    }
                });

                // Text color inversion
                const allText = sectionRef.current?.querySelectorAll('h2, h3, p, span');
                if (allText) {
                    gsap.to(allText, {
                        color: '#ffffff',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top center',
                            end: 'top top+=100px',
                            scrub: 1
                        }
                    });
                }

                // Icon color inversion
                const icons = sectionRef.current?.querySelectorAll(`.${styles.featureIcon}`);
                if (icons) {
                    gsap.to(icons, {
                        color: '#ffffff',
                        borderColor: '#ffffff',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top center',
                            end: 'top top+=100px',
                            scrub: 1
                        }
                    });
                }
            }, sectionRef);
        };

        initAnimations();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.missionVisionSection}>
            <div className={styles.container}>
                {/* Mission Section */}
                <div className={styles.missionRow}>
                    <div className={styles.missionLeft}>
                        <h2 className={styles.sectionTitle}>OUR MISSION</h2>
                        <h3 className={styles.missionStatement}>
                            To Build the Most <span className={styles.underline}>Intelligent</span>,
                            <br />in Healthcare.
                        </h3>
                    </div>
                    <div className={styles.missionRight}>
                        <p className={styles.missionIntro}>
                            Our mission is to empower healthcare organizations with an RCM model that:
                        </p>
                        <div className={styles.featuresGrid}>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>⚠</div>
                                <p className={styles.featureText}>Predicts problems before they occur</p>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>⚠</div>
                                <p className={styles.featureText}>Reduces operational waste</p>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>⚠</div>
                                <p className={styles.featureText}>Accelerates financial performance</p>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>⚠</div>
                                <p className={styles.featureText}>Improves patient and provider experience</p>
                            </div>
                            <div className={styles.featureItem}>
                                <div className={styles.featureIcon}>⚠</div>
                                <p className={styles.featureText}>And delivers outcomes that can be trusted</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className={styles.visionSection}>
                    <h2 className={styles.sectionTitleRight}>OUR VISION</h2>
                    <h3 className={styles.visionStatement}>
                        To Become the World's Most Advanced
                        <br />AI-Enabled RCM Company and the
                        <br />Happiest Workplace in Healthcare.
                    </h3>
                </div>
            </div>
        </section>
    );
}
