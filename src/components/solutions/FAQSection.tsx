'use client';

import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FAQItem {
    question: string;
    answer: React.ReactNode;
}

const faqData: FAQItem[] = [
    {
        question: "Does Neura AI replace existing RCM teams or workflows?",
        answer: "No. Neura AI enhances existing teams by removing repetitive work and guiding decisions with intelligence. Winspire RCM combines AI automation with experienced RCM professionals to ensure accuracy, accountability, and consistent outcomes."
    },
    {
        question: "How does Neura AI improve front-end accuracy before claims are submitted?",
        answer: "Neura AI analyzes eligibility, benefits, authorizations, and documentation in advance. Winspire RCM uses these insights to flag coverage risks, missing data, and payer-specific rules before claims enter the system, reducing downstream denials."
    },
    {
        question: "Can Neura AI adapt to different specialties and payer rules?",
        answer: "Yes. Neura AI continuously learns from specialty-specific coding patterns, payer behavior, and historical outcomes. Winspire RCM applies this intelligence to tailor workflows for multi-specialty, multi-location, and high-volume organizations."
    },
    {
        question: "How effective is Neura AI in preventing and managing denials?",
        answer: "Neura AI predicts denial risk before submission and analyzes root causes after posting. Winspire RCM uses this data to prevent avoidable denials, automate appeals, and implement corrective actions that improve payer compliance over time."
    },
    {
        question: "How secure and compliant is AI-powered RCM?",
        answer: "Winspire RCM operates within strict healthcare compliance standards. Neura AI supports audit-ready workflows, documentation tracking, and role-based access controls, ensuring data security and regulatory alignment without sacrificing efficiency."
    }
];

const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
        // Refresh ScrollTrigger after animation completes to handle height change
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 450); // Slightly longer than CSS transition (0.4s)
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Side: Header */}
                <div className={styles.header}>
                    <div className={styles.titleWrapper}>
                        <div className={styles.dots}>
                            <span className={styles.dot}></span>
                            <span className={styles.dot}></span>
                        </div>
                        <h2 className={styles.title}>Frequently Asked Questions</h2>
                    </div>
                    <div className={styles.subtitle}>Everything you need to know about Winspire RCM</div>
                </div>

                {/* Right Side: FAQ List */}
                <div className={styles.faqList}>
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.open : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className={styles.contentArea}>
                                {/* Question Row */}
                                <div className={styles.row}>
                                    <div className={styles.iconWrapper}>
                                        <span className={styles.qIcon}>Q</span>
                                        <span className={styles.divider}></span>
                                    </div>
                                    <h3 className={styles.questionText}>{item.question}</h3>
                                </div>

                                {/* Answer Row (Collapsible) */}
                                <div className={`${styles.answerWrapper} ${openIndex === index ? styles.showAnswer : ''}`}>
                                    <div className={styles.row}>
                                        <div className={styles.iconWrapper}>
                                            <span className={styles.aIcon}>A</span>
                                            <span className={styles.divider}></span>
                                        </div>
                                        <div className={styles.answerText}>{item.answer}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Toggle Button (Right Side) */}
                            <button className={styles.toggleButton}>
                                <div className={styles.plusIcon}>
                                    <span className={styles.barHorizontal}></span>
                                    <span className={`${styles.barVertical} ${openIndex === index ? styles.rotate : ''}`}></span>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
