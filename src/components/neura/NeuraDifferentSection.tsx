import React from 'react';
import { Zap, Workflow, TrendingUp } from 'lucide-react';
import styles from './NeuraDifferentSection.module.css';

const NeuraDifferentSection = () => {
    return (
        <section
            className={styles.section}
            aria-label="What Makes Neura Fundamentally Different"
            style={{
                backgroundColor: 'transparent',
                marginTop: '10vh',
                marginBottom: '10vh',
                padding: '0'
            }}
        >
            <div
                className={styles.container}
                style={{
                    width: '97%',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    borderRadius: '24px',
                    padding: 'clamp(3rem, 8vh, 5rem) clamp(1rem, 3vw, 4rem)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.04)',
                }}
            >
                <h2 className={styles.headline}>
                    What Makes Neura Fundamentally Different
                </h2>

                <div className={styles.grid}>
                    {/* Feature 1: Command */}
                    <div className={styles.featureBlock}>
                        <div className={styles.iconContainer}>
                            <Zap size={24} className={styles.zapIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>Real-time Command</h3>
                        <p className={styles.paragraph}>
                            Traditional RCM tracks what happened. Neura masters the timing, sequencing, and precise control of every decision as it happens.
                        </p>
                    </div>

                    {/* Feature 2: Architecture */}
                    <div className={styles.featureBlock}>
                        <div className={styles.iconContainer}>
                            <Workflow size={24} className={styles.workflowIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>Workflow Architecture</h3>
                        <p className={styles.paragraph}>
                            Instead of optimizing isolated tasks, we re-architect the entire flow between people, processes, and payers for seamless execution.
                        </p>
                    </div>

                    {/* Feature 3: Results */}
                    <div className={styles.featureBlock}>
                        <div className={styles.iconContainer}>
                            <TrendingUp size={24} className={styles.trendingIcon} />
                        </div>
                        <h3 className={styles.featureTitle}>The Structural Leap</h3>
                        <p className={styles.paragraph}>
                            Realize a <strong>60–70% efficiency gain</strong> within 90 days by fixing the underlying system, not demanding more from your teams.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NeuraDifferentSection;
