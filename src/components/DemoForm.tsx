'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Flatpickr from 'react-flatpickr';
import styles from '@/styles/DemoForm.module.css';

gsap.registerPlugin(ScrollTrigger);

const demoTypes = [
    { id: 'live', label: 'Live Demo' },
    { id: 'recorded', label: 'Recorded' },
    { id: 'consultation', label: 'Consultation' }
];

export default function DemoForm() {
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
    const [preferredDate, setPreferredDate] = useState<Date | null>(null);
    const [preferredTime, setPreferredTime] = useState<Date | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const ctx = gsap.context(() => {
            const formElements = formRef.current?.querySelectorAll('.form-animate');
            if (formElements) {
                gsap.set(formElements, { opacity: 0, y: 15 });
                gsap.to(formElements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: formRef.current,
                        start: "top center+=100",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, formRef);
        return () => ctx.revert();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let value = e.target.value;

        // Restrict phone input to numbers only and max 10 digits
        if (e.target.name === 'phone') {
            value = value.replace(/\D/g, '').slice(0, 10);
        }

        setFormData({ ...formData, [e.target.name]: value });
        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else {
            const phoneDigits = formData.phone.replace(/\D/g, '');
            if (phoneDigits.length !== 10) {
                newErrors.phone = 'Phone number must be 10 digits';
            }
        }
        if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
        if (!formData.specialty.trim()) newErrors.specialty = 'Specialty is required';
        if (!formData.challenge) newErrors.challenge = 'Please select a challenge';
        if (!preferredDate) newErrors.preferredDate = 'Date is required';
        if (!preferredTime) newErrors.preferredTime = 'Time is required';

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
                headers: {
                    'Content-Type': 'application/json',
                },
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
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div ref={formRef} className={styles.formCard}>
                <div className={styles.successMessage}>
                    <div className={styles.successIcon}>✓</div>
                    <h2 className={styles.successTitle}>Demo Confirmed!</h2>
                    <p className={styles.successText}>You'll receive a confirmation email within minutes.</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={formRef} className={styles.formCard}>
            <div className={`${styles.formHeader} form-animate`}>
                <h2 className={styles.title}>Book Your Demo Now</h2>
                <p className={styles.subtitle}>Get a personalized walkthrough of our RCM solutions</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* ROW 1: All 6 main fields */}
                <div className={`${styles.row6} form-animate`}>
                    <div className={styles.field}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full name"
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        />
                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                        />
                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+1 (555) 000-0000"
                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                        />
                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Company"
                            className={`${styles.input} ${errors.organization ? styles.inputError : ''}`}
                        />
                        {errors.organization && <span className={styles.errorText}>{errors.organization}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Specialty</label>
                        <input
                            type="text"
                            name="specialty"
                            value={formData.specialty}
                            onChange={handleChange}
                            placeholder="Cardiology"
                            className={`${styles.input} ${errors.specialty ? styles.inputError : ''}`}
                        />
                        {errors.specialty && <span className={styles.errorText}>{errors.specialty}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>RCM Challenge</label>
                        <select
                            name="challenge"
                            value={formData.challenge}
                            onChange={handleChange}
                            className={`${styles.select} ${errors.challenge ? styles.inputError : ''}`}
                        >
                            <option value="">Select</option>
                            <option value="denial">High Denials</option>
                            <option value="claims">Slow Claims</option>
                            <option value="ar">High AR Days</option>
                            <option value="errors">Data Errors</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.challenge && <span className={styles.errorText}>{errors.challenge}</span>}
                    </div>
                </div>

                {/* ROW 2: Demo Type + Date + Time - ALL INLINE */}
                <div className={`${styles.bottomRow} form-animate`}>
                    <div className={styles.demoTypes}>
                        {demoTypes.map((type) => (
                            <label key={type.id} className={`${styles.demoType} ${formData.demoType === type.id ? styles.demoTypeActive : ''}`}>
                                <input type="radio" name="demoType" value={type.id} checked={formData.demoType === type.id} onChange={handleChange} className={styles.radioHidden} />
                                {type.label}
                            </label>
                        ))}
                    </div>
                    <div className={styles.dateTimeFields}>
                        <div className={styles.smallField}>
                            <label className={styles.label}>Date</label>
                            <Flatpickr
                                value={preferredDate}
                                onChange={([date]) => {
                                    setPreferredDate(date);
                                    if (errors.preferredDate) setErrors({ ...errors, preferredDate: '' });
                                }}
                                options={{
                                    minDate: "today",
                                    dateFormat: "F j, Y",
                                    disableMobile: "true"
                                }}
                                placeholder="Select Date"
                                className={`${styles.input} ${errors.preferredDate ? styles.inputError : ''}`}
                            />
                            {errors.preferredDate && <span className={styles.errorText}>{errors.preferredDate}</span>}
                        </div>
                        <div className={styles.smallField}>
                            <label className={styles.label}>Time</label>
                            <Flatpickr
                                value={preferredTime}
                                onChange={([date]) => {
                                    setPreferredTime(date);
                                    if (errors.preferredTime) setErrors({ ...errors, preferredTime: '' });
                                }}
                                options={{
                                    enableTime: true,
                                    noCalendar: true,
                                    dateFormat: "h:i K",
                                    time_24hr: false,
                                    disableMobile: "true"
                                }}
                                placeholder="Select Time"
                                className={`${styles.input} ${errors.preferredTime ? styles.inputError : ''}`}
                            />
                            {errors.preferredTime && <span className={styles.errorText}>{errors.preferredTime}</span>}
                        </div>
                    </div>
                </div>

                {/* ROW 3: Submit Button */}
                <div className={`${styles.submitRow} form-animate`}>
                    <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                        {isSubmitting ? 'Confirming...' : 'Confirm My Demo'}
                    </button>
                </div>

                <p className={`${styles.microcopy} form-animate`}>
                    You'll receive a confirmation email within minutes.
                </p>
            </form>
        </div>
    );
}
