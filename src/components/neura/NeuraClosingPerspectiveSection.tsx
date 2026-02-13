'use client';

import React from 'react';
import styles from './NeuraClosingPerspectiveSection.module.css';

export default function NeuraClosingPerspectiveSection() {
    return (
        <section className={styles.section} aria-label="Closing Perspective">
            <div className={styles.cardFrame}>
                <span className={styles.corner} aria-hidden="true">+</span>
                <span className={styles.cornerTopRight} aria-hidden="true">+</span>
                <span className={styles.cornerBottomLeft} aria-hidden="true">+</span>
                <span className={styles.cornerBottomRight} aria-hidden="true">+</span>
                <div className={styles.grid}>
                    <div className={styles.card}>
                        <p className={styles.statement}>Revenue cycles do not fail because teams lack effort.</p>
                        <p className={styles.problemStatement}>
                            They fail when leadership lacks a system that thinks, adapts, and executes at the speed of modern healthcare.
                        </p>
                    </div>
                    <div className={styles.card}>
                        <h2 className={styles.solutionStatement}>
                            <span className={styles.gradientText}>Neura AI</span>
                            <br />
                            is that system.
                        </h2>
                    </div>
                    <div className={styles.card}>
                        <p className={styles.outcomeStatement}>
                            It is how revenue cycles stop reacting
                            <br />
                            and start performing with <span className={styles.intent}>intent</span>.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
