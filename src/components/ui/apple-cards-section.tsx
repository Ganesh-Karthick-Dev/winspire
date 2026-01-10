"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

const DummyContent = () => {
    return (
        <>
            {[...new Array(2).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        style={{
                            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
                            padding: '32px',
                            borderRadius: '24px',
                            marginBottom: '16px',
                        }}
                    >
                        <p style={{
                            color: '#374151',
                            fontSize: '1.1rem',
                            fontFamily: 'Outfit, sans-serif',
                            maxWidth: '800px',
                            margin: '0 auto 24px',
                            lineHeight: 1.7,
                        }}>
                            <span style={{ fontWeight: 700, color: '#1a1a2e' }}>
                                Delivering excellence in healthcare revenue cycle management.
                            </span>{" "}
                            Our AI-powered solutions help healthcare organizations optimize their
                            financial operations, reduce denials, and improve cash flow with
                            measurable outcomes.
                        </p>
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Revenue Intelligence",
        title: "AI-Powered Denial Prevention",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Operational Excellence",
        title: "Streamlined Workflows at Scale",
        src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        content: <DummyContent />,
    },
    {
        category: "Strategic Partnership",
        title: "Expert Teams, Proven Results",
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        content: <DummyContent />,
    },
];

export function AppleCardsSection() {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <section
            style={{
                position: 'relative',
                width: '100%',
                padding: '80px 0',
                background: 'transparent',
                zIndex: 30,
            }}
        >
            <div style={{ maxWidth: '1400px', margin: '0 auto', paddingLeft: '40px' }}>
                <h2
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: 700,
                        color: 'white',
                        marginBottom: '8px',
                    }}
                >
                    Why Choose Winspire
                </h2>
                <p
                    style={{
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        marginBottom: '0',
                    }}
                >
                    Discover what sets us apart
                </p>
            </div>
            <Carousel items={cards} />
        </section>
    );
}
