import React from 'react';
import styles from '../../styles/RevenueCycleSolutions.module.css';
import { motion } from 'framer-motion';

const RevenueCycleSolutions: React.FC = () => {
    const cardRef1 = React.useRef<HTMLDivElement>(null);
    const cardRef2 = React.useRef<HTMLDivElement>(null);
    const cardRef3 = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        const card = ref.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                
                {/* Top Section: Designed to Work as One System */}
                <motion.div 
                    className={styles.featureSection}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.featureImageWrapper}>
                        {/* Placeholder image - ensuring we use an absolute path or public URL */}
                        <img 
                            src="/temp/97345.jpg" 
                            alt="Integrated System" 
                            className={styles.featureImage} 
                        />
                    </div>
                    <div className={styles.contentSideWrapper}>
                        <div className={styles.featureContentInner}>
                            <span className={styles.featureTag}>Designed to Work as One System</span>
                            <h2 className={styles.featureTitle}>Comprehensive Revenue Cycle Solutions</h2>
                            <p className={styles.featureDescription}>
                                Winspire delivers full-spectrum Revenue Cycle Management services across front-end, mid-cycle, and back-office operations.
                            </p>
                            <p className={styles.featureDescription}>
                                Our solutions can be deployed as a complete revenue cycle redesign or as focused support for specific challenges.
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom Section: 3 Cards Grid with Broken Curve */}
                <div className={styles.cardsGrid}>
                    
                    {/* Card 1: Front-End */}
                    <motion.div 
                        className={styles.cardWrapper}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div 
                            ref={cardRef1}
                            className={`${styles.card} ${styles.cardThemeWhite}`}
                            onMouseMove={(e) => handleMouseMove(e, cardRef1)}
                        >
                            <div className={styles.grainOverlay} aria-hidden="true" />
                            <div className={styles.lightEffect} aria-hidden="true" />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Front-End Revenue Solutions</h3>
                                <p className={styles.cardDescription}>
                                    Designed to prevent revenue leakage before it begins:
                                </p>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}>Patient access and registration</li>
                                    <li className={styles.listItem}>Eligibility and benefits verification</li>
                                    <li className={styles.listItem}>Prior authorizations</li>
                                    <li className={styles.listItem}>Coverage discovery and validation</li>
                                </ul>
                                <div className={styles.cardFooter}>
                                    Strong front-end execution improves downstream performance and reduces avoidable denials.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: Mid-Cycle (Staggered Down) */}
                    <motion.div 
                        className={styles.cardWrapper}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div 
                            ref={cardRef2}
                            className={`${styles.card} ${styles.cardThemeBlue}`}
                            onMouseMove={(e) => handleMouseMove(e, cardRef2)}
                        >
                            <div className={styles.grainOverlay} aria-hidden="true" />
                            <div className={styles.lightEffect} aria-hidden="true" />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Mid-Cycle Revenue Solutions</h3>
                                <p className={styles.cardDescription}>
                                    Focused on accuracy, compliance, and clean claim submission:
                                </p>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}>Medical coding and charge review</li>
                                    <li className={styles.listItem}>Charge capture and documentation alignment</li>
                                    <li className={styles.listItem}>Claim scrubbing and submission</li>
                                </ul>
                                <div className={styles.cardFooter}>
                                    This layer protects revenue integrity and ensures claims are payer-ready.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Back-Office (Staggered Further Down) */}
                    <motion.div 
                        className={styles.cardWrapper}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <div 
                            ref={cardRef3}
                            className={`${styles.card} ${styles.cardThemeDark}`}
                            onMouseMove={(e) => handleMouseMove(e, cardRef3)}
                        >
                            <div className={styles.grainOverlay} aria-hidden="true" />
                            <div className={styles.lightEffect} aria-hidden="true" />
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>Back-Office Revenue Solutions</h3>
                                <p className={styles.cardDescription}>
                                    Designed to recover earned revenue efficiently:
                                </p>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}>AR follow-up and resolution</li>
                                    <li className={styles.listItem}>Denial management and appeals</li>
                                    <li className={styles.listItem}>Underpayment identification</li>
                                    <li className={styles.listItem}>Payment posting and reconciliation</li>
                                </ul>
                                <div className={styles.cardFooter}>
                                    Work is prioritized based on collectability, financial impact, and risk, not aging alone.
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default RevenueCycleSolutions;
