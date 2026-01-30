import React from 'react';
import styles from '../../styles/SolutionsHero.module.css';

const SolutionsHero: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.eyebrow}>
                    SOLUTIONS AT WINSPIRE RCM
                </div>
                
                <h1 className={styles.title}>
                    Revenue Solutions Designed Around Your Outcomes
                </h1>

                <div className={styles.descriptionWrapper}>
                    <div className={styles.glassCard}>
                        <p className={styles.description}>
                            At Winspire RCM, solutions are not predefined packages or fixed service lists.
                            <br /><br />
                            They are intentionally designed systems, aligned to the outcomes your organization needs to achieve.
                            <br /><br />
                            We deliver end-to-end and targeted Revenue Cycle Management solutions for healthcare organizations that seek clarity, control, and predictable financial performance.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionsHero;
