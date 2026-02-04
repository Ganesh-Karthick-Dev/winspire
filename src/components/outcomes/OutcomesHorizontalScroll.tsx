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
        image: "/temp/human-interact-with-ai-artificial-intelligence-brain-process-generative-ai-uuid (1).jpg"
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
        image: "/temp/woman-sits-front-monitor-that-has-word-brain-it.jpg"
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
        image: "/temp/hand-with-brain-dark-backdrop.jpg"
    }
];

const OutcomesHorizontalScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollTrackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const track = scrollTrackRef.current;

        if (!container || !track) return;

        // Calculate total width of the track
        let totalWidth = track.scrollWidth;
        let viewportWidth = window.innerWidth;

        // Create the horizontal scroll tween
        const scrollTween = gsap.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: () => `+=${track.scrollWidth - window.innerWidth}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className={styles.scrollContainer}>
            <div className={styles.stickyHeader}>
                <h2 className={styles.mainTitle}>Platform-Powered Discovery</h2>
                <div className={styles.progressBar}></div>
            </div>

            <div ref={scrollTrackRef} className={styles.scrollTrack}>
                {horizontalSections.map((section, index) => (
                    <div key={section.id} className={styles.sectionPanel}>
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
