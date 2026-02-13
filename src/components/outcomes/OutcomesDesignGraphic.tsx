import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from '@/styles/OutcomesContent.module.css';

interface OutcomesDesignGraphicProps {
    items: string[];
    isActive: boolean;
}

const OutcomesDesignGraphic: React.FC<OutcomesDesignGraphicProps> = ({ items, isActive }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const ctx = gsap.context(() => {
            if (isActive) {
                // Initial states
                gsap.set('.segment', { opacity: 0, scale: 0.8, transformOrigin: 'center left' });
                gsap.set('.line', { strokeDasharray: 200, strokeDashoffset: 200 });
                gsap.set('.point-text', { opacity: 0, x: -20 });

                // Animation sequence
                const tl = gsap.timeline();

                tl.to('.segment', {
                    opacity: 1,
                    scale: 1,
                    stagger: 0.4,
                    duration: 1.2,
                    ease: 'back.out(1.7)'
                })
                .to('.line', {
                    strokeDashoffset: 0,
                    stagger: 0.4,
                    duration: 1.2,
                    ease: 'power2.out'
                }, '-=0.8')
                .to('.point-text', {
                    opacity: 1,
                    x: 0,
                    stagger: 0.4,
                    duration: 0.8,
                    ease: 'power2.out'
                }, '-=0.8');
            } else {
                // Reset or fade out if needed
                gsap.to(svgRef.current, { opacity: 0.5, duration: 0.5 });
            }
        }, svgRef);

        return () => ctx.revert();
    }, [isActive]);

    return (
        <div className={styles.designGraphicWrapper}>
            <svg
                ref={svgRef}
                viewBox="0 0 500 500" // Widened viewBox slightly for longer text
                className={styles.designGraphicSvg}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Segment 1 - Pinkish Red */}
                <g className="segment">
                    <path
                        d="M100 150 C 140 150, 160 170, 160 210 L 120 210 C 120 185, 110 175, 80 175 L 80 150 Z"
                        fill="#FF4D7D"
                    />
                    <text x="95" y="195" fill="white" fontSize="12" fontWeight="bold" transform="rotate(-90, 95, 195)">STEP</text>
                    <text x="120" y="195" fill="white" fontSize="32" fontWeight="bold">01</text>
                    <path className="line" d="M165 180 L 220 180 L 240 160" stroke="#FF4D7D" strokeWidth="2" />
                    <circle cx="240" cy="160" r="4" fill="#FF4D7D" />
                </g>

                {/* Segment 2 - Orange */}
                <g className="segment">
                    <path
                        d="M165 220 C 195 220, 210 235, 210 265 C 210 295, 195 310, 165 310 L 140 310 C 160 310, 170 295, 170 265 C 170 235, 160 220, 140 220 Z"
                        fill="#FF9533"
                    />
                    <text x="155" y="270" fill="white" fontSize="12" fontWeight="bold" transform="rotate(-90, 155, 270)">STEP</text>
                    <text x="180" y="278" fill="white" fontSize="32" fontWeight="bold">02</text>
                    <path className="line" d="M215 265 L 280 265" stroke="#FF9533" strokeWidth="2" />
                    <circle cx="280" cy="265" r="4" fill="#FF9533" />
                </g>

                {/* Segment 3 - Blue */}
                <g className="segment">
                    <path
                        d="M100 380 C 140 380, 160 360, 160 320 L 120 320 C 120 345, 110 355, 80 355 L 80 380 Z"
                        fill="#33B5E5"
                    />
                    <text x="95" y="340" fill="white" fontSize="12" fontWeight="bold" transform="rotate(-90, 95, 340)">STEP</text>
                    <text x="120" y="345" fill="white" fontSize="32" fontWeight="bold">03</text>
                    <path className="line" d="M165 350 L 220 350 L 240 370" stroke="#33B5E5" strokeWidth="2" />
                    <circle cx="240" cy="370" r="4" fill="#33B5E5" />
                </g>

                {/* Text Labels - Mapping the SOLUTIONS items now */}
                {/* Note: Colors are lightened for readability on dark glass */}
                <g className="point-text">
                    <text x="250" y="155" fill="#f8fafc" fontSize="18" fontWeight="bold">{items[0]}</text>
                </g>
                <g className="point-text">
                    <text x="290" y="270" fill="#f8fafc" fontSize="18" fontWeight="bold">{items[1]}</text>
                </g>
                <g className="point-text">
                    <text x="250" y="375" fill="#f8fafc" fontSize="18" fontWeight="bold">{items[2]}</text>
                </g>

                {/* Updated Vertical Label */}
                <text x="50" y="250" fill="#cbd5e1" fontSize="20" fontWeight="bold">SYSTEM</text>
                <text x="30" y="285" fill="#e2e8f0" fontSize="28" fontWeight="900">DESIGN</text>
            </svg>
        </div>
    );
};

export default OutcomesDesignGraphic;
