import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './NeuraEfficiencySection.module.css';

const NeuraEfficiencySection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        const bg = bgRef.current;

        if (!section || !bg) return;

        // ELITE Parallax: Upward Sweep + Follow-Lag
        const ctx = gsap.context(() => {
            gsap.to(bg, {
                yPercent: -33.3, // Moves the 150% height container UP
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5, // Cinematic follow-lag
                    invalidateOnRefresh: true,
                }
            });

            // Refresh to ensure layout height from pinned sections is accounted for
            ScrollTrigger.refresh();
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="How Neura Creates Measurable Efficiency"
        >
            {/* Parallax Background */}
            <div ref={bgRef} className={styles.parallaxBg}>
                <Image
                    src="/images/neura/cta-bg.jpg"
                    alt="Neura Efficiency Design"
                    fill
                    className={styles.bgImage}
                    style={{ objectPosition: 'bottom' }}
                    priority
                    unoptimized
                />
                <div className={styles.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    How Neura Creates Measurable Efficiency
                </h2>

                <div className={styles.description}>
                    <p>Efficiency does not come from effort.</p>
                    <p>It comes from design.</p>
                </div>

                <div className={styles.accent}>
                    Neura drives performance through five system-level capabilities.
                </div>
            </div>
        </section>
    );
};

export default NeuraEfficiencySection;
