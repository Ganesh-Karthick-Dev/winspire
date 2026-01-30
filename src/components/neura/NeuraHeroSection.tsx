/**
 * Neura AI Hero Section
 *
 * Exact content only. 3D model behind (handled by page).
 * GSAP: word/line stagger, blur reveal. Pure CSS module, no Tailwind.
 */

'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './NeuraHeroSection.module.css';

const SUBTITLE_WORDS = 'The Intelligence That Makes Revenue Cycles Predictable'.split(' ');

export default function NeuraHeroSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const run = () => {
            const titleWords = section.querySelectorAll('[data-animate="title-word"]');
            const subtitleWords = section.querySelectorAll('[data-animate="subtitle-word"]');
            const bodyParagraphs = section.querySelectorAll('[data-animate="body-p"]');

            if (!titleWords.length || !subtitleWords.length || !bodyParagraphs.length) return;

            gsap.set(titleWords, { y: 32, opacity: 0, filter: 'blur(10px)' });
            gsap.set(subtitleWords, { y: 24, opacity: 0, filter: 'blur(8px)' });
            gsap.set(bodyParagraphs, { y: 24, opacity: 0, filter: 'blur(6px)' });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.to(titleWords, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.9,
                stagger: 0.1,
            })
                .to(
                    subtitleWords,
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.6,
                        stagger: 0.035,
                    },
                    '-=0.45'
                )
                .to(
                    bodyParagraphs,
                    {
                        y: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 0.5,
                        stagger: 0.08,
                    },
                    '-=0.3'
                );
        };

        const id = requestAnimationFrame(() => {
            requestAnimationFrame(run);
        });
        return () => cancelAnimationFrame(id);
    }, []);

    return (
        <section ref={sectionRef} className={styles.hero} aria-label="Neura AI hero">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        <span data-animate="title-word" className={styles.titleWord}>
                            Neura
                        </span>{' '}
                        <span data-animate="title-word" className={styles.titleWord}>
                            AI
                        </span>
                    </h1>
                    <h2 className={styles.subtitle}>
                        {SUBTITLE_WORDS.map((word, i) => (
                            <span
                                key={i}
                                data-animate="subtitle-word"
                                className={styles.subtitleWord}
                            >
                                {word}{' '}
                            </span>
                        ))}
                    </h2>
                    <div className={styles.body}>
                        <p data-animate="body-p">
                            Revenue cycles rarely fail because teams lack effort.
                        </p>
                        <p data-animate="body-p">
                            They fail because the system lacks intelligence.
                        </p>
                        <p data-animate="body-p">Neura AI was built to solve that problem.</p>
                        <p data-animate="body-p">
                            It is not software to manage. It is an embedded intelligence layer
                            that governs how revenue work is prioritized, executed, and improved
                            every day.
                        </p>
                        <p data-animate="body-p">
                            Where traditional RCM tools tell you what went wrong after the fact,
                            Neura works ahead of outcomes guiding decisions before revenue is
                            lost.
                        </p>
                    </div>
                </div>
                <div className={styles.rightColumn} aria-hidden="true" />
            </div>
        </section>
    );
}
