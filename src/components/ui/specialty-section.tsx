"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SectionTitle from "./section-title";

export function SpecialtySection() {
    const specialties = [
        "Specialty and multispecialty practices",
        "Hospitals and ambulatory surgery centers",
        "Behavioral and mental health providers",
        "Emergency & Urgent Care Providers",
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
                        column-gap: 3rem;
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
                    gap: 1.25rem;
                    padding: 1.5rem;
                    border-radius: 16px;
                    background: rgba(15, 23, 42, 0.3); /* Subtle dark glass */
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                    cursor: default;
                }
                .specialty-item:hover {
                    background: rgba(30, 41, 59, 0.5);
                    border-color: rgba(96, 165, 250, 0.3); /* Blue hover border */
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
                }

                .icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 3rem;
                    height: 3rem;
                    border-radius: 12px;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(99, 102, 241, 0.05));
                    border: 1px solid rgba(59, 130, 246, 0.1);
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }
                .specialty-item:hover .icon-wrapper {
                    background: rgba(59, 130, 246, 0.2);
                    border-color: rgba(59, 130, 246, 0.3);
                    transform: scale(1.05); /* Icon pop */
                }

                :global(.check-icon) {
                    color: #60a5fa;
                }

                .specialty-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.125rem;
                    color: #f1f5f9; /* Slate-100 */
                    font-weight: 500;
                    line-height: 1.4;
                }

                .divider {
                    height: 2px; /* Thicker divider */
                    background: rgba(255, 255, 255, 0.2); /* Slightly more visible */
                    margin: 3rem 0;
                    width: 100%;
                }

                .description-text {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.25rem;
                    color: #ffffff; /* White for better visibility */
                    line-height: 1.6;
                    margin-bottom: 3rem;
                    max-width: 900px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.5); /* Shadow to pop against 3D bg */
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
