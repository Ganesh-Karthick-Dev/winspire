import React from 'react';
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
                <div className={styles.subtitle}>location</div>
            </div>

            <div className={styles.content}>
                {/* Left Side: White Logo Card */}
                <div className={styles.imageCard}>
                    {/* Placeholder for Style Port / Winspire Logo */}
                    <div className={styles.logoText}>WINSPIRE</div>
                </div>

                {/* Right Side: Details */}
                <div className={styles.infoBox}>
                    <div className={styles.officeName}>Tokyo Office (Head Office)</div>

                    <div className={styles.details}>
                        <div>Address: 4-3-15 Jingumae, Shibuya-ku, Tokyo 150-0001, Room 322, Tokyo Central Omotesando</div>
                        <div>Tel: 03-6812-9555 (main number)</div>
                    </div>

                    <div className={styles.divider}></div>

                    <div className={styles.walkNote}>
                        3 minutes walk from Omotesando Station on the Ginza Line, Hanzomon Line, and Chiyoda Line
                    </div>

                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className={styles.mapLink}>
                        Google Maps
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AccessSection;
