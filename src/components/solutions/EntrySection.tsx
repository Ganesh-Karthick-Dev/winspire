'use client';

import React from 'react';
import styles from './EntrySection.module.css';

const EntrySection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Top Row: 2 Split Cards */}
                <div className={styles.gridRow}>
                    {/* Casual Interviews */}
                    <a href="#" className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.title}>Casual Interviews</h3>
                            <p className={styles.subtitle}>Have a casual interview</p>
                        </div>
                        <div className={styles.actionArea}>
                            <div className={styles.divider}></div>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                                    <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </a>

                    {/* Employment Inquiries */}
                    <a href="#" className={styles.card}>
                        <div className={styles.cardContent}>
                            <h3 className={styles.title}>Employment Inquiries</h3>
                            <p className={styles.subtitle}>Recruitment inquiries</p>
                        </div>
                        <div className={styles.actionArea}>
                            <div className={styles.divider}></div>
                            <div className={styles.iconWrapper}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
                                    <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Bottom Row: Full Width Entry Card */}
                <a href="#" className={`${styles.card} ${styles.entryCard}`}>
                    <div className={styles.cardContent}>
                        <h3 className={styles.entryTitle}>Entry</h3>
                        <p className={styles.entrySubtitle}>Apply</p>
                    </div>
                    <div className={styles.actionArea}>
                        <div className={`${styles.divider} ${styles.lightDivider}`}></div>
                        <div className={styles.iconWrapper}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIconWhite}>
                                <path d="M5 12H19M19 12L15 8M19 12L15 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    );
};

export default EntrySection;
