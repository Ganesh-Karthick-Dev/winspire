'use client';

import React, { useEffect, useRef } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    FaShieldAlt,
    FaBolt,
    FaChartLine,
    FaUsers
} from 'react-icons/fa';

const capabilities = [
    {
        id: 1,
        title: "Intelligent Governance",
        description: "The autonomous operating system for revenue cycle control.",
        icon: FaShieldAlt,
        status: "Level 01"
    },
    {
        id: 2,
        title: "Predictive Execution",
        description: "Moving from reactive management to pre-emptive action.",
        icon: FaBolt,
        status: "Level 02"
    },
    {
        id: 3,
        title: "Yield Optimization",
        description: "Capturing 100% of earned revenue with zero leakage.",
        icon: FaChartLine,
        status: "Level 03"
    },
    {
        id: 4,
        title: "Human Synergy",
        description: "Augmenting specialists with real-time algorithmic guidance.",
        icon: FaUsers,
        status: "Level 04"
    }
];

const NeuraCapabilitiesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const horizontalTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const section = sectionRef.current;
            const track = horizontalTrackRef.current;
            const container = triggerRef.current;

            if (!section || !track || !container) return;

            const ctx = gsap.context(() => {
                // Horizontal Slide + Pinning
                const trackWidth = track.scrollWidth;
                const windowWidth = window.innerWidth;
                const xMove = -(trackWidth - windowWidth + (windowWidth * 0.1));

                gsap.to(track, {
                    x: xMove,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: () => `+=${trackWidth}`,
                        pin: true,
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // Ensure layout sync after parent pinning shifts
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 150);
            }, section);

            return () => ctx.revert();
        };

        init();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div ref={triggerRef} className={styles.horizontalContainer}>
                <div ref={horizontalTrackRef} className={styles.horizontalTrack}>
                    {capabilities.map((cap) => (
                        <div key={cap.id} className={styles.card}>
                            <div className={styles.cardGlow} />
                            <div className={styles.cardNumber}>{cap.id.toString().padStart(2, '0')}</div>

                            <div className={styles.cardHeader}>
                                <div className={styles.iconWrapper}>
                                    <cap.icon size={32} />
                                </div>
                                <h3 className={styles.cardTitle}>{cap.title}</h3>
                            </div>

                            <div className={styles.cardBody}>
                                <p>{cap.description}</p>
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.statusIndicator}>
                                    <span className={styles.statusDot} />
                                    <span>{cap.status}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NeuraCapabilitiesSection;
