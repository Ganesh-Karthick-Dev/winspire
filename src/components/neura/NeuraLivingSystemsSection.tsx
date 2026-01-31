import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import styles from './NeuraLivingSystemsSection.module.css';

// Dynamically import GLTFViewer (no SSR)
const GLTFViewer = dynamic(() => import('@/components/GLTFViewer'), {
    ssr: false,
    loading: () => null,
});

const NeuraLivingSystemsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Fixed transform for the model - positioned on the right side, larger size
    const modelTransform = {
        position: { x: 0.7, y: 0, z: 0 },
        rotation: { x: 15, y: -20, z: -10 },
        scale: 10
    };

    return (
        <section
            id="living-systems"
            ref={sectionRef}
            className={styles.section}
            aria-label="From Static Workflows to Living Systems"
        >
            {/* 3D Model Layer - positioned on the right with slow spin */}
            <div className={styles.modelLayer}>
                <GLTFViewer
                    manualTransform={modelTransform}
                    rotateSpeed={0.003}
                    enableWobble={true}
                    className="w-full h-full"
                />
            </div>

            {/* Left Content */}
            <div className={styles.content}>
                <span className={styles.eyebrow}>Adaptive Intelligence</span>

                <h2 className={styles.headline}>
                    From Static Workflows to Living Systems
                </h2>

                <div className={styles.body}>
                    <p className={styles.paragraph}>
                        RCM KPIs change daily based on payer logic, policy updates, patient behavior, and specialty trends.
                    </p>

                    <p className={styles.emphasis}>
                        Static workflows cannot survive in this environment.
                    </p>

                    <p className={styles.paragraph}>
                        Neura keeps execution adaptive by continuously learning from payer responses, dynamically reprioritizing work, and recommending actions based on financial impact.
                    </p>

                    <p className={styles.accent}>
                        RCM becomes proactive, scientific, and resilient.
                    </p>
                </div>
            </div>

            {/* Right side space for 3D model */}
            <div className={styles.modelSpace} aria-hidden="true" />
        </section>
    );
};

export default NeuraLivingSystemsSection;
