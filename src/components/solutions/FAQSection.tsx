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
        question: "What is the selection process?",
        answer: "The selection process involves document screening, a casual interview (online), a technical assignment (for some positions), and final interviews."
    },
    {
        question: "I'm not sure which job category to apply for. Can I apply for multiple jobs?",
        answer: "Yes, you can apply for multiple positions. If you are unsure, please select 'Open Position' or the most relevant role, and we will consider your aptitude during the screening."
    },
    {
        question: "I have been selected for Styleport in the past. Can I apply again?",
        answer: "Yes, it is. We are constantly updating the job types and job descriptions available, so please check them and then apply using the application form."
    },
    {
        question: "Before applying, I would like to know more about the working conditions and working style.",
        answer: (
            <span>
                Please contact our recruitment team ( <a href="mailto:career@styleport.co.jp" className={styles.link}>career@styleport.co.jp</a> ).
            </span>
        )
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
                        <h2 className={styles.title}>FAQ</h2>
                    </div>
                    <div className={styles.subtitle}>Frequently asked questions</div>
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
