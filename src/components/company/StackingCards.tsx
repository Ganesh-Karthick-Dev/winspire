'use client';

import { useRef, useEffect } from 'react';
import styles from './StackingCards.module.css';

const cardsData = [
    {
        title: "AI-Enabled RCM Ecosystem",
        description: "An intelligent revenue cycle framework that automates workflows, reduces inefficiencies, and drives smarter financial outcomes."
    },
    {
        title: "Zero Client Attrition",
        description: "Building lasting partnerships through exceptional service delivery and consistent results that exceed expectations."
    },
    {
        title: "Zero Employee Attrition",
        description: "Creating a workplace culture that values growth, innovation, and employee satisfaction for long-term success."
    },
    {
        title: "ISO 27001 + ISO 9001 Standards",
        description: "Maintaining the highest standards of information security and quality management across all operations."
    },
    {
        title: "100% Cloud-Based & Secure",
        description: "Leveraging modern cloud infrastructure to ensure scalability, reliability, and enterprise-grade security."
    },
    {
        title: "24-Hour TAT Culture",
        description: "Committed to rapid turnaround times that keep your revenue cycle moving efficiently and effectively."
    },
    {
        title: "Transparent Dashboards for Every Client",
        description: "Real-time visibility into performance metrics and outcomes through intuitive, customizable dashboards."
    }
];

export default function StackingCards() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        let ctx: gsap.Context;

        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                const cards = sectionRef.current?.querySelectorAll(`.${styles.card}`);

                if (cards && cards.length > 0) {
                    cards.forEach((card, index) => {
                        if (index === 0) return; // Skip first card

                        ScrollTrigger.create({
                            trigger: card,
                            start: 'top top+=100px',
                            end: 'bottom top+=100px',
                            pin: true,
                            pinSpacing: false
                        });
                    });
                }
            }, sectionRef);
        };

        initAnimations();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.stackingSection}>
            {cardsData.map((card, index) => (
                <div
                    key={index}
                    className={`${styles.card} ${index === 0 ? styles.firstCard : styles.stackCard}`}
                >
                    <div className={styles.cardContent}>
                        {/* Text content - left for first card, right for others */}
                        <div className={`${styles.textContent} ${index === 0 ? styles.textLeft : styles.textRight}`}>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                            <p className={styles.cardDescription}>{card.description}</p>
                        </div>

                        {/* Image placeholder - right for first card, left for others */}
                        <div className={`${styles.imageContent} ${index === 0 ? styles.imageRight : styles.imageLeft}`}>
                            <div className={styles.imagePlaceholder}>
                                {/* Placeholder for image */}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
