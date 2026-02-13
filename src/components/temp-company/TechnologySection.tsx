/**
 * Technology Section Component for Temp Company Page
 * 
 * Redesigned: Minimalist text + feature list.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMicrochip } from 'react-icons/fa';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TechnologySection() {
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

            gsap.utils.toArray('.tech-item').forEach((item: any, i) => {
                 gsap.fromTo(item,
                    { opacity: 0, x: 30 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        delay: i * 0.1,
                        scrollTrigger: {
                            trigger: item,
                            start: 'top 85%',
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
            className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 z-20 flex items-center"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    <div className="space-y-10">
                         <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                            <FaMicrochip className="text-xl" />
                         </div>
                         
                         <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                            Intelligence That Supports People, <br/>
                            <span className="font-semibold">Not Replaces Them.</span>
                         </h2>
                         
                         <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                             Winspire is deeply technology-enabled but never technology-led.
                             Our proprietary intelligence layer, <strong>Neura AI</strong>, is embedded directly into how work gets done. It removes friction from execution and supports smarter, faster decisions without adding complexity.
                         </p>
                    </div>

                    <div className="border-l border-white/10 pl-10 space-y-12">
                         <p className="text-white text-lg font-medium">Neura AI enables our teams to:</p>
                         {[
                             { title: "Identify risk early" },
                             { title: "Prioritize work based on impact" },
                             { title: "Reduce repetitive manual effort" },
                             { title: "Improve quality without micromanagement" },
                             { title: "Give leadership real-time visibility" }
                         ].map((feat, i) => (
                             <div key={i} className="group tech-item">
                                  <h3 className="text-xl text-white font-medium mb-1 group-hover:text-sky-400 transition-colors">{feat.title}</h3>
                             </div>
                         ))}
                         <p className="text-slate-500 italic pt-4">
                             Technology at Winspire is quiet, explainable, and trusted. It enhances human judgment. It does not replace it.
                         </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
