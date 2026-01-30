import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/TargetedSolutions.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const TargetedSolutions: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text animations
            gsap.fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            // Grid items animations
            const gridItems = gridRef.current?.children;
            if (gridItems) {
                Array.from(gridItems).forEach((item, index) => {
                    const xOffset = index % 2 === 0 ? -50 : 50; // Slide from left for odd columns, right for even
                    gsap.fromTo(
                        item,
                        { x: xOffset, opacity: 0 },
                        {
                            x: 0,
                            opacity: 1,
                            duration: 0.8,
                            delay: index * 0.1 + 0.4,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: gridRef.current,
                                start: 'top 85%',
                            },
                        }
                    );
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const solutions = [
        "AR follow-up and denial management",
        "Coding quality and charge integrity",
        "Eligibility and patient access optimization",
        "Underpayment recovery and payer follow-ups"
    ];

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.tag}>Targeted Solutions</div>
                    <h2 className={styles.title} ref={titleRef}>
                        Targeted Solutions Without Disruption
                    </h2>
                    <div className={styles.content} ref={subtitleRef}>
                        <h3 className={styles.subtitle}>Solve What Matters Most</h3>
                        <p className={styles.description}>
                            Some organizations need full RCM support. Others need focused intervention where performance is breaking down. Winspire integrates seamlessly into existing workflows to deliver measurable improvement across:
                        </p>
                    </div>
                </div>

                <div className={styles.rightColumn} ref={gridRef}>
                    {solutions.map((text, index) => (
                        <div key={index} className={styles.card}>
                            <h4 className={styles.cardText}>{text}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetedSolutions;
