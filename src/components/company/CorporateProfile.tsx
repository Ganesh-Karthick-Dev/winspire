import React from 'react';
import styles from './CorporateProfile.module.css';

const CorporateProfile: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Corporate Profile</h2>
                </div>
                <div className={styles.subtitle}>Company Information</div>
            </div>

            <div className={styles.grid}>
                {/* Row 1 */}
                <div className={styles.item}>
                    <div className={styles.label}>Company Name</div>
                    <div className={styles.valueBox}>
                        Winspire RCM
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Industry</div>
                    <div className={styles.valueBox}>
                        Healthcare Revenue Cycle Management
                    </div>
                </div>

                {/* Row 2 */}
                <div className={styles.item}>
                    <div className={styles.label}>Headquarters</div>
                    <div className={styles.valueBox}>
                        United States | Delaware
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Core Offering</div>
                    <div className={styles.valueBox}>
                        Intelligence-Led RCM Services
                    </div>
                </div>

                {/* Row 3 */}
                <div className={styles.item}>
                    <div className={styles.label}>Platform</div>
                    <div className={styles.valueBox}>
                        Neura AI – RCM Operating System
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Primary Markets</div>
                    <div className={styles.valueBox}>
                        Hospitals, Physician Groups, PE-Backed Healthcare
                    </div>
                </div>

                {/* Row 4 - Full Width */}
                <div className={styles.item} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.label}>Positioning</div>
                    <div className={styles.valueBox}>
                        Outcome-Focused. Intelligence-Driven. Transparent by Design.
                    </div>
                </div>

                {/* What We Do - Full Width */}
                <div className={styles.item} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.label}>What We Do</div>
                    <div className={styles.valueBox} style={{ alignItems: 'flex-start' }}>
                        <div className={styles.boardList}>
                            <div>• Registration, Eligibility & Benefits Verification, Pre-Authorization</div>
                            <div>• Coding and charge integrity</div>
                            <div>• Billing, Claim submission, and Payer management</div>
                            <div>• Denials and Appeals optimization</div>
                            <div>• AR follow-up and liquidation intelligence</div>
                            <div>• Reports, Revenue analytics and executive visibility</div>
                        </div>
                    </div>
                </div>

                {/* Our Philosophy - Full Width */}
                <div className={styles.item} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.label}>Our Philosophy</div>
                    <div className={styles.valueBox} style={{ alignItems: 'flex-start' }}>
                        <div className={styles.boardList}>
                            <div>• Revenue problems are predictable</div>
                            <div>• Prevention beats correction</div>
                            <div>• Transparency builds trust</div>
                            <div>• Systems scale better than heroics</div>
                            <div>• Outcomes matter more than effort</div>
                        </div>
                    </div>
                </div>

                {/* Compliance */}
                <div className={styles.item} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.label}>Compliance & Security</div>
                    <div className={styles.valueBox}>
                        HIPAA compliant operations on Azure Cloud with industry best practices for security, access control, and data protection.
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CorporateProfile;
