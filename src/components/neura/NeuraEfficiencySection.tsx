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

        // Extreme parallax effect using GSAP
        const ctx = gsap.context(() => {
            gsap.to(bg, {
                y: '40%', // Increased for much more noticeable shift
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                    invalidateOnRefresh: true,
                }
            });
        }, section);

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
                    src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop"
                    alt="Neural Efficiency Background"
                    fill
                    className={styles.bgImage}
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
