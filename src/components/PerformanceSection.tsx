'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/PerformanceSection.module.css';

// Text slides data
const slides = [
    {
        id: 1,
        text: "After decades of manual revenue cycle management, one thing hasn't changed: collections remain unpredictable.",
        isGlow: false,
    },
    {
        id: 2,
        text: "It's time for AI-powered intelligence.",
        isGlow: true,
    },
];

// Feature cards data
import { RiShieldCheckLine, RiCheckDoubleLine, RiDashboardLine } from 'react-icons/ri';

const features = [
    {
        id: 1,
        icon: RiShieldCheckLine,
        title: "Phishing as a defense",
        description: "MokN Baits are defensive phishing pages that lure attackers into revealing compromised credentials before they're used.",
        mockupType: "phishing",
        align: "right",
    },
    {
        id: 2,
        icon: RiCheckDoubleLine,
        title: "Only valid credentials",
        description: "Millions of credentials may be tested. Our Baits filter the noise and alert only when valid ones are used against your systems.",
        mockupType: "credentials",
        align: "left",
    },
    {
        id: 3,
        icon: RiDashboardLine,
        title: "Tailored Threat intelligence",
        description: "Monitor real attacker activity targeting your environment. No generic feeds, only insights tied to your users, systems, and domains.",
        mockupType: "intelligence",
        align: "right",
    },
];

export default function PerformanceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [orbProgress, setOrbProgress] = useState(0); // 0 = start, 1 = end (top of CTA)

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            // We only care about the intro track for text switching
            // CSS defines introScrollTrack as 250vh.
            const rect = section.getBoundingClientRect();
            const vh = window.innerHeight;
            // Intro is the first 2.5 windows
            const introHeight = vh * 2.5;
            const scrolledInto = -rect.top;

            // Text transition logic
            if (scrolledInto >= 0 && scrolledInto < introHeight) {
                const progress = scrolledInto / (introHeight - vh);
                const slideIndex = Math.min(Math.floor(progress * slides.length), slides.length - 1);
                setActiveSlide(slideIndex);
            }

            // Orb movement logic - starts after intro, ends at CTA top
            // The line starts at 200vh (top) and ends ~585px before section end
            const orbStartScroll = vh * 2; // When orb starts moving (200vh into section)
            const orbEndScroll = section.offsetHeight - 585; // When orb stops (top of CTA)

            if (scrolledInto > orbStartScroll) {
                const orbScrollRange = orbEndScroll - orbStartScroll;
                const orbScrolled = scrolledInto - orbStartScroll;
                const progress = Math.max(0, Math.min(1, orbScrolled / orbScrollRange));
                setOrbProgress(progress);
            } else {
                setOrbProgress(0);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="performance" className={styles.section}>

            {/* Phase 1: Sticky Intro Track (250vh) */}
            <div className={styles.introScrollTrack}>
                <div className={styles.stickyContainer}>
                    <div className={styles.glowBackground} />
                    <div className={styles.textContainer}>
                        <div className={styles.slidesWrapper}>
                            {slides.map((slide, index) => (
                                <div
                                    key={slide.id}
                                    className={`${styles.textSlide} ${index === activeSlide ? styles.active : ''}`}
                                >
                                    <p className={`${styles.slideText} ${slide.isGlow ? styles.glow : ''}`}>
                                        {slide.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Vertical Center Line - connects intro to CTA */}
            <div className={styles.centerLine}></div>

            {/* Traveling Orb - fixed in viewport center, fades in/out with scroll */}
            <div
                className={styles.orb}
                style={{
                    opacity: orbProgress > 0 && orbProgress < 1 ? Math.min(1, orbProgress * 3) : 0,
                }}
            ></div>

            {/* Phase 2: Static Feature List */}
            <div className={styles.featureList}>
                {features.map((feature) => (
                    <div key={feature.id} className={`${styles.featureRow} ${feature.align === 'left' ? styles.rowReverse : ''}`}>
                        {/* Text Side */}
                        <div className={styles.featureTextCol}>
                            <div className={styles.featureIconBox}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className={styles.featureTitle}>{feature.title}</h3>
                            <p className={styles.featureDescription}>{feature.description}</p>
                        </div>

                        {/* Visual Side */}
                        <div className={styles.featureVisualCol}>
                            {/* Simple Placeholder for 3D Card */}
                            <div className={styles.mockupCard}>
                                <div className={styles.mockupHeader}>
                                    <span className={styles.dot}></span>
                                    <span className={styles.dot}></span>
                                    <span className={styles.dot}></span>
                                </div>
                                <div className={styles.mockupBody}>
                                    <div className={styles.mockupLabel}>{feature.mockupType}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Footer CTA - Frosty Glass Card Layout */}
            <div className={styles.staticFooter}>
                <div className={styles.ctaCard}>
                    {/* Corner Accents */}
                    <div className={`${styles.corner} ${styles.tl}`}></div>
                    <div className={`${styles.corner} ${styles.tr}`}></div>
                    <div className={`${styles.corner} ${styles.bl}`}></div>
                    <div className={`${styles.corner} ${styles.br}`}></div>

                    <h2 className={styles.footerTitle}>
                        3 minutes to implement<br />
                        <span className={styles.glowText}>your First Baits.</span>
                    </h2>

                    <p className={styles.footerSub}>
                        No setup friction. No integration delays.<br />
                        Go from zero to live detection in minutes.
                    </p>

                    <button className={styles.ctaButton}>
                        Learn more about Baits
                    </button>
                </div>
            </div>

        </section>
    );
}
