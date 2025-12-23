'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './FloatingSectionNav.module.css';

interface FloatingSectionNavProps {
    sections: {
        id: string;
        label: string;
    }[];
    cta?: {
        label: string;
        href: string;
    };
}

export default function FloatingSectionNav({ sections, cta }: FloatingSectionNavProps) {
    const [activeId, setActiveId] = useState(sections[0]?.id || '');
    const [isVisible, setIsVisible] = useState(true);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // --- Scroll Spy Logic ---
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -60% 0px', // Active when element is in middle of screen
            threshold: 0
        };

        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, observerOptions);

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // --- Footer Collision Logic ---
        const footerObserverCallback = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            // Hide nav when footer is visible
            setIsVisible(!entry.isIntersecting);
        };

        const footerObserver = new IntersectionObserver(footerObserverCallback, {
            root: null,
            rootMargin: '0px',
            threshold: 0
        });

        const footer = document.querySelector('footer');
        if (footer) footerObserver.observe(footer);

        return () => {
            observer.disconnect();
            footerObserver.disconnect();
        };
    }, [sections]);

    // Handle scroll to section
    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            // Add offset for fixed header if needed, though this is a full height section site usually
            const offset = 100; // Adjust based on header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className={`${styles.container} ${!isVisible ? styles.hidden : ''}`} ref={navRef}>
            <nav className={styles.nav}>
                <ul className={styles.list}>
                    {sections.map((section) => (
                        <li key={section.id} className={styles.item}>
                            <a
                                href={`#${section.id}`}
                                className={`${styles.link} ${activeId === section.id ? styles.linkActive : ''}`}
                                onClick={(e) => scrollToSection(e, section.id)}
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {cta && (
                <a href={cta.href} className={styles.ctaButton}>
                    {cta.label}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        style={{ marginLeft: '8px' }}
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>
            )}
        </div>
    );
}
