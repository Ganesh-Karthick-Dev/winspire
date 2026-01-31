/**
 * Hero Section Component for Temp Company Page
 * 
 * Full-screen hero with centered title, subtitle, and scroll indicator.
 * Follows the design pattern from company.tsx hero section.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger animation for hero elements
            gsap.from('.hero-anim', {
                y: 80,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.3,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleScrollClick = () => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    };

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
        >
            {/* Subtle Background pattern */}
            <div
                className="absolute inset-0 opacity-20 -z-10"
                style={{
                    backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-20" />

            <div className="max-w-5xl mx-auto">
                Label
                <span className="hero-anim inline-block bg-slate-100 text-slate-600 text-xs font-bold tracking-[0.3em] uppercase py-2 px-6 rounded-full mb-10 border border-slate-200">
                    ABOUT WINSPIRE RCM
                </span>

                {/* Main Title */}
                <h1 className="hero-anim text-5xl md:text-8xl font-bold leading-tight mb-8 text-slate-900">
                    Built Inside Healthcare. <br />
                    <span className="text-secondary">Designed for Predictable Outcomes.</span>
                </h1>

                {/* Subtitle */}
                <p className="hero-anim text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-light leading-relaxed">
                    Revenue cycles that work consistently, calmly, and predictably by design.
                </p>

                {/* Scroll Indicator */}
                <div
                    className="hero-anim mt-16 flex flex-col items-center gap-4 cursor-pointer"
                    onClick={handleScrollClick}
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-secondary to-transparent" />
                    <span className="text-[10px] tracking-[0.4em] text-slate-400 uppercase">
                        Scroll to explore our story
                    </span>
                </div>
            </div>
        </section>
    );
}
