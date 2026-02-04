'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from '@/styles/OutcomesFuture.module.css';
import { 
    Cpu, 
    Users, 
    Lightbulb 
} from 'lucide-react';

const OutcomesFuture = () => {
    const features = [
        {
            icon: <Cpu className="w-12 h-12" />,
            title: "Design systems",
            subtext: "instead of managing chaos",
            delay: 0.1
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "Enable people",
            subtext: "instead of exhausting them",
            delay: 0.2
        },
        {
            icon: <Lightbulb className="w-12 h-12" />,
            title: "Act on intelligence",
            subtext: "instead of assumptions",
            delay: 0.3
        }
    ];

    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.backgroundGlow} />
            
            <div className={styles.contentContainer}>
                <div className={styles.headerContent}>
                    <motion.span 
                        className={styles.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Future Proof
                    </motion.span>
                    
                    <motion.h2 
                        className={styles.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span className={styles.titleGradient}>
                            Designed for What Comes Next
                        </span>
                    </motion.h2>

                    <motion.p 
                        className={styles.description}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Healthcare reimbursement continues to evolve. 
                        Payers are becoming more automated and intelligent.
                        Organizations that succeed will be those that adapt.
                    </motion.p>
                </div>

                <div className={styles.cardsContainer}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: feature.delay }}
                        >
                            <div className={styles.topSection}>
                                <div className={styles.border}></div>
                                <div className={styles.iconContainer}>
                                    {feature.icon}
                                </div>
                            </div>
                            <div className={styles.bottomSection}>
                                <span className={styles.cardTitle}>{feature.title}</span>
                                <p className={styles.cardSubtext}>{feature.subtext}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.closingSection}>
                    <motion.h3 
                        className={styles.finalStatement}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        That future is not coming.<br />
                        <span className={styles.highlight}>It is already here.</span>
                    </motion.h3>
                </div>
            </div>
        </section>
    );
};

export default OutcomesFuture;
