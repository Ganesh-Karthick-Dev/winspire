/**
 * Who We Help Section Component for Temp Company Page
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhoWeHelpSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const partners = [
        'Specialty physician practices',
        'Multispecialty groups',
        'Hospitals and health systems',
        'Ambulatory surgery centers',
        'Behavioral and mental health providers',
        'Home health and hospice organizations',
        'Tribal and community health networks',
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 z-20"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-6">
                    <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase block">Who We Help</span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        Healthcare Organizations That <br/> Expect Stability, Not Firefighting
                    </h2>
                    <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                        We partner with healthcare organizations that want clarity, control, and long-term stability rather than short-term fixes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners.map((partner, i) => (
                        <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                            <h3 className="text-xl text-white font-medium group-hover:text-cyan-400 transition-colors">
                                {partner}
                            </h3>
                        </div>
                    ))}
                </div>

                <div className="mt-20 p-10 border border-white/10 rounded-3xl bg-white/[0.02] backdrop-blur-sm">
                    <p className="text-slate-300 text-lg leading-relaxed text-center italic">
                        "Each environment brings different payer behavior, risk, and operational complexity. <br/>
                        Our approach adapts. Our discipline remains constant."
                    </p>
                </div>
            </div>
        </section>
    );
}
