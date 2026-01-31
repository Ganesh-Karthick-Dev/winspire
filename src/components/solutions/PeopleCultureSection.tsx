'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/PeopleCultureSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const MARQUEE_TEXTS = [
    'People and Culture Behind the Solutions',
    'This culture of ownership and innovation directly benefits our clients.',
];

const CARDS = [
    {
        id: '01',
        tag: 'SMAART HIRE',
        title: 'People and Culture Behind the Solutions',
        subtitle: 'Performance Delivered by the Right Teams',
        intro:
            'Even the strongest systems depend on the people who operate them. Through our AI-enabled SMAART HIRE framework, we consistently onboard top-tier RCM talent focused on:',
        bullets: [
            'Deep domain expertise',
            'Ownership and accountability',
            'Consistent quality at scale',
        ],
    },
    {
        id: '02',
        tag: 'Gratify AI',
        title: 'Recognition That Reflects Real Impact',
        subtitle: 'Our proprietary appreciation platform',
        intro: 'Gratify is our proprietary appreciation platform designed to recognize meaningful contribution, not just activity. It:',
        bullets: [
            'Celebrates impact created for clients and teams',
            'Recognizes quality, ownership, collaboration, innovation, and integrity',
            'Operates in real time with transparent recognition',
            'Encourages peer, leadership, and client-driven appreciation',
        ],
    },
    {
        id: '03',
        tag: 'Innovation Hub',
        title: 'Turning Ideas Into Measurable Progress',
        subtitle: 'Ideas from across the organization',
        intro: 'Our Innovation Hub captures, evaluates, and scales ideas from across the organization. It:',
        bullets: [
            'Empowers teams closest to the work',
            'Evaluates ideas based on efficiency, quality, and client value',
            'Converts strong ideas into trackable improvements',
            'Reinforces continuous improvement as a daily practice',
        ],
    },
];

const PeopleCultureSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const pinWrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const marqueeRailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const pinWrapper = pinWrapperRef.current;
        const track = trackRef.current;
        const marqueeRail = marqueeRailRef.current;

        if (!section || !pinWrapper || !track || !marqueeRail) return;

        const isMobile = window.innerWidth <= 768;

        const ctx = gsap.context(() => {
            if (isMobile) {
                // Mobile: stacked layout, simple scroll animations
                const marqueeItems = marqueeRail.querySelectorAll(`.${styles.marqueeItem}`);
                const cards = track.querySelectorAll(`.${styles.bentoCard}`);
                gsap.set(marqueeItems, { opacity: 0, y: 20 });
                gsap.set(cards, { opacity: 0, y: 30 });
                gsap.to(marqueeItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: marqueeRail,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                });
                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: cards.length ? cards[0] : track,
                        start: 'top 90%',
                        toggleActions: 'play none none none',
                    },
                });
                return;
            }

            const cards = track.querySelectorAll(`.${styles.bentoCard}`);
            const totalPanels = 4;
            const scrollDistance = (totalPanels - 1) * 100;
            const scrollEnd = '+=400%';

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: scrollEnd,
                pin: pinWrapper,
                pinSpacing: true,
            });

            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: scrollEnd,
                    scrub: 1.2,
                },
            });

            // Phase 1 (0-25%): Marquee scrolls - drive rail x
            const marqueeItems = marqueeRail.querySelectorAll(`.${styles.marqueeItem}`);
            const getRailWidth = () => {
                return Array.from(marqueeItems)
                    .slice(0, MARQUEE_TEXTS.length)
                    .reduce((sum, el) => sum + ((el as HTMLElement).offsetWidth || 0), 0);
            };
            const railWidth = getRailWidth() || 800;
            const padding = 30 * MARQUEE_TEXTS.length;

            mainTl.fromTo(
                marqueeRail,
                { x: 0 },
                {
                    x: -(railWidth + padding),
                    ease: 'none',
                    duration: 0.25,
                },
                0
            );

            // Phase 2 (25-100%): Horizontal track moves - one card per scroll segment
            mainTl.to(
                track,
                {
                    x: `-${scrollDistance}vw`,
                    ease: 'none',
                    duration: 0.75,
                },
                0.25
            );

            // Cards entrance: each card fades/slides in when its panel enters view
            cards.forEach((card, i) => {
                const panelStart = 0.25 + (i / 3) * 0.25;
                gsap.set(card, { opacity: 0, x: 60 });
                mainTl.to(
                    card,
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.12,
                        ease: 'power2.out',
                    },
                    panelStart
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.pinWrapper} ref={pinWrapperRef}>
                <div className={styles.horizontalTrack} ref={trackRef}>
                    {/* Panel 1: Marquee */}
                    <div className={styles.panel}>
                        <div className={styles.scrollingText}>
                            <div className={styles.marqueeRail} ref={marqueeRailRef}>
                                {[...MARQUEE_TEXTS, ...MARQUEE_TEXTS].map((text, i) => (
                                    <h4 key={i} className={styles.marqueeItem}>
                                        {text}
                                    </h4>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Panels 2-4: Cards - bento grid with blue shades */}
                    {CARDS.map((card, cardIndex) => (
                        <div key={card.id} className={styles.panel}>
                            <div className={styles.cardPanel}>
                                <div className={styles.bentoCard} data-card={cardIndex}>
                                    <span className={styles.cardNumber}>{card.id}</span>
                                    <div className={styles.cardBento}>
                                        <div className={`${styles.bentoCell} ${styles.cellTag} ${styles.blueLight} ${styles.textSm}`}>
                                            <span className={styles.cardTag}>{card.tag}</span>
                                        </div>
                                        <div className={`${styles.bentoCell} ${styles.cellTitle} ${styles.blueSlate} ${styles.textXl}`}>
                                            <h3 className={styles.cardTitle}>{card.title}</h3>
                                        </div>
                                        <div className={`${styles.bentoCell} ${styles.cellSubtitle} ${styles.blueMedium} ${styles.textMd}`}>
                                            <p className={styles.cardSubtitle}>{card.subtitle}</p>
                                        </div>
                                        <div className={`${styles.bentoCell} ${styles.cellIntro} ${styles.blueDark} ${styles.textMd}`}>
                                            <p className={styles.cardContent}>{card.intro}</p>
                                        </div>
                                        {card.bullets.map((bullet, idx) => {
                                            const shades = [styles.blueLight, styles.blueMedium, styles.blueSlate, styles.blueDark];
                                            const sizes = [styles.textLg, styles.textMd, styles.textSm, styles.textMd];
                                            return (
                                                <div
                                                    key={idx}
                                                    className={`${styles.bentoCell} ${styles.cellBullet} ${shades[idx % 4]} ${sizes[idx % 4]}`}
                                                >
                                                    <span className={styles.bulletDot} />
                                                    <span>{bullet}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PeopleCultureSection;
