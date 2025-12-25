/**
 * useIsMobile Hook
 * 
 * Uses window.matchMedia which correctly responds to DevTools device emulation.
 * This is the proper way to detect media query matches in JavaScript.
 */

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(): boolean {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Use matchMedia - this works correctly with DevTools device emulation
        const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

        // Set initial value
        setIsMobile(mediaQuery.matches);

        // Add listener for changes
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
            console.log('📱 Mobile detection changed:', e.matches);
        };

        // Modern browsers
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
        } else {
            // Legacy support
            mediaQuery.addListener(handleChange);
        }

        console.log('📱 Initial mobile detection:', mediaQuery.matches);

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
