import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/styles/OutcomesHumanCentric.module.css';

// Reusing FallingWord for consistency
const FallingWord = ({ text, delay, isHighlight = false }: { text: string, delay: number, isHighlight?: boolean }) => {
    return (
        <div style={{ display: 'inline-block', verticalAlign: 'bottom', marginRight: '0.2em' }}>
            <motion.span
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                    delay, 
                    duration: 0.8, 
                    type: "spring",
                    stiffness: 60
                }}
                viewport={{ once: true }}
                style={{ 
                    display: 'inline-block',
                    color: isHighlight ? '#0ea5e9' : '#0f172a'
                }}
            >
                {text == " " ? "\u00A0" : text}
            </motion.span>
        </div>
    );
};

const OutcomesHumanCentric = () => {
    const containerRef = useRef(null);
    
    const sectionData = {
        title: "3. Human-Centric, Not People-Dependent",
        content: "People are our greatest enablers but outcomes should never depend on individual heroics.",
        list: [
            "Knowledge is embedded into systems",
            "Learning flows continuously from insights to execution",
            "Issues are corrected at the source, not repeatedly downstream"
        ],
        final: "This creates stability, confidence, and continuous improvement across the revenue cycle."
    };

    return (
        <div 
            className={styles.staticContainer} 
            ref={containerRef} 
        >
            <div className={styles.staticContentWrapper}>
                {/* Decorative Background Layer for Arc */}
                <div className={styles.decorativeLayer}>
                    <div className={styles.decorativeCircle} />
                </div>

                {/* Left Side: Image & Final Statement */}
                <div className={styles.leftSection}>
                    <div className={styles.designGraphicWrapper}>
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            animate={{ y: [0, -15, 0] }} /* Continuous Floating Animation */
                            transition={{ 
                                opacity: { duration: 0.8 },
                                scale: { duration: 0.8 },
                                y: { 
                                    repeat: Infinity, 
                                    duration: 4, 
                                    ease: "easeInOut" 
                                }
                            }}
                            viewport={{ once: true }}
                            src="/temp/Group 12.png" 
                            alt="Human-Centric Design" 
                            className={styles.graphicImage}
                        />
                    </div>

                    {/* Final Statement Pill */}
                    <motion.div 
                        className={styles.finalStatementPill}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className={styles.pillIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div className={styles.pillText}>
                            {sectionData.final.split(" ").map((word, i) => (
                                <FallingWord 
                                    key={i} 
                                    text={word} 
                                    delay={0.8 + (i * 0.05)} 
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Side: Text Content */}
                <div className={styles.rightSection}>
                    <h3 className={styles.title}>
                        <FallingWord text="3." delay={0.1} />
                        <FallingWord text="Human-Centric," isHighlight={true} delay={0.3} />
                        <br />
                        <FallingWord text="Not" delay={0.5} />
                        <FallingWord text="People-Dependent" delay={0.7} />
                    </h3>
                    
                    <p className={styles.description}>
                        {sectionData.content}
                    </p>

                    {/* Timeline List */}
                    <div className={styles.timelineWrapper}>
                        {/* SVG Line with dynamic gradient - Only visible on Desktop via CSS */}
                        <svg className={styles.timelineSvg}>
                            <line x1="24" y1="0" x2="24" y2="100%" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
                            <motion.path
                                d="M 24 0 V 140"
                                stroke="#0ea5e9"
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.2, ease: "easeInOut", delay: 1 }}
                                viewport={{ once: true }}
                            />
                        </svg>

                        <div className={styles.listContainer}>
                            {sectionData.list.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    className={styles.listItem}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 + (index * 0.2), duration: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <div className={styles.numberBadge}>
                                        {index + 1}
                                    </div>
                                    <span className={styles.listText}>
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutcomesHumanCentric;
