import React from 'react';
import styles from './NeuraLivingSystemsSection.module.css';

const NeuraLivingSystemsSection = () => {
    return (
        <section
            id="living-systems"
            className={styles.section}
            aria-label="From Static Workflows to Living Systems"
        >
            {/* Left Content */}
            <div className={styles.content}>
                <h2 className={styles.headline}>
                    From Static Workflows to Living Systems
                </h2>

                <div className={styles.body}>
                    <p className={styles.paragraph}>
                        RCM KPIs change daily based on payer logic, policy updates, patient behavior, and specialty trends.
                    </p>

                    <p className={styles.emphasis}>
                        Static workflows cannot survive in this environment.
                    </p>

                    <p className={styles.paragraph}>
                        Neura keeps execution adaptive by continuously learning from payer responses, dynamically reprioritizing work, and recommending actions based on financial impact.
                    </p>

                    <p className={styles.accent}>
                        RCM becomes proactive, scientific, and resilient.
                    </p>
                </div>
            </div>

            {/* Right side is empty - 3D model will be positioned here via keyframes */}
            <div className={styles.modelSpace} aria-hidden="true" />
        </section>
    );
};

export default NeuraLivingSystemsSection;
