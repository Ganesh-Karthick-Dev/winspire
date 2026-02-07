/**
 * Culture Section Component for Temp Company Page
 * 
 * Transparent section with culture values numbered list.
 */

'use client';

import styles from '@/styles/CultureSection.module.css';

export default function CultureSection() {
    const values = [
        'Hire carefully and invest deeply in our people',
        'Trust teams with ownership and accountability',
        'Focus on outcomes rather than activity',
        'Recognize contributions consistently',
        'Encourage continuous learning and improvement',
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <div className={styles.textContent}>
                        <span className={styles.label}>
                            Our Culture
                        </span>
                        <h2 className={styles.heading}>
                            Stability Behind the Scenes Drives Consistency for Clients
                        </h2>
                        <div className={styles.description}>
                            <p>
                                We believe the strongest results come from stable, empowered teams.
                            </p>
                            <p>
                                Our culture is not built on slogans or perks. It is built to help
                                people do their best work sustainably.
                            </p>
                        </div>
                        <p className={styles.highlightBox}>
                            That stability shows up directly in the consistency our clients
                            experience.
                        </p>
                    </div>
                    
                    <div className={styles.imageWrapperLeft}>
                        {/* Image 1 - Left Bottom */}
                        <img 
                            src="/company/our culture.webp" 
                            alt="Team collaboration" 
                            className={styles.imageLeft}
                        />
                    </div>
                </div>

                {/* Right Column */}
                <div className={styles.rightColumn}>
                    <div className={styles.imageWrapperRight}>
                        {/* Image 2 - Right Top */}
                        <img 
                            src="/temp/31625.jpg" 
                            alt="Quality assurance" 
                            className={styles.imageRight}
                        />
                    </div>

                    <div className={styles.listCard}>
                        <h4 className={styles.listHeader}>
                            At Winspire, we:
                        </h4>
                        {values.map((item, i) => (
                            <div key={i} className={styles.listItem}>
                                <span className={styles.numberCircle}>
                                    0{i + 1}
                                </span>
                                <p className={styles.itemText}>
                                    {item}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
