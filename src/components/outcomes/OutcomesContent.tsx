import React, { useEffect, useRef } from 'react';
import styles from '@/styles/OutcomesContent.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OutcomesContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const introLeftRef = useRef<HTMLDivElement>(null);
    const introRightRef = useRef<HTMLDivElement>(null);
    const outcomeImagesRef = useRef<(HTMLImageElement | null)[]>([]);
    
    // Outcome Data
    const sections = [
        {
            id: 1,
            title: "Outcomes Start With Design, Not Execution",
            content: "Most RCM organizations react to problems after they surface. Denials rise. AR ages. Cash flow slows. At Winspire, we designed for outcomes before execution begins. We start with:",
            list: ["Clearly defined objectives", "System-led workflows", "Embedded accountability"],
            final: "When the system is designed correctly, results follow without firefighting, escalation, or constant people dependency.",
            icon: "📐",
            image: "/images/company-page/iso-standards-quality-control-businessman-hold-virtual-globe-with-quality-assurance-guarantee-product-iso-standard-certification-modern-iso-banner.webp"
        },
        {
            id: 2,
            title: "Systems Over Heroics",
            content: "Revenue cycles fail when performance depends on individual effort. They succeed when systems guide behavior. Our outcomes are driven by:",
            list: ["System-designed workflows, not hero-driven processes", "Cross-functional visibility instead of departmental silos", "Prioritization based on financial impact, not task volume"],
            final: "This is how performance scales without burnout.",
            icon: "⚙️",
            image: "/images/company-page/network-digit-0.webp"
        },
        {
            id: 3,
            title: "Human-Centric, Not People-Dependent",
            content: "People are our greatest enablers but outcomes should never depend on individual heroics. At Winspire:",
            list: ["Knowledge is embedded into systems", "Learning flows continuously from insights to execution", "Issues are corrected at the source, not repeatedly downstream"],
            final: "This creates stability, confidence, and continuous improvement across the revenue cycle.",
            icon: "👥",
            image: "/images/company-page/business-people-shaking-hands-congratulations-work-success.webp"
        },
        {
            id: 4,
            title: "Intelligence That Enables Better Decisions",
            content: "Technology at Winspire exists for one purpose: to reduce friction and increase clarity. Our proprietary intelligence layer, Neura, enables outcomes by:",
            list: ["Identifying risk early", "Prioritizing work by financial impact", "Providing real-time visibility across teams and departments"],
            final: "AI here strengthens human judgment. It never replaces it.",
            icon: "🧠",
            image: "/images/company-page/ai-assistant-ai-chatbot-generate-images-write-code-writer-bot-translate-advertising-llm.webp"
        },
        {
            id: 5,
            title: "Dashboards That Drive Action",
            content: "Dashboards are not reports. They are control systems. Our leaders and teams use real-time dashboards to:",
            list: ["Track revenue health and AR risk continuously", "Monitor performance, adherence, and utilization", "Measure turnaround times against defined outcomes"],
            final: "When clarity improves, execution follows.",
            icon: "📊",
            image: "/images/company-page/network-digit-0.webp" // Changed Image
        },
        {
            id: 6,
            title: "Accountability at Every Level",
            content: "Outcomes are not owned by departments. They are owned collectively. At Winspire:",
            list: ["Employee KPIs are directly tied to client KPIs", "Performance is measured across the full revenue lifecycle", "Recognition is based on impact, not tenure"],
            final: "Contribution matters more than titles. Ownership matters more than hierarchy.",
            icon: "🤝",
            image: "/images/careers/presentation.png"
        },
        {
            id: 7,
            title: "Security and Trust Are Baseline Outcomes",
            content: "Outcomes are meaningless without trust. Our operating environment is built with security as a foundation:",
            list: ["Azure cloud infrastructure", "100% US data residency", "HIPAA, ISO, and ISMS compliance", "Strict PHI governance"],
            final: "Security is not a feature. It is a baseline expectation.",
            icon: "🔒",
            image: "/images/company-page/cloud-computing-cyber-security.webp"
        },
        {
            id: 8,
            title: "Designed for What Comes Next",
            content: "Healthcare reimbursement continues to evolve. Payers are becoming more automated and intelligent. Organizations that succeed will be those that:",
            list: ["Design systems instead of managing chaos", "Enable people instead of exhausting them", "Act on intelligence instead of assumptions"],
            final: "That future is not coming. It is already here.",
            icon: "🚀",
            image: "/images/company-page/Glow 1.webp"
        }
    ];

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1, 
                    pin: `.${styles.stickyStage}`,
                }
            });

            // Initial visual state
            gsap.set(imageRef.current, { 
                width: '500px', 
                height: '400px', 
                xPercent: -50, 
                yPercent: -50, 
                x: 0, 
                y: 0, 
                borderRadius: '2rem' 
            });

            // 1. Fade out Intro - NO LONGER NEEDED (Intro removed)
            // tl.to(`.${styles.introContent}`, { opacity: 0, duration: 1 });

            // Distance to move from center
            const offsetVW = 25; 

            // INTRO FADE OUT LOGIC
            // As user scrolls, split text moves away and fades out while image expands
            // INTRO FADE OUT LOGIC
            // As user scrolls, split text moves away and fades out while image expands
            tl.to(introLeftRef.current, {
                x: -150, // Move further out
                opacity: 0,
                scale: 0.9,
                duration: 20, // Slower fade
                ease: 'power1.out'
            }, 0); 

            tl.to(introRightRef.current, {
                x: 150, // Move further out
                opacity: 0,
                scale: 0.9,
                duration: 20, // Slower fade
                ease: 'power1.out'
            }, 0); 

            sections.forEach((section, index) => {
                const targetXVal = (index % 2 === 0) ? offsetVW : -offsetVW;
                const isEvenSection = index % 2 !== 0; // 2nd, 4th, 6th... (Indices 1, 3, 5)

                // Step A: EXPAND to Full Screen - Ultra Slow & Smooth
                tl.to(imageRef.current, {
                    width: '100vw',
                    height: '100vh',
                    borderRadius: 0,
                    x: 0, 
                    y: 0,
                    filter: 'blur(0px)', // Reset container blur
                    duration: 30, 
                    ease: 'expo.inOut'
                }, index === 0 ? 0 : '>');

                // Step B: While Expanded, BLEND Content
                tl.to(`.${styles.activeImageContent}`, { 
                    opacity: 0, 
                    y: 40,
                    duration: 5, 
                    ease: 'power2.inOut'
                }, '-=25');

                const prevImage = index === 0 ? '#initial-image' : outcomeImagesRef.current[index - 1];
                
                tl.to(prevImage, { 
                    opacity: 0, 
                    filter: 'blur(40px)',
                    scale: 1.15,
                    duration: 20, 
                    ease: 'power1.inOut' 
                }, '<');

                // 2. Incoming image starts blurred and dissolves in
                // IF Even Section: It resolves to a 'Blur(2px)' state (Minimal blur)
                const targetBlur = isEvenSection ? 'blur(2px)' : 'blur(0px)';

                tl.fromTo(outcomeImagesRef.current[index], 
                    { opacity: 0, scale: 1.3, filter: 'blur(40px)' },
                    { 
                        opacity: 1, 
                        scale: 1, 
                        filter: targetBlur, 
                        duration: 20, 
                        ease: 'power2.out' 
                    }, 
                '<2'); 

                // Hide Previous side text
                if (index > 0) {
                     tl.to(`#text-${index}`, { 
                        opacity: 0, 
                        yPercent: -100, 
                        filter: 'blur(10px)', 
                        duration: 5 
                     }, '<');
                }

                // Hold full screen
                tl.to({}, { duration: 10 });

                // Step C: SHRINK (Odd) or STAY (Even)
                if (isEvenSection) {
                    // EVEN: Stay Full Screen
                    tl.to(imageRef.current, {
                        width: '100vw',
                        height: '100vh',
                        borderRadius: 0,
                        x: 0, 
                        y: 0,
                        duration: 30,
                        ease: 'power2.inOut' 
                    });
                } else {
                    // ODD: Shrink to Side
                    tl.to(imageRef.current, {
                        width: '500px',
                        height: () => {
                            const textEl = document.getElementById(`text-${section.id}`);
                            return textEl ? `${textEl.offsetHeight}px` : '400px';
                        },
                        borderRadius: '2.5rem',
                        x: `${targetXVal}vw`, 
                        y: 0,
                        filter: 'blur(0px)',
                        duration: 30, 
                        ease: 'expo.inOut'
                    });
                }

                // Step D: Fade In Text
                if (isEvenSection) {
                    // Right Overlay Reveal (Fade Up)
                    tl.fromTo(`#text-${section.id}`, 
                        { opacity: 0, scale: 0.95, yPercent: -40, zIndex: 25, display: 'block' }, 
                        { 
                            opacity: 1, 
                            scale: 1, 
                            yPercent: -50, 
                            duration: 8, // Slower
                            ease: 'power3.out' 
                        }, 
                    '<5'); 
                } else {
                    // Side Text Reveal (Slide Up)
                   tl.fromTo(`#text-${section.id}`, 
                        { opacity: 0, yPercent: 0, filter: 'blur(10px)', zIndex: 5 }, 
                        { 
                            opacity: 1, 
                            yPercent: -50, 
                            filter: 'blur(0px)', 
                            duration: 8, // Slower
                            ease: 'power3.out' 
                        }, 
                    '>-2');
                }


                tl.fromTo(`.section-title-${section.id} .char`,
                    { y: 40, opacity: 0, rotateX: -90, filter: 'blur(10px)' },
                    { 
                        y: 0, 
                        opacity: 1, 
                        rotateX: 0, 
                        filter: 'blur(0px)', 
                        duration: 30, // Much slower
                        stagger: 0.4, // More pronounced spread
                        ease: 'back.out(1.7)' 
                    },
                '<0.5'); 
                
                // SYNC LABEL UPDATE
                tl.call(() => {
                    const labelEl = document.getElementById('active-label');
                    if(labelEl) labelEl.innerText = `Winspire Outcome #${section.id}`;
                }, [], '<1');

                // Step E: READING TIME
                tl.to({}, { duration: 30 }); // Double reading time hold
            });
            
            // Final fade out at the very end
            tl.to(imageRef.current, { opacity: 0, duration: 8 });
            tl.to(`#text-${sections.length}`, { opacity: 0, scale: 0.9, duration: 8 }, '<');
            
             // Bring in CTA immediately
            tl.to(`.${styles.ctaWrapper}`, { y: '0%', duration: 15, ease: 'power2.out' });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Helper to split text into characters
    const renderTitle = (text: string, id: number) => (
        <span className={`section-title-${id} ${styles.sectionTitleWrapper}`}>
            {text.split('').map((char, index) => (
                <span 
                    key={index} 
                    className="char" 
                    style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : 'auto' }}
                >
                    {char}
                </span>
            ))}
        </span>
    );

    return (
        <div ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyStage}>
                
                {/* Intro Content - REMOVED */}
                
                {/* Intro Text - Left Side */}
                <div ref={introLeftRef} className={styles.introLeft}>
                    <p>At Winspire RCM, outcomes are not numbers teams are pressured to chase.</p>
                    <p>They are the natural consequence of <span className="text-white font-medium">how revenue systems are designed.</span></p>
                </div>

                {/* Intro Text - Right Side */}
                <div ref={introRightRef} className={styles.introRight}>
                    <p>When structure, accountability, and intelligence are aligned upfront, performance becomes <span className="text-cyan-400">calm, predictable, and repeatable.</span></p>
                    <div className={styles.introHighlight}>
                        <p>We don’t chase metrics.</p>
                        <p className="text-cyan-400">We design environments where the right metrics emerge.</p>
                    </div>
                </div>

                {/* The Morphing Active Image */}
                <div ref={imageRef} className={styles.activeImageContainer}>
                    {/* Initial Image */}
                    <img id="initial-image" src="/images/company/hero-main.png" alt="" className={styles.outcomeImage} />
                    
                    {/* Stacked Outcome Images */}
                    {sections.map((section, idx) => (
                        <img 
                            key={`img-${section.id}`}
                            ref={el => { outcomeImagesRef.current[idx] = el; }}
                            src={section.image} 
                            alt={section.title} 
                            className={styles.outcomeImage} 
                            style={{ opacity: 0 }}
                        />
                    ))}

                    <div className={`${styles.activeImageContent} visible`}>
                        <div id="active-label" className={styles.cardLabel}>Scroll to Begin</div>
                    </div>
                </div>

                {/* Text Sections */}
                <div ref={textRef} className={styles.textContainer}>
                    {sections.map((section, index) => {
                         const isTextLeft = index % 2 === 0;
                         const isEvenSection = index % 2 !== 0;
                         const variant = Math.floor(index / 2) + 1;

                         return (
                            <div 
                                key={section.id} 
                                id={`text-${section.id}`}
                                className={`${styles.textSection} ${isEvenSection ? styles.centered : (isTextLeft ? styles.left : styles.right)}`}
                            >
                                {/* Use renderTitle for char splitting */}
                                <h3 className={styles.sectionTitle}>
                                    {renderTitle(section.title, section.id)}
                                </h3>
                                <p className={styles.sectionParagraph}>{section.content}</p>
                                
                                {/* Dynamic List Design */}
                                {variant === 1 && (
                                    <div className={styles.listVariant1}>
                                        {section.list.map((item, i) => (
                                            <div key={i} className={styles.cardV1}>{item}</div>
                                        ))}
                                    </div>
                                )}

                                {variant === 2 && (
                                    <div className={styles.listVariant2}>
                                        {section.list.map((item, i) => (
                                            <div key={i} className={styles.cardV2}>{item}</div>
                                        ))}
                                    </div>
                                )}

                                {variant === 3 && (
                                    <div className={styles.listVariant3}>
                                        {section.list.map((item, i) => (
                                            <div key={i} className={styles.cardV3}>{item}</div>
                                        ))}
                                    </div>
                                )}

                                {variant === 4 && (
                                    <div className={styles.listVariant4}>
                                        {section.list.map((item, i) => (
                                            <div key={i} className={styles.cardV4}>
                                                <div className={styles.cardV4Icon}>
                                                    {/* Simple Circle Check Icon */}
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12"></polyline>
                                                    </svg>
                                                </div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className={styles.finalStatementBox}>
                                    {section.final}
                                </div>
                            </div>
                         );
                    })}
                </div>

                 {/* CTA Section (Hidden initially, slides up) */}
                <div className={styles.ctaWrapper} style={{ transform: 'translateY(100%)' }}>
                     <div className={styles.ctaContent}>
                        <h2 className={styles.introTitle}>Let’s Design Outcomes That Last</h2>
                        <p className={styles.ctaDescription} style={{ color: '#94a3b8', fontSize: '1.25rem', marginBottom: '2rem' }}>
                            If you’re ready to move from reactive execution to intelligently designed performance, we’re ready to build it with you.
                        </p>
                        <a href="#contact" className={styles.ctaButton}>Book a Strategic Conversation</a>
                     </div>
                </div>

            </div>
        </div>
    );
};

export default OutcomesContent;
