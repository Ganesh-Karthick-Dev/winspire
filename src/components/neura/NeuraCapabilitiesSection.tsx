'use client';

import React, { useState } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    FaShieldAlt,
    FaBolt,
    FaUsers,
    FaChartLine,
    FaCogs
} from 'react-icons/fa';

const capabilities = [
    {
        id: 1,
        title: "Revenue Protection and Yield Improvement",
        description: "Neura shifts revenue protection upstream. It predicts risk before claims are submitted.",
        outcomes: [
            { text: "30–50% fewer avoidable denials", min: 30, max: 50 },
            { text: "2–3% higher liquidation on aged AR", min: 2, max: 3 },
            { text: "10–20% higher appeal overturn rates", min: 10, max: 20 }
        ],
        takeaway: "Revenue is protected early instead of chased late.",
        icon: FaShieldAlt,
        level: "Level 01",
        colorClass: styles.cardBlue,
        image: "/temp/revenue_abstract.png"
    },
    {
        id: 2,
        title: "Speed, Throughput, and Operational Efficiency",
        description: "Neura eliminates time lost searching and waiting. Automated checks prioritize work by urgency.",
        outcomes: [
            { text: "30–50% reduction in time/claim", min: 30, max: 50 },
            { text: "3–5 days faster resolution", min: 3, max: 5 },
            { text: "5–10% fewer SLA misses", min: 5, max: 10 }
        ],
        takeaway: "Time shifts from gathering to action.",
        icon: FaBolt,
        level: "Level 02",
        colorClass: styles.cardPink,
        image: "/temp/speed_abstract.png"
    },
    {
        id: 4,
        title: "People Performance and Quality at Scale",
        description: "Neura turns individual effort into consistent performance, unifying productivity and quality.",
        outcomes: [
            { text: "10–15% productivity gain", min: 10, max: 15 },
            { text: "20–30% error reduction", min: 20, max: 30 },
            { text: "30–40% faster onboarding", min: 30, max: 40 }
        ],
        takeaway: "Performance scales without burnout.",
        icon: FaUsers,
        level: "Level 03",
        colorClass: styles.cardPurple,
        image: "/temp/people_abstract.png"
    }
];

const secondaryCapabilities = [
    {
        id: 3,
        title: "Leadership Visibility and Control",
        description: "Neura replaces lagging reports with live operational insight.",
        outcomes: [
            { text: "1–2% net collections improvement" },
            { text: "5–7 days earlier intervention" }
        ],
        takeaway: "Reacting → Guiding",
        icon: FaChartLine,
        level: "Level 03"
    },
    {
        id: 5,
        title: "Culture, Alignment, and Continuous Improvement",
        description: "Neura embeds recognition, learning, and improvement into daily execution.",
        outcomes: [
            { text: "Lower attrition (top performers)" },
            { text: "1–3% efficiency gains YoY" }
        ],
        takeaway: "Episodic → Continuous",
        icon: FaCogs,
        level: "Level 05"
    }
];

const NeuraCapabilitiesSection: React.FC = () => {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section className={styles.section}>
            {/* Main Primary Capabilities (Flex Expand) */}
            <div className={styles.container}>
                {capabilities.map((cap) => (
                    <div
                        key={cap.id}
                        className={`${styles.card} ${cap.colorClass} ${hoveredId === cap.id ? styles.expanded : ''} ${hoveredId !== null && hoveredId !== cap.id ? styles.collapsed : ''}`}
                        onMouseEnter={() => setHoveredId(cap.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}>
                                <cap.icon className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitle}>{cap.title}</h3>
                            
                            <div className={styles.details}>
                                <div className={styles.detailsInner}>
                                    <p className={styles.cardDescription}>{cap.description}</p>
                                    <div className={styles.outcomesWrapper}>
                                        {cap.outcomes.map((outcome, i) => (
                                            <div key={i} className={styles.outcomeItem}>
                                                <div className={styles.dot} />
                                                <span>{outcome.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.cardTakeaway}>{cap.takeaway}</div>
                                </div>
                            </div>

                            <div className={styles.mobileCta}>
                                <span>Read More</span>
                            </div>
                        </div>
                        
                        <div className={styles.imageOverlay} />
                        <img src={cap.image} alt={cap.title} className={styles.cardImage} />
                    </div>
                ))}
            </div>

            {/* Secondary Capabilities (Weather Card Design) */}
            <div className={styles.secondaryContainer}>
                {secondaryCapabilities.map((cap) => (
                    <div key={cap.id} className={styles.cardm}>
                        {/* Top Card: Icon + Description - Slides UP */}
                        <div className={styles.cardTop}>
                            <div className={styles.weatherIcon}>
                                <cap.icon />
                            </div>
                            <div className={styles.weatherDesc}>
                                {cap.description}
                            </div>
                        </div>

                        {/* Center Card: Title & Level - Stays (Anchor) */}
                        <div className={styles.cardCenter}>
                            <div className={styles.mainTitle}>{cap.title}</div>
                            <div className={styles.subTitle}>{cap.level}</div>
                        </div>

                        {/* Bottom Card: Stats & Takeaway - Slides DOWN */}
                        <div className={styles.cardBottom}>
                            <div className={styles.outcomesBox}>
                                {cap.outcomes.map((outcome, i) => (
                                    <div key={i} className={styles.statItem}>
                                        <FaBolt size={10} color="#2563eb" />
                                        <span>{outcome.text}</span>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.cardTakeawayBar}>
                                {cap.takeaway}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NeuraCapabilitiesSection;
