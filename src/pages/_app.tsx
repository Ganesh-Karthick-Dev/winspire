/**
 * Custom App
 * 
 * Global app wrapper that imports styles and provides
 * app-level context/providers if needed.
 */

import type { AppProps } from 'next/app';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
