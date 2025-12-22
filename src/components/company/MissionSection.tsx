/**
 * Mission Section Component
 * 
 * Transparent section showing company mission with large statement and description.
 * 3D model shows through the transparent background.
 */

import styles from './MissionSection.module.css';

interface MissionSectionProps {
    /** Section label */
    label?: string;
    /** Subtitle under label */
    subtitle?: string;
    /** Large bold statement text */
    statement?: string;
    /** Description paragraph */
    description?: string;
}

export default function MissionSection({
    label = 'Mission',
    subtitle = 'Mission to be fulfilled',
    statement = 'With the choice of space\nZero regrets.',
    description = 'There are many opportunities in life to search for, select, and make decisions about the optimal space. However, it is difficult to accurately understand the space and make the optimal choice. We exist as a social infrastructure that makes it possible for anyone to easily and accurately share spatial images and make spatial choices based on correct understanding, using technology.',
}: MissionSectionProps) {
    // Split statement into lines for proper rendering
    const statementLines = statement.split('\n');

    return (
        <section className={styles.missionSection}>
            {/* Header - Label with dots */}
            <div className={styles.missionHeader}>
                <div className={styles.missionLabel}>
                    <div className={styles.missionDots}>
                        <span className={styles.missionDot}></span>
                        <span className={styles.missionDot}></span>
                    </div>
                    <span>{label}</span>
                </div>
                <p className={styles.missionSubtitle}>{subtitle}</p>
            </div>

            {/* Content - Statement and Description */}
            <div className={styles.missionContent}>
                <h2 className={styles.missionStatement}>
                    {statementLines.map((line, index) => (
                        <span key={index}>
                            {line}
                            {index < statementLines.length - 1 && <br />}
                        </span>
                    ))}
                </h2>
                <p className={styles.missionDescription}>{description}</p>
            </div>
        </section>
    );
}
