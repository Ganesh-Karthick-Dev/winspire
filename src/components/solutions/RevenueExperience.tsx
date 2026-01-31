import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from '../../styles/RevenueExperience.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const RevenueExperience: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const leftColumnRef = useRef<HTMLDivElement>(null);
    const stepsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Left Column Animation (Text then Image)
            const leftChildren = leftColumnRef.current?.children;
            if (leftChildren) {
                gsap.fromTo(
                    leftChildren,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.2,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        }
                    }
                );
            }

            // Steps Staggered Fade In
            const steps = stepsRef.current?.children;
            if (steps) {
                gsap.fromTo(
                    steps,
                    { opacity: 0, y: 50 }, // Changed to y for vertical stagger feel
                    {
                        opacity: 1,
                        y: 0, 
                        duration: 0.8,
                        stagger: 0.15,
                        delay: 0.4,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Using the user provided text content directly
    const userSteps = [
        {
            id: "01",
            title: "Improve eligibility accuracy",
            description: "Ensure that patient coverage is verified correctly from the start, minimizing downstream denials and delays."
        },
        {
            id: "02",
            title: "Reduce billing confusion",
            description: "Provide clear, understandable statements and explanations of benefits to prevent patient frustration."
        },
        {
            id: "03",
            title: "Set clear financial expectations",
            description: "Empower patients with accurate cost estimates and payment options before care is delivered."
        },
        {
            id: "04",
            title: "Resolve issues faster",
            description: "Implement responsive support and streamlined dispute resolution workflows to maintain patient satisfaction."
        }
    ];

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                {/* Left Column: Text */}
                <div className={styles.leftColumn} ref={leftColumnRef}>
                    <div className={styles.textBlock}>
                        <div className={styles.tag}>4. Revenue Experience That Respects Patients</div>
                        <h2 className={styles.title}>
                            Where Financial <br/>
                            <span className={styles.titleHighlight}>Performance Meets Patient Trust</span>
                        </h2>
                        <h3 className={styles.subtitle}>Revenue operations and patient experience are deeply connected.</h3>
                        <p className={styles.introText}>
                            Our patient access and revenue experience solutions help organizations:
                        </p>
                    </div>
                </div>

                {/* Right Column: Steps Grid */}
                <div className={styles.rightColumn}>
                    <div className={styles.stepsList} ref={stepsRef}>
                        {userSteps.map((step) => (
                            <div key={step.id} className={styles.stepItem}>
                                <div className={styles.stepNumber}>{step.id}</div>
                                <div className={styles.stepContent}>
                                    <h4 className={styles.stepTitle}>{step.title}</h4>
                                    <p className={styles.stepDescription}>{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RevenueExperience;
