'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/SolutionsContent.module.css';
import { FaSearchDollar, FaChartLine, FaBullseye } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const cards = [
    {
        Icon: FaSearchDollar,
        titleLine1: 'Assessing your',
        titleLine2: 'current revenue reality',
        description: 'Understand where you stand before we design a path forward.',
    },
    {
        Icon: FaChartLine,
        titleLine1: 'Identifying where',
        titleLine2: 'value is being lost',
        description: 'Spot gaps, denials, and leakage with data-driven analysis.',
    },
    {
        Icon: FaBullseye,
        titleLine1: 'Defining what success',
        titleLine2: 'looks like for your organization',
        description: 'Clear outcomes, measurable targets, and shared accountability.',
    },
];

const SolutionsContent: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const tagRef = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const cardListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const section = sectionRef.current;
            if (!section) return;

            const isMobile = window.innerWidth <= 768;
            if (isMobile) return;

            gsap.set(tagRef.current, { opacity: 0, y: 20 });
            gsap.set(descRef.current, { opacity: 0, y: 16 });
            gsap.set(labelRef.current, { opacity: 0, x: 20 });
            const headingLines = headingRef.current?.querySelectorAll(`.${styles.headingLine}`);
            if (headingLines?.length) gsap.set(headingLines, { clipPath: 'inset(0 100% 0 0)' });

            // Play once when section enters view - all cards visible when fully in section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 88%',
                    toggleActions: 'play none none none',
                },
            });

            tl.to(tagRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0);
            tl.to(labelRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out' }, 0.2);

            if (headingLines?.length) {
                tl.to(headingLines, {
                    clipPath: 'inset(0 0% 0 0)',
                    duration: 1.1,
                    stagger: 0.15,
                    ease: 'power3.inOut',
                }, 0.3);
            }

            tl.to(descRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, 1);

            const items = cardListRef.current?.children;
            if (items) {
                gsap.set(items, { opacity: 0, y: 28 });
                Array.from(items).forEach((item, i) => {
                    tl.to(
                        item,
                        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                        1.4 + i * 0.35
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div id="solutions-content" className={styles.philosophySection} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.leftColumn}>
                        <span ref={tagRef} className={styles.tag}>
                            Our Philosophy
                        </span>
                        <h2 ref={headingRef} className={styles.heading}>
                            <span className={styles.headingLine}>Solutions Start With Outcomes,</span>
                            <span className={styles.headingLine}>Not Services</span>
                        </h2>
                        <div ref={descRef}>
                            <p className={styles.description}>
                                Every healthcare organization operates within a unique reality shaped by payer mix, specialty complexity, scale, growth stage, and internal maturity.
                            </p>
                            <p className={styles.description}>
                                That is why our solutions always begin with understanding before execution.
                            </p>
                            <p className={styles.description}>
                                Only then do we design the scope, structure, intelligence, and execution model required to achieve those outcomes. This approach ensures relevance, accountability, and measurable impact.
                            </p>
                        </div>
                    </div>

                    <div className={styles.rightColumn}>
                        <div ref={labelRef} className={styles.startByLabel}>
                            We start by:
                        </div>
                        <div className={styles.cardList} ref={cardListRef}>
                            {cards.map((card, i) => (
                                <div key={i} className={styles.card}>
                                    <div className={styles.cardIconBox}>
                                        <card.Icon />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>
                                            <span className={styles.titleLine1}>{card.titleLine1}</span>
                                            <span className={styles.titleLine2}>{card.titleLine2}</span>
                                        </h3>
                                        <p className={styles.cardDescription}>{card.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionsContent;
