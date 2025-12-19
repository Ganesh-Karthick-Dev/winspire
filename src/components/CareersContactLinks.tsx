import React from 'react';
import Image from 'next/image';

const CareersContactLinks: React.FC = () => {
    return (
        <section
            className="links-section"
            style={{
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
                padding: '100px 0',
                boxSizing: 'border-box'
            }}
        >
            <div className="links-container" style={{ width: '100%', maxWidth: '100%', padding: '0 16px' }}>
                <h2 className="links-main-title text-gradient-shimmer" style={{ paddingLeft: '16px', textAlign: 'left', width: '100%', alignSelf: 'flex-start', display: 'block' , marginBlock: '100px' }}>Open The Door to The New World.</h2>

                <div
                    className="links-grid"
                    style={{
                        display: 'flex',
                        gap: '16px',
                        width: '100%',
                        padding: '0'
                    }}
                >
                    {/* Careers Card */}
                    <a href="#" className="link-card link-card-blue" style={{ flex: 1 }}>
                        <div className="link-card-content">
                            <span className="link-subtitle">Generate<br />New Values</span>
                            <div className="link-bottom">
                                <div>
                                    <h3 className="link-title">Careers</h3>
                                    <span className="link-japanese">opportunity</span>
                                </div>
                                <div className="link-bottom-right">
                                    <div className="link-separator"></div>
                                    <span className="link-arrow">→</span>
                                </div>
                            </div>
                        </div>
                        <div className="link-card-image">
                            <Image
                                src="/images/links/links_team_meeting_1766075227437.png"
                                alt="Team Meeting"
                                width={320}
                                height={200}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </a>

                    {/* Contact Card */}
                    <a href="#" className="link-card link-card-purple" style={{ flex: 1 }}>
                        <div className="link-card-content">
                            <span className="link-subtitle">Feel Free<br />to Connect</span>
                            <div className="link-bottom">
                                <div>
                                    <h3 className="link-title">Contact</h3>
                                    <span className="link-japanese">sales</span>
                                </div>
                                <div className="link-bottom-right">
                                    <div className="link-separator"></div>
                                    <span className="link-arrow">→</span>
                                </div>
                            </div>
                        </div>
                        <div className="link-card-image">
                            <Image
                                src="/images/links/links_workspace_laptop_1766075249577.png"
                                alt="Workspace"
                                width={320}
                                height={200}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CareersContactLinks;
