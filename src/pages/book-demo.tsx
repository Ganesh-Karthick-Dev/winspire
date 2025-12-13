/**
 * Book a Demo Page
 * 
 * Premium contact form for scheduling product demonstrations.
 * Reuses Layout component (includes Navbar and Footer).
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import gsap from 'gsap';

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    phone: string;
    employees: string;
    message: string;
}

export default function BookDemo() {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        employees: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const formRef = useRef<HTMLFormElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Animate on mount
    useEffect(() => {
        // Hide the loader immediately since this page has no 3D model
        const loaderOverlay = document.querySelector('.loader-overlay') as HTMLElement;
        if (loaderOverlay) {
            loaderOverlay.style.opacity = '0';
            loaderOverlay.style.visibility = 'hidden';
        }
        document.body.classList.remove('loading');

        const ctx = gsap.context(() => {
            // Hero animation
            gsap.from('.demo-hero-title', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            gsap.from('.demo-hero-subtitle', {
                y: 40,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
            });

            // Form animation
            gsap.from('.demo-form-container', {
                y: 80,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: 'power3.out',
            });

            // Stats cards animation
            gsap.from('.demo-stat-card', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                delay: 0.6,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // For demo purposes, always succeed
        setSubmitStatus('success');
        setIsSubmitting(false);

        // Reset form after success
        setTimeout(() => {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                company: '',
                phone: '',
                employees: '',
                message: '',
            });
            setSubmitStatus('idle');
        }, 3000);
    };

    const stats = [
        { value: '98%', label: 'Client Satisfaction' },
        { value: '40%', label: 'Revenue Increase' },
        { value: '24/7', label: 'Expert Support' },
        { value: '30+', label: 'Healthcare Partners' },
    ];

    return (
        <Layout
            title="Book a Demo"
            description="Schedule a personalized demo of Winspire RCM's AI-powered revenue cycle management solutions. See how we can transform your healthcare revenue operations."
        >
            <div className="demo-page">
                {/* Hero Section */}
                <section className="demo-hero" ref={heroRef}>
                    <div className="demo-hero-content">
                        <h1 className="demo-hero-title">
                            See Winspire <span className="gradient-text">in Action</span>
                        </h1>
                        <p className="demo-hero-subtitle">
                            Schedule a personalized demo and discover how our AI-powered RCM solutions
                            can transform your revenue cycle operations.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="demo-stats" ref={cardsRef}>
                        {stats.map((stat, index) => (
                            <div key={index} className="demo-stat-card">
                                <span className="demo-stat-value">{stat.value}</span>
                                <span className="demo-stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Form Section */}
                <section className="demo-form-section">
                    <div className="demo-form-container">
                        <div className="demo-form-header">
                            <h2 className="demo-form-title">Request Your Demo</h2>
                            <p className="demo-form-description">
                                Fill out the form below and our team will reach out within 24 hours
                                to schedule your personalized demonstration.
                            </p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="demo-form">
                            <div className="demo-form-grid">
                                <div className="demo-form-group">
                                    <label htmlFor="firstName" className="demo-label">
                                        First Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        required
                                        className="demo-input"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="demo-form-group">
                                    <label htmlFor="lastName" className="demo-label">
                                        Last Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        required
                                        className="demo-input"
                                        placeholder="Doe"
                                    />
                                </div>

                                <div className="demo-form-group">
                                    <label htmlFor="email" className="demo-label">
                                        Work Email <span className="required">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="demo-input"
                                        placeholder="john@company.com"
                                    />
                                </div>

                                <div className="demo-form-group">
                                    <label htmlFor="phone" className="demo-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="demo-input"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>

                                <div className="demo-form-group">
                                    <label htmlFor="company" className="demo-label">
                                        Company Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        required
                                        className="demo-input"
                                        placeholder="Acme Healthcare"
                                    />
                                </div>

                                <div className="demo-form-group">
                                    <label htmlFor="employees" className="demo-label">
                                        Company Size
                                    </label>
                                    <select
                                        id="employees"
                                        name="employees"
                                        value={formData.employees}
                                        onChange={handleInputChange}
                                        className="demo-input demo-select"
                                    >
                                        <option value="">Select company size</option>
                                        <option value="1-50">1-50 employees</option>
                                        <option value="51-200">51-200 employees</option>
                                        <option value="201-500">201-500 employees</option>
                                        <option value="501-1000">501-1000 employees</option>
                                        <option value="1000+">1000+ employees</option>
                                    </select>
                                </div>
                            </div>

                            <div className="demo-form-group demo-form-full">
                                <label htmlFor="message" className="demo-label">
                                    How can we help you?
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="demo-input demo-textarea"
                                    placeholder="Tell us about your revenue cycle challenges and goals..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`demo-submit-btn ${isSubmitting ? 'submitting' : ''} ${submitStatus === 'success' ? 'success' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="demo-spinner"></span>
                                        Submitting...
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <svg className="demo-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Demo Requested!
                                    </>
                                ) : (
                                    <>
                                        Schedule Demo
                                        <svg className="demo-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Trust Badges */}
                        <div className="demo-trust-section">
                            <p className="demo-trust-text">Trusted by leading healthcare organizations</p>
                            <div className="demo-trust-badges">
                                <span className="demo-badge">🔒 HIPAA Compliant</span>
                                <span className="demo-badge">🏆 SOC 2 Certified</span>
                                <span className="demo-badge">✓ No Credit Card Required</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Preview */}
                <section className="demo-features-preview">
                    <h2 className="demo-features-title">What You'll Discover</h2>
                    <div className="demo-features-grid">
                        <div className="demo-feature-card">
                            <div className="demo-feature-icon">🤖</div>
                            <h3>Neura AI Engine</h3>
                            <p>See how our AI processes claims 10x faster with 99.5% accuracy</p>
                        </div>
                        <div className="demo-feature-card">
                            <div className="demo-feature-icon">📊</div>
                            <h3>Real-time Analytics</h3>
                            <p>Track every dollar with comprehensive revenue dashboards</p>
                        </div>
                        <div className="demo-feature-card">
                            <div className="demo-feature-icon">⚡</div>
                            <h3>Automated Workflows</h3>
                            <p>Eliminate manual tasks with intelligent automation</p>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
