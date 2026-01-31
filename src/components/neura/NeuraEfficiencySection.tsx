import React from 'react';
import styles from './NeuraEfficiencySection.module.css';

const NeuraEfficiencySection = () => {
    return (
        <section
            className={styles.section}
            aria-label="How Neura Creates Measurable Efficiency"
        >
            {/* Parallax Background - Uses CSS fixed attachment */}
            <div className={styles.parallaxBg}>
                <div className={styles.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    How Neura Creates Measurable Efficiency
                </h2>

                <div className={styles.description}>
                    <p>Efficiency does not come from effort.</p>
                    <p>It comes from design.</p>
                </div>

                <div className={styles.accent}>
                    Neura drives performance through five system-level capabilities.
                </div>
            </div>
        </section>
    );
};

export default NeuraEfficiencySection;
