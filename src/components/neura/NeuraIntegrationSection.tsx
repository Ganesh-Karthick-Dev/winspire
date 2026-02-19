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
        "Neura Ai™ is not sold as standalone software.",
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
                        How <span style={{ whiteSpace: 'nowrap' }}>Neura Ai<span style={{ fontSize: '0.35em', verticalAlign: 'super', marginLeft: '0.25em', color: '#0D1F47', WebkitTextFillColor: '#0D1F47', display: 'inline-block', lineHeight: '1', position: 'relative', top: '-0.25em' }}>TM</span></span> Fits Into the Winspire Model
                    </h2>
                </div>
                <div className={styles.content}>
                    {content.map((text, i) => (
                        <p key={i} className={styles.paragraph}>
                            {text}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
