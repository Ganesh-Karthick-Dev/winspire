/**
 * Final CTA Section Component for Temp Company Page
 * 
 * Redesigned: Ultra-minimalist centered call to action.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaArrowRight } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function FinalCTASection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // General fade in
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

            // Animate buttons scale
            gsap.fromTo('.cta-btn', 
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: '.cta-btn',
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 px-6 z-20 flex items-center justify-center text-center"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-3xl mx-auto space-y-10">
                <h2 className="text-4xl md:text-6xl font-semibold text-white tracking-tight leading-tight">
                    Let’s Design a Revenue Cycle That Works for the <span className="text-sky-400">Long Term.</span>
                </h2>
                
                <p className="text-xl text-slate-400 font-light">
                    If you are looking for an RCM partner who understands healthcare deeply, values people, and builds systems that last, we would welcome the conversation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <button className="cta-btn group px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors flex items-center gap-3">
                        Book a Strategic Conversation
                        <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button className="cta-btn px-8 py-4 border border-white/20 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5 transition-colors">
                        Explore How We Work
                    </button>
                </div>
            </div>
        </section>
    );
}
