/**
 * Animated Background Component
 * 
 * SVG-based animated gradient background with smooth color movement.
 */

import { memo } from 'react';

function AnimatedBackground() {
    return (
        <div className="animated-bg-container" aria-hidden="true">
            <svg
                className="animated-gradient-svg"
                viewBox="0 0 3000 1500"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient
                        id="animatedGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="625"
                        y1="1954"
                        x2="2375"
                        y2="-454"
                    >
                        <stop offset="0" stopColor="#1B75BB">
                            <animate
                                attributeName="stop-color"
                                values="#1B75BB;#3C9CFF;#32FFEE;#1B75BB"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="0.25" stopColor="#25A5DD">
                            <animate
                                attributeName="stop-color"
                                values="#25A5DD;#49ADEE;#1B75BB;#25A5DD"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="0.5" stopColor="#3C9CFF">
                            <animate
                                attributeName="stop-color"
                                values="#3C9CFF;#32FFEE;#25A5DD;#3C9CFF"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="0.75" stopColor="#49ADEE">
                            <animate
                                attributeName="stop-color"
                                values="#49ADEE;#1B75BB;#3C9CFF;#49ADEE"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </stop>
                        <stop offset="1" stopColor="#32FFEE">
                            <animate
                                attributeName="stop-color"
                                values="#32FFEE;#25A5DD;#49ADEE;#32FFEE"
                                dur="8s"
                                repeatCount="indefinite"
                            />
                        </stop>
                    </linearGradient>
                </defs>
                <rect
                    width="3000"
                    height="1500"
                    fill="url(#animatedGradient)"
                />
            </svg>
        </div>
    );
}

export default memo(AnimatedBackground);
