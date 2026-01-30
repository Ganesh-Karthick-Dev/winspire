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
            "30–50% fewer avoidable denials",
            "2–3% higher liquidation on aged AR",
            "10–20% higher appeal overturn rates"
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
            "30–50% reduction in time spent per claim",
            "3–5 days faster resolution cycles",
            "5–10% fewer SLA misses"
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
            "1–2% improvement in net collections",
            "5–7 days earlier intervention on emerging issues"
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
            "10–15% productivity improvement",
            "20–30% reduction in repeat errors",
            "30–40% faster onboarding"
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
            "Lower attrition among top performers",
            "1–3% year-over-year efficiency gains"
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
                                            {outcome}
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
