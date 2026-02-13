import React from 'react';
import styles from './NeuraEfficiencySection.module.css';

const NeuraEfficiencySection = () => {
    return (
        <section
            className={styles.section}
            aria-label="How Neura AI Creates Measurable Efficiency"
        >
            {/* Parallax Background - Uses CSS fixed attachment */}
            <div className={styles.parallaxBg}>
                <div className={styles.overlay} />
            </div>

            {/* Content */}
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    How Neura AI<sup style={{ fontSize: '0.4em', verticalAlign: 'top', marginLeft: '0.1em' }}>TM</sup> Creates Measurable Efficiency
                </h2>

                <div className={styles.description}>
                    <p>Efficiency does not come from effort.</p>
                    <p>It comes from design.</p>
                </div>

                <div className={styles.accent}>
                    Neura AI drives performance through five system-level capabilities.
                </div>
            </div>
        </section>
    );
};

export default NeuraEfficiencySection;
