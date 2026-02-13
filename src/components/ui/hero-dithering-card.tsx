import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useState, useRef } from "react";
import styles from "./hero-dithering-card.module.css";

// Placeholder for the missing shader package
// const Dithering = lazy(() =>
//    import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
// );

export function HeroDitheringCard({ onClick }: { onClick?: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update CSS variables directly for performance (no re-renders)
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <section className={styles.container}>
            <div
                className={styles.wrapper}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={cardRef}
                    className={styles.card}
                    onMouseMove={handleMouseMove}
                >
                    {/* Fallback for missing shader */}
                    <div className={styles.shaderBackground}>
                        <div className={styles.cssDithering} />
                    </div>

                    <div className={styles.content}>
                        {/* Headline */}
                        <h2 className={styles.headline}>
                            Built for Automation <br />
                            and What Comes Next
                        </h2>

                        {/* Description */}
                        <p className={styles.description}>
                            Automation only works when structure exists.
                            <br /><br />
                            Neura AI provides the foundation for safe automation, agentic AI, and autonomous execution with compliance guardrails.
                            <br /><br />
                            Clarity comes first. <br />
                            Automation follows.
                        </p>

                        {/* Button */}
                        <button onClick={onClick} className={styles.button}>
                            <span className={styles.buttonText}>Get Started</span>
                            <ArrowRight className={styles.buttonIcon} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
