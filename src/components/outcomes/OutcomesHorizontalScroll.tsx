import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import { Brain, ShieldAlert, LineChart, LayoutDashboard, Activity, Clock, Users, Target, Award } from 'lucide-react';
import styles from '@/styles/OutcomesHorizontalScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

const horizontalSections = [
    {
        id: 'intelligence',
        title: "Intelligence That Enables Better Decisions",
        subtitle: "Technology at Winspire exists for one purpose: to reduce friction and increase clarity.",
        points: [
            { icon: ShieldAlert, title: "Identifying Risk Early", desc: "Proactive detection of potential denials." },
            { icon: LineChart, title: "Financial Prioritization", desc: "Prioritizing work by financial impact." },
            { icon: Brain, title: "Real-time Visibility", desc: "Providing real-time visibility across teams." }
        ],
        image: "/outcomes/inteligence that enable.webp"
    },
    {
        id: 'dashboards',
        title: "Dashboards That Drive Action",
        subtitle: "Dashboards are not reports. They are control systems for real-time decision making.",
        points: [
            { icon: LayoutDashboard, title: "Track Revenue Health", desc: "Monitor revenue health & AR risk." },
            { icon: Activity, title: "Monitor Performance", desc: "Track adherence & team efficiency." },
            { icon: Clock, title: "Measure Turnaround", desc: "Turnaround times vs outcomes." }
        ],
        image: "/outcomes/dashboard that drive action medic.webp"
    },
    {
        id: 'accountability',
        title: "Accountability at Every Level",
        subtitle: "Outcomes are own collectively. Contribution matters more than titles.",
        points: [
            { icon: Target, title: "Aligned KPIs", desc: "Employee KPIs tied to client KPIs." },
            { icon: Award, title: "Full Lifecycle", desc: "Performance across full revenue lifecycle." },
            { icon: Users, title: "Impact Over Tenure", desc: "Recognition based on impact." }
        ],
        image: "/outcomes/acountablity at every level.webp"
    }
];

const OutcomesHorizontalScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Use matchMedia to only enable GSAP on desktop/large tablets
        const matchMedia = gsap.matchMedia();

        matchMedia.add("(min-width: 1025px)", () => {
            const ctx = gsap.context(() => {
                const panels = panelsRef.current.filter((p): p is HTMLDivElement => p !== null);
                const totalPanels = panels.length;
                
                if (totalPanels === 0) return;

                // Initialize Styles
                panels.forEach((panel, i) => {
                    const img = panel.querySelector(`.${styles.leftImage}`);
                    const text = panel.querySelector(`.${styles.rightContent}`);
                    
                    gsap.set(panel, { zIndex: i + 1, autoAlpha: 1 });
                    
                    if (i === 0) {
                        // First panel fully visible
                        if (img) gsap.set(img, { clipPath: 'circle(100% at 50% 50%)', scale: 1, opacity: 1 });
                        if (text) gsap.set(text, { opacity: 1, y: 0 });
                    } else {
                        // Others hidden - Circular reveal from center point
                        if (img) gsap.set(img, { clipPath: 'circle(0% at 50% 50%)', opacity: 0, scale: 0.8 });
                        if (text) gsap.set(text, { opacity: 0, y: 50 });
                    }
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: container,
                        start: "top top",
                        end: `+=${totalPanels * 100}%`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1
                    }
                });

                for (let i = 1; i < totalPanels; i++) {
                    const currentPanel = panels[i];
                    const previousPanel = panels[i - 1];

                    if (!currentPanel || !previousPanel) continue;

                    const currentImg = currentPanel.querySelector(`.${styles.leftImage}`);
                    const currentText = currentPanel.querySelector(`.${styles.rightContent}`);
                    const prevText = previousPanel.querySelector(`.${styles.rightContent}`);
                    
                    const startTime = i - 1; 

                    // 1. Animate NEW Image Enters (Circular expansion from center point)
                    if (currentImg) {
                        tl.to(currentImg, {
                            clipPath: 'circle(100% at 50% 50%)',
                            opacity: 1,
                            scale: 1,
                            duration: 1,
                            ease: "power2.inOut"
                        }, startTime);
                    }

                    // 2. Animate PREVIOUS Text Exit
                    if (prevText) {
                        tl.to(prevText, {
                            opacity: 0,
                            y: -30,
                            duration: 0.5,
                            ease: "power2.in"
                        }, startTime);
                    }

                    // 3. Animate NEW Text Enter
                    if (currentText) {
                        tl.to(currentText, {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            ease: "power2.out"
                        }, startTime + 0.4); 
                    }
                }

                if (progressBarRef.current) {
                    tl.to(progressBarRef.current, {
                        width: '100%',
                        ease: 'none',
                        duration: totalPanels - 1
                    }, 0);
                }

            }, containerRef);
        });

        return () => matchMedia.revert();
    }, []);

    return (
        <div ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyHeader}>
                <div className={styles.headerTop}>
                    <h2 className={styles.mainTitle}>Platform-Powered Discovery</h2>
                </div>
            </div>

            {/* Progress line aligned only with content side */}
            <div className={styles.contentLineWrapper}>
                <div className={styles.contentLineInner}>
                    <div className={styles.progressContainer}>
                        <div ref={progressBarRef} className={styles.progressBar}></div>
                    </div>
                </div>
            </div>

            <div className={styles.scrollTrack}>
                {horizontalSections.map((section, index) => (
                    <div 
                        key={section.id} 
                        className={styles.sectionPanel}
                        ref={(el) => {
                            panelsRef.current[index] = el;
                        }}
                    >
                        <div className={styles.panelContent}>
                            <div className={styles.leftImage}>
                                <img src={section.image} alt={section.title} />
                            </div>
                            <div className={styles.rightContent}>
                                <div className={styles.textContent}>
                                    <span className={styles.sectionNumber}>0{index + 1}</span>
                                    <h3 className={styles.panelTitle}>{section.title}</h3>
                                    <p className={styles.panelSubtitle}>{section.subtitle}</p>
                                    
                                    <div className={styles.pointsList}>
                                        {section.points.map((point, idx) => (
                                            <div key={idx} className={styles.pointItem}>
                                                <div className={styles.pointIcon}>
                                                    <point.icon size={20} />
                                                </div>
                                                <div className={styles.pointText}>
                                                    <h4>{point.title}</h4>
                                                    <p>{point.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OutcomesHorizontalScroll;
