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

    // Refs for individual cards to handle glass light effect
    const cardRef1 = useRef<HTMLDivElement>(null);
    const cardRef2 = useRef<HTMLDivElement>(null);
    const cardRef3 = useRef<HTMLDivElement>(null);
    const cardRef4 = useRef<HTMLDivElement>(null);
    const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, ref: React.RefObject<HTMLDivElement>) => {
        const card = ref.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

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

            // Grid items animations - cards spread from center to their positions
            const gridItems = gridRef.current?.children;
            if (gridItems) {
                Array.from(gridItems).forEach((item, index) => {
                    // 2x2 grid: cards animate from center outward to corners
                    // 0=top-left, 1=top-right, 2=bottom-left, 3=bottom-right
                    const col = index % 2;
                    const row = Math.floor(index / 2);
                    const spreadDist = 120;
                    const xOffset = col === 0 ? spreadDist : -spreadDist; // move from center
                    const yOffset = row === 0 ? spreadDist : -spreadDist;
                    gsap.set(item, { transformOrigin: 'center center' });
                    gsap.fromTo(
                        item,
                        {
                            x: xOffset,
                            y: yOffset,
                            scale: 0.3,
                            opacity: 0,
                        },
                        {
                            x: 0,
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.9,
                            delay: index * 0.08 + 0.3,
                            ease: 'back.out(1.4)',
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
                        <div 
                            key={index} 
                            className={styles.card}
                            ref={cardRefs[index]}
                            onMouseMove={(e) => handleMouseMove(e, cardRefs[index])}
                        >
                            <div className={styles.grainOverlay} aria-hidden="true" />
                            <div className={styles.lightEffect} aria-hidden="true" />
                            <div className={styles.cardContent}>
                                <h4 className={styles.cardText}>{text}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TargetedSolutions;
