/**
 * useIsMobile Hook
 * 
 * Uses window.matchMedia which correctly responds to DevTools device emulation.
 * This is the proper way to detect media query matches in JavaScript.
 * 
 * Returns false during SSR and initial hydration, then updates to true/false
 * based on actual viewport after hydration completes.
 */

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
    // Always start with false to match server-rendered HTML
    // This prevents hydration mismatches
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // This only runs on client after hydration
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

        // Set the actual value now that we're on the client
        setIsMobile(mediaQuery.matches);

        // Add listener for changes
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };

        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            mediaQuery.addListener(handleChange);
        }

        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', handleChange);
            } else {
                mediaQuery.removeListener(handleChange);
            }
        };
    }, []);

    return isMobile;
}

export default useIsMobile;
