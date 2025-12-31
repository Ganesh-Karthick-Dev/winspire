import React from 'react';
import styles from './ValuesSection.module.css';

const ValuesSection: React.FC = () => {
    return (
        <section className={styles.valuesSection}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Case Studies</h2>
                </div>
                <div className={styles.subtitle}>Real results from real clients</div>
            </div>

            <div className={styles.grid}>
                {/* Card 01 - Multispecialty Group */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>01</span>
                    </div>

                    {/* Background Icon - Medical/Healthcare */}
                    <div className={styles.cardBgIcon}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 20L20 60v60c0 55.23 35.82 105.13 80 120 44.18-14.87 80-64.77 80-120V60l-80-40z" stroke="currentColor" strokeWidth="10" />
                            <path d="M100 70v60M70 100h60" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
                        </svg>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                            Multispecialty<br />Group
                        </h3>
                        <p className={styles.cardSubtitle}>18 Locations</p>
                        <div className={styles.divider}></div>
                        <div className={styles.cardDesc}>
                            <p className={styles.challengeLabel}>Challenge:</p>
                            <p>High denial rates, unstructured AR, unpredictable revenue.</p>
                            <p className={styles.solutionLabel}>Solution:</p>
                            <p>Neura Predict + Neura AR + full RCM integration.</p>
                            <p className={styles.outcomeLabel}>Outcome:</p>
                            <ul className={styles.outcomeList}>
                                <li>Denials dropped from 18% to under 1%</li>
                                <li>AR days reduced by 32% in 120 days</li>
                                <li>TAT across all departments under 24 hours</li>
                                <li>Provider satisfaction increased dramatically</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Card 02 - Behavioral Health Network */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>02</span>
                    </div>

                    {/* Background Icon - Network/Brain */}
                    <div className={styles.cardBgIcon}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="20" />
                            <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="15" />
                            <circle cx="160" cy="40" r="20" stroke="currentColor" strokeWidth="15" />
                            <circle cx="40" cy="160" r="20" stroke="currentColor" strokeWidth="15" />
                            <circle cx="160" cy="160" r="20" stroke="currentColor" strokeWidth="15" />
                            <line x1="60" y1="60" x2="80" y2="80" stroke="currentColor" strokeWidth="8" />
                            <line x1="140" y1="60" x2="120" y2="80" stroke="currentColor" strokeWidth="8" />
                            <line x1="60" y1="140" x2="80" y2="120" stroke="currentColor" strokeWidth="8" />
                            <line x1="140" y1="140" x2="120" y2="120" stroke="currentColor" strokeWidth="8" />
                        </svg>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                            Behavioral<br />Health Network
                        </h3>
                        <p className={styles.cardSubtitle}>60+ Therapists</p>
                        <div className={styles.divider}></div>
                        <div className={styles.cardDesc}>
                            <p className={styles.challengeLabel}>Challenge:</p>
                            <p>Fragmented documentation, persistent coding errors, payer delays.</p>
                            <p className={styles.solutionLabel}>Solution:</p>
                            <p>Neura Code + Neura Flow + Denial automation.</p>
                            <p className={styles.outcomeLabel}>Outcome:</p>
                            <ul className={styles.outcomeList}>
                                <li>E&M coding accuracy improved by 28%</li>
                                <li>Appeals turnaround cut by 70%</li>
                                <li>100% visibility across multiple locations</li>
                                <li>Cash flow stabilized within seven weeks</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Card 03 - Urgent Care System */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>03</span>
                    </div>

                    {/* Background Icon - Multi-location/Map */}
                    <div className={styles.cardBgIcon}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 20c-33.14 0-60 26.86-60 60 0 45 60 100 60 100s60-55 60-100c0-33.14-26.86-60-60-60z" stroke="currentColor" strokeWidth="12" />
                            <circle cx="100" cy="80" r="20" stroke="currentColor" strokeWidth="10" />
                        </svg>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                            Urgent Care<br />System
                        </h3>
                        <p className={styles.cardSubtitle}>Multi-State</p>
                        <div className={styles.divider}></div>
                        <div className={styles.cardDesc}>
                            <p className={styles.challengeLabel}>Challenge:</p>
                            <p>Missing charges, manual verification, inconsistent credentialing.</p>
                            <p className={styles.solutionLabel}>Solution:</p>
                            <p>Neura Charge + Neura Eligibility + Credentialing workflows.</p>
                            <p className={styles.outcomeLabel}>Outcome:</p>
                            <ul className={styles.outcomeList}>
                                <li>Charge capture increased by 22%</li>
                                <li>Prior auth compliance improved by 40%</li>
                                <li>Zero missed credentialing renewals</li>
                                <li>First pass rate increased to 98.7%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;
