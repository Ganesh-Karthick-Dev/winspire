/**
 * Why We Exist Section Component for Temp Company Page
 * 
 * Redesigned: Zigzag layout with Titles OUTSIDE cards.
 * Dark Glass Cards + Yellow Icon Hover Effect.
 */

'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../styles/WhyWeExistSection.module.css';
import Image from 'next/image';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function WhyWeExistSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const wrappers = gsap.utils.toArray(`.${styles.itemWrapper}`);
            
            wrappers.forEach((wrapper: any, i) => {
                const isRight = wrapper.classList.contains(styles.right);
                
                gsap.fromTo(wrapper,
                    { 
                        x: isRight ? 100 : -100, 
                        opacity: 0,
                        filter: 'blur(10px)'
                    },
                    {
                        x: 0,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: wrapper,
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
            className={styles.section}
        >
            <div className={styles.container}>
                
                {/* 1. Left: Why We Exist */}
                <div className={`${styles.itemWrapper} ${styles.left}`}>
                    <h3 className={styles.sectionTitle}>Why We Exist</h3>
                    <div className={styles.card}>
                         <div className={styles.cardContent}>
                             <h2 className={styles.heading}>
                                Because RCM Was Never Meant to Be <br/>
                                <span className={styles.accentText}>Reactive.</span>
                             </h2>
                             <p className={styles.description}>
                                In many healthcare organizations, revenue problems only become visible after damage is done—when denials increase, AR ages, or cash flow tightens.
                             </p>
                         </div>
                         <div className={styles.iconWrapper}>
                             <Image 
                                src="/svg/Group.svg" 
                                alt="Icon" 
                                width={180} 
                                height={180} 
                                className={styles.icon} 
                            />
                         </div>
                    </div>
                </div>

                {/* 2. Right: The Reality */}
                <div className={`${styles.itemWrapper} ${styles.right}`}>
                    <h3 className={styles.sectionTitle}>The Reality</h3>
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <p className={styles.description}>
                                From experience, we know this reactive approach creates pressure, not stability.
                            </p>
                        </div>
                        <div className={styles.iconWrapper}>
                            <Image 
                                src="/svg/Vector.svg" 
                                alt="Icon" 
                                width={180} 
                                height={180} 
                                className={styles.icon} 
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Left: Intentional Design */}
                <div className={`${styles.itemWrapper} ${styles.lastLeft}`}>
                     <h3 className={styles.sectionTitle}>Intentional Design</h3>
                     <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <p className={styles.description}>
                                 True revenue performance is shaped long before claims are submitted. It is determined by how leadership designs structure, accountability, and intelligence at the top.
                            </p>
                            <br/>
                            <p className={styles.description}>
                                 Winspire was created to help organizations move from reactive execution to intentional design so revenue performance becomes predictable instead of stressful.
                            </p>
                        </div>
                        <div className={styles.iconWrapper}>
                             <Image 
                                src="/svg/Group.svg" 
                                alt="Icon" 
                                width={180} 
                                height={180} 
                                className={styles.icon} 
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
}
