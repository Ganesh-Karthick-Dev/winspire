import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineTemplate, HiOutlineEye, HiOutlineScale } from 'react-icons/hi';
import styles from '@/styles/OutcomesSystems.module.css';

// Card Data
const cards = [
    {
        id: '01.',
        title: 'System-designed',
        description: 'Workflows, not hero-driven processes.',
        icon: HiOutlineTemplate,
        styleClass: styles.card_1
    },
    {
        id: '02.',
        title: 'Visibility',
        description: 'Cross-functional visibility instead of departmental silos.',
        icon: HiOutlineEye,
        styleClass: styles.card_2
    },
    {
        id: '03.',
        title: 'Prioritization',
        description: 'Based on financial impact, not task volume.',
        icon: HiOutlineScale,
        styleClass: styles.card_3
    }
];

const FallingWord = ({ text, delay, revealColor = "#0f172a" }: { text: string, delay: number, revealColor?: string }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em', paddingBottom: '0.1em' }}>
            <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: '105%' }}
                transition={{ delay, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: revealColor,
                    zIndex: 2
                }}
            />
            <span style={{ display: 'inline-block', color: 'white' }}>
                {text}
            </span>
        </div>
    );
};

const SystemsCard = ({ item, index }: { item: typeof cards[0], index: number }) => {
    const Icon = item.icon;
    
    return (
        <motion.div 
            className={`${styles.card} ${item.styleClass}`}
            initial={{ x: -30, opacity: 0 }} /* Smaller distance for smoother feel */
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ 
                duration: 0.4, /* Snappier */
                delay: index * 0.1, 
                ease: "easeOut" 
            }}
            viewport={{ once: true, margin: "-50px" }}
        >
            <div className={styles.cardNumber}>{item.id}</div>
            
            <div className={styles.cardIconWrapper}>
                <Icon className={styles.cardIcon} />
            </div>
            
            <div className={styles.cardTextContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
            </div>
        </motion.div>
    );
};

const OutcomesSystems = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <FallingWord text="Systems" delay={0.1} />
                        <FallingWord text="Over" delay={0.2} />
                        <FallingWord text="Heroics" delay={0.3} />
                    </h2>
                    <motion.div
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <p className={styles.subtitleTop}>Revenue cycles fail when performance depends on individual effort.</p>
                        <p className={styles.subtitleBottom}>They succeed when systems guide behavior.</p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className={styles.cardsGrid}>
                    {cards.map((card, index) => (
                        <SystemsCard key={index} item={card} index={index} />
                    ))}
                </div>

                {/* Bottom Statement */}
                <motion.div 
                    className={styles.scalingSection}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.scalingContainer}>
                        <p className={styles.scalingText}>
                            This is how performance scales without burnout.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default OutcomesSystems;
