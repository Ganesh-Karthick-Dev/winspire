import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/CareModels.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CareModels: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            title: "Accurate Coding & Billing Alignment",
            description: "Precision in coding ensures that every service delivered is captured and billed correctly from day one."
        },
        {
            title: "Compliance & Regulatory Support",
            description: "Navigate the complex landscape of payer requirements and regulatory standards with confidence."
        },
        {
            title: "Clean Claim Submission",
            description: "Automated checks and balances to minimize denials and ensure faster reimbursement cycles."
        },
        {
            title: "Clear Revenue Visibility",
            description: "Real-time analytics and reporting to track the financial health of your RPM programs."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // Featured Card Animation
            gsap.fromTo(cardRef.current,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    delay: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                    }
                }
            );

            // List Items Animation
            const items = listRef.current?.children;
            if (items) {
                gsap.fromTo(items,
                    { opacity: 0, x: 50 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        delay: 0.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.bgGlow} />
            
            <div className={styles.container}>
                <div className={styles.header} ref={headerRef}>
                    <span className={styles.eyebrow}>5. Supporting New Care Models</span>
                    <h2 className={styles.title}>Revenue Enablement for<br />Remote Patient Monitoring</h2>
                    <p className={styles.subtitle}>
                        As virtual care models expand, revenue operations must evolve. We ensure your RPM programs scale confidently with compliant and efficient financial workflows.
                    </p>
                </div>

                <div className={styles.grid}>
                    <div className={styles.featuredCard} ref={cardRef}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.cardTitle}>Scale Confidently</h3>
                            <p className={styles.cardDescription}>
                                Launch and grow your remote patient monitoring programs without being held back by operational inefficiencies or compliance risks.
                            </p>
                        </div>
                        <div className={styles.visualElement} />
                    </div>

                    <div className={styles.servicesList} ref={listRef}>
                        {services.map((service, index) => (
                            <div key={index} className={styles.serviceItem}>
                                <div className={styles.iconWrapper}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <div className={styles.serviceContent}>
                                    <h4 className={styles.serviceTitle}>{service.title}</h4>
                                    <p className={styles.serviceDesc}>{service.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CareModels;
