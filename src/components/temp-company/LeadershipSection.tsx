'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/LeadershipSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CARD_WIDTH = 350;
const CARD_GAP = 30;
const AUTO_ADVANCE_MS = 4500;

const principles = [
    {
        title: 'Design before scaling',
        description: 'We believe in laying a robust foundation before rapid expansion. Every system is architected for future growth.',
        image: '/images/team/philip-leone.png'
    },
    {
        title: 'Solve root causes, not symptoms',
        description: 'Our approach digs deep to find the underlying issues, ensuring long-term solutions instead of quick fixes.',
        image: '/images/team/dan-schulte.png'
    },
    {
        title: 'Build systems that outlast individuals',
        description: 'Creating resilient processes and knowledge bases that ensure continuity and excellence regardless of personnel changes.',
        image: '/images/team/john-kostic.png'
    },
];

export default function LeadershipSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
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

    // Center the active slide: move track so active card's center aligns with container center
    // Only apply complex transform on desktop
    const effectiveWidth = containerWidth || 1400;
    const offset = effectiveWidth / 2 - (activeIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2);

    // On mobile, we disable the track translation and let CSS stack them
    const trackStyle = isMobile ? {} : {
        transform: `translateX(${offset}px)`,
        transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        width: 'max-content',
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
                    <p className={styles.description}>
                        Experience informs our decisions. Discipline guides our execution. Integrity anchors everything we do.
                    </p>
                </div>
            </div>

            <div
                ref={containerRef}
                className={styles.carouselContainer}
                style={{ overflow: 'hidden' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous">
                    <ArrowLeft size={24} />
                </button>

                <div className={styles.carouselTrack} style={trackStyle}>
                    {principles.map((p, i) => (
                        <div
                            key={i}
                            className={`${styles.card} ${i === activeIndex ? styles.activeCard : ''}`}
                            style={{ opacity: i === activeIndex ? 1 : 0.5, transform: i === activeIndex ? 'scale(1)' : 'scale(0.9)' }}
                        >
                            <div className={styles.cardImageContainer}>
                                <img src={p.image} alt={p.title} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{p.title}</h3>
                                <p className={styles.cardText}>{p.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next">
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
}
