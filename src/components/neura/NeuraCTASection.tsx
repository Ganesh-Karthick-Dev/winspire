"use client";
import React from "react";
import { HeroDitheringCard } from "@/components/ui/hero-dithering-card";
import styles from "./NeuraCTASection.module.css";

import { useRouter } from "next/router";

export default function NeuraCTASection() {
    const router = useRouter();
    return (
        <div className={styles.section}>
            <HeroDitheringCard onClick={() => router.push('/book-demo')} />
        </div>
    );
}
