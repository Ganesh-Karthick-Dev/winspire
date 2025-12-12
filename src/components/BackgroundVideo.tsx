/**
 * Background Video Component
 * 
 * Full-screen video background that plays on loop
 * Sits behind all content with fixed positioning
 */

export default function BackgroundVideo() {
    return (
        <div className="video-background">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="video-element"
            >
                <source src="/video/Landscape video 1.mp4" type="video/mp4" />
            </video>
            <div className="video-overlay" />
        </div>
    );
}
