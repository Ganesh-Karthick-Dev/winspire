/**
 * Our Story Section Component for Temp Company Page
 * 
 * Redesigned: Minimalist, professional vertical timeline.
 * Focus on clean typography and whitespace.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaQuoteLeft, FaLayerGroup, FaCogs, FaDesktop } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OurStorySection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple fade in
            gsap.fromTo(sectionRef.current, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%', // Trigger a bit earlier
                        toggleActions: 'play none none reverse'
                    }, // Removed extra comma
                } // Removed extra parenthesis
            );

            // Timeline line growth
            gsap.fromTo('.timeline-line',
                { height: 0 },
                {
                    height: '100%',
                    duration: 1.5,
                    ease: 'none', // Linear growth usually looks better for scroll scrubbing
                    scrollTrigger: {
                        trigger: '.timeline-container',
                        start: 'top 70%',
                        end: 'bottom 70%',
                        scrub: true,
                    },
                }
            );
            
            // Animate items
            gsap.utils.toArray('.fade-item').forEach((item: any) => {
                gsap.fromTo(item,
                    { opacity: 0, x: -20 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                )
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 z-20"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                
                {/* Heading Column */}
                <div className="md:col-span-4 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-[1px] bg-slate-400"></div>
                        <span className="text-xs font-bold tracking-[0.2em] text-slate-300 uppercase">Our Story</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                        Built Inside Healthcare. <br />
                        <span className="font-bold text-white text-3xl">Shaped by Real Revenue Challenges.</span>
                    </h2>
                    
                    <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                        Revenue cycles do not fail because people are not working hard enough. They fail because the system was never designed to succeed.
                    </p>
                </div>

                {/* Content Column with Timeline */}
                <div className="md:col-span-8 relative timeline-container pl-0 md:pl-12">
                    
                    {/* Timeline Vertical Line */}
                    <div className="hidden md:block absolute left-0 top-0 w-[1px] bg-white/10 h-full timeline-line" />

                    <div className="space-y-16">
                        
                        {/* 1. The Context */}
                        <div className="relative fade-item">
                            <span className="hidden md:block absolute -left-[5px] top-2 w-[9px] h-[9px] bg-sky-500 rounded-full" />
                            <h3 className="text-xl font-medium text-white mb-4">Lived Experience</h3>
                            <p className="text-slate-300 leading-relaxed mb-8 text-lg font-light">
                                Winspire RCM was built by leaders who have spent decades inside real healthcare operations—not observing from the outside, but living the pressure of denials, delayed payments, staffing constraints, and unpredictable cash flow.
                            </p>
                        </div>

                        {/* 2. The Pattern */}
                        <div className="relative fade-item">
                            <span className="hidden md:block absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white rounded-full" />
                            <h3 className="text-xl font-medium text-white mb-4">The Recurring Pattern</h3>
                            <p className="text-slate-300 leading-relaxed mb-6">Over the years, we saw the same pattern repeat:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Teams worked harder." },
                                    { label: "Processes became more complex." },
                                    { label: "Technology was added." },
                                    { label: "Yet revenue cycles remained unstable." }
                                ].map((item, i) => (
                                    <div key={i} className="p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors group">
                                         <p className="text-white font-medium">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 3. The Belief */}
                        <div className="relative fade-item">
                            <span className="hidden md:block absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white rounded-full" />
                            <div className="relative pl-8 border-l-2 border-white/20">
                                <FaQuoteLeft className="absolute -top-4 left-6 text-white/10 text-4xl" />
                                <blockquote className="text-2xl md:text-3xl text-white font-light leading-snug">
                                    "That experience shaped the belief that defines Winspire today: <span className="font-bold border-b border-sky-500">Revenue cycles fail because the system was never designed to succeed</span>."
                                </blockquote>
                            </div>
                        </div>

                        {/* 4. The Mission */}
                        <div className="relative fade-item">
                             <span className="hidden md:block absolute -left-[5px] top-2 w-[9px] h-[9px] bg-white rounded-full" />
                             <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                                Winspire exists to help healthcare organizations design revenue cycles that work consistently, calmly, and predictably by fixing the system, not exhausting the people inside it.
                             </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
