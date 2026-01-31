"use client";
import React from "react";
import { HeroDitheringCard } from "@/components/ui/hero-dithering-card";
import styles from "./NeuraCTASection.module.css";

export default function NeuraCTASection() {
    return (
        <div className={styles.section}>
            <HeroDitheringCard />
        </div>
    );
}
