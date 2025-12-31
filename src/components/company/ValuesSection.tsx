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
                    <h2 className={styles.title}>Case studies</h2>
                </div>
                <div className={styles.subtitle}>Values we hold dear</div>
            </div>

            <div className={styles.grid}>
                {/* Card 01 - Be Innovative */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>01</span>
                    </div>

                    {/* Background Icon - Spiral/Galaxy shape for Innovation */}
                    <div className={styles.cardBgIcon}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0C44.77 0 0 44.77 0 100s44.77 100 100 100 100-44.77 100-100S155.23 0 100 0zm0 180c-44.18 0-80-35.82-80-80s35.82-80 80-80 80 35.82 80 80-35.82 80-80 80z" fill="currentColor" />
                            <path d="M100 40c-33.14 0-60 26.86-60 60s26.86 60 60 60 60-26.86 60-60-26.86-60-60-60zm0 100c-22.09 0-40-17.91-40-40s17.91-40 40-40 40 17.91 40 40-17.91 40-40 40z" fill="currentColor" />
                        </svg>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                            Multispecialty Group <br />– 18 Locations
                        </h3>
                        <div className={styles.divider}></div>
                        <p className={styles.cardDesc}>
                            <strong>Challenge:</strong><br />
                            High denial rates, unstructured AR, unpredictable revenue.<br /><br />
                            <strong>Solution:</strong><br />
                            Neura Predict + Neura AR + full RCM integration.<br /><br />
                            <strong>Outcome:</strong><br />
                            • Denials dropped from 18% to under 1%<br />
                            • AR days reduced by 32% in 120 days<br />
                            • TAT across all departments moved under 24 hours<br />
                            • Visibility increased provider satisfaction dramatically
                        </p>
                    </div>
                </div>

                {/* Card 02 - All For One */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>02</span>
                    </div>

                    {/* Background Icon - Connected circles/Nodes */}
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
                            Behavioral Health Network<br />– 60+ Therapists
                        </h3>
                        <div className={styles.divider}></div>
                        <p className={styles.cardDesc}>
                            <strong>Challenge:</strong><br />
                            Fragmented documentation, persistent coding errors, payer delays.<br /><br />
                            <strong>Solution:</strong><br />
                            Neura Code + Neura Flow + Denial automation.<br /><br />
                            <strong>Outcome:</strong><br />
                            • E&M coding accuracy improved by 28%<br />
                            • Appeals turnaround cut by 70%<br />
                            • 100% visibility across multiple locations<br />
                            • Cash flow stabilized within seven weeks
                        </p>
                    </div>
                </div>

                {/* Card 03 - Play Fair */}
                <div className={styles.card}>
                    <div className={styles.valueLabel}>
                        Case Study <span>03</span>
                    </div>

                    {/* Background Icon - Shield/Checkmark/Scale */}
                    <div className={styles.cardBgIcon}>
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 20L20 60v60c0 55.23 35.82 105.13 80 120 44.18-14.87 80-64.77 80-120V60l-80-40z" stroke="currentColor" strokeWidth="10" />
                            <path d="M60 100l30 30 50-50" stroke="currentColor" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>
                            Urgent Care System<br />– Multi-State
                        </h3>
                        <div className={styles.divider}></div>
                        <p className={styles.cardDesc}>
                            <strong>Challenge:</strong><br />
                            Missing charges, manual verification, inconsistent credentialing.<br /><br />
                            <strong>Solution:</strong><br />
                            Neura Charge + Neura Eligibility + Credentialing workflows.<br /><br />
                            <strong>Outcome:</strong><br />
                            • Charge capture increased by 22%<br />
                            • Prior auth compliance improved by 40%<br />
                            • Zero missed credentialing renewals<br />
                            • First pass rate increased to 98.7%
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ValuesSection;
