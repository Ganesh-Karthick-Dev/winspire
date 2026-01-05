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
