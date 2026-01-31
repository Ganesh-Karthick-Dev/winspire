"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import styles from "./scroll-morph-hero.module.css";

// --- FlipCard Component ---
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

interface FlipCardProps {
    src: string;
    index: number;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

function FlipCard({ src, index, target }: FlipCardProps) {
    return (
        <motion.div
            // Use directly mapped values for smooth, tied-to-scroll animation
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                // Quick spring for responsiveness to scroll scrubbing
                type: "spring", stiffness: 60, damping: 15
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={styles.flipCard}
        >
            <div className={styles.flipCardInner}>
                <div className={styles.flipCardFront} style={{ backfaceVisibility: "hidden" }}>
                    <img src={src} alt={`hero-${index}`} className={styles.flipCardImage} />
                    <div className={styles.flipCardOverlay} />
                </div>
                <div className={styles.flipCardBack} style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <div className={styles.flipCardBackText}>
                        <p className={styles.flipCardBackLabel}>View</p>
                        <p className={styles.flipCardBackTitle}>Details</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Hero Component ---
const TOTAL_IMAGES = 20;

const IMAGES = [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=300&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80",
    "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=300&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&q=80",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=80",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&q=80",
    "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=300&q=80",
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=300&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=300&q=80",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=300&q=80",
    "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=300&q=80",
    "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=300&q=80",
    "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=300&q=80",
    "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=300&q=80",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
const invLerp = (start: number, end: number, value: number) => Math.min(Math.max((value - start) / (end - start), 0), 1);

interface ScrollMorphHeroProps {
    scrollProgress?: number; // 0 to 1
}

export default function ScrollMorphHero({ scrollProgress = 0 }: ScrollMorphHeroProps) {
    // TIMELINE CONFIGURATION
    // 0.00 -> 0.15: Scatter -> Circle
    // 0.15 -> 0.40: Circle -> Arc
    // 0.40 -> 1.00: Rotate Arc

    // 1. Calculate Progress for each phase
    const scatterToCircleProgress = invLerp(0, 0.15, scrollProgress);
    const circleToArcProgress = invLerp(0.15, 0.40, scrollProgress);
    const rotationProgress = invLerp(0.40, 1.00, scrollProgress);

    // 2. Pre-calculate Positions
    // Scatter Positions (Memoized)
    const scatterPositions = useMemo(() => {
        return IMAGES.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
        }));
    }, []);

    // Derived Values for UI
    const introOpacity = 1 - circleToArcProgress * 2; // Fade out as we morph to arc
    const arcOpacity = Math.max(0, (circleToArcProgress - 0.6) / 0.4); // Fade in near end of morph

    // Main Render Loop
    return (
        <div className={styles.container}>
            <div className={styles.innerWrapper}>

                {/* Intro Text */}
                <motion.div
                    className={styles.introContainer}
                    style={{
                        opacity: Math.max(0, introOpacity),
                        transform: `translateY(${circleToArcProgress * -50}px)`,
                        filter: `blur(${Math.max(0, (1 - introOpacity) * 5)}px)`
                    }}
                >
                    <h1 className={styles.introHeadline}>The future is built on AI.</h1>
                    <p className={styles.introSubtitle}>SCROLL TO EXPLORE</p>
                </motion.div>

                {/* Arc Content */}
                <motion.div
                    style={{ opacity: arcOpacity, y: (1 - arcOpacity) * 20 }}
                    className={styles.arcContent}
                >
                    <h2 className={styles.arcHeadline}>Explore Our Vision</h2>
                    <p className={styles.arcDescription}>
                        Discover a world where technology meets creativity.
                        Scroll through our curated collection of innovations designed to shape the future.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className={styles.cardsContainer}>
                    {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
                        // --- 1. Circle Position ---
                        const circleRadius = 350;
                        const circleAngle = (i / TOTAL_IMAGES) * 360;
                        const circleRad = (circleAngle * Math.PI) / 180;
                        const circleItem = {
                            x: Math.cos(circleRad) * circleRadius,
                            y: Math.sin(circleRad) * circleRadius,
                            rotation: circleAngle + 90,
                            scale: 1,
                        };

                        // --- 2. Arc Position ---
                        // Dynamic Arc Rotation based on scroll
                        const spreadAngle = 130;
                        const startAngle = -90 - (spreadAngle / 2);
                        const step = spreadAngle / (TOTAL_IMAGES - 1);
                        const maxRotation = spreadAngle * 0.8;
                        const currentRotationOffset = -rotationProgress * maxRotation;

                        const currentArcAngle = startAngle + (i * step) + currentRotationOffset;
                        const arcRad = (currentArcAngle * Math.PI) / 180;
                        const arcRadius = 1100; // Base 1000 * 1.1
                        const arcCenterY = 200 + arcRadius;

                        const arcItem = {
                            x: Math.cos(arcRad) * arcRadius,
                            y: Math.sin(arcRad) * arcRadius + arcCenterY,
                            rotation: currentArcAngle + 90,
                            scale: 1.5,
                        };

                        // --- INTERPOLATION ---
                        // Phase 1: Scatter -> Circle
                        let currentX = lerp(scatterPositions[i].x, circleItem.x, scatterToCircleProgress);
                        let currentY = lerp(scatterPositions[i].y, circleItem.y, scatterToCircleProgress);
                        let currentRot = lerp(scatterPositions[i].rotation, circleItem.rotation, scatterToCircleProgress);
                        let currentScale = lerp(scatterPositions[i].scale, circleItem.scale, scatterToCircleProgress);

                        // Phase 2: Circle -> Arc
                        // If we are in phase 2, proceed from the 'Circle' state (which is end of Phase 1) to 'Arc'
                        if (circleToArcProgress > 0) {
                            currentX = lerp(circleItem.x, arcItem.x, circleToArcProgress);
                            currentY = lerp(circleItem.y, arcItem.y, circleToArcProgress);
                            currentRot = lerp(circleItem.rotation, arcItem.rotation, circleToArcProgress);
                            currentScale = lerp(circleItem.scale, arcItem.scale, circleToArcProgress);
                        }

                        return (
                            <FlipCard
                                key={i}
                                src={src}
                                index={i}
                                target={{
                                    x: currentX,
                                    y: currentY,
                                    rotation: currentRot,
                                    scale: currentScale,
                                    opacity: 1
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
