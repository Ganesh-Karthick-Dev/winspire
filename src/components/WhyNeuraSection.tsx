'use client';

import React from 'react';

const WhyNeuraSection: React.FC = () => {
    return (
        <section className="why-neura-section">
            <div className="content-wrapper">
                <h2 className="section-title">Why Neura AI Is Fundamentally Different</h2>

                <div className="text-content">
                    <p>Most RCM technology focuses on visibility.</p>
                    <p>Neura focuses on <strong>control, sequencing, and decision timing</strong>.</p>

                    <p>
                        By redesigning the entire revenue ecosystem — not just improving reporting — Neura
                        delivers a <strong>60–70% efficiency improvement within 60–90 days</strong>.
                    </p>

                    <p>Not by pushing people harder.</p>
                    <p>But by fixing the system they work within.</p>
                </div>

                <div className="flow-diagram-placeholder">
                    <p style={{ color: '#0066FF', fontSize: '1.5rem', fontWeight: 600 }}>
                        RCM Architecture Diagram
                    </p>
                    <p style={{ color: '#666' }}>
                        React Flow diagram will be added here
                    </p>
                </div>
            </div>

            <style jsx>{`
                .why-neura-section {
                    position: relative;
                    min-height: 100vh;
                    padding: 100px 40px;
                    background: linear-gradient(180deg, #0a1628 0%, #1a365d 100%);
                    z-index: 20;
                }

                .content-wrapper {
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .section-title {
                    font-family: 'Outfit', sans-serif;
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 700;
                    color: white;
                    margin-bottom: 40px;
                    text-align: center;
                }

                .text-content {
                    max-width: 800px;
                    margin: 0 auto 60px;
                    text-align: center;
                }

                .text-content p {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 16px;
                }

                .text-content strong {
                    color: #60a5fa;
                    font-weight: 700;
                }

                .flow-diagram-placeholder {
                    width: 100%;
                    height: 500px;
                    background: white;
                    border-radius: 16px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                }

                @media (max-width: 768px) {
                    .why-neura-section {
                        padding: 60px 20px;
                    }

                    .text-content p {
                        font-size: 1rem;
                    }

                    .flow-diagram-placeholder {
                        height: 300px;
                    }
                }
            `}</style>
        </section>
    );
};

export default WhyNeuraSection;
