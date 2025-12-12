/**
 * Vision Section Component
 * 
 * Large text section with 3D model animation
 * "From vision to system, from idea to impact..."
 * Text with outline stroke effect on thin words
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VisionSectionProps {
    id?: string;
}

export default function VisionSection({ id = 'vision' }: VisionSectionProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!textRef.current || !sectionRef.current) return;

        const words = textRef.current.querySelectorAll('.word');
        
        // Set initial state
        gsap.set(words, { 
            opacity: 0, 
            y: 40,
        });

        // Animate words on scroll
        gsap.to(words, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'center center',
                toggleActions: 'play none none reverse',
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
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
