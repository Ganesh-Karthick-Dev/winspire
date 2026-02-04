'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '@/styles/OutcomesFuture.module.css';

// Register ScrollTrigger if in browser
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}
import { 
    Cpu, 
    Users, 
    Lightbulb 
} from 'lucide-react';

const OutcomesFuture = () => {
    const features = [
        {
            icon: <Cpu className="w-12 h-12" />,
            title: "Design systems",
            subtext: "instead of managing chaos",
        },
        {
            icon: <Users className="w-12 h-12" />,
            title: "Enable people",
            subtext: "instead of exhausting them",
        },
        {
            icon: <Lightbulb className="w-12 h-12" />,
            title: "Act on intelligence",
            subtext: "instead of assumptions",
        }
    ];

    const containerRef = React.useRef(null);
    const titleRef = React.useRef(null);
    const cardsRef = React.useRef<HTMLDivElement[]>([]);

    React.useEffect(() => {
        const ctx = gsap.context(() => {
             // Card Animation
             gsap.fromTo(cardsRef.current, 
                { 
                    y: 100, 
                    opacity: 0,
                    scale: 0.8
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Framer Motion variants for title reveal
    const titleVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const wordVariants = {
        hidden: { 
            y: "100%", 
            opacity: 0 
        },
        visible: { 
            y: "0%", 
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.33, 1, 0.68, 1] as const // Custom ease for smooth slide
            }
        }
    };

    const titleText = "Designed for What Comes Next";

    return (
        <section className={styles.sectionWrapper} ref={containerRef}>
            <div className={styles.backgroundGlow} />
            
            <div className={styles.contentContainer}>
                <div className={styles.headerContent}>
                    <motion.span 
                        className={styles.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Future Proof
                    </motion.span>
                    
                    <motion.h2 
                        className={styles.title}
                        ref={titleRef}
                        variants={titleVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className={styles.titleGradient}>
                             {titleText.split(" ").map((word, index) => (
                                <span key={index} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em", verticalAlign: "bottom" }}>
                                    <motion.span 
                                        variants={wordVariants}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}
                                    </motion.span>
                                </span>
                             ))}
                        </span>
                    </motion.h2>

                    <motion.p 
                        className={styles.description}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Healthcare reimbursement continues to evolve. 
                        Payers are becoming more automated and intelligent.
                        Organizations that succeed will be those that adapt.
                    </motion.p>
                </div>

                <div className={styles.cardsContainer}>
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={styles.card}
                            ref={el => { if(el) cardsRef.current[index] = el; }}
                        >
                            <div className={styles.topSection}>
                                <div className={styles.border}></div>
                                <div className={styles.iconContainer}>
                                    {feature.icon}
                                </div>
                            </div>
                            <div className={styles.bottomSection}>
                                <span className={styles.cardTitle}>{feature.title}</span>
                                <p className={styles.cardSubtext}>{feature.subtext}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.closingSection}>
                    <motion.h3 
                        className={styles.finalStatement}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        That future is not coming.<br />
                        <span className={styles.highlight}>It is already here.</span>
                    </motion.h3>
                </div>
            </div>
        </section>
    );
};

export default OutcomesFuture;
