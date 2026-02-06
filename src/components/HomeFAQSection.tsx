"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Plus, Minus } from "lucide-react";
import styles from "./HomeFAQSection.module.css";

const faqData = [
  {
    question: "Outcomes and ROI | What results can we expect from Winspire RCM?",
    answer: "Short answer: Faster cash, fewer denials, higher productivity, and real-time visibility across your revenue cycle.\n\nWe focus on outcomes that leadership cares about most:\n• Denial reduction and higher first-pass performance\n• Improved collections through smarter prioritization\n• Productivity gains through automation\n• Full transparency via dashboards and alerts\n\nWe measure success by cash acceleration and predictable control."
  },
  {
    question: "Services vs Technology | Do you provide RCM services or technology?",
    answer: "Short answer: We deliver end-to-end RCM services powered by Neura AI, our proprietary technology.\n\nClients receive managed RCM delivery with an intelligence layer that prioritizes, tracks, and optimizes work without new systems or disruption."
  },
  {
    question: "Pricing and Fees | Do you charge for Neura AI?",
    answer: "Short answer: No separate technology or implementation fees.\n\nNeura AI is embedded into our delivery model so clients see impact before cost."
  },
  {
    question: "Billing System Integration | How do you work with our EMR?",
    answer: "Short answer: Your billing system remains the system of record.\n\nWe integrate using reports, secure APIs, and data feeds. Neura AI sits above your systems to add intelligence and visibility. Both onshore and offshore operations can be executed on a single workflow tool, working together as one team."
  },
  {
    question: "Implementation Effort | What changes are required?",
    answer: "Short answer: No disruption.\n\nWe map your workflows and build intelligence on top. No rip and replace."
  },
  {
    question: "Security and HIPAA | How do you protect PHI?",
    answer: "Short answer: Compliance is built into our operating model.\n\nOur approach includes HIPAA alignment, Azure-based architecture, role-based access, audits, and continuous training. 100% of the data remains within US."
  },
  {
    question: "Neura AI Differentiation | How is Neura AI different?",
    answer: "Short answer: It drives one KPI, “Cash collected”, not just task execution.\n\nIt automates decision-making, surfaces risk, and guides next-best actions across the revenue cycle."
  },
  {
    question: "Payer Connectivity | Do you support eligibility and claim status checks?",
    answer: "Short answer: Yes.\n\nWe enable live verification, authorization, and claim status workflows to reduce rework and delays. We reduce your current claim to cash cycle time by half in no time."
  },
  {
    question: "Engagement Models | What pricing models do you support?",
    answer: "Short answer: FTE, transaction-based, contingency, or hybrid.\n\nWe align pricing to maturity, volume, and outcomes."
  },
  {
    question: "Scope Options | Can we start with one department?",
    answer: "Short answer: Yes.\n\nClients can start with Denials, AR, Coding or go end-to-end as confidence grows."
  },
  {
    question: "Specialties | What specialties do you support?",
    answer: "Short answer: All specialties.\n\nOur workflows adapt to payer behavior and specialty-specific denial patterns."
  },
  {
    question: "Governance | What does performance management look like?",
    answer: "Short answer: Structured governance cadence.\n\nDaily visibility, weekly KPI reviews, and monthly optimization."
  },
  {
    question: "Transparency | How do leaders track progress?",
    answer: "Short answer: Real-time dashboards and alerts.\n\nLeadership sees client KPIs, operational metrics, and risk signals."
  },
  {
    question: "Talent and Culture | Why is performance consistent?",
    answer: "Short answer: Strong hiring and transparent accountability. Hire top 1% of the talent in the country.\n\nWe focus on ownership, training, and recognition."
  },
  {
    question: "Getting Started | How do we begin?",
    answer: "Short answer: Start with a focused assessment.\n\nWe identify leakage, prioritize fixes, and deliver visible impact in 30–90 days."
  }
];

export default function HomeFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    // Force refresh scroll trigger after animation
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 550);
  };

  useGSAP(() => {
    // Register plugin inside useGSAP is safe
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate items in
    const items = gsap.utils.toArray<HTMLElement>(`.${styles.faqItem}`);
    
    if (items.length > 0) {
      // Set initial state via GSAP
      gsap.set(items, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom-=100", // Trigger as soon as it's nearly in view
          toggleActions: "play none none reverse",
          once: true
        }
      });

      tl.to(items, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    // Explicitly refresh after a short delay to account for other sections loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === containerRef.current) st.kill();
      });
    };
  }, { scope: containerRef });

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={containerRef}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Frequently Asked Questions
          </h2>
          <p className={styles.subtitle}>
            Everything you need to know about Winspire RCM
          </p>
        </div>

        <div className={styles.faqList}>
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={styles.faqItem}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={styles.button}
              >
                <span className={styles.question}>
                  {item.question}
                </span>
                <span className={`${styles.iconWrapper} ${openIndex === index ? styles.iconRotate : ""}`}>
                  {openIndex === index ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </span>
              </button>
              
              <div 
                className={`${styles.answerWrapper} ${openIndex === index ? styles.answerOpen : ""}`}
              >
                <div className={styles.answer}>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
