'use client';

import React, { useEffect, useRef } from 'react';
import styles from './DepartmentsSection.module.css';
import {
    FaClipboardCheck,
    FaFileSignature,
    FaCode,
    FaPaperPlane,
    FaMoneyBillWave,
    FaRotateRight,
    FaTriangleExclamation,
    FaChartPie,
    FaScaleBalanced,
    FaUserDoctor,
    FaIdCard,
    FaShieldHalved,
    FaBrain,
    FaBullseye,
    FaCheck
} from 'react-icons/fa6';

interface Department {
    id: number;
    title: string;
    problem: string;
    neuraOptimization: string[];
    outcome: string;
    Icon: React.ElementType;
}

const departmentsData: Department[] = [
    {
        id: 1,
        title: "Eligibility & Benefits Verification",
        problem: "High errors, coverage misinterpretation, payer inconsistencies.",
        neuraOptimization: [
            "TAT - 3 Days ahead of appointments",
            "Attend ADHOC requests",
            "Auto-fetches eligibility data from payer APIs, 1300+ payers",
            "Highlights benefit discrepancies in real time",
            "Predicts coverage issues before claim submission",
            "Flags missing information automatically",
            "Prioritizes high-risk patients needing manual review",
            "Real-time Reports and AI analytics"
        ],
        outcome: "Faster scheduling, fewer front-end denials, improved patient financial clarity.",
        Icon: FaClipboardCheck
    },
    {
        id: 2,
        title: "Prior Authorization",
        problem: "Long wait times, manual documentation, missed PA requirements.",
        neuraOptimization: [
            "TAT - 3 Days ahead of appointments",
            "Attend ADHOC requests",
            "Predicts authorization requirements based on payer + CPT",
            "Real-time updates on payer portals",
            "Alerts when PA deadlines approach",
            "Flags high-risk authorizations before expiration",
            "Real-time Reports and AI analytics"
        ],
        outcome: "Reduced cancellations, zero missed authorizations, faster procedure clearance.",
        Icon: FaFileSignature
    },
    {
        id: 3,
        title: "Medical Coding",
        problem: "High costs, inconsistencies, backlogs, compliance risk.",
        neuraOptimization: [
            "24 to 48 Hrs TAT",
            "Subject Matter Experts",
            "AI Assisted training and development",
            "Error detection and auto-correction",
            "Continuous Education – Real-time Education on Coding Denials from the AR Department",
            "Routes complex cases to senior coders automatically",
            "Real-time Reports and AI analytics"
        ],
        outcome: "Faster coding, fewer inaccuracies, 70% reduction in coding effort, stronger compliance.",
        Icon: FaCode
    },
    {
        id: 4,
        title: "Claims Submission",
        problem: "Rejections due to small avoidable errors.",
        neuraOptimization: [
            "24hrs TAT",
            "Predicts rejections before claims are submitted",
            "Applies payer-specific rules automatically",
            "Cleans claims based on historical patterns",
            "Highlights missing modifiers, DX/CPT conflicts, place of service issues",
            "Real-time Reports and AI analytics"
        ],
        outcome: "Higher first pass rate, clean claims, faster cash.",
        Icon: FaPaperPlane
    },
    {
        id: 5,
        title: "Payment Posting",
        problem: "High volume, human errors, delay in posting.",
        neuraOptimization: [
            "24 Hrs TAT",
            "ERA/Auto-posts accurate payments and adjustments",
            "Flags unusual payer adjustments or takebacks",
            "Identifies posting errors instantly",
            "Real-time Reports and AI analytics"
        ],
        outcome: "Faster reconciliation, accurate reporting, real-time revenue visibility.",
        Icon: FaMoneyBillWave
    },
    {
        id: 6,
        title: "AR Follow-Up",
        problem: "Unstructured follow-up, aging accounts, inconsistent prioritization.",
        neuraOptimization: [
            "Predicts collectible vs uncollectible AR",
            "Auto-prioritizes accounts based on dollar impact + timely filing",
            "Auto Claim Status, 1300+ Payers",
            "Generates recommended follow-up actions",
            "Tracks payer behavior in real time",
            "Assigns tasks to agents based on skill and payer complexity"
        ],
        outcome: "Reduced AR days, improved cash flow, smart assignment of effort.",
        Icon: FaRotateRight
    },
    {
        id: 7,
        title: "Denials Management & Appeals",
        problem: "Rising payer AI, increasing denials, missed appeal windows.",
        neuraOptimization: [
            "Automated Denials Analysis in Bulk",
            "Analyzes root cause patterns across payers",
            "Auto-generates appeal letters",
            "Tracks appeal deadlines in real time",
            "Provides recommended corrective actions for each denial code",
            "Preventive intelligence triggers process fixes"
        ],
        outcome: "Appeals submitted on time, fewer denials, 90% reduction in avoidable issues.",
        Icon: FaTriangleExclamation
    },
    {
        id: 8,
        title: "Underpayments",
        problem: "Missed payer discrepancies and silent revenue losses.",
        neuraOptimization: [
            "Compares payer contracts vs actual payments",
            "Highlights incorrect reimbursements",
            "Auto-calculates expected allowed amounts",
            "Flags chronic payer underpayment patterns"
        ],
        outcome: "Recovered revenue, accurate payer compliance, zero unnoticed losses.",
        Icon: FaChartPie
    },
    {
        id: 9,
        title: "Credit Balance",
        problem: "Time-consuming research + compliance risk.",
        neuraOptimization: [
            "Subject Matter Experts",
            "Detects erroneous adjustments",
            "Generates clean reconciliation logs with AI insights"
        ],
        outcome: "Cleaner books, audit-ready records, improved compliance.",
        Icon: FaScaleBalanced
    },
    {
        id: 10,
        title: "Patient Billing",
        problem: "Confusion, delays, unrealistic follow-ups.",
        neuraOptimization: [
            "Predicts likelihood of patient payment",
            "Suggests best communication method (SMS/email/call)",
            "Auto-generates simplified statements",
            "Flags hardship or payment plan candidates"
        ],
        outcome: "Higher patient collections, better experience, reduced dissatisfaction.",
        Icon: FaUserDoctor
    },
    {
        id: 11,
        title: "Provider Enrollment / Credentialing",
        problem: "Long cycles, missed updates, payer delays.",
        neuraOptimization: [
            "Tracks every credentialing milestone",
            "Alerts for expiring contracts",
            "Auto-fills repetitive fields using learned patterns",
            "Monitors payer enrollment backlog"
        ],
        outcome: "Faster credentialing, zero missed renewals, early revenue activation.",
        Icon: FaIdCard
    },
    {
        id: 12,
        title: "Revenue Integrity & Audit",
        problem: "Compliance risks, missed documentation, coding inconsistencies.",
        neuraOptimization: [
            "Runs predictive audits",
            "Flags documentation gaps",
            "Suggests compliance fixes",
            "Tracks audit trends across departments"
        ],
        outcome: "A clean, compliant, audit-ready practice with predictable revenue.",
        Icon: FaShieldHalved
    }
];

const DepartmentsSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Animate section header
            gsap.fromTo(
                `.${styles.sectionHeader}`,
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );

            // Animate each card with stagger
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 90%',
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
                <div className={styles.labelWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <span className={styles.label}>Comprehensive Coverage</span>
                </div>
                <h2 className={styles.title}>Winspire RCM Covers Every Department</h2>
                <p className={styles.subtitle}>
                    End-to-end revenue cycle optimization powered by Neura AI intelligence
                </p>
            </div>

            {/* Department Cards */}
            <div className={styles.cardsContainer}>
                {departmentsData.map((dept, index) => (
                    <div
                        key={dept.id}
                        ref={el => { cardsRef.current[index] = el; }}
                        className={styles.card}
                    >
                        {/* Card Number Badge */}
                        <div className={styles.cardNumber}>
                            <span>{dept.id.toString().padStart(2, '0')}</span>
                        </div>

                        {/* Card Header */}
                        <div className={styles.cardHeader}>
                            <div className={styles.cardIcon}>
                                <dept.Icon />
                            </div>
                            <h3 className={styles.cardTitle}>{dept.title}</h3>
                        </div>

                        {/* Problem Section */}
                        <div className={styles.problemSection}>
                            <div className={styles.sectionLabel}>
                                <span className={styles.problemIcon}><FaTriangleExclamation /></span>
                                The Problem
                            </div>
                            <p className={styles.problemText}>{dept.problem}</p>
                        </div>

                        {/* Neura Optimization Section */}
                        <div className={styles.neuraSection}>
                            <div className={styles.sectionLabel}>
                                <span className={styles.neuraIcon}><FaBrain /></span>
                                Neura Optimization
                            </div>
                            <ul className={styles.neuraList}>
                                {dept.neuraOptimization.map((item, i) => (
                                    <li key={i} className={styles.neuraItem}>
                                        <span className={styles.checkIcon}><FaCheck /></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outcome Section */}
                        <div className={styles.outcomeSection}>
                            <div className={styles.sectionLabel}>
                                <span className={styles.outcomeIcon}><FaBullseye /></span>
                                Outcome
                            </div>
                            <p className={styles.outcomeText}>{dept.outcome}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DepartmentsSection;
