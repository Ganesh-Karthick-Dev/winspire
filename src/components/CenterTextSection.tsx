/**
 * CenterTextSection Component
 * 
 * Section with Meet Neura content and bullet lists
 */

import { useIsMobile } from '@/hooks/useIsMobile';

export default function CenterTextSection() {
    const isMobile = useIsMobile();

    const bulletStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '8px',
    };

    const bulletDot: React.CSSProperties = {
        color: '#38bdf8',
        fontSize: '1.2em',
    };

    return (
        <section
            id="center-text"
            className="center-text-section"
            style={{
                position: 'relative',
                width: '100%',
                minHeight: isMobile ? 'auto' : '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'flex-start' : 'center',
                justifyContent: 'center',
                background: 'transparent',
                zIndex: 30,
                padding: isMobile ? '60px 24px' : '80px 60px',
            }}
        >
            <div style={{ maxWidth: '1400px', width: '100%' }}>
                {/* Main Title */}
                <h2
                    style={{
                        color: 'white',
                        fontSize: isMobile ? 'clamp(1.8rem, 8vw, 2.5rem)' : 'clamp(2.5rem, 4vw, 3.5rem)',
                        fontWeight: 700,
                        fontFamily: 'Outfit, sans-serif',
                        textAlign: 'left',
                        lineHeight: 1.2,
                        marginBottom: '24px',
                    }}
                >
                    Meet Neura. The Intelligence Behind Our Execution.
                </h2>

                {/* Description */}
                <p
                    style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        fontFamily: 'Outfit, sans-serif',
                        textAlign: 'left',
                        lineHeight: 1.6,
                        marginBottom: '8px',
                    }}
                >
                    Neura is not software you manage.
                </p>
                <p
                    style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        fontFamily: 'Outfit, sans-serif',
                        textAlign: 'left',
                        lineHeight: 1.6,
                        marginBottom: '32px',
                    }}
                >
                    It is an intelligence layer embedded into how work gets done.
                </p>

                {/* Two Column Grid for Lists */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                    gap: isMobile ? '32px' : '48px',
                    marginBottom: '40px',
                }}>
                    {/* It helps our teams section */}
                    <div>
                        <p
                            style={{
                                color: 'white',
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 600,
                                marginBottom: '16px',
                            }}
                        >
                            It helps our teams:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> See risk early</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Prioritize what matters</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Reduce repetitive effort</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Improve quality without micromanagement</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Give leaders a clear, real-time view of performance</li>
                        </ul>
                    </div>

                    {/* Neura supports section */}
                    <div>
                        <p
                            style={{
                                color: 'white',
                                fontSize: isMobile ? '1rem' : '1.1rem',
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: 600,
                                marginBottom: '16px',
                            }}
                        >
                            Neura supports:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Revenue operations</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Leadership insight</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Quality governance</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Culture and accountability</li>
                            <li style={bulletStyle}><span style={bulletDot}>•</span> Offshore execution without risk</li>
                        </ul>
                    </div>
                </div>

                {/* Closing statement */}
                <p
                    style={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: isMobile ? '1rem' : '1.2rem',
                        fontFamily: 'Outfit, sans-serif',
                        textAlign: 'left',
                        lineHeight: 1.6,
                        marginBottom: '8px',
                    }}
                >
                    Technology here exists for one reason:
                </p>
                <p
                    style={{
                        color: 'white',
                        fontSize: isMobile ? '1.1rem' : '1.3rem',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 600,
                        textAlign: 'left',
                        marginBottom: '40px',
                    }}
                >
                    to help people perform at their best, consistently.
                </p>

                {/* CTA Button - News Index Style */}
                <a
                    href="/neura-ai"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '20px',
                        padding: '12px 12px 12px 30px',
                        background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
                        backgroundSize: '200% 200%',
                        borderRadius: '50px',
                        color: 'white',
                        textDecoration: 'none',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 600,
                        fontSize: '1rem',
                        transition: 'background-position 0.5s ease',
                        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundPosition = '100% 0';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundPosition = '0% 0';
                    }}
                >
                    See Neura in Action
                    <span
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#1a1a1a',
                            transition: 'transform 0.3s ease',
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </span>
                </a>
            </div>

            <style jsx>{`
                ul li {
                    color: rgba(255, 255, 255, 0.85);
                    font-size: ${isMobile ? '0.95rem' : '1.1rem'};
                    font-family: 'Outfit', sans-serif;
                }
            `}</style>
        </section>
    );
}
