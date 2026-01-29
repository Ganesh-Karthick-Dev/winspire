'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/LeadershipSection.module.css';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const principles = [
    {
        title: 'Design before scaling',
        description: 'We believe in laying a robust foundation before rapid expansion. Every system is architected for future growth.',
        image: '/images/team/philip-leone.png'
    },
    {
        title: 'Solve root causes, not symptoms',
        description: 'Our approach digs deep to find the underlying issues, ensuring long-term solutions instead of quick fixes.',
        image: '/images/team/dan-schulte.png'
    },
    {
        title: 'Build systems that outlast individuals',
        description: 'Creating resilient processes and knowledge bases that ensure continuity and excellence regardless of personnel changes.',
        image: '/images/team/john-kostic.png'
    },
];

export default function LeadershipSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(sectionRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % principles.length);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + principles.length) % principles.length);
    };

    // Calculate transform to center the active item
    // Assuming card width 350px + gap 30px = 380px
    // We want the active item to be in the center
    // However, for a small number of items (3) that fit on screen, maybe we don't need to translate?
    // But to support the "carousel" behavior requested:
    
    // transform = -(activeIndex * 380)px ... plus some offset to center it.
    // Ideally we'd measure container width, but for a quick CSS-only valid approach:
    // Let's rely on CSS `transform`.
    // Actually, simply translating by -100% * index might be too much if we want them side-by-side.
    // Let's stick to the visual "row" if they fit, but if we want them to slide, we need to move them.
    
    // Simplified: Just center the set if they fit. If the user wants "Previous/Next", it implies focus.
    // Let's adding a `transform` to `.carouselTrack` in CSS? No, needs dynamic value.
    
    // We'll return a style object.
    const trackStyle = {
        transform: `translateX(calc(50% - ${activeIndex * 380}px - 175px))`, // 175 is half card width
        transition: 'transform 0.5s ease',
        width: 'max-content' // Ensure track is wide enough
    };
    // Note: The parent .carouselContainer needs overflow:hidden for this to look like a carousel window.

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.titleWrapper}>
                <span className={styles.label}>Leadership</span>
                <h2 className={styles.mainTitle}>
                    Experience that <br />
                    <em>Shapes Decisions</em>
                </h2>
                <div className="space-y-4 text-center">
                    <p className={styles.description}>
                        Winspire is led by professionals who have built, managed, and transformed revenue cycles across diverse healthcare environments.
                    </p>
                     <p className={styles.description}>
                        Experience informs our decisions. Discipline guides our execution. Integrity anchors everything we do.
                    </p>
                </div>
            </div>

            <div className={styles.carouselContainer} style={{ overflow: 'hidden' }}>
                <button onClick={prevSlide} className={`${styles.navButton} ${styles.prevButton}`} aria-label="Previous">
                    <ArrowLeft size={24} />
                </button>

                <div className={styles.carouselTrack} style={trackStyle}>
                    {principles.map((p, i) => (
                        <div 
                            key={i} 
                            className={`${styles.card} ${i === activeIndex ? styles.activeCard : ''}`}
                            style={{ opacity: i === activeIndex ? 1 : 0.5, transform: i === activeIndex ? 'scale(1)' : 'scale(0.9)' }}
                        >
                            <div className={styles.cardImageContainer}>
                                <img src={p.image} alt={p.title} className={styles.cardImage} />
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{p.title}</h3>
                                <p className={styles.cardText}>{p.description}</p>
                                <button className={styles.cardButton}>
                                    Follow on LinkedIn <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={nextSlide} className={`${styles.navButton} ${styles.nextButton}`} aria-label="Next">
                    <ArrowRight size={24} />
                </button>
            </div>
        </section>
    );
}
