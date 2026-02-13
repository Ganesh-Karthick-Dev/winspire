'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/LeadershipSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AUTO_ADVANCE_MS = 4500;

const principles = [
    {
        title: 'One IDEA at a time. One ACTION at a time. One DAY at a time.',
        description: 'Small steps and disciplined progress compound into momentum. Consistency is the engine of transformation — not perfection, not overnight breakthroughs. This mindset fuels meaningful change when teams show up every day with curiosity and belief.',
        image: '/company/design before our scale.webp'
    },
    {
        title: 'Rural Hospitals Struggle with Staffing Shortages Amid $50B Funding',
        description: '$50B is coming to rural healthcare, yet staffing shortages remain the #1 operational failure point. The difference isn’t more money — it’s structure, clarity, measurable workflows, and strategy. The right design brings measurable stability in just 90 days.',
        image: '/temp/656934.jpg'
    },
    {
        title: 'Silent denials: The hidden pandemic in RCM. How Neura AI can help.',
        description: 'Silent denials aren’t delays — they are algorithmic denials without codes, quietly draining revenue. Detecting and acting on these early with AI keeps AR under control and improves collections.',
        image: '/company/Build systems that outlast individuals.webp'
    },
    {
        title: 'Neura AI Boosts Collections by 30% in 90 Days.',
        description: '30% better collections in under 3 months — no system replacement needed. A self-learning revenue cycle platform spots revenue leakage, automates workflows, and drives outcomes with real-time insights and smarter follow-ups. This isn’t another dashboard — it’s a performance engine that accelerates results and minimizes dollars left uncollected.',
        image: '/company/design before our scale.webp'
    },
    {
        title: 'How Neura AI’s Intelligence Layer Helps RCM Leaders See Clearly',
        description: 'Most RCM systems aren’t broken — they’re blind. Without real-time visibility into denials, leakage, and performance, teams make decisions based on lagging spreadsheets. Neura AI’s intelligence layer tracks performance across the full cycle, identifies revenue loss early, and transforms reactive processes into proactive execution. Visibility isn’t optional — it’s foundational to sustained revenue health.',
        image: '/temp/656934.jpg'
    },
];

export default function LeadershipSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const [containerWidth, setContainerWidth] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % principles.length);
    }, []);

    const prevSlide = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + principles.length) % principles.length);
    }, []);

    // Measure container for center-aligned transform
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        const ro = new ResizeObserver(updateWidth);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener('resize', updateWidth);
        return () => {
            ro.disconnect();
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    // Auto-advance carousel
    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(nextSlide, AUTO_ADVANCE_MS);
        return () => clearInterval(id);
    }, [isPaused, nextSlide]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    

    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 1400;
    const CARD_WIDTH = isMobile ? currentWidth - 40 : 380;
    const CARD_GAP = isMobile ? 32 : 40;
    const effectiveWidth = containerWidth || currentWidth;

    // Center the active slide - Desktop Only
    const offset = effectiveWidth / 2 - (activeIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2);

    const trackStyle = isMobile ? {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: `${CARD_GAP}px`,
        width: '100%',
        alignItems: 'center'
    } : {
        transform: `translateX(${offset}px)`,
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        width: 'max-content',
        display: 'flex',
        gap: `${CARD_GAP}px`,
    };

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.titleWrapper}>
                <span className={styles.label}>Leadership</span>
                <h2 className={styles.mainTitle}>
                    Experience that <br />
                    <em>Shapes Decisions</em>
                </h2>
                <div className="space-y-4 text-center">
                    <p className={styles.description}>
                        Winspire is led by professionals who have built, managed, and transformed revenue cycles across diverse healthcare environments.
                    </p>
                </div>
            </div>

            <div
                ref={containerRef}
                className={styles.carouselContainer}
                style={{ 
                    overflow: isMobile ? 'visible' : 'visible', 
                    maxWidth: '1400px',
                    display: isMobile ? 'block' : 'flex'
                }}
                onMouseEnter={() => !isMobile && setIsPaused(true)}
                onMouseLeave={() => !isMobile && setIsPaused(false)}
            >
                {!isMobile && (
                    <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous">
                        <ArrowLeft size={24} />
                    </button>
                )}

                <div className={styles.carouselTrack} style={trackStyle}>
                    {principles.map((p, i) => {
                        const isPrev = (i === (activeIndex - 1 + principles.length) % principles.length);
                        const isNext = (i === (activeIndex + 1) % principles.length);
                        const isActive = i === activeIndex;
                        
                        let opacity = 1;
                        let scale = 1;
                        
                        if (!isMobile) {
                            opacity = 0.3;
                            scale = 0.85;
                            if (isActive) {
                                opacity = 1;
                                scale = 1;
                            } else if (isPrev || isNext) {
                                opacity = 0.7;
                                scale = 0.95;
                            }
                        }

                        return (
                            <div
                                key={i}
                                className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                                style={{ 
                                    opacity, 
                                    transform: isMobile ? 'none' : `scale(${scale})`,
                                    transition: isMobile ? 'none' : 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
                                    flex: isMobile ? '0 0 auto' : `0 0 ${CARD_WIDTH}px`,
                                    width: isMobile ? '100%' : `${CARD_WIDTH}px`,
                                    maxWidth: isMobile ? '500px' : 'none'
                                }}
                            >
                                <div className={styles.cardImageContainer}>
                                    <img src={p.image} alt={p.title} className={styles.cardImage} />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{p.title}</h3>
                                    <p className={styles.cardText}>{p.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {!isMobile && (
                    <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next">
                        <ArrowRight size={24} />
                    </button>
                )}
            </div>
        </section>
    );
}
