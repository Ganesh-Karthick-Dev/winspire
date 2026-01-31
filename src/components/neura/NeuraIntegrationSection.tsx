"use client";
import React, { useEffect, useRef } from "react";
import styles from "./NeuraIntegrationSection.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextRevealByWord } from "@/components/ui/text-reveal";

export default function NeuraIntegrationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Title Animation - Keep the sticky title entry
            gsap.to(titleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const content = [
        "Neura is not sold as standalone software.",
        "It is embedded into how Winspire designs and executes tailored revenue operations.",
        "It enables visibility without micromanagement, offshore execution without risk, accountability without friction, and scale without quality loss.",
        "Technology exists here for one reason to help people perform at their best, consistently."
    ];

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.glow} />
            <div className={styles.container}>
                <div className={styles.titleWrapper}>
                    <h2 className={styles.title} ref={titleRef}>
                        How Neura Fits Into the Winspire Model
                    </h2>
                </div>
                {/* Replace list of paragraphs with Text Reveal */}
                <div className={styles.content}>
                    <TextRevealByWord text={content} />
                </div>
            </div>
        </section>
    );
}
