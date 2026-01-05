import React from 'react';
import Image from 'next/image';
import styles from './AccessSection.module.css';

const AccessSection: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.header}>
                <div className={styles.titleWrapper}>
                    <div className={styles.dots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <h2 className={styles.title}>Access</h2>
                </div>
                <div className={styles.subtitle}>Headquarters</div>
            </div>

            <div className={styles.content}>
                {/* Left Side: Hero Image Card */}
                <div className={styles.imageCard}>
                    <Image
                        src="/poster/qefqe.webp"
                        alt="Winspire RCM"
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                {/* Right Side: Details */}
                <div className={styles.infoBox}>
                    <div className={styles.officeName}>Winspire RCM Headquarters</div>

                    <div className={styles.details}>
                        <div>Location: United States | Delaware</div>
                        <div>Industry: Healthcare Revenue Cycle Management</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.walkNote}>
                        Intelligence-Led RCM Services powered by Neura AI
                    </div>

                    <a href="/contact" className={styles.mapLink}>
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AccessSection;
