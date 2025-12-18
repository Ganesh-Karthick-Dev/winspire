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
                <div className="news-left-col">
                    <div className="news-sticky-wrapper">
                        <h2 className="news-heading">News</h2>
                        <span className="news-subheading">最新情報</span>
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
                            <span className="btn-arrow">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
