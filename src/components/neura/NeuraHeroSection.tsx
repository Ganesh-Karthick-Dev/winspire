/**
 * Neura AI Hero Section
 * Top: headline (left) + Neura AI (right). Divider. Bottom: left / center / right copy.
 */

'use client';

import styles from './NeuraHeroSection.module.css';

const BOTTOM_LEFT = `Revenue cycles rarely fail because teams lack effort.
They fail because the system lacks intelligence.
Neura AI was built to solve that problem.`;

const BOTTOM_CENTER = `It is not software to manage.
It is an embedded intelligence layer that governs how revenue work is prioritized, executed, and improved every day.`;

const BOTTOM_RIGHT = `Where traditional RCM tools tell you what went wrong after the fact, Neura works ahead of outcomes guiding decisions before revenue is lost.`;

export default function NeuraHeroSection() {
    return (
        <section className={styles.hero} aria-label="Neura AI hero">
            <div className={styles.leftCol}>
                <h1 className={styles.headline}>
                    The Intelligence That Makes Revenue Cycles Predict
                </h1>
            </div>
            <div className={styles.rightCol}>
                <p className={styles.rightTitle}>Neura AI</p>
            </div>
            <div className={styles.divider} aria-hidden>
                <span className={styles.dividerLine} />
                <span className={styles.dividerCrossWrap}>
                    <span className={styles.dividerCrossV} />
                    <span className={styles.dividerCrossCenter} />
                </span>
                <span className={styles.dividerLine} />
            </div>
            <div className={styles.bottomRow}>
                <div className={styles.bottomLeft}>
                    <p className={styles.bottomCopy}>{BOTTOM_LEFT}</p>
                </div>
                <div className={styles.bottomCenter}>
                    <p className={styles.bottomCopy}>{BOTTOM_CENTER}</p>
                </div>
                <div className={styles.bottomRight}>
                    <p className={styles.bottomCopy}>{BOTTOM_RIGHT}</p>
                </div>
            </div>
        </section>
    );
}
