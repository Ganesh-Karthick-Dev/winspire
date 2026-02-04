import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from '@/styles/OutcomesContent.module.css';
import OutcomesDesignGraphic from './OutcomesDesignGraphic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const FallingWord = ({ text, delay, isHighlight = false, highlightClass = "" }: { text: string, delay: number, isHighlight?: boolean, highlightClass?: string }) => {
    return (
        <div style={{ position: 'relative', display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.25em', paddingBottom: '0.1em' }}>
            <motion.div
                initial={{ y: 0 }}
                whileInView={{ y: '105%' }}
                transition={{ delay, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                viewport={{ once: true, margin: "-10%" }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#0ea5e9',
                    zIndex: 2
                }}
            />
            <span className={isHighlight ? highlightClass : undefined} style={{ display: 'inline-block' }}>
                {text}
            </span>
        </div>
    );
};

const OutcomesContent = () => {
    const graphicRef = useRef(null);
    const isGraphicInView = useInView(graphicRef, { once: true, amount: 0.3 });

    // Outcome Data - Single Static Section
    const staticSection = {
        id: 1,
        title: "Outcomes Start With Design, Not Execution",
        content: "Most RCM organizations react to problems after they surface. Denials rise. AR ages. Cash flow slows. At Winspire, we designed for outcomes before execution begins.",
        list: ["Clearly defined objectives", "System-led workflows", "Embedded accountability"],
        final: "When the system is designed correctly, results follow without firefighting, escalation, or constant people dependency.",
    };

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.staticContainer}>
            <div className={styles.staticContentWrapper}>
                
                {/* Left Side: Graphic (Solutions) */}
                <div className={styles.staticLeft} ref={graphicRef}>
                    <div className={styles.designGraphicWrapper}>
                         <OutcomesDesignGraphic 
                            items={staticSection.list} 
                            isActive={isGraphicInView} 
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className={styles.staticRight}>
                    <h3 className={styles.section1Title}>
                        <FallingWord text="Outcomes" delay={0.1} />
                        <FallingWord text="Start" delay={0.3} />
                        <FallingWord text="With" delay={0.5} />
                        <FallingWord text="Design," isHighlight={true} highlightClass={styles.highlightTitle} delay={0.7} />
                        <br />
                        <FallingWord text="Not" delay={1.0} />
                        <FallingWord text="Execution" delay={1.2} />
                    </h3>
                    
                    <p className={styles.section1Content}>
                        {staticSection.content}
                    </p>

                    <div className={styles.finalStatementPill}>
                        <div className={styles.pillIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className={styles.pillContent}>
                            <p>{staticSection.final}</p>
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>

        </div>
    );
};

export default OutcomesContent;
