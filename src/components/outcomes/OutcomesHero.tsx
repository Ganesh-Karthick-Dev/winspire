'use client';

import React from 'react';
import styles from '@/styles/OutcomesHero.module.css';
import { TextRevealSlider } from '@/components/ui/text-reveal-slider';

const OutcomesHero = () => {
    const textPoints = [
        "At Winspire RCM, outcomes are not numbers teams are pressured to chase. They are the natural consequence of how revenue systems are designed.",
        "When structure, accountability, and intelligence are aligned upfront, performance becomes calm, predictable, and repeatable.",
        "We don’t chase metrics. We design environments where the right metrics emerge."
    ];

    return (
        <section id="outcomes-hero" className={styles.heroSection}>
            {/* Top Hero Section */}
            <div className={styles.heroTop}>
                <h1 className={styles.mainTitle}>
                    OUTCOMES AT <br /> WINSPIRE RCM
                </h1>
                
                <h2 className={styles.bottomSubtitle}>
                    Outcomes Are Not Metrics.<br /> They Are the Result of Design.
                </h2>
            </div>

            {/* Separator / Transition (Visual gap or line if needed, currently just flow) */}

            {/* Text Reveal Section */}
            <div className={styles.revealSection}>
                <TextRevealSlider text={textPoints} />
            </div>
        </section>
    );
};

export default OutcomesHero;
