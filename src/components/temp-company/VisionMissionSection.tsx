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
                       // Value Items Expansion Animation (Compact Accordion)
             gsap.utils.toArray('.value-item').forEach((item: any) => {
                 const title = item.querySelector('.value-title');
                 const content = item.querySelector('.value-content');
                 
                 ScrollTrigger.create({
                     trigger: item,
                     start: 'top center+=5%', 
                     end: 'bottom center+=5%',
                     toggleClass: { targets: item, className: 'active-value' },
                     onEnter: () => expandItem(item, title, content),
                     onEnterBack: () => expandItem(item, title, content),
                     onLeave: () => collapseItem(item, title, content),
                     onLeaveBack: () => collapseItem(item, title, content),
                 });
            });

            const expandItem = (item: any, title: any, content: any) => {
                gsap.to(item, { opacity: 1, duration: 0.4 });
                gsap.to(title, { 
                    scale: 1.1,
                    marginBottom: '1rem',
                    color: '#ffffff',
                    duration: 0.4
                });
                gsap.to(content, { 
                    height: 'auto', 
                    opacity: 1, 
                    duration: 0.4,
                    ease: 'power2.out'
                });
            };

            const collapseItem = (item: any, title: any, content: any) => {
                gsap.to(item, { opacity: 0.6, duration: 0.4 });
                gsap.to(title, { 
                scale: 1,
                    marginBottom: '0',
                    color: '#e2e8f0', // slate-200
                    duration: 0.4
                });
                gsap.to(content, { 
                    height: 0, 
                    opacity: 0, 
                    duration: 0.4,
                    ease: 'power2.in'
                });
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen py-24 px-6 md:px-12 z-20 flex flex-col"
            style={{ background: 'transparent' }}
        >
            <div className="max-w-7xl mx-auto w-full">
                
                {/* Vision / Mission Section - Redesigned */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <div className="vm-item relative p-8 border-t-2 border-sky-500/30 bg-white/[0.02] backdrop-blur-sm rounded-2xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Vision</h2>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            To build the most trusted, human-centric, and intelligently designed <span className="text-sky-400">Revenue Cycle Management</span> organization in healthcare where clarity replaces chaos.
                        </p>
                    </div>
                    <div className="vm-item relative p-8 border-t-2 border-purple-500/30 bg-white/[0.02] backdrop-blur-sm rounded-2xl text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Our Mission</h2>
                        <p className="text-xl text-slate-300 leading-relaxed">
                            To help healthcare organizations design, operate, and sustain revenue cycles that are <span className="text-purple-400">predictable, transparent, and scalable</span> by combining experienced people and intelligent systems.
                        </p>
                    </div>
                </div>

                {/* Values Scroll Section (Compact FAQ Style) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/10 pt-24 pb-32">
                    
                    {/* Sticky Header */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h3 className="text-white font-medium text-left text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
                                Our Core<br/>Values
                            </h3>
                            <div className="h-1 w-24 bg-sky-500 rounded-full mb-6"></div>
                            <p className="text-slate-400 text-lg max-w-xs">
                                The principles that guide every decision we make. Scroll to explore.
                            </p>
                        </div>
                    </div>
                    
                    {/* Scroll List */}
                    <div className="lg:col-span-8 flex flex-col space-y-0"> 
                        {[
                            { name: 'Client Centric Partnership', desc: 'We place our clients goals at the center of every decision and work as true partners in achieving them.' },
                            { name: 'Analytical Excellence', desc: 'We use data, insight, and experience to guide decisions and drive meaningful outcomes.' },
                            { name: 'Continuous Innovation', desc: 'We evolve constantly to stay ahead of industry change and deliver better solutions.' },
                            { name: 'Integrity and Transparency', desc: 'We operate with honesty, accountability, and clarity in all our interactions.' },
                            { name: 'Results That Matter', desc: 'We focus on measurable outcomes that drive long-term financial stability.' }
                        ].map((val, i) => (
                            <div key={i} className="value-item flex flex-col justify-center items-start text-left py-12 border-b border-white/10 last:border-0 opacity-60 transition-all origin-left">
                                <span className="text-xs font-mono text-sky-500 block mb-3 uppercase tracking-wider">Metric 0{i+1}</span>
                                {/* Title */}
                                <h4 className="value-title text-3xl md:text-5xl font-bold text-slate-200 mb-0 tracking-tight leading-tight cursor-pointer transition-colors hover:text-white">
                                    {val.name}
                                </h4>
                                {/* Content (Accordion) */}
                                <div className="value-content h-0 opacity-0 overflow-hidden">
                                    <p className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl pt-6 pl-1 border-l-2 border-white/20 ml-1">
                                        {val.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
