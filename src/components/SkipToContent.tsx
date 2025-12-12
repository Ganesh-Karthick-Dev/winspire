/**
 * SkipToContent Component
 * 
 * Accessibility feature: allows keyboard users to skip navigation
 * and jump directly to the main content.
 */

interface SkipToContentProps {
    /** ID of the main content element to skip to */
    targetId?: string;
    /** Label for the skip link */
    label?: string;
}

export default function SkipToContent({
    targetId = 'main-content',
    label = 'Skip to main content',
}: SkipToContentProps) {
    return (
        <a
            href={`#${targetId}`}
            className="skip-to-content"
            aria-label={label}
        >
            {label}
        </a>
    );
}
