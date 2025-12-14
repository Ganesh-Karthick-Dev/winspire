'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        title: "What You Will Learn in Your Demo",
        subtitle: "Framing Effect",
        type: "list",
        items: [
            "View live dashboards with full transparency",
            "Buk Denial Process Analysis",
            "Improve collections with real-time payer insights",
            "Reduce AR days using intelligent prioritization",
            "Automate repetitive RCM tasks using AI",
            "Eliminate manual errors and rework",
            "Increase operational efficiency by 30% within 90 days",
            "Achieve 24-hour TAT across departments",
            "Reduce dependency on staff turnover",
            "Scale your organization without scaling your team"
        ],
        cta: "Schedule Your Session Now",
        color: "bg-white"
    },
    {
        id: 2,
        title: "What to Expect After You Book",
        subtitle: "The Experience",
        type: "steps",
        items: [
            { title: "Step 1", desc: "We Prepare Your Personalized Insights. We review your specialty, payer mix, revenue structure, and workflow gaps." },
            { title: "Step 2", desc: "Live Walkthrough of Neura AI. You’ll see predictive models, automation flows, AR intelligence, and sample dashboards." },
            { title: "Step 3", desc: "Real-Time Problem Solving. We show exactly how Neura solves your specific RCM challenges." },
            { title: "Step 4", desc: "Customized Outcome Roadmap. You get a tailored 30–90 day improvement plan at no cost." }
        ],
        cta: "Schedule Your Demo",
        color: "bg-white"
    },
    {
        id: 3,
        title: "All We Need Is 30 Minutes",
        subtitle: "Clarity + Ease",
        type: "simple-list",
        intro: "And These Three Details:",
        items: [
            "Your specialty or practice type",
            "Your top three RCM challenges",
            "Your preferred time slot"
        ],
        footer: "That’s it. No heavy preparation. No reports needed. No contracts or commitments.",
        color: "bg-white"
    },
    {
        id: 4,
        title: "The Cost of Waiting",
        subtitle: "Loss Aversion",
        type: "warning",
        headline: "Every Month Without a partner like Winspire RCM Costs You Thousands.",
        items: [
            "Avoidable denials accumulate",
            "AR continues to age",
            "Claims move slower",
            "Appeals are missed",
            "Providers become frustrated",
            "Cash flow becomes unpredictable"
        ],
        footer: "Your revenue cycle deserves intelligence today — not someday.",
        color: "bg-white"
    },
];

export default function StackingCards() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            cardsRef.current.forEach((card, index) => {
                if (!card) return;

                // Scale down previous cards as new ones scroll into view
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top+=100",
                    end: "bottom top",
                    scrub: true,
                    onUpdate: (self) => {
                        // Optional scale effect
                        // gsap.to(card, { scale: 1 - self.progress * 0.05, overwrite: true });
                    }
                });

                // Text Animations
                const title = card.querySelector('.card-title');
                const items = card.querySelectorAll('.card-item');
                const footer = card.querySelector('.card-footer');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: card,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });

                if (title) {
                    tl.from(title, {
                        y: 30,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                }

                if (items.length > 0) {
                    tl.from(items, {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out"
                    }, "-=0.4");
                }

                if (footer) {
                    tl.from(footer, {
                        y: 20,
                        opacity: 0,
                        duration: 0.6,
                        ease: "power2.out"
                    }, "-=0.2");
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-24 px-4 flex flex-col items-center">
            <div className="w-[95%] mx-auto">
                {cards.map((card, index) => (
                    <div
                        key={card.id}
                        ref={(el) => { cardsRef.current[index] = el }}
                        className={`sticky top-24 flex flex-col items-center justify-center min-h-[700px] w-full rounded-[40px] border border-gray-200 shadow-2xl mb-12 last:mb-0 overflow-hidden ${card.color}`}
                        style={{
                            zIndex: index + 1,
                            transformOrigin: 'center top',
                        }}
                    >
                        <div className="w-full max-w-5xl px-8 py-12 md:px-16 md:py-20">
                            <div className="text-center mb-12">
                                <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase mb-4">
                                    {card.subtitle}
                                </span>
                                <h2 className="card-title text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {card.title}
                                </h2>
                                {card.type === "warning" && (
                                    <p className="card-item mt-4 text-xl text-red-500 font-medium">
                                        {card.headline}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-6">
                                {card.type === "list" && (
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                        {(card.items as string[]).map((item, i) => (
                                            <li key={i} className="card-item flex items-start gap-3 text-lg text-slate-600">
                                                <svg className="w-6 h-6 text-green-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {card.type === "steps" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {(card.items as { title: string, desc: string }[]).map((item, i) => (
                                            <div key={i} className="card-item bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {card.type === "simple-list" && (
                                    <div className="text-center max-w-2xl mx-auto">
                                        <p className="card-item text-xl text-slate-700 mb-6 font-medium">{card.intro}</p>
                                        <ul className="space-y-4 mb-8">
                                            {(card.items as string[]).map((item, i) => (
                                                <li key={i} className="card-item text-2xl font-semibold text-slate-900">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="card-footer text-lg text-slate-500 leading-relaxed">
                                            {card.footer}
                                        </p>
                                    </div>
                                )}

                                {card.type === "warning" && (
                                    <div className="text-center max-w-3xl mx-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 text-left mb-8">
                                            {(card.items as string[]).map((item, i) => (
                                                <div key={i} className="card-item flex items-center gap-3 text-lg text-slate-700">
                                                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>
                                        <p className="card-footer text-2xl font-bold text-slate-900">
                                            {card.footer}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {card.cta && (
                                <div className="card-footer mt-12 text-center">
                                    <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:scale-105 shadow-lg shadow-blue-600/30">
                                        {card.cta}
                                        <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
