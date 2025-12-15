'use client';

import { useRef, useEffect } from 'react';
import styles from './ContentSection.module.css';

export default function ContentSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const desc1Ref = useRef<HTMLHeadingElement>(null);
    const desc2Ref = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        let ctx: gsap.Context;

        const initAnimations = async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            ctx = gsap.context(() => {
                // Header Animation
                const headerLines = headerRef.current?.querySelectorAll('.header-line');

                if (headerLines && headerLines.length > 0) {
                    gsap.fromTo(headerLines,
                        { y: 50, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1.2,
                            stagger: 0.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: headerRef.current,
                                start: 'top 60%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }

                // Title Animation
                const titleChars = titleRef.current?.querySelectorAll('.title-char');
                if (titleChars && titleChars.length > 0) {
                    gsap.fromTo(titleChars,
                        {
                            opacity: 0,
                            rotateY: 90,
                            y: 50,
                            transformOrigin: "50% 50% -50px"
                        },
                        {
                            opacity: 1,
                            rotateY: 0,
                            y: 0,
                            duration: 1,
                            stagger: 0.05,
                            ease: 'back.out(1.7)',
                            scrollTrigger: {
                                trigger: titleRef.current,
                                start: 'top 75%',
                                toggleActions: 'play none none reverse'
                            }
                        }
                    );
                }

                // Description 1 - Slides up from bottom, then fades out
                if (desc1Ref.current) {
                    gsap.fromTo(desc1Ref.current,
                        { y: 100, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: desc1Ref.current,
                                start: 'top 80%',
                                end: 'top 30%',
                                toggleActions: 'play none none reverse',
                                scrub: 1
                            }
                        }
                    );

                    // Fade out first section as second comes in
                    gsap.to(desc1Ref.current, {
                        opacity: 0,
                        y: -50,
                        scrollTrigger: {
                            trigger: desc2Ref.current,
                            start: 'top 70%',
                            end: 'top 40%',
                            scrub: 1
                        }
                    });
                }

                // Description 2 - Slides up from bottom to replace first
                if (desc2Ref.current) {
                    gsap.fromTo(desc2Ref.current,
                        { y: 100, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: desc2Ref.current,
                                start: 'top 80%',
                                end: 'top 40%',
                                toggleActions: 'play none none reverse',
                                scrub: 1
                            }
                        }
                    );
                }
            }, sectionRef);
        };

        initAnimations();

        return () => {
            if (ctx) ctx.revert();
        };
    }, []);

    const titleText = "Winspire RCM .";

    return (
        <section ref={sectionRef} className={styles.contentSection}>
            <div className={styles.contentInner}>
                <h3 ref={headerRef} className={styles.topHeader}>
                    <span className="header-line" style={{ display: 'block' }}>A New Kind of RCM Company.</span>
                    <span className="header-line" style={{ display: 'block' }}>AI-Driven. People-Focused.</span>
                    <span className="header-line" style={{ display: 'block' }}>Outcome-Obsessed.</span>
                </h3>

                <h2 ref={titleRef} className={styles.mainTitle}>
                    {titleText.split('').map((char, index) => (
                        <span
                            key={index}
                            className="title-char"
                            style={{
                                display: 'inline-block',
                                whiteSpace: 'pre'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </h2>

                <h3 ref={desc1Ref} className={styles.topHeader2}>
                    <span className="header-line" style={{ display: 'block' }}>is built on a simple belief — healthcare</span>
                    <span className="header-line" style={{ display: 'block' }}>organizations deserve a revenue cycle that is</span>
                    <span className="header-line" style={{ display: 'block' }}>intelligent, predictable, transparent, and built to scale.</span>
                </h3>

                <h3 ref={desc2Ref} className={styles.topHeader2}>
                    <span className="header-line" style={{ display: 'block' }}> combine advanced AI, automation, and</span>
                    <span className="header-line" style={{ display: 'block' }}>ooperational expertise to create a system-driven</span>
                    <span className="header-line" style={{ display: 'block' }}>RCM model that delivers measurable results</span>
                    <span className="header-line" style={{ display: 'block' }}>Revery single time.</span>
                </h3>


            </div>
        </section>
    );
}
