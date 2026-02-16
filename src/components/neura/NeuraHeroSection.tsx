/**
 * Neura AI Hero Section
 * Top: headline (left) + Neura AI (right). Divider. Bottom: left / center / right copy.
 */

'use client';

import { useEffect, useState } from 'react';
import styles from './NeuraHeroSection.module.css';

const BOTTOM_LEFT = `Revenue cycles rarely fail because teams lack effort.
They fail because the system lacks intelligence.
Neura AI was built to solve that problem.`;

const BOTTOM_CENTER = `It is not software to manage.
It is an embedded intelligence layer that governs how revenue work is prioritized, executed, and improved every day.`;

const BOTTOM_RIGHT = `Where traditional RCM tools tell you what went wrong after the fact, Neura AI works ahead of outcomes guiding decisions before revenue is lost.`;

export default function NeuraHeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Wait briefly to ensure loader state is initialized
        const timer = setTimeout(() => {
            const isLoaderActive = document.body.classList.contains('loading');

            if (!isLoaderActive) {
                setMounted(true);
            } else {
                // If loader is active, wait for it to disappear
                const observer = new MutationObserver((mutations) => {
                    for (const mutation of mutations) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            if (!document.body.classList.contains('loading')) {
                                setMounted(true);
                                observer.disconnect();
                            }
                        }
                    }
                });

                observer.observe(document.body, { attributes: true });
                return () => observer.disconnect();
            }
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.hero} aria-label="Neura AI hero">
            <div className={styles.leftCol}>
                <h1 className={styles.headline}>
                    The Intelligence That Makes Revenue Cycles Predict
                </h1>
            </div>
            <div className={styles.rightCol}>
                <p className={styles.rightTitle}>Neura AI<sup style={{ fontSize: '0.4em', verticalAlign: 'top', marginLeft: '0.1em', color: '#0D1F47', WebkitTextFillColor: 'initial' }}>TM</sup></p>
            </div>
            <div className={styles.divider} aria-hidden>
                <span className={styles.dividerLine} />
                <span className={styles.dividerCrossWrap}>
                    <span className={styles.dividerCrossV} />
                    <span className={styles.dividerCrossCenter} />
                </span>
                <span className={styles.dividerLine} />
            </div>
            <div className={`${styles.bottomRow} ${mounted ? styles.loaded : ''}`}>
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
