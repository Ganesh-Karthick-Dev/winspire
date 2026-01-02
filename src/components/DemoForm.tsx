'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Flatpickr from 'react-flatpickr';
import styles from '@/styles/DemoForm.module.css';

interface DemoFormProps {
    isModal?: boolean;
}

export default function DemoForm({ isModal = false }: DemoFormProps) {
    const formRef = useRef<HTMLDivElement>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        organization: '',
        specialty: '',
        challenge: '',
        demoType: 'live'
    });
    const [preferredDate, setPreferredDate] = useState<Date | undefined>(undefined);
    const [preferredTime, setPreferredTime] = useState<Date | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
            );
        }, formRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value = e.target.value;
        if (e.target.name === 'phone') {
            value = value.replace(/\D/g, '').slice(0, 10);
        }
        setFormData({ ...formData, [e.target.name]: value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) {
            newErrors.email = 'Required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Required';
        } else if (formData.phone.replace(/\D/g, '').length !== 10) {
            newErrors.phone = '10 digits required';
        }
        if (!formData.organization.trim()) newErrors.organization = 'Required';
        if (!formData.specialty.trim()) newErrors.specialty = 'Required';
        if (!formData.challenge) newErrors.challenge = 'Required';
        if (!preferredDate) newErrors.preferredDate = 'Required';
        if (!preferredTime) newErrors.preferredTime = 'Required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    preferredDate: preferredDate?.toLocaleDateString(),
                    preferredTime: preferredTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }),
            });
            if (response.ok) {
                setIsSubmitted(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div ref={formRef} className={styles.card}>
                <div className={styles.success}>
                    <div className={styles.successCheck}>✓</div>
                    <h2>Demo Confirmed!</h2>
                    <p>We'll send confirmation details to your email shortly.</p>
                </div>
            </div>
        );
    }

    const formContent = (
        <div ref={formRef} className={styles.card}>
            <div className={styles.header}>
                <h2>Schedule a Demo</h2>
                <p>See how we can transform your revenue cycle</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Demo Type */}
                <div className={styles.typeGroup}>
                    {['live', 'recorded', 'consultation'].map((type) => (
                        <button
                            key={type}
                            type="button"
                            className={`${styles.typeBtn} ${formData.demoType === type ? styles.typeBtnActive : ''}`}
                            onClick={() => setFormData({ ...formData, demoType: type })}
                        >
                            {type === 'live' && 'Live Demo'}
                            {type === 'recorded' && 'Recorded'}
                            {type === 'consultation' && 'Consultation'}
                        </button>
                    ))}
                </div>

                {/* Name & Email */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className={errors.name ? styles.error : ''}
                        />
                        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className={errors.email ? styles.error : ''}
                        />
                        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>
                </div>

                {/* Phone & Organization */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className={errors.phone ? styles.error : ''}
                        />
                        {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                    </div>
                    <div className={styles.field}>
                        <label>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Healthcare Inc."
                            className={errors.organization ? styles.error : ''}
                        />
                        {errors.organization && <span className={styles.errorMsg}>{errors.organization}</span>}
                    </div>
                </div>

                {/* Specialty & Challenge */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Specialty</label>
                        <input
                            type="text"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            placeholder="Cardiology"
                            className={errors.specialty ? styles.error : ''}
                        />
                        {errors.specialty && <span className={styles.errorMsg}>{errors.specialty}</span>}
                    </div>
                    <div className={styles.field}>
                        <label>Challenge</label>
                        <select
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            className={errors.challenge ? styles.error : ''}
                        >
                            <option value="">Select...</option>
                            <option value="denial">High Denials</option>
                            <option value="claims">Slow Claims</option>
                            <option value="ar">High AR Days</option>
                            <option value="errors">Data Errors</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.challenge && <span className={styles.errorMsg}>{errors.challenge}</span>}
                    </div>
                </div>

                {/* Date & Time */}
                <div className={styles.row}>
                    <div className={styles.field}>
                        <label>Preferred Date</label>
                        <Flatpickr
                            value={preferredDate}
                            onChange={([date]) => {
                                setPreferredDate(date);
                                if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                            }}
                            options={{ minDate: "today", dateFormat: "M j, Y", disableMobile: true }}
                            placeholder="Select date"
                            className={errors.preferredDate ? styles.error : ''}
                        />
                        {errors.preferredDate && <span className={styles.errorMsg}>{errors.preferredDate}</span>}
                    </div>
                    <div className={styles.field}>
                        <label>Preferred Time</label>
                        <Flatpickr
                            value={preferredTime}
                            onChange={([date]) => {
                                setPreferredTime(date);
                                if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                            }}
                            options={{ enableTime: true, noCalendar: true, dateFormat: "h:i K", time_24hr: false, disableMobile: true }}
                            placeholder="Select time"
                            className={errors.preferredTime ? styles.error : ''}
                        />
                        {errors.preferredTime && <span className={styles.errorMsg}>{errors.preferredTime}</span>}
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className={styles.submit} disabled={isSubmitting}>
                    {isSubmitting ? 'Scheduling...' : 'Schedule Demo'}
                </button>

                <p className={styles.note}>No commitment required • Response within 24 hours</p>
            </form>
        </div>
    );

    // For modal usage, return just the card (no section wrapper for proper scrolling)
    if (isModal) {
        return formContent;
    }

    // For page usage, wrap in section with proper z-index
    return (
        <section style={{
            position: 'relative',
            zIndex: 30,
            background: 'transparent',
            padding: '4rem 1rem',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {formContent}
        </section>
    );
}

