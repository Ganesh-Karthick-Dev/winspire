'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from '@/styles/OutcomesCTA.module.css';

const OutcomesCTA = () => {
    return (
        <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
                <h2 className={styles.title}>Let’s Design Outcomes That Last</h2>
                <p className={styles.description}>
                    If you’re ready to move from reactive execution to intelligently designed performance, we’re ready to build it with you.
                </p>
                <Link href="/book-demo" className={styles.ctaButton}>
                    Book a Strategic Conversation
                    <span className={styles.arrowHit}>
                        <ArrowRight size={20} />
                    </span>
                </Link>
            </div>
        </section>
    );
};

export default OutcomesCTA;
