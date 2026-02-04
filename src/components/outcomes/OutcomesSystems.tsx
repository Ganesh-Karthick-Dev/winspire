import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const FallingWord = ({ text, delay, revealColor = "#0f172a", textColor = "white", isActive = false }: { text: string, delay: number, revealColor?: string, textColor?: string, isActive?: boolean }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em', paddingBottom: '0.1em' }}>
            <motion.div
                initial={{ y: 0 }}
                animate={isActive ? { y: '105%' } : { y: 0 }}
                transition={{ delay, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
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
            <span style={{ display: 'inline-block', color: textColor }}>
                {text}
            </span>
        </div>
    );
};

const SystemsCard = ({ item, index, isActive }: { item: typeof cards[0], index: number, isActive: boolean }) => {
    const Icon = item.icon;
    const revealColor = item.styleClass === styles.card_2 ? "#bef264" : "#0f172a"; // Contrast colors
    const textColor = (item.styleClass === styles.card_1 || item.styleClass === styles.card_3) ? "#000000" : "#ffffff";
    
    return (
        <motion.div 
            className={`${styles.card} ${item.styleClass}`}
            initial={{ opacity: 0, x: -60 }}
            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ 
                duration: 1.0, 
                delay: 0.4 + (index * 0.2), 
                ease: [0.22, 1, 0.36, 1] 
            }}
        >
            <div className={styles.cardNumber}>{item.id}</div>
            
            <div className={styles.cardIconWrapper}>
                <Icon className={styles.cardIcon} />
            </div>
            
            <div className={styles.cardTextContent}>
                <h3 className={styles.cardTitle}>
                    <FallingWord 
                        text={item.title} 
                        delay={0.8 + (index * 0.2)} 
                        isActive={isActive} 
                        revealColor={revealColor}
                        textColor={textColor}
                    />
                </h3>
                <p className={styles.cardDescription}>{item.description}</p>
            </div>
        </motion.div>
    );
};

const OutcomesSystems = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                
                {/* Header */}
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        <FallingWord text="Systems" delay={0.1} isActive={isInView} />
                        <FallingWord text="Over" delay={0.3} isActive={isInView} />
                        <FallingWord text="Heroics" delay={0.5} isActive={isInView} />
                    </h2>
                    <motion.div
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 1.0, delay: 0.8 }}
                    >
                        <p className={styles.subtitleTop}>Revenue cycles fail when performance depends on individual effort.</p>
                        <p className={styles.subtitleBottom}>They succeed when systems guide behavior.</p>
                    </motion.div>
                </div>

                {/* Cards Grid */}
                <div className={styles.cardsGrid}>
                    {cards.map((card, index) => (
                        <SystemsCard key={index} item={card} index={index} isActive={isInView} />
                    ))}
                </div>

                {/* Bottom Statement */}
                <motion.div 
                    className={styles.scalingSection}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: 1.4 }}
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
