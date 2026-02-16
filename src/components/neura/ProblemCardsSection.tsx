/**
 * 5 cards that animate in from edges of the screen, stack vertically.
 */

'use client';

import { useEffect, useRef } from 'react';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
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

    useIsomorphicLayoutEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;
        // Use the passed ref for the trigger (parent section), falling back to this container
        const triggerEl = pinTriggerRef?.current ?? containerRef.current;
        gsap.registerPlugin(ScrollTrigger);

        const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) return;

        // Set initial positions off-screen
        cards.forEach((card, i) => {
            const mode = i % 5;
            let startX = 0;
            let startY = 0;
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
                opacity: 1,
                scale: 1,
                rotation: (Math.random() - 0.5) * 90 
            });
        });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top top',
                    end: '+=1500', // Reduced from 2000 for smoother completion
                    pin: true,
                    pinSpacing: true,
                    scrub: 1.5,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            cards.forEach((card, i) => {
                const finalRotation = (Math.random() - 0.5) * 15;
                tl.to(
                    card,
                    {
                        x: 0,
                        y: 0,
                        rotation: finalRotation,
                        duration: 0.8, 
                        ease: 'power2.out'
                    },
                    i * 0.1 // Stagger
                );
            });
            
        }, triggerEl as HTMLElement);

        return () => ctx.revert();
    }, [pinTriggerRef]);

    return (
        <div ref={containerRef} className={styles.container}>
            {/* Centered Text Content */}
            <div className={styles.textContent}>
                <div className={styles.titleSection}>
                    <h2 className={styles.sectionTitle}>The Problem Neura AI<sup style={{ fontSize: '0.4em', verticalAlign: 'top', marginLeft: '0.1em', color: '#0D1F47', WebkitTextFillColor: 'initial' }}>TM</sup> Solves</h2>
                    <p className={styles.sectionSubtitle}>
                        Modern healthcare revenue cycles operate<br />
                        in a constantly shifting environment:
                    </p>
                </div>

                <div className={styles.conclusion}>
                    <p>That creates visibility but not control.</p>
                    <p className={styles.highlight}>
                        Neura AI was designed to replace fragmented activity with a single operating structure that thinks, adapts, and acts in real time.
                    </p>
                </div>
            </div>

            {/* Overlaid Cards Stack */}
            <div className={styles.cardsStack}>
                {CARDS.map(({ icon: Icon, label }, i) => (
                    <div
                        key={i}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className={styles.card}
                        style={{ zIndex: i + 10 }}
                    >
                        <div className={styles.cardIcon}>
                            <Icon size={24} />
                        </div>
                        <span className={styles.cardLabel}>{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
