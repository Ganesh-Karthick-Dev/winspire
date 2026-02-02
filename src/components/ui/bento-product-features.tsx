"use client";

import * as React from "react";
import { motion } from "framer-motion";
import styles from "./bento-product-features.module.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

interface BentoGridShowcaseProps {
  integration: React.ReactNode;
  trackers: React.ReactNode;
  statistic: React.ReactNode;
  focus: React.ReactNode;
  productivity: React.ReactNode;
  shortcuts: React.ReactNode;
  className?: string;
}

export const BentoGridShowcase = ({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className,
}: BentoGridShowcaseProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${styles.bentoGrid} ${className ?? ""}`.trim()}
    >
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotIntegration}`}>
        {integration}
      </motion.div>
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotTrackers}`}>
        {trackers}
      </motion.div>
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotStatistic}`}>
        {statistic}
      </motion.div>
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotFocus}`}>
        {focus}
      </motion.div>
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotProductivity}`}>
        {productivity}
      </motion.div>
      <motion.div variants={itemVariants} className={`${styles.slot} ${styles.slotShortcuts}`}>
        {shortcuts}
      </motion.div>
    </motion.section>
  );
};
