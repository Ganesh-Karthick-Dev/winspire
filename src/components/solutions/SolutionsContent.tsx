import React from 'react';
import styles from '../../styles/SolutionsContent.module.css';
import { FaSearchDollar, FaChartLine, FaBullseye, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const SolutionsContent: React.FC = () => {
    return (
        <div className={styles.philosophySection}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    {/* Left Column */}
                    <div className={styles.leftColumn}>
                        <motion.span 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={styles.tag}
                        >
                            Our Philosophy
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className={styles.heading}
                        >
                            Solutions Start With Outcomes, Not Services
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <p className={styles.description}>
                                Every healthcare organization operates within a unique reality shaped by payer mix, specialty complexity, scale, growth stage, and internal maturity.
                            </p>
                            <p className={styles.description}>
                                That is why our solutions always begin with understanding before execution.
                            </p>
                            <p className={styles.description}>
                                Only then do we design the scope, structure, intelligence, and execution model required to achieve those outcomes. This approach ensures relevance, accountability, and measurable impact.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className={styles.rightColumn}>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={styles.startByLabel}
                        >
                            We start by:
                        </motion.div>
                        <div className={styles.cardList}>
                            {/* Card 1 */}
                            <motion.div 
                                className={styles.card}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <div className={styles.cardIconBox}>
                                    <FaSearchDollar />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        Assessing your current revenue reality
                                    </h3>
                                </div>
                                <div className={styles.cardArrow}>
                                    <FaArrowRight />
                                </div>
                            </motion.div>

                            {/* Card 2 */}
                            <motion.div 
                                className={styles.card}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className={styles.cardIconBox}>
                                    <FaChartLine />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        Identifying where value is being lost
                                    </h3>
                                </div>
                                <div className={styles.cardArrow}>
                                    <FaArrowRight />
                                </div>
                            </motion.div>

                            {/* Card 3 */}
                            <motion.div 
                                className={styles.card}
                                initial={{ opacity: 0, x: 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                <div className={styles.cardIconBox}>
                                    <FaBullseye />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>
                                        Defining what success looks like for your organization
                                    </h3>
                                </div>
                                <div className={styles.cardArrow}>
                                    <FaArrowRight />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolutionsContent;
