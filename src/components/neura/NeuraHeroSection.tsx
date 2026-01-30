/**
 * Neura AI Hero Section
 * Single line top left: "The Intelligence That Makes Revenue Cycles Predictable" - little big, gradient.
 */

'use client';

import styles from './NeuraHeroSection.module.css';

export default function NeuraHeroSection() {
    return (
        <section className={styles.hero} aria-label="Neura AI hero">
            <div className={styles.leftCol}>
                <h1 className={styles.headline}>
                    The Intelligence That Makes Revenue Cycles Predictable
                </h1>
            </div>
            <div className={styles.rightCol}>
                <p className={styles.rightTitle}>Neura AI</p>
            </div>
        </section>
    );
}
