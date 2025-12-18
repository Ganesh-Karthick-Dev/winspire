/**
 * Footer Component - Precise Match to Reference
 * 
 * Layout:
 * - Center aligned container
 * - Service card (purple gradient top + white bottom)
 * - Three link columns with vertical dividers
 * - Bottom bar with privacy policy and copyright
 */

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="ref-footer">
            {/* Main Content - Centered */}
            <div className="ref-footer-content">
                {/* Service Card */}
                <div className="ref-service-card">
                    {/* Top Section - Purple Gradient with Image */}
                    <div className="ref-card-top">
                        <div className="ref-card-image">
                            <Image
                                src="/images/links/links_workspace_laptop_1766075249577.png"
                                alt="Winspire RCM Service"
                                width={260}
                                height={140}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>

                    {/* Bottom Section - White Background */}
                    <div className="ref-card-bottom">
                        <div className="ref-card-info">
                            <span className="ref-card-name">Winspire RCM</span>
                            <span className="ref-card-label">Service Site</span>
                        </div>
                        <span className="ref-card-arrow">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </span>
                    </div>

                    {/* Badge */}
                    <div className="ref-card-badge">
                        <div className="ref-badge-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#e53935">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                        </div>
                        <div className="ref-badge-text">
                            <span className="ref-badge-label">HEALTHCARE EXCELLENCE</span>
                            <span className="ref-badge-year">2024 Award</span>
                        </div>
                    </div>
                </div>

                {/* Link Columns Container */}
                <div className="ref-columns-container">
                    {/* About Us Column */}
                    <div className="ref-column">
                        <div className="ref-column-divider"></div>
                        <div className="ref-column-content">
                            <h3 className="ref-column-title">
                                <span className="ref-title-dot">•</span> About Us
                            </h3>
                            <ul className="ref-column-links">
                                <li><a href="/about#mission">Mission</a></li>
                                <li><a href="/about#vision">Vision</a></li>
                                <li><a href="/about#values">Values</a></li>
                                <li><a href="/about#team">Board Members</a></li>
                                <li><a href="/about#awards">Award</a></li>
                                <li><a href="/about#profile">Corporate Profile</a></li>
                                <li><a href="/contact">Access</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Careers Column */}
                    <div className="ref-column">
                        <div className="ref-column-divider"></div>
                        <div className="ref-column-content">
                            <h3 className="ref-column-title">
                                <span className="ref-title-dot">•</span> Careers
                            </h3>
                            <ul className="ref-column-links">
                                <li><a href="/careers#message">Message</a></li>
                                <li><a href="/careers#jobs">Job Categories</a></li>
                                <li><a href="/careers#people">People</a></li>
                                <li><a href="/careers#environment">Work Environment</a></li>
                                <li><a href="/careers#materials">Recruitment<br />Materials</a></li>
                                <li><a href="/careers#faq">FAQ</a></li>
                                <li><a href="/careers#culture">Culture Note</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* News Column */}
                    <div className="ref-column">
                        <div className="ref-column-divider"></div>
                        <div className="ref-column-content">
                            <h3 className="ref-column-title">
                                <span className="ref-title-dot">•</span> News
                            </h3>
                            <ul className="ref-column-links">
                                <li><a href="/news#media">Media</a></li>
                                <li><a href="/news#events">Event</a></li>
                                <li><a href="/news#company">Company</a></li>
                                <li><a href="/news#releases">Release</a></li>
                                <li><a href="/news#case-studies">Case Study</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="ref-footer-bottom">
                <div className="ref-bottom-left">
                    <div className="ref-privacy-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4M12 8h.01" />
                        </svg>
                    </div>
                    <a href="/privacy" className="ref-privacy-link">Privacy Policy</a>
                </div>
                <div className="ref-bottom-right">
                    <span className="ref-copyright">© Winspire RCM Inc. All Rights Reserved.</span>
                </div>
            </div>
        </footer>
    );
}
