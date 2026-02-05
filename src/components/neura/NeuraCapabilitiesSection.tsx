'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import styles from './NeuraCapabilitiesSection.module.css';
import {
    ShieldCheck,
    Zap,
    Users,
    LineChart,
    Settings
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const capabilities = [
    {
        id: 1,
        title: "Revenue Protection and Yield Improvement",
        description: "Neura shifts revenue protection upstream. It predicts risk before claims are submitted.",
        outcomes: [
            { text: "30–50% fewer avoidable denials", min: 30, max: 50 },
            { text: "2–3% higher liquidation on aged AR", min: 2, max: 3 },
            { text: "10–20% higher appeal overturn rates", min: 10, max: 20 }
        ],
        takeaway: "Revenue is protected early instead of chased late.",
        icon: ShieldCheck,
        colorClass: styles.cardBlue,
        image: "/temp/revenue_abstract.png"
    },
    {
        id: 2,
        title: "Speed, Throughput, and Operational Efficiency",
        description: "Neura eliminates time lost searching and waiting. Automated checks prioritize work by urgency.",
        outcomes: [
            { text: "30–50% reduction in time/claim", min: 30, max: 50 },
            { text: "3–5 days faster resolution", min: 3, max: 5 },
            { text: "5–10% fewer SLA misses", min: 5, max: 10 }
        ],
        takeaway: "Time shifts from gathering to action.",
        icon: Zap,
        colorClass: styles.cardPink,
        image: "/temp/speed_abstract.png"
    },
    {
        id: 4,
        title: "People Performance and Quality at Scale",
        description: "Neura turns individual effort into consistent performance, unifying productivity and quality.",
        outcomes: [
            { text: "10–15% productivity gain", min: 10, max: 15 },
            { text: "20–30% error reduction", min: 20, max: 30 },
            { text: "30–40% faster onboarding", min: 30, max: 40 }
        ],
        takeaway: "Performance scales without burnout.",
        icon: Users,
        colorClass: styles.cardPurple,
        image: "/temp/people_abstract.png"
    },
    {
        id: 3,
        title: "Leadership Visibility and Control",
        description: "Neura replaces lagging reports with live operational insight. Real-time dashboards drive better decisions.",
        outcomes: [
            { text: "1–2% net collections improvement" },
            { text: "5–7 days earlier intervention" }
        ],
        takeaway: "Reacting → Guiding",
        icon: LineChart,
        colorClass: styles.cardCyan,
        image: "/temp/leadership_abstract.png"
    },
    {
        id: 5,
        title: "Culture, Alignment, and Continuous Improvement",
        description: "Neura embeds recognition, learning, and improvement into daily execution. Aligning teams to shared goals.",
        outcomes: [
            { text: "Lower attrition (top performers)" },
            { text: "1–3% efficiency gains YoY" }
        ],
        takeaway: "Episodic → Continuous",
        icon: Settings,
        colorClass: styles.cardGold,
        // Using placeholder until generated
        image: "/temp/culture_abstract_fluid.png" 
    }
];

const NeuraCapabilitiesSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeId, setActiveId] = useState<number>(1);

    useLayoutEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            const ctx = gsap.context(() => {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=5000",
                    pin: true,
                    scrub: 0.5,
                    onUpdate: (self) => {
                        // Add a buffer: 0.0 to 0.15 is all Card 1
                        // 0.15 to 1.0 is mapped to 0 to 1 for the rest
                        const buffer = 0.15;
                        const adjustedProgress = Math.max(0, (self.progress - buffer) / (1 - buffer));

                        const index = Math.min(
                            capabilities.length - 1,
                            Math.floor(adjustedProgress * capabilities.length)
                        );
                        const newActiveId = capabilities[index].id;
                        setActiveId(prev => (prev !== newActiveId ? newActiveId : prev));
                    }
                });
            }, sectionRef);
            return () => ctx.revert();
        });

        mm.add("(max-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const cards = gsap.utils.toArray<HTMLElement>(`.${styles.card}`);
                
                // Ensure initial state is clean before animating
                gsap.set(cards, { clearProps: "all" });

                cards.forEach((card) => {
                    gsap.fromTo(card, 
                        { opacity: 0, y: 50 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: card,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                });
            }, sectionRef);
            return () => ctx.revert();
        });

        return () => mm.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.container}>
                {capabilities.map((cap) => (
                    <div
                        key={cap.id}
                        data-id={cap.id}
                        className={`${styles.card} ${cap.colorClass} ${activeId === cap.id ? styles.expanded : styles.collapsed}`}
                    >
                        <div className={styles.cardContent}>
                            <div className={styles.iconWrapper}>
                                <cap.icon className={styles.icon} />
                            </div>
                            <h3 className={styles.cardTitle}>{cap.title}</h3>
                            
                            <div className={styles.details}>
                                <div className={styles.detailsInner}>
                                    <p className={styles.cardDescription}>{cap.description}</p>
                                    <div className={styles.outcomesWrapper}>
                                        {cap.outcomes.map((outcome, i) => (
                                            <div key={i} className={styles.outcomeItem}>
                                                <div className={styles.dot} />
                                                <span>{outcome.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.cardTakeaway}>{cap.takeaway}</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className={styles.imageOverlay} />
                        <img src={cap.image} alt={cap.title} className={styles.cardImage} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NeuraCapabilitiesSection;
