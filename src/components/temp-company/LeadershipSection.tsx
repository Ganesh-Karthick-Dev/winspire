/**
 * Leadership Section Component for Temp Company Page
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function LeadershipSection() {
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

    const principles = [
        { title: 'Design before scaling' },
        { title: 'Solve root causes, not symptoms' },
        { title: 'Build systems that outlast individuals' },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 z-20 flex items-center"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                        <span className="text-xs font-bold tracking-[0.2em] text-cyan-400 uppercase block">Leadership</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Experience That Shapes Decisions
                        </h2>
                        <p className="text-slate-300 text-xl leading-relaxed">
                            Winspire is led by professionals who have built, managed, and transformed revenue cycles across diverse healthcare environments.
                        </p>
                        <div className="pt-4">
                             <p className="text-slate-400 text-lg">
                                Our leadership philosophy is simple:
                             </p>
                        </div>
                    </div>

                    <div className="lg:col-span-12 xl:col-span-7 space-y-6">
                        {principles.map((p, i) => (
                            <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-colors">
                                <h3 className="text-2xl text-white font-semibold mb-2">{p.title}</h3>
                            </div>
                        ))}
                        <div className="p-8 bg-cyan-400/10 border border-cyan-400/20 rounded-2xl mt-12">
                             <p className="text-white text-xl font-medium leading-relaxed">
                                Experience informs our decisions. Discipline guides our execution. Integrity anchors everything we do.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
