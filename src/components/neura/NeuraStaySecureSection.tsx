"use client";
import React from "react";
import styles from "./NeuraStaySecureSection.module.css";
import { motion } from "framer-motion";

export default function NeuraStaySecureSection() {
    return (
        <section className={styles.section}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.title}
            >
                Stay secure
            </motion.h2>

            {/* Top Markers */}
            <div className={styles.markersRow}>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
            </div>

            <div className={styles.cardsGrid}>
                {/* Card 1 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={styles.card}
                >
                    <h3 className={styles.cardTitle}>
                        $100M<br />insurance
                    </h3>
                    <p className={styles.cardDescription}>
                        Crypto assets are insured up to $100M through institutional-grade coverage.
                    </p>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.card}
                >
                    <h3 className={styles.cardTitle}>
                        Advanced<br />protection
                    </h3>
                    <p className={styles.cardDescription}>
                        Accounts are opened within minutes. Onboarding takes less than an hour.
                    </p>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className={styles.card}
                >
                    <h3 className={styles.cardTitle}>
                        Regulated<br />institution
                    </h3>
                    <p className={styles.cardDescription}>
                        Keytom operates as a licensed financial institution in Canada and the Czech Republic.
                    </p>
                </motion.div>
            </div>

            {/* Bottom Markers */}
            <div className={styles.markersRowBottom}>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
                <span className={styles.marker}>+</span>
            </div>
        </section>
    );
}
