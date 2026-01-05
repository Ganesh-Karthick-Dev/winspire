'use client';

import React, { useEffect, useRef } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    FaChartLine,
    FaNetworkWired,
    FaRobot,
    FaBolt,
    FaUsers,
    FaUserCheck,
    FaGraduationCap,
    FaTrophy,
    FaShieldAlt,
    FaExclamationTriangle,
    FaLightbulb,
    FaHandshake,
    FaCogs,
    FaGlobeAmericas,
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
        title: "Intelligent Revenue Operations Layer",
        description: "Neura AI replaces fragmented tools with a single, intelligent operating layer for the entire RCM chain.",
        features: [
            {
                title: "Liquidation Intelligence",
                details: [
                    "Predictive collectible revenue across aging buckets",
                    "Real-time denial breakdown by severity and recoverability",
                    "Forecasting models for expected cash acceleration"
                ],
                impact: "Faster collections, zero leakage, higher predictability.",
                icon: FaChartLine
            },
            {
                title: "AI Work Allocation & Load Balancing",
                details: [
                    "Auto-allocation of tasks based on volume bursts",
                    "Intelligent reprioritization to meet SLAs",
                    "Real-time load balancing across teams, shifts, time zones"
                ],
                impact: "No idle time, SLA compliance becomes automatic.",
                icon: FaNetworkWired
            },
            {
                title: "Denial Prediction Engine",
                details: [
                    "Machine learning models interpret payer patterns",
                    "Predicts denials before submission",
                    "One-click resolution insights"
                ],
                impact: "Higher first-pass yield, exponentially lower rework.",
                icon: FaRobot
            },
            {
                title: "Instant Payer Connectivity",
                details: [
                    "Integration with 1,300+ payers",
                    "Real-time eligibility & claim status",
                    "No calls, no portals, zero delays"
                ],
                impact: "Your AR team moves at payer-speed, not paper-speed.",
                icon: FaBolt
            }
        ]
    },
    {
        id: 2,
        title: "Real-Time Leadership Intelligence",
        description: "This converts leadership from reactive decision-making to proactive revenue engineering.",
        features: [
            {
                title: "Deep Analytics & Live KPIs",
                details: [
                    "Productivity, Quality, TAT, SLA dashboards",
                    "AR health & denial intelligence per client",
                    "Visual anomaly detection"
                ],
                impact: "Leaders never “wait for reports”.",
                icon: FaChartLine
            },
            {
                title: "Client Health & Revenue Tracking",
                details: [
                    "Individual dashboards for every client",
                    "Compliance + revenue + risk view",
                    "AR trends, forecasted threats, and opportunities"
                ],
                impact: "Offshore becomes transparent and predictable, eliminating the trust deficit.",
                icon: FaHandshake
            }
        ]
    },
    {
        id: 3,
        title: "Workforce Intelligence Layer",
        description: "Neura AI treats talent as a science, not a guess.",
        features: [
            {
                title: "Employee Intelligence Hub",
                details: [
                    "Productivity vs readiness benchmarks",
                    "Engagement signals & burnout prediction",
                    "Early leader identification"
                ],
                impact: "You build a leadership pipeline, not just a labor pool.",
                icon: FaUsers
            },
            {
                title: "Smart Hiring Engine",
                details: [
                    "Profiles the ideal candidate DNA using real data",
                    "Predicts success probability per role",
                    "Aligns skills with client expectations"
                ],
                impact: "Faster hiring, accurate fitment, minimal attrition.",
                icon: FaUserCheck
            },
            {
                title: "L&D With Real-Time Feedback Loops",
                details: [
                    "Auto-assesses skill gaps",
                    "Recommends role-specific training paths",
                    "Gamified, continuous learning"
                ],
                impact: "Every week, your team gets sharper.",
                icon: FaGraduationCap
            },
            {
                title: "Rewards & Recognition Automation",
                details: [
                    "Performance scoring engine",
                    "Auto recognition from dashboards",
                    "Transparent, data-led appreciation"
                ],
                impact: "Remote teams stay aligned, motivated, loyal.",
                icon: FaTrophy
            }
        ]
    },
    {
        id: 4,
        title: "Quality Governance Layer",
        description: "A continuous system of revenue protection.",
        features: [
            {
                title: "Advanced Quality Management",
                details: [
                    "Recurring error detection",
                    "Severity scoring",
                    "Targeted learning prescriptions"
                ],
                impact: "Quality isn’t inspected—it is engineered.",
                icon: FaShieldAlt
            },
            {
                title: "Escalation & SLA Management",
                details: [
                    "Live SLA health",
                    "Automated escalation pathing",
                    "Predicts SLA breaches before they happen"
                ],
                impact: "No surprises, no late discoveries.",
                icon: FaExclamationTriangle
            }
        ]
    },
    {
        id: 5,
        title: "Culture Engine Layer",
        description: "Offshore usually fails due to culture distance, not lack of talent. Neura AI directly engineers ownership.",
        features: [
            {
                title: "Innovation Hub",
                details: [
                    "Anyone can contribute ideas",
                    "Team votes prioritize what matters",
                    "Monthly implementation cycles"
                ],
                impact: "Everyone becomes a co-builder of the RCM ecosystem.",
                icon: FaLightbulb
            },
            {
                title: "Engagement + Recognition",
                details: [
                    "Tracks contribution at the individual level",
                    "Makes remote work feel connected & meaningful"
                ],
                impact: "High engagement, low attrition—without the cost bloat.",
                icon: FaHandshake
            }
        ]
    },
    {
        id: 6,
        title: "Fluid Architecture",
        description: "Your biggest differentiator. Neura isn’t a product—it's an RCM organism that reshapes itself around each client.",
        features: [
            {
                title: "System-Dependent, Not People-Dependent",
                details: [
                    "Configures to their EHR",
                    "Maps their workflows",
                    "Zero-cost customization"
                ],
                impact: "System intelligence replaces tribal knowledge. If staff leave, performance stays.",
                icon: FaCogs
            }
        ]
    },
    {
        id: 7,
        title: "Full Offshore Transformation Engine",
        description: "This is the positioning that kills every competitor. Neura AI isn’t just software to run offshore; it is an offshore success system:",
        features: [
            {
                title: "It ensures:",
                details: [
                    "Every account is traceable",
                    "Every employee is measurable",
                    "Every SLA is visible",
                    "Every decision is data-backed",
                    "Every transition is structured"
                ],
                impact: "Offshore stops being a risk. Offshore becomes your multiplier.",
                icon: FaGlobeAmericas
            }
        ]
    }
];

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
                <span className={styles.label}>Advanced Capabilities</span>
                <h2 className={styles.title}>Neura AI: The RCM Operating System</h2>
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
                                        <span className={styles.impactLabel}>Impact</span>
                                        <p className={styles.impactText}>{feature.impact}</p>
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
