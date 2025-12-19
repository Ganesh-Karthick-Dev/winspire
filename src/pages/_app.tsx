/**
 * Custom App
 * 
 * Global app wrapper that imports styles and provides
 * app-level context/providers if needed.
 */

import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

import ScrollManager from '@/components/ScrollManager';
import SmoothScroll from '@/components/SmoothScroll';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SmoothScroll>
            <ScrollManager />
            <Component {...pageProps} />
        </SmoothScroll>
    );
}
