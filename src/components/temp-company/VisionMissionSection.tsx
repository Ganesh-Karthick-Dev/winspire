/**
 * Vision Mission Section Component for Temp Company Page
 * 
 * Redesigned: Clean horizontal layout with simple values grid.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function VisionMissionSection() {
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

            gsap.utils.toArray('.vm-item').forEach((item: any, i) => {
                 gsap.fromTo(item,
                    { opacity: 0, x: -30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: i * 0.2,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                 );
            });
            
             gsap.utils.toArray('.value-item').forEach((item: any, i) => {
                 gsap.fromTo(item,
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                 );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 px-6 md:px-12 z-20 flex flex-col justify-center"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto w-full space-y-24">
                
                {/* Vision / Mission Split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="space-y-6 vm-item">
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Our Vision</span>
                        <p className="text-2xl md:text-3xl font-light text-white leading-snug">
                            To build the most trusted, human-centric, and intelligently designed Revenue Cycle Management organization in healthcare where <span className="text-sky-400 font-normal">clarity replaces chaos</span> and outcomes are engineered, not chased.
                        </p>
                    </div>
                    <div className="space-y-6 vm-item">
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase">Our Mission</span>
                        <p className="text-2xl md:text-3xl font-light text-white leading-snug">
                            To help healthcare organizations design, operate, and sustain revenue cycles that are <span className="text-sky-400 font-normal">predictable, transparent, and scalable</span> by combining experienced people, disciplined execution, and intelligent systems.
                        </p>
                    </div>
                </div>

                {/* Values Grid */}
                <div className="border-t border-white/10 pt-16">
                    <h3 className="text-white font-medium mb-10 text-center uppercase tracking-widest text-sm">Our Core Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 border-b border-white/10 pb-16">
                        {[
                            { name: 'Client Centric Partnership', desc: 'We place our clients goals at the center of every decision and work as true partners in achieving them.' },
                            { name: 'Analytical Excellence', desc: 'We use data, insight, and experience to guide decisions and drive meaningful outcomes.' },
                            { name: 'Continuous Innovation', desc: 'We evolve constantly to stay ahead of industry change and deliver better solutions.' },
                            { name: 'Integrity and Transparency', desc: 'We operate with honesty, accountability, and clarity in all our interactions.' },
                            { name: 'Results That Matter', desc: 'We focus on measurable outcomes that drive long-term financial stability.' }
                        ].map((val, i) => (
                            <div key={i} className="px-4 py-8 text-center hover:bg-white/[0.02] transition-colors cursor-default group value-item border border-white/5 rounded-xl">
                                <span className="text-sm font-mono text-sky-500 block mb-4">0{i+1}</span>
                                <h4 className="text-lg text-white font-semibold mb-3 group-hover:text-sky-400 transition-colors">{val.name}</h4>
                                <p className="text-slate-500 text-xs leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
