import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from '@/styles/OutcomesContent.module.css';

// Reusing FallingWord for consistency
const FallingWord = ({ text, delay, isHighlight = false }: { text: string, delay: number, isHighlight?: boolean }) => {
    return (
        <div style={{ display: 'inline-block', verticalAlign: 'bottom', marginRight: '0.2em' }}>
            <motion.span
                initial={{ y: -40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ 
                    delay, 
                    duration: 0.8, 
                    type: "spring",
                    stiffness: 60
                }}
                viewport={{ once: true }}
                style={{ 
                    display: 'inline-block',
                    color: isHighlight ? '#0ea5e9' : '#0f172a'
                }}
            >
                {text == " " ? "\u00A0" : text}
            </motion.span>
        </div>
    );
};

const OutcomesHumanCentric = () => {
    const containerRef = useRef(null);
    
    // ... [data section remains same] ...
    const sectionData = {
        title: "3. Human-Centric, Not People-Dependent",
        content: "People are our greatest enablers but outcomes should never depend on individual heroics.",
        list: [
            "Knowledge is embedded into systems",
            "Learning flows continuously from insights to execution",
            "Issues are corrected at the source, not repeatedly downstream"
        ],
        final: "This creates stability, confidence, and continuous improvement across the revenue cycle."
    };

    return (
        <div 
            className={styles.staticContainer} 
            ref={containerRef} 
            style={{ 
                overflow: 'hidden', 
                padding: '3rem 2rem', 
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                position: 'relative',
                minHeight: '100vh'
            }}
        >
            <div 
                className={styles.staticContentWrapper} 
                style={{ 
                    background: 'rgba(255, 255, 255, 0.98)', 
                    padding: '3rem 4rem', 
                    gap: '4rem',
                    maxWidth: '1200px',
                    width: '100%',
                    margin: '0 auto',
                    borderRadius: '2.5rem',
                    display: 'grid',
                    gridTemplateColumns: 'minmax(300px, 0.8fr) 1.2fr',
                    alignItems: 'center',
                    boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 1)',
                    position: 'relative',
                    /* Right Corner Cut using mask */
                    WebkitMaskImage: 'radial-gradient(circle 60px at 100% 100%, transparent 98%, black 100%)',
                    maskImage: 'radial-gradient(circle 60px at 100% 100%, transparent 98%, black 100%)'
                }}
            >
                {/* Filler for the gap created by mask */}
                <div style={{
                    position: 'absolute',
                    bottom: '-20px',
                    right: '-20px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #0ea5e9, #1e40af)',
                    borderRadius: '50%',
                    zIndex: -1,
                    boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)',
                }} />

                {/* Left Side: Image & Final Statement */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                    <div className={styles.designGraphicWrapper}>
                        <motion.img 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            animate={{ y: [0, -15, 0] }} /* Continuous Floating Animation */
                            transition={{ 
                                opacity: { duration: 0.8 },
                                scale: { duration: 0.8 },
                                y: { 
                                    repeat: Infinity, 
                                    duration: 4, 
                                    ease: "easeInOut" 
                                }
                            }}
                            viewport={{ once: true }}
                            src="/temp/Group 12.png" 
                            alt="Human-Centric Design" 
                            style={{ 
                                objectFit: 'contain', 
                                maxHeight: '320px',
                                width: '100%'
                            }}
                        />
                    </div>

                    {/* Final Statement Pill */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ 
                            padding: '1rem 1.75rem',
                            background: '#f8fafc', 
                            border: '1px solid #e2e8f0',
                            borderRadius: '1rem',
                            display: 'flex',
                            gap: '1.25rem',
                            width: '100%',
                            maxWidth: '400px',
                            alignItems: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                        }}
                    >
                        <div style={{ width: '3.5rem', height: '3.5rem', background: '#0ea5e9', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <p style={{ fontSize: '1rem', color: '#1e293b', fontWeight: 600, margin: 0, lineHeight: 1.4 }}>{sectionData.final}</p>
                    </motion.div>
                </div>

                {/* Right Side: Text Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h3 style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1.2, color: '#1e293b', margin: 0 }}> {/* Reduced title size */}
                        <FallingWord text="3." delay={0.1} />
                        <FallingWord text="Human-Centric," isHighlight={true} delay={0.3} />
                        <br />
                        <FallingWord text="Not" delay={0.5} />
                        <FallingWord text="People-Dependent" delay={0.7} />
                    </h3>
                    
                    <p style={{ fontSize: '1.15rem', color: '#64748b', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                        {sectionData.content}
                    </p>

                    {/* Timeline List */}
                    <div style={{ position: 'relative', marginTop: '1.5rem' }}>
                        {/* SVG Line with dynamic gradient */}
                        <svg 
                            style={{ 
                                position: 'absolute', 
                                top: '24px',
                                left: '0', 
                                height: '140px',
                                width: '48px', 
                                overflow: 'visible',
                                pointerEvents: 'none',
                                zIndex: 0
                            }}
                        >
                            <line x1="24" y1="0" x2="24" y2="100%" stroke="#f1f5f9" strokeWidth="4" strokeLinecap="round" />
                            <motion.path
                                d="M 24 0 V 140"
                                stroke="#0ea5e9" /* Simple stroke to ensure visibility */
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                transition={{ duration: 1.2, ease: "easeInOut", delay: 1 }}
                                viewport={{ once: true }}
                            />
                        </svg>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {sectionData.list.map((item, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1 + (index * 0.2), duration: 0.6 }}
                                    viewport={{ once: true }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative', zIndex: 1 }}
                                >
                                    <div style={{ 
                                        width: '48px', 
                                        height: '48px', 
                                        background: '#0ea5e9', 
                                        borderRadius: '50%', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: '800',
                                        fontSize: '1.5rem',
                                        border: '4px solid white',
                                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                        flexShrink: 0
                                    }}>
                                        {index + 1}
                                    </div>
                                    <span style={{ fontSize: '1.15rem', color: '#1e293b', fontWeight: 600, lineHeight: 1.3 }}>
                                        {item}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OutcomesHumanCentric;
