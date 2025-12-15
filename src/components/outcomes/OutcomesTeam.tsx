'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OutcomesTeam() {
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);
    const rightColRef = useRef<HTMLDivElement>(null);
    const textsRef = useRef<(HTMLParagraphElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const leftCol = leftColRef.current;
        const rightCol = rightColRef.current;
        const texts = textsRef.current;

        if (!section || !leftCol || !rightCol) return;

        const ctx = gsap.context(() => {
            // Pin the left column while scrolling through the right column
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: 'bottom bottom',
                pin: leftCol,
                pinSpacing: false, // We want the right col to scroll naturally
            });

            // Animate text opacity on scroll
            texts.forEach((text) => {
                if (!text) return;

                gsap.fromTo(text,
                    { opacity: 0.2, color: '#6b7280' }, // Start gray/faint
                    {
                        opacity: 1,
                        color: '#ffffff', // Turn white
                        duration: 1,
                        scrollTrigger: {
                            trigger: text,
                            start: 'top 80%', // Start animating when text enters viewport
                            end: 'top 40%',   // Finish when it's near the middle
                            scrub: 1,
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const paragraphs = [
        "Our team of architects, urban planners, and design thinkers came together to build something bold: a modern village where people, experiences, and convenience converge.",
        "We believe that true innovation happens at the intersection of disciplines. By bringing together diverse experts, we create spaces that are not just functional, but transformative.",
        "Every detail is meticulously crafted to enhance the human experience. From the flow of natural light to the texture of materials, we consider how each element impacts daily life.",
        "This is more than just a development; it's a living ecosystem designed to foster community, creativity, and well-being for generations to come."
    ];

    return (
        <section
            ref={sectionRef}
            className="relative bg-black text-white py-20 px-4 md:px-12 mx-auto overflow-hidden"
            style={{
                width: '98%',
                minHeight: '100vh',
                marginTop: '2vh',
                marginBottom: '1vh',
                marginLeft: '2vh',
                marginRight: '2vh',
                borderRadius: '32px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            }}
        >
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Left Column - Sticky */}
                <div ref={leftColRef} className="h-fit md:h-screen flex flex-col justify-center sticky top-0 pt-20 md:pt-0">
                    <p className="text-lg md:text-xl font-sans font-medium text-gray-400 max-w-xs">
                        Every square foot has been thoughtfully considered
                    </p>
                </div>

                {/* Right Column - Scrollable Content */}
                <div ref={rightColRef} className="flex flex-col gap-32 pb-40 pt-20 md:pt-40">
                    {paragraphs.map((text, index) => (
                        <p
                            key={index}
                            ref={(el) => { textsRef.current[index] = el; }}
                            className="text-3xl md:text-5xl lg:text-6xl font-sans font-bold leading-tight transition-colors duration-500"
                        >
                            {text}
                        </p>
                    ))}
                </div>

            </div>
        </section>
    );
}
