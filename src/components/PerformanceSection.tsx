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
    const pathRef = useRef<SVGPathElement>(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const [orbProgress, setOrbProgress] = useState(0); // 0 = start, 1 = end (top of CTA)
    const [orbPosition, setOrbPosition] = useState({ x: 50, y: 0 }); // % position along path
    const [activeGlowCard, setActiveGlowCard] = useState(-1); // Which card (0-3) should glow, -1 = none
    const [ctaActivated, setCtaActivated] = useState(false); // True when orb reaches CTA

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

            // Orb movement - starts near end of text slides, ends at line end
            const orbStartScroll = vh * 1.2; // When orb starts (near line origin)
            const orbEndScroll = section.offsetHeight - 585 - vh * 0.3; // Smaller offset - orb travels longer

            if (scrolledInto > orbStartScroll) {
                const orbScrollRange = orbEndScroll - orbStartScroll;
                const orbScrolled = scrolledInto - orbStartScroll;
                const progress = Math.max(0, Math.min(1.1, orbScrolled / orbScrollRange));
                setOrbProgress(progress);

                // Calculate orb position along the curved path
                const path = pathRef.current;
                if (path) {
                    const pathLength = path.getTotalLength();
                    const point = path.getPointAtLength(progress * pathLength); // Full path length
                    // Convert SVG coordinates (0-400 x, 0-1200 y) to percentages
                    setOrbPosition({
                        x: (point.x / 400) * 100,
                        y: (point.y / 1200) * 100
                    });

                    // Determine which card should glow based on orb Y position
                    // Using Y position instead of progress for accurate detection
                    const yPos = (point.y / 1200) * 100; // Current Y as percentage
                    if (yPos >= 28 && yPos < 38) {
                        setActiveGlowCard(0); // First card (PHISHING - right) - orb at y 28-38%
                    } else if (yPos >= 52 && yPos < 62) {
                        setActiveGlowCard(1); // Second card (CREDENTIALS - left) - orb at y 52-62%
                    } else if (yPos >= 78 && yPos < 100) {
                        setActiveGlowCard(2); // Third card (INTELLIGENCE - right) - orb at y 65-100%
                    } else {
                        setActiveGlowCard(-1); // No glow
                    }

                    // Activate CTA effects when orb reaches end
                    setCtaActivated(progress >= 1.0);
                }
            } else {
                setOrbProgress(0);
                setOrbPosition({ x: 50, y: 0 }); // Reset to top center
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="performance" className={styles.section}>

            {/* DEBUG DISPLAY */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                background: 'rgba(0,0,0,0.9)',
                color: '#0f0',
                padding: '10px',
                zIndex: 1000,
                fontFamily: 'monospace',
                fontSize: '12px'
            }}>
                orbProgress: {orbProgress.toFixed(4)} | yPos: {orbPosition.y.toFixed(2)}% | glowCard: {activeGlowCard}
            </div>

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


            {/* Snake Wave Line - subtle curves below each card */}
            <svg
                className={styles.snakePath}
                viewBox="0 0 400 1200"
                preserveAspectRatio="none"
            >
                <path
                    ref={pathRef}
                    id="snakePathLine"
                    d="M 200 0 
                       L 200 200
                       C 200 250, 280 300, 280 400
                       C 280 550, 100 600, 100 700
                       C 100 800, 280 850, 280 950
                       C 280 1050, 200 1100, 200 1200"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                />
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="10%" stopColor="rgba(255,255,255,0.3)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Orb - follows curved path, hides at orbProgress 0.92 */}
            <div
                className={styles.orb}
                style={{
                    left: `${orbPosition.x}%`,
                    top: `calc(200vh + (100% - 200vh - 585px) * ${orbPosition.y / 100})`,
                    opacity: orbProgress > 0 && orbProgress < 1.1 ? Math.min(1, orbProgress * 3) : 0,
                }}
            ></div>

            {/* Phase 2: Static Feature List */}
            <div className={styles.featureList}>
                {features.map((feature, index) => (
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
                            <div className={`${styles.mockupCard} ${activeGlowCard === index ? (feature.align === 'left' ? styles.mockupCardGlowLeft : styles.mockupCardGlowRight) : ''}`}>
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
                <div className={`${styles.ctaCard} ${ctaActivated ? styles.ctaCardActivated : ''}`}>
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

                    <button className={`${styles.ctaButton} ${ctaActivated ? styles.ctaButtonActivated : ''}`}>
                        Learn more about Baits
                    </button>
                </div>
            </div>

        </section>
    );
}
