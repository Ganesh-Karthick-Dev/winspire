"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionTitle from "./section-title";

export function SpecialtySection() {
    const specialties = [
        "Specialty and multispecialty practices",
        "Hospitals and ambulatory surgery centers",
        "Behavioral and mental health providers",
        "Home health and hospice organizations",
        "Tribal and community health networks"
    ];

    return (
        <section id="specialties" className="specialties-section">
            <div className="specialties-container">

                {/* Header */}
                <div className="specialties-header">
                    <SectionTitle
                        title="BUILT FOR EVERY SPECIALTY. DISCIPLINED FOR ALL."
                        subtitle="SPECIALTIES WE SERVE"
                        align="left"
                        textColor="text-white"
                        subtitleSize="text-sm md:text-base tracking-[0.3em] font-bold text-blue-400 uppercase"
                        disableShadow={true}
                    />
                </div>

                <div className="specialties-content">
                    <p className="intro-text">
                        Healthcare is not one-size-fits-all. Neither is our approach. <br />
                        Winspire adapts to complex workflows across:
                    </p>

                    {/* Specialties List Grid */}
                    <div className="specialties-grid">
                        {specialties.map((item, index) => (
                            <div key={index} className="specialty-item group">
                                <div className="icon-wrapper">
                                    <CheckCircle2 size={20} className="check-icon" />
                                </div>
                                <span className="specialty-text">{item}</span>
                            </div>
                        ))}
                    </div>

                    <div className="divider"></div>

                    <p className="description-text">
                        Each specialty brings different denial patterns, payer behavior, and operational risk.
                        <span className="text-white font-bold"> Our systems adapt. Our discipline never changes.</span>
                    </p>

                    <div className="cta-wrapper">
                        <button className="specialty-cta group">
                            <span className="cta-text">Explore Specialty Workflows</span>
                            <ArrowRight size={20} className="cta-arrow" />
                        </button>
                    </div>
                </div>

            </div>

            <style jsx>{`
                .specialties-section {
                    position: relative;
                    z-index: 40;
                    padding: 8rem 0;
                    background: transparent;
                }

                .specialties-container {
                    width: 100%;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .specialties-header {
                    margin-bottom: 4rem;
                    text-align: left;
                    padding: 0 24px;
                }
                @media (min-width: 768px) {
                    .specialties-header { padding: 0 64px; }
                }

                .specialties-content {
                    padding: 0 24px;
                }
                @media (min-width: 768px) {
                    .specialties-content { padding: 0 64px; }
                }

                .intro-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #bae6fd; /* Sky-200 */
                    line-height: 1.6;
                    margin-bottom: 3rem;
                    max-width: 800px;
                }
                @media (min-width: 768px) {
                    .intro-text { font-size: 1.5rem; }
                }

                /* Grid */
                .specialties-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                    margin-bottom: 4rem;
                }
                @media (min-width: 768px) {
                    .specialties-grid { 
                        grid-template-columns: repeat(2, 1fr);
                        column-gap: 4rem;
                        row-gap: 2rem;
                    }
                }
                @media (min-width: 1024px) {
                    .specialties-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }

                .specialty-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 12px;
                    transition: background 0.3s ease;
                }
                .specialty-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

                .icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    background: rgba(59, 130, 246, 0.1);
                    flex-shrink: 0;
                }
                :global(.check-icon) {
                    color: #60a5fa;
                }

                .specialty-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: white;
                    font-weight: 500;
                }

                .divider {
                    height: 1px;
                    background: rgba(255, 255, 255, 0.1);
                    margin: 3rem 0;
                    width: 100%;
                }

                .description-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #94a3b8;
                    line-height: 1.6;
                    margin-bottom: 3rem;
                    max-width: 900px;
                }

                .cta-wrapper {
                    margin-top: 2rem;
                }

                .specialty-cta {
                    background: white;
                    border: none;
                    border-radius: 100px;
                    padding: 1.25rem 3rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
                }

                .specialty-cta:hover {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.4);
                    transform: scale(1.05);
                }

                .cta-text {
                    font-family: 'Outfit', sans-serif;
                    color: #0f172a;
                    font-weight: 700;
                    font-size: 1.125rem;
                }

                :global(.cta-arrow) {
                    color: #0f172a;
                    transition: transform 0.3s ease;
                }
                .specialty-cta:hover :global(.cta-arrow) {
                    transform: translateX(4px);
                }

            `}</style>
        </section>
    );
}
