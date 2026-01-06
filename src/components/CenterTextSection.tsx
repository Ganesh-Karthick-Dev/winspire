/**
 * CenterTextSection Component
 * 
 * Simple section with large centered text
 */

import { useIsMobile } from '@/hooks/useIsMobile';

export default function CenterTextSection() {
    const isMobile = useIsMobile();

    return (
        <section
            id="center-text"
            className="center-text-section"
            style={{
                position: 'relative',
                width: '100%',
                height: isMobile ? 'auto' : '100vh',
                minHeight: isMobile ? '50vh' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                zIndex: 30,
                padding: isMobile ? '80px 24px 40px' : '0 40px',
            }}
        >
            <h2
                style={{
                    color: 'white',
                    fontSize: isMobile ? 'clamp(2.5rem, 12vw, 3.5rem)' : 'clamp(3.5rem, 5vw, 5rem)',
                    fontWeight: 600,
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    maxWidth: '1200px',
                }}
            >
                Meet Neura AI.
                Your Intelligent Revenue Operating System.
            </h2>
            <p
                style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: isMobile ? '1.1rem' : '1.5rem',
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                    marginTop: '24px',
                    fontWeight: 400,
                }}
            >
                Neura AI transforms your revenue cycle into a self-learning, self-optimizing, system-driven operation.
            </p>
            <p
                style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: isMobile ? '1.1rem' : '1.5rem',
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                    marginTop: '16px',
                    fontWeight: 400,
                }}
            >
                It understands patterns, predicts denials, accelerates cash, automates repetitive work, and provides real-time visibility across every department.
            </p>
        </section>
    );
}
