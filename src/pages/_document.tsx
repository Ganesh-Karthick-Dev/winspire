/**
 * Custom Document
 * 
 * Injects the static HTML loader into the body BEFORE React hydration.
 * This ensures the loader appears instantly on hard refresh,
 * even before any JavaScript executes.
 */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* Preconnect to external resources for faster loading */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

                {/* Outfit font */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                {/* Poppins font for loader */}
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <body>
                {/* 
          Static HTML Loader
          -------------------
          This loader is rendered in the initial HTML, before React hydration.
          It appears INSTANTLY on hard refresh, providing immediate visual feedback.
          
          The loader is controlled by loaderManager.ts:
          - resetLoaderToZero() resets progress on page mount
          - updateLoaderUI() updates the percentage
          - finishLoader() fades it out after model loads
        */}
                {/* <div id="loader-root">
                    <div className="loader-overlay">
                        <div className="loader-content">
                            <div className="loader-progress">0%</div>
                            <div className="loader-bar">
                                <div className="loader-bar-fill"></div>
                            </div>
                        </div>
                    </div>


                    <div className="grid-transition">
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                        <div className="grid-column"></div>
                    </div>
                </div> */}

                {/* React app mounts here */}
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
