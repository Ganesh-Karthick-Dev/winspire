'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
        demoType: 'live',
        preferredDate: '',
        preferredTime: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
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
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full name" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Organization</label>
                        <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="Company" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Specialty</label>
                        <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} placeholder="Cardiology" className={styles.input} required />
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>RCM Challenge</label>
                        <select name="challenge" value={formData.challenge} onChange={handleChange} className={styles.select} required>
                            <option value="">Select</option>
                            <option value="denial">High Denials</option>
                            <option value="claims">Slow Claims</option>
                            <option value="ar">High AR Days</option>
                            <option value="errors">Data Errors</option>
                            <option value="other">Other</option>
                        </select>
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
                            <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} className={styles.input} required />
                        </div>
                        <div className={styles.smallField}>
                            <label className={styles.label}>Time</label>
                            <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleChange} className={styles.input} required />
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
