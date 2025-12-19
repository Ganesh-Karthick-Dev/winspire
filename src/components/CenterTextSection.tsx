/**
 * CenterTextSection Component
 * 
 * Simple 100vh section with large centered text
 */

export default function CenterTextSection() {
    return (
        <section
            id="center-text"
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                zIndex: 30,
            }}
        >
            <h2
                style={{
                    color: 'white',
                    fontSize: 'clamp(3.5rem, 5vw, 5rem)',
                    fontWeight: 600,
                    fontFamily: 'Outfit, sans-serif',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    maxWidth: '1200px',
                    padding: '0 40px',
                }}
            >
                An Environment That Creates
                <br />
                A New World
            </h2>
        </section>
    );
}
