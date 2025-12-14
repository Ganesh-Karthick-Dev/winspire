/**
 * Sparkle Cursor - Revolutionary Trail Effect
 * 
 * Modern, trending cursor effect with glowing sparkle particles.
 * Creates a magical star trail that follows mouse movement.
 * Premium, professional design for 2024.
 */

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// Configuration
const MAX_PARTICLES = 50;
const SPAWN_RATE = 3; // Particles per mouse move event
const COLORS = [
    '#00d9ff', // Cyan - primary brand
    '#ffffff', // White - clean sparkle
    '#4f9cf9', // Blue accent
];

// Star/sparkle SVG shapes
const SPARKLE_SHAPES = [
    // 4-point star
    `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z"/>
    </svg>`,
    // 6-point star
    `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L13.5 8.5L20 4L15.5 10.5L24 12L15.5 13.5L20 20L13.5 15.5L12 24L10.5 15.5L4 20L8.5 13.5L0 12L8.5 10.5L4 4L10.5 8.5L12 0Z"/>
    </svg>`,
    // Circle/dot
    `<svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10"/>
    </svg>`,
    // Diamond
    `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L22 12L12 22L2 12L12 2Z"/>
    </svg>`,
];

interface Particle {
    element: HTMLDivElement;
    inUse: boolean;
}

export default function FlowerCursor() {
    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const isActiveRef = useRef<boolean>(true);
    const isInitializedRef = useRef<boolean>(false);
    const mouseTrailRef = useRef<{ x: number; y: number }[]>([]);

    // Create particle element
    const createParticle = useCallback((): HTMLDivElement => {
        const particle = document.createElement('div');
        particle.className = 'sparkle-particle';
        particle.style.cssText = `
            position: absolute;
            pointer-events: none;
            will-change: transform, opacity;
            opacity: 0;
        `;
        return particle;
    }, []);

    // Initialize particle pool
    const initPool = useCallback(() => {
        const container = containerRef.current;
        if (!container || isInitializedRef.current) return;

        isInitializedRef.current = true;

        for (let i = 0; i < MAX_PARTICLES; i++) {
            const element = createParticle();
            container.appendChild(element);
            particlesRef.current.push({ element, inUse: false });
        }
    }, [createParticle]);

    // Get available particle
    const getParticle = useCallback((): Particle | null => {
        return particlesRef.current.find(p => !p.inUse) || null;
    }, []);

    // Spawn sparkle at position
    const spawnSparkle = useCallback((x: number, y: number) => {
        const particle = getParticle();
        if (!particle) return;

        particle.inUse = true;
        const el = particle.element;

        // Random properties
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const shape = SPARKLE_SHAPES[Math.floor(Math.random() * SPARKLE_SHAPES.length)];
        const size = gsap.utils.random(6, 18);
        const rotation = gsap.utils.random(0, 360);
        const xDrift = gsap.utils.random(-40, 40);
        const yDrift = gsap.utils.random(-60, -20);
        const duration = gsap.utils.random(0.6, 1.2);

        // Set content and initial state
        el.innerHTML = shape;
        el.style.color = color;
        el.style.filter = `drop-shadow(0 0 ${size / 2}px ${color})`;

        gsap.set(el, {
            x: x - size / 2 + gsap.utils.random(-10, 10),
            y: y - size / 2 + gsap.utils.random(-10, 10),
            width: size,
            height: size,
            rotation: rotation,
            scale: 0,
            opacity: 0,
        });

        // Animate: pop in, float, fade out
        gsap.timeline()
            .to(el, {
                scale: 1,
                opacity: 1,
                rotation: rotation + gsap.utils.random(-45, 45),
                duration: 0.15,
                ease: 'back.out(3)',
            })
            .to(el, {
                x: x - size / 2 + xDrift,
                y: y - size / 2 + yDrift,
                scale: gsap.utils.random(0.3, 0.8),
                opacity: 0,
                rotation: rotation + gsap.utils.random(-180, 180),
                duration: duration,
                ease: 'power2.out',
                onComplete: () => {
                    particle.inUse = false;
                },
            }, '-=0.05');
    }, [getParticle]);

    // Mouse move handler
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isActiveRef.current) return;

        // Spawn multiple particles for trail effect
        for (let i = 0; i < SPAWN_RATE; i++) {
            // Slight delay and position offset for each particle
            setTimeout(() => {
                spawnSparkle(
                    e.clientX + gsap.utils.random(-8, 8),
                    e.clientY + gsap.utils.random(-8, 8)
                );
            }, i * 20);
        }

        // Store trail for potential effects
        mouseTrailRef.current.push({ x: e.clientX, y: e.clientY });
        if (mouseTrailRef.current.length > 20) {
            mouseTrailRef.current.shift();
        }
    }, [spawnSparkle]);

    useEffect(() => {
        // Reduced motion check
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            isActiveRef.current = false;
            return;
        }

        // Mobile check
        if (window.innerWidth < 768 && 'ontouchstart' in window) {
            isActiveRef.current = false;
            return;
        }

        initPool();
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => {
            isActiveRef.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            particlesRef.current.forEach(p => gsap.killTweensOf(p.element));
        };
    }, [initPool, handleMouseMove]);

    return (
        <div
            ref={containerRef}
            className="sparkle-cursor-container"
            aria-hidden="true"
        />
    );
}



