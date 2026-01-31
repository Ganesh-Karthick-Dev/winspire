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
                <div className={styles.container}>
                    <h2 className={styles.title}>Closing Perspective</h2>
                <p className={styles.paragraph}>Revenue cycles do not fail because teams lack effort.</p>
                <p className={styles.paragraph}>
                    They fail when leadership lacks a system that thinks, adapts, and executes at the speed of modern healthcare.
                </p>
                <p className={styles.paragraph}>Neura AI is that system.</p>
                <p className={styles.paragraph}>
                    It is how revenue cycles stop reacting
                    <br />
                    and start performing with intent.
                </p>
                </div>
            </div>
        </section>
    );
}
