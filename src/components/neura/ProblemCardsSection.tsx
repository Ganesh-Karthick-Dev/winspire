/**
 * 5 square cards that animate in from random sides after section pin, stack one by one below title.
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
    { icon: RefreshCw, label: 'Shifting environment' },
    { icon: Zap, label: 'Payers automate' },
    { icon: AlertTriangle, label: 'Policies change' },
    { icon: Users, label: 'Patient responsibility' },
    { icon: Workflow, label: 'Static workflows break' },
];

/** Start positions: from random sides (left, right, top) */
const SIDES = [
    { x: -280, y: 0 },
    { x: 280, y: 0 },
    { x: 240, y: -100 },
    { x: -240, y: 80 },
    { x: 0, y: -140 },
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

        cards.forEach((card, i) => {
            const from = SIDES[i % SIDES.length];
            gsap.set(card, { x: from.x, y: from.y, opacity: 0 });
        });

        const tl = gsap.timeline({ paused: true });
        cards.forEach((card, i) => {
            tl.to(
                card,
                { x: 0, y: 0, opacity: 1, duration: 0.45, ease: 'power2.out' },
                i * 0.14
            );
        });

        ScrollTrigger.create({
            trigger: triggerEl,
            start: 'top top',
            onEnter: () => tl.play(),
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, [pinTriggerRef]);

    return (
        <div ref={containerRef} className={styles.cardsStack}>
            {CARDS.map(({ icon: Icon, label }, i) => (
                <div
                    key={i}
                    ref={(el) => { cardRefs.current[i] = el; }}
                    className={styles.card}
                >
                    <div className={styles.cardIcon}>
                        <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className={styles.cardLabel}>{label}</span>
                </div>
            ))}
        </div>
    );
}
