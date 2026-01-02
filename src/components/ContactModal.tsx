'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import DemoForm from './DemoForm';
import styles from '@/styles/ContactModal.module.css';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            // Add class to body - CSS will hide the canvas
            document.body.classList.add('modal-open');

            if (overlayRef.current && modalRef.current) {
                gsap.set(overlayRef.current, { opacity: 0 });
                gsap.set(modalRef.current, { opacity: 0, scale: 0.95, y: 20 });
                gsap.to(overlayRef.current, { opacity: 1, duration: 0.25, ease: 'power2.out' });
                gsap.to(modalRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.out', delay: 0.05 });
            }
        } else {
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.body.classList.remove('modal-open');
        };
    }, [isOpen]);

    const handleClose = () => {
        if (overlayRef.current && modalRef.current) {
            gsap.to(modalRef.current, { opacity: 0, scale: 0.95, y: 20, duration: 0.2, ease: 'power2.in' });
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, ease: 'power2.in', delay: 0.05, onComplete: onClose });
        } else {
            onClose();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) handleClose();
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) handleClose();
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    return createPortal(
        <div ref={overlayRef} className={styles.overlay} onClick={handleOverlayClick}>
            <div ref={modalRef} className={styles.modal}>
                <button className={styles.closeBtn} onClick={handleClose} aria-label="Close modal">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <div className={styles.formWrapper}>
                    <DemoForm isModal={true} />
                </div>
            </div>
        </div>,
        document.body
    );
}
