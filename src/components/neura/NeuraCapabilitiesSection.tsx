'use client';

import React, { useEffect, useRef } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    FaShieldAlt,
    FaBolt,
    FaChartLine,
    FaUsers,
    FaHeart,
    FaCheck
} from 'react-icons/fa';

interface Feature {
    title: string;
    details: string[];
    impact: string;
    icon: React.ElementType;
}

interface CapabilityLayer {
    id: number;
    title: string;
    description: string;
    features: Feature[];
}

const capabilitiesData: CapabilityLayer[] = [
    {
        id: 1,
        title: "Revenue Protection & Yield Improvement",
        description: "Stop preventable leakage before it happens",
        features: [
            {
                title: "What changes",
                details: [
                    "Denials are predicted before submission",
                    "Collectible AR is separated from dead inventory in real time",
                    "Appeals follow payer-specific logic, not guesswork"
                ],
                impact: "30–50% fewer avoidable denials, 2–3% higher liquidation on aged AR, 10–20% higher appeal overturn rates",
                icon: FaShieldAlt
            }
        ]
    },
    {
        id: 2,
        title: "Speed, Throughput & Operational Efficiency",
        description: "Do more with the same effort — or less",
        features: [
            {
                title: "What changes",
                details: [
                    "Instant claim status, eligibility, and authorization checks across 1,300+ payers",
                    "Work auto-prioritized by urgency and financial impact",
                    "Escalations triggered before SLAs are missed"
                ],
                impact: "30–50% less time spent per claim, 3–5 days faster resolution cycles, 5–10% fewer SLA misses",
                icon: FaBolt
            }
        ]
    },
    {
        id: 3,
        title: "Leadership Visibility & Control",
        description: "No more surprises at month-end",
        features: [
            {
                title: "What changes",
                details: [
                    "Real-time AR health and payer risk signals",
                    "Live dashboards with drill-down, not lagging reports"
                ],
                impact: "1–2% improvement in net collections, 5–7 days earlier intervention on emerging risks",
                icon: FaChartLine
            }
        ]
    },
    {
        id: 4,
        title: "People Performance & Quality at Scale",
        description: "Turn effort into consistent outcomes",
        features: [
            {
                title: "What changes",
                details: [
                    "Unified productivity and quality scorecards",
                    "Automated error tagging with severity tracking",
                    "AI-led onboarding and continuous role-based learning"
                ],
                impact: "10–15% productivity lift, 20–30% fewer repeat errors, 30–40% faster onboarding",
                icon: FaUsers
            }
        ]
    },
    {
        id: 5,
        title: "Culture, Alignment & Continuous Improvement",
        description: "Sustain performance without burnout",
        features: [
            {
                title: "What changes",
                details: [
                    "Recognition tied to real impact, not activity",
                    "Ideas move from submission to execution through a structured system"
                ],
                impact: "Lower attrition among top performers, 1–3% year-over-year efficiency gains",
                icon: FaHeart
            }
        ]
    }
];

// Outcome text for each layer
const outcomes: Record<number, string> = {
    1: "Revenue is protected upstream, not chased downstream.",
    2: "Time shifts from information collection to intelligent action.",
    3: "Leaders guide execution instead of reacting to results.",
    4: "Performance scales without burnout or dependency on individuals.",
    5: "Improvement becomes continuous, not episodic."
};

const NeuraCapabilitiesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Animate Section Header
            gsap.fromTo(
                `.${styles.sectionHeader}`,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate each layer row
            const rows = document.querySelectorAll(`.${styles.layerRow}`);
            rows.forEach((row) => {
                gsap.fromTo(
                    row,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: row,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        };

        initAnimations();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Section Header */}
            <div className={styles.sectionHeader}>
                <span className={styles.label}>Where the Efficiency Actually Comes From</span>
                <h2 className={styles.title}>Efficiency doesn't come from working harder.<br />It comes from designing the system right.</h2>
            </div>

            {/* Capabilities Container */}
            <div className={styles.capabilitiesContainer}>
                {capabilitiesData.map((layer) => (
                    <div key={layer.id} className={styles.layerRow}>
                        {/* Left Column - Sticky */}
                        <div className={styles.leftColumn}>
                            <span className={styles.layerNumber}>{layer.id.toString().padStart(2, '0')}</span>
                            <h3 className={styles.layerTitle}>{layer.title}</h3>
                            <p className={styles.layerDescription}>{layer.description}</p>
                        </div>

                        {/* Right Column - Scrolling Features */}
                        <div className={styles.rightColumn}>
                            {layer.features.map((feature, index) => (
                                <div key={index} className={styles.featureBlock}>
                                    <div className={styles.featureHeader}>
                                        <div className={styles.featureIcon}>
                                            <feature.icon />
                                        </div>
                                        <h4 className={styles.featureTitle}>{feature.title}</h4>
                                    </div>
                                    <ul className={styles.featureList}>
                                        {feature.details.map((detail, i) => (
                                            <li key={i} className={styles.featureItem}>
                                                <span className={styles.checkIcon}><FaCheck /></span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={styles.impactBox}>
                                        <span className={styles.impactLabel}>What it delivers</span>
                                        <p className={styles.impactText}>{feature.impact}</p>
                                    </div>
                                    <div className={styles.outcomeBox}>
                                        <span className={styles.outcomeLabel}>Outcome</span>
                                        <p className={styles.outcomeText}>{outcomes[layer.id]}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NeuraCapabilitiesSection;
