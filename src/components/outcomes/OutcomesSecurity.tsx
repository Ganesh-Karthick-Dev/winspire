import styles from '@/styles/OutcomesSecurity.module.css';
import { motion } from 'framer-motion';

const OutcomesSecurity = () => {
    const cards = [
        {
            img: "/temp/azure-cloud.png",
            title: "Azure Cloud",
            desc: "Enterprise-grade infrastructure securely hosting all data."
        },
        {
            img: "/temp/us-data-shield.png",
            title: "US Data Residency",
            desc: "100% of data remains within US borders, guaranteed."
        },
        {
            img: "/temp/compliance-badge.png",
            title: "Compliance",
            desc: "Fully certified HIPAA, ISO, and ISMS compliant standards."
        },
        {
            img: "/temp/phi-governance-lock.png",
            title: "PHI Governance",
            desc: "Strict access controls and governance for all sensitive data."
        }
    ];

    return (
        <section className={styles.sectionWrapper}>
            <div className={styles.glassContainer}>
                
                <div className={styles.headerContent}>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className={styles.subLabel}
                    >
                        Security & Trust
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className={styles.title}
                    >
                        Security is Not a Feature.<br />
                        It is a Baseline Expectation.
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className={styles.description}
                    >
                        Outcomes are meaningless without trust. Our operating environment is built with security as a foundation, ensuring your data is protected at every layer.
                    </motion.p>
                </div>

                <div className={styles.cardsGrid}>
                    {cards.map((card, index) => (
                        <motion.div 
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 + (index * 0.1) }}
                        >
                            {/* Clipped background circle */}
                            <div className={styles.circleClip}>
                                <div className={styles.circleBg}></div>
                            </div>

                            {/* Overflowing icon */}
                            <div className={styles.iconContainer}>
                                <img src={card.img} alt={card.title} className={styles.iconImg} />
                            </div>

                            <div className={styles.cardInfo}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p className={styles.cardDesc}>{card.desc}</p>
                            </div>
                            <a href="#" className={styles.button}>Secure Now</a>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default OutcomesSecurity;
