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
                Cross-Department Alignment at Scale
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={styles.subtitle}
            >
                Neura aligns billing, coding, AR, denials, eligibility, and posting around enterprise-level outcomes.
            </motion.p>

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
                        Predictable<br />Timelines
                    </h3>
                    <p className={styles.cardDescription}>
                        Clear turnaround times
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
                        Real-time<br />Control
                    </h3>
                    <p className={styles.cardDescription}>
                        Real-time SLA risk alerts
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
                        Connected<br />Workflows
                    </h3>
                    <p className={styles.cardDescription}>
                        Structured, visible handoffs across teams
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
