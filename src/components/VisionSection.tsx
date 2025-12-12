/**
 * Vision Section Component
 * 
 * Large text section with 3D model animation
 * "From vision to system, from idea to impact..."
 * Professional GSAP text animation
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface VisionSectionProps {
    id?: string;
}

export default function VisionSection({ id = 'vision' }: VisionSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            const lines = gsap.utils.toArray<HTMLElement>('.vision-line');

            // Initial state - hidden below
            gsap.set(lines, {
                y: 100,
                opacity: 0,
                rotateX: -90,
                transformOrigin: 'top center',
            });

            // Create the animation - plays only on forward scroll
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top 30%',
                onEnter: () => {
                    gsap.fromTo(lines,
                        {
                            y: 100,
                            opacity: 0,
                            rotateX: -90,
                        },
                        {
                            y: 0,
                            opacity: 1,
                            rotateX: 0,
                            duration: 1,
                            stagger: 0.2,
                            ease: 'power3.out',
                        }
                    );
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id={id} className="vision-section" ref={sectionRef}>
            <div className="vision-content">
                {/* Left side - space for 3D model */}
                <div className="vision-model-space"></div>

                {/* Right side - text */}
                <div className="vision-text">
                    <h2 className="vision-heading" ref={textRef}>
                        <span className="vision-line">
                            <span className="word outline">From</span>{' '}
                            <span className="word solid">vision to system,</span>
                        </span>
                        <span className="vision-line">
                            <span className="word outline">from</span>{' '}
                            <span className="word solid">idea to impact -</span>
                        </span>
                        <span className="vision-line">
                            <span className="word outline">we are all about</span>{' '}
                            <span className="word solid">digital</span>
                        </span>
                        <span className="vision-line">
                            <span className="word outline">products</span>{' '}
                            <span className="word solid bold">made to evolve</span>
                        </span>
                    </h2>
                </div>
            </div>
        </section>
    );
}
