'use client';

import React, { useEffect, useRef } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    FaShieldAlt,
    FaBolt,
    FaChartLine,
    FaUsers,
    FaCogs
} from 'react-icons/fa';

const capabilities = [
    {
        id: 1,
        title: "Revenue Protection and Yield Improvement",
        description: "Neura shifts revenue protection upstream. It predicts risk before claims are submitted, separates collectible AR from dead inventory in real time, and applies payer-specific logic to appeals.",
        outcomes: [
            { text: "30–50% fewer avoidable denials", min: 30, max: 50 },
            { text: "2–3% higher liquidation on aged AR", min: 2, max: 3 },
            { text: "10–20% higher appeal overturn rates", min: 10, max: 20 }
        ],
        takeaway: "Revenue is protected early instead of chased late.",
        icon: FaShieldAlt,
        level: "Level 01"
    },
    {
        id: 2,
        title: "Speed, Throughput, and Operational Efficiency",
        description: "Neura eliminates time lost to searching, logging in, and waiting. With live connectivity to over 1,300 payers, it automates eligibility, authorization, and claim status checks while prioritizing work by urgency and financial impact.",
        outcomes: [
            { text: "30–50% reduction in time spent per claim", min: 30, max: 50 },
            { text: "3–5 days faster resolution cycles", min: 3, max: 5 },
            { text: "5–10% fewer SLA misses", min: 5, max: 10 }
        ],
        takeaway: "Time shifts from information gathering to intelligent action.",
        icon: FaBolt,
        level: "Level 02"
    },
    {
        id: 3,
        title: "Leadership Visibility and Control",
        description: "Neura replaces lagging reports with live operational insight. Leaders gain real-time visibility into AR health, payer risk, and performance drivers with the ability to intervene early.",
        outcomes: [
            { text: "1–2% improvement in net collections", min: 1, max: 2 },
            { text: "5–7 days earlier intervention on emerging issues", min: 5, max: 7 }
        ],
        takeaway: "Leadership moves from reacting to guiding execution.",
        icon: FaChartLine,
        level: "Level 03"
    },
    {
        id: 4,
        title: "People Performance and Quality at Scale",
        description: "Neura turns individual effort into consistent performance. It unifies productivity and quality metrics, automates error tracking, and accelerates onboarding through role-based intelligence.",
        outcomes: [
            { text: "10–15% productivity improvement", min: 10, max: 15 },
            { text: "20–30% reduction in repeat errors", min: 20, max: 30 },
            { text: "30–40% faster onboarding", min: 30, max: 40 }
        ],
        takeaway: "Performance scales without burnout or dependency on individuals.",
        icon: FaUsers,
        level: "Level 04"
    },
    {
        id: 5,
        title: "Culture, Alignment, and Continuous Improvement",
        description: "Sustainable performance requires more than metrics. Neura embeds recognition, learning, and improvement into daily execution so progress does not depend on periodic initiatives.",
        outcomes: [
            { text: "Lower attrition among top performers", min: 5, max: 5 },
            { text: "1–3% year-over-year efficiency gains", min: 1, max: 3 }
        ],
        takeaway: "Improvement becomes continuous, not episodic.",
        icon: FaCogs,
        level: "Level 05"
    }
];

const NeuraCapabilitiesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const horizontalTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const init = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const section = sectionRef.current;
            const track = horizontalTrackRef.current;

            if (!section || !track) return;

            const ctx = gsap.context(() => {
                const trackWidth = track.scrollWidth;
                const windowWidth = window.innerWidth;
                const xMove = -(trackWidth - windowWidth + (windowWidth * 0.15));

                const horizontalTween = gsap.to(track, {
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

                // Animate bars as they come into view
                gsap.utils.toArray<HTMLElement>(`.${styles.barBase}`).forEach((bar) => {
                    gsap.fromTo(bar,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.2,
                            ease: "power3.out",
                            transformOrigin: "left center",
                            scrollTrigger: {
                                trigger: bar,
                                containerAnimation: horizontalTween, // Correctly reference the tween
                                start: "left 85%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                });

                gsap.utils.toArray<HTMLElement>(`.${styles.barHighlight}`).forEach((bar) => {
                    gsap.fromTo(bar,
                        { scaleX: 0 },
                        {
                            scaleX: 1,
                            duration: 1.2,
                            delay: 0.2,
                            ease: "power3.out",
                            transformOrigin: "left center",
                            scrollTrigger: {
                                trigger: bar,
                                containerAnimation: horizontalTween, // Correctly reference the tween
                                start: "left 85%",
                                toggleActions: "play none none none"
                            }
                        }
                    );
                });

                // Intensive layout refresh to handle cascading pins above
                setTimeout(() => {
                    ScrollTrigger.refresh();
                }, 500);
            }, section);

            return () => ctx.revert();
        };

        init();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.horizontalContainer}>
                <div ref={horizontalTrackRef} className={styles.horizontalTrack}>
                    {capabilities.map((cap) => (
                        <div key={cap.id} className={styles.card}>
                            <div className={styles.cardGlow} />

                            <div className={styles.cardHeader}>
                                <h3 className={styles.cardTitle}>{cap.title}</h3>
                                <p className={styles.cardDescription}>{cap.description}</p>
                            </div>

                            <div className={styles.outcomesWrapper}>
                                <div className={styles.labelWrapper}>
                                    <span className={styles.cardLabel}>Impact:</span>
                                </div>
                                <div className={styles.outcomesList}>
                                    {cap.outcomes.map((outcome, i) => (
                                        <div key={i} className={styles.outcomeItem}>
                                            <div className={styles.barBase} style={{ width: `${outcome.min}%` }} />
                                            <div className={styles.barHighlight} style={{ left: `${outcome.min}%`, width: `${outcome.max - outcome.min}%` }} />
                                            <div className={styles.outcomeText}>{outcome.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.cardTakeaway}>
                                {cap.takeaway}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NeuraCapabilitiesSection;
