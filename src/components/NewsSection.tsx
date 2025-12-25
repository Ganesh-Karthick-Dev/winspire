import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import NewsCard from './NewsCard';

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
    {
        category: 'Product Update',
        date: '2025.12.12',
        title: 'Winspire AI 2.0 Released: Revolutionizing Revenue Cycle Management with Predictive Analytics',
        imageSrc: '/images/news/news_vr_interior_1766073601174.png',
        link: '#'
    },
    {
        category: 'Case Study',
        date: '2025.12.11',
        title: 'How a Major Healthcare Provider Reduced Claim Denials by 40% Using Winspire',
        imageSrc: '/images/news/news_map_view_1766073619118.png',
        link: '#'
    },
    {
        category: 'Press Release',
        date: '2025.12.08',
        title: 'Winspire Partners with Leading EHR Systems to Streamline Data Integration',
        imageSrc: '/images/news/news_vr_meeting_1766073638780.png',
        link: '#'
    }
];

export default function NewsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const list = listRef.current;

        if (!section || !title || !list) return;

        const ctx = gsap.context(() => {
            // Optional: Add scroll animations here if needed
            // For now, we rely on CSS sticky for the title
        }, section);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="news-section">
            <div className="news-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
            </div>

            <div className="news-container">
                {/* DESKTOP LAYOUT (Hidden on mobile via CSS) */}
                <div className="news-desktop-view">
                    <div className="news-left-col">
                        <div className="news-sticky-wrapper">
                            <h2 className="news-heading">News</h2>
                            <span className="news-subheading">Latest Updates</span>
                        </div>
                    </div>

                    <div className="news-right-col" ref={listRef}>
                        <div className="news-list">
                            {newsItems.map((item, index) => (
                                <NewsCard
                                    key={index}
                                    category={item.category}
                                    date={item.date}
                                    title={item.title}
                                    imageSrc={item.imageSrc}
                                    link={item.link}
                                />
                            ))}
                        </div>

                        <div className="news-footer">
                            <a href="#" className="news-index-btn">
                                News Index
                                <span className="btn-arrow-circle">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* MOBILE LAYOUT (Visible only on mobile via CSS) */}
                <div className="news-mobile-view">
                    <div className="news-mobile-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></div>
                                <div style={{ width: '6px', height: '6px', backgroundColor: '#38bdf8', borderRadius: '50%' }}></div>
                            </div>
                            <h2 style={{ margin: 0, fontSize: '2rem', color: 'white', fontWeight: 700, lineHeight: 1 }}>News</h2>
                        </div>
                        <p style={{ margin: '4px 0 0 14px', fontSize: '0.9rem', color: '#e0f2fe', opacity: 0.9 }}>Latest News</p>
                    </div>

                    <div className="news-mobile-scroll-container">
                        {newsItems.map((item, index) => (
                            <div key={index} className="news-mobile-card">
                                <div className="news-mobile-image-wrapper">
                                    <img src={item.imageSrc} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                </div>
                                <div className="news-mobile-content">
                                    {/* Small arrow graphic connecting image to card */}
                                    <div className="news-mobile-notch"></div>

                                    <div className="news-mobile-meta-row">
                                        <span className="news-mobile-category">Media</span>
                                        <span className="news-mobile-date">{item.date}</span>
                                        <div className="news-mobile-arrow">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="news-mobile-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="news-mobile-footer">
                        {/* Divider Line */}
                        <div className="news-mobile-divider"></div>

                        <a href="#" className="news-index-btn">
                            News Index
                            <span className="btn-arrow-circle">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
