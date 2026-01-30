/**
 * Neura AI Hero Section
 *
 * Left: title, subtitle, body copy.
 * Right: "Imagine more" decorative text.
 * 3D model sits behind (handled by page).
 * GSAP: word/line reveals, stagger, blur, clip-path.
 */

'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import styles from './NeuraHeroSection.module.css';

const SUBTITLE_WORDS = 'The Intelligence That Makes Revenue Cycles Predictable'.split(' ');
const IMAGINE_WORDS = ['Imagine', 'more'];

export default function NeuraHeroSection() {
    const titleLineRef = useRef<HTMLHeadingElement>(null);
    const titleWordsRef = useRef<HTMLDivElement>(null);
    const subtitleRef = useRef<HTMLHeadingElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);
    const imagineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const titleWords = titleWordsRef.current?.querySelectorAll(`.${styles.titleWord}`);
        const subtitleWords = subtitleRef.current?.querySelectorAll(`.${styles.subtitleWord}`);
        const bodyParagraphs = bodyRef.current?.querySelectorAll('p');
        const imagineWords = imagineRef.current?.querySelectorAll(`.${styles.imagineWord}`);

        if (!titleWords?.length || !subtitleWords?.length || !bodyParagraphs?.length || !imagineWords?.length) return;

        // Title words: start below with blur, reveal up
        gsap.set(titleWords, {
            y: '1.2em',
            opacity: 0,
            filter: 'blur(12px)',
        });
        gsap.set(subtitleWords, {
            y: '0.8em',
            opacity: 0,
            filter: 'blur(8px)',
        });
        gsap.set(bodyParagraphs, {
            y: 28,
            opacity: 0,
            filter: 'blur(4px)',
        });
        gsap.set(imagineWords, {
            y: '0.6em',
            opacity: 0,
            filter: 'blur(10px)',
        });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.to(titleWords, {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1,
            stagger: 0.08,
            ease: 'power3.out',
        })
            .to(
                subtitleWords,
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.65,
                    stagger: 0.04,
                    ease: 'power2.out',
                },
                '-=0.5'
            )
            .to(
                bodyParagraphs,
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.55,
                    stagger: 0.1,
                    ease: 'power2.out',
                },
                '-=0.35'
            )
            .to(
                imagineWords,
                {
                    y: 0,
                    opacity: 0.92,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                },
                '-=1.4'
            );
    }, []);

    return (
        <section className={styles.hero} aria-label="Neura AI hero">
            <div className={styles.inner}>
                <div className={styles.content}>
                    <h1 ref={titleLineRef} className={styles.title} aria-hidden={false}>
                        <div ref={titleWordsRef} className={styles.titleLine}>
                            <span className={styles.titleWord}>Neura</span>
                            <span className={styles.titleWord}>AI</span>
                        </div>
                    </h1>
                    <h2 ref={subtitleRef} className={styles.subtitle}>
                        {SUBTITLE_WORDS.map((word, i) => (
                            <span key={i} className={styles.subtitleWord}>
                                {word}{' '}
                            </span>
                        ))}
                    </h2>
                    <div ref={bodyRef} className={styles.body}>
                        <p>Revenue cycles rarely fail because teams lack effort.</p>
                        <p>They fail because the system lacks intelligence.</p>
                        <p>Neura AI was built to solve that problem.</p>
                        <p>
                            It is not software to manage. It is an embedded intelligence layer
                            that governs how revenue work is prioritized, executed, and improved
                            every day.
                        </p>
                        <p>
                            Where traditional RCM tools tell you what went wrong after the fact,
                            Neura works ahead of outcomes guiding decisions before revenue is lost.
                        </p>
                    </div>
                </div>
                <div ref={imagineRef} className={styles.right}>
                    <span className={styles.imagineMore}>
                        {IMAGINE_WORDS.map((word, i) => (
                            <span key={i} className={styles.imagineWord}>
                                {word}{' '}
                            </span>
                        ))}
                    </span>
                </div>
            </div>
        </section>
    );
}
