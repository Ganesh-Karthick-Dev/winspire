import React from 'react';
import styles from '@/styles/OutcomesContent.module.css';
import OutcomesDesignGraphic from './OutcomesDesignGraphic';

const OutcomesContent = () => {
    // Outcome Data - Single Static Section
    const section = {
        id: 1,
        title: "Outcomes Start With Design, Not Execution",
        content: "Most RCM organizations react to problems after they surface. Denials rise. AR ages. Cash flow slows. At Winspire, we designed for outcomes before execution begins.",
        list: ["Clearly defined objectives", "System-led workflows", "Embedded accountability"],
        final: "When the system is designed correctly, results follow without firefighting, escalation, or constant people dependency.",
    };

    return (
        <div className={styles.staticContainer}>
            <div className={styles.staticContentWrapper}>
                
                {/* Left Side: Graphic (Solutions) */}
                <div className={styles.staticLeft}>
                    <div className={styles.designGraphicWrapper}>
                         <OutcomesDesignGraphic 
                            items={section.list} 
                            isActive={true} 
                        />
                    </div>
                </div>

                {/* Right Side: Text Content */}
                <div className={styles.staticRight}>
                    <h3 className={styles.section1Title}>
                        Outcomes Start With <span className={styles.highlightTitle}>Design</span>, <br/> Not Execution
                    </h3>
                    
                    <p className={styles.section1Content}>
                        {section.content}
                    </p>

                    <div className={styles.finalStatementPill}>
                        <div className={styles.pillIcon}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>
                        <div className={styles.pillContent}>
                            <p>{section.final}</p>
                        </div>
                       
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OutcomesContent;
