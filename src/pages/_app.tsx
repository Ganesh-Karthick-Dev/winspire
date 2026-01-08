/**
 * Custom App
 * 
 * Global app wrapper that imports styles and provides
 * app-level context/providers if needed.
 */

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import 'lenis/dist/lenis.css';

import ScrollManager from '@/components/ScrollManager';
import SmoothScroll from '@/components/SmoothScroll';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <SmoothScroll>
            <ScrollManager />
            {/* Key forces complete remount on route change, ensuring animations re-init */}
            <Component {...pageProps} key={router.pathname} />
            {/* Portal for date picker to render above modals */}
            <div id="datepicker-portal" />
        </SmoothScroll>
    );
}
