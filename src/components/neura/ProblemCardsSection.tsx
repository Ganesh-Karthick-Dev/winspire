/**
 * 5 cards that animate in from edges of the screen, stack vertically.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    RefreshCw,
    Zap,
    AlertTriangle,
    Users,
    Workflow,
    type LucideIcon,
} from 'lucide-react';
import styles from './ProblemCardsSection.module.css';

const CARDS: { icon: LucideIcon; label: string }[] = [
    { icon: RefreshCw, label: 'Payers automate faster than teams can react' },
    { icon: AlertTriangle, label: 'Policies change without warning' },
    { icon: Users, label: 'Patient responsibility increases variability' },
    { icon: Workflow, label: 'Static workflows break under real-world pressure' },
    { icon: Zap, label: 'Most RCM systems respond by adding dashboards, reports, and manual checks.' },
];

/** 
 * Start positions: from far edges. 
 * Using function to get dynamic values or just large relative values.
 * We'll set these in the effect to use window dimensions if needed, 
 * or just use large % values.
 */
const GET_SIDES = () => [
    { xPercent: -200, yPercent: 0, x: -500 }, // Left
    { xPercent: 200, yPercent: 0, x: 500 },  // Right
    { xPercent: 200, yPercent: -100, y: -500 }, // Top Right
    { xPercent: -200, yPercent: 100, y: 500 }, // Bottom Left
    { yPercent: -300, y: -800 }, // Top
];

type ProblemCardsSectionProps = {
    pinTriggerRef?: React.RefObject<HTMLElement | null>;
};

export default function ProblemCardsSection({ pinTriggerRef }: ProblemCardsSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;
        const triggerEl = pinTriggerRef?.current ?? containerRef.current;
        gsap.registerPlugin(ScrollTrigger);

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        // Set initial positions off-screen
        // We'll calculate a "random" starting position for each card
        // varying x and y to simulate "coming from all directions"
        // IMPORTANT: No Opacity animation, purely position (flying in from outside)
        cards.forEach((card, i) => {
            // Directions: 0=Left, 1=Right, 2=Bottom, 3=Top-Left, 4=Top-Right
            const mode = i % 5;
            let startX = 0;
            let startY = 0;
            // Much larger distance to ensure off-screen
            const dist = 1500;
            const distDiag = 1200;

            switch (mode) {
                case 0: startX = -dist; startY = 200; break;
                case 1: startX = dist; startY = -200; break;
                case 2: startX = 0; startY = dist; break;
                case 3: startX = -distDiag; startY = -distDiag; break;
                case 4: startX = distDiag; startY = distDiag; break;
            }

            gsap.set(card, {
                x: startX,
                y: startY,
                z: i * 5,
                opacity: 1, // Visible whole time
                scale: 1,   // No scale in/out, just move? Or maybe slight scale? Let's keep scale 1 for "solid" feeling.
                rotation: (Math.random() - 0.5) * 90 // Initial heavy rotation
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerEl,
                start: 'top top',
                end: '+=2000', // Sync with parent pin
                scrub: 1.5,    // Smooth scrubbing
                // anticipatePin: 1 // help prevent jitter?
            }
        });

        cards.forEach((card, i) => {
            // Final random rotation for the "messy pile" look
            const finalRotation = (Math.random() - 0.5) * 15;

            tl.to(
                card,
                {
                    x: 0,
                    y: 0,
                    rotation: finalRotation,
                    duration: 1, // Normalized duration for scrub
                    ease: 'power2.out'
                },
                i * 0.2 // Stagger
            );
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [pinTriggerRef]);

    return (
        <div ref={containerRef} className={styles.container}>
            <p className={styles.subtitle}>
                Modern healthcare revenue cycles operate in a constantly shifting environment:
            </p>

            <div className={styles.cardsStack}>
                {// Reverse map to put first cards at bottom of stack visually if needed?
                    // Standard DOM order: last is on top. 
                    // We want "Payers automate" (index 0) to be... well, it depends.
                    // Let's keep order.
                    CARDS.map(({ icon: Icon, label }, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className={styles.card}
                            style={{ zIndex: i }} /* explicit stacking order */
                        >
                            <div className={styles.cardIcon}>
                                <Icon size={24} />
                            </div>
                            <span className={styles.cardLabel}>{label}</span>
                        </div>
                    ))}
            </div>

            <div className={styles.conclusion}>
                <p>That creates visibility but not control.</p>
                <p className={styles.highlight}>
                    Neura was designed to replace fragmented activity with a single operating structure that thinks, adapts, and acts in real time.
                </p>
            </div>
        </div>
    );
}
