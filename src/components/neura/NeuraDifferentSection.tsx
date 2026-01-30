import React from 'react';
import styles from './NeuraDifferentSection.module.css';

const NeuraDifferentSection = () => {
    return (
        <section className={styles.section} aria-label="What Makes Neura Fundamentally Different">
            <div className={styles.container}>
                <h2 className={styles.headline}>What Makes Neura Fundamentally Different</h2>

                <div className={styles.contentBlock}>
                    <p className={styles.paragraph}>
                        Most RCM technology focuses on reporting.
                    </p>
                    <p className={styles.paragraph}>
                        Neura focuses on decision timing, sequencing, and execution control.
                    </p>
                    <p className={styles.paragraph}>
                        It redesigns how work flows across people, processes, and payers instead of optimizing individual tasks in isolation.
                    </p>
                </div>

                <div className={styles.divider} aria-hidden="true" />

                <div className={styles.contentBlock}>
                    <p className={styles.paragraph}>
                        The result is not incremental improvement.
                    </p>
                    <p className={styles.paragraph}>
                        It is structural change.
                    </p>
                    <p className={styles.paragraph}>
                        Neura-enabled organizations typically achieve a 60–70% efficiency improvement within 60–90 days not by pushing teams harder, but by fixing the system they operate within.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default NeuraDifferentSection;
