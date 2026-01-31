import React from 'react';
import styles from '../../styles/RevenueCycleSolutions.module.css';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const RevenueCycleSolutions: React.FC = () => {
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
                            src="/images/company-page/cloud-computing-cyber-security.webp" 
                            alt="Integrated System" 
                            className={styles.featureImage} 
                        />
                    </div>
                    <div className={styles.contentSideWrapper}>
                        <div className={styles.featureContentInner}>
                            <span className={styles.featureTag}>2. Designed to Work as One System</span>
                            <h2 className={styles.featureTitle}>Comprehensive Revenue Cycle Solutions</h2>
                            <p className={styles.featureDescription}>
                                Winspire delivers full-spectrum Revenue Cycle Management services across front-end, mid-cycle, and back-office operations.
                            </p>
                            <p className={styles.featureDescription}>
                                Our solutions can be deployed as a complete revenue cycle redesign or as focused support for specific challenges.
                            </p>
                        </div>
                        <div className={styles.cornerButton}>
                            <FaArrowRight />
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
                        <div className={`${styles.card} ${styles.cardThemeWhite}`}>
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
                        <button className={styles.cardButton} aria-label="Learn more">
                            <FaArrowRight />
                        </button>
                    </motion.div>

                    {/* Card 2: Mid-Cycle (Staggered Down) */}
                    <motion.div 
                        className={styles.cardWrapper}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className={`${styles.card} ${styles.cardThemeBlue}`}>
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
                        <div className={styles.cardButton}>
                            <FaArrowRight />
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
                        <div className={`${styles.card} ${styles.cardThemeDark}`}>
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
                        <div className={styles.cardButton}>
                            <FaArrowRight />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default RevenueCycleSolutions;
