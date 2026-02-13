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
    shortAnswer: "Faster cash, fewer denials, higher productivity, and real-time visibility across your revenue cycle.",
    detailedAnswer: "We focus on outcomes that leadership cares about most:\n• Denial reduction and higher first-pass performance\n• Improved collections through smarter prioritization\n• Productivity gains through automation\n• Full transparency via dashboards and alerts\n\nWe measure success by cash acceleration and predictable control."
  },
  {
    question: "Services vs Technology | Do you provide RCM services or technology?",
    shortAnswer: "We deliver end-to-end RCM services powered by Neura AI, our proprietary technology.",
    detailedAnswer: "Clients receive managed RCM delivery with an intelligence layer that prioritizes, tracks, and optimizes work without new systems or disruption."
  },
  {
    question: "Pricing and Fees | Do you charge for Neura AI?",
    shortAnswer: "No separate technology or implementation fees.",
    detailedAnswer: "Neura AI is embedded into our delivery model so clients see impact before cost."
  },
  {
    question: "Billing System Integration | How do you work with our EMR?",
    shortAnswer: "Your billing system remains the system of record.",
    detailedAnswer: "We integrate using reports, secure APIs, and data feeds. Neura AI sits above your systems to add intelligence and visibility. Both onshore and offshore operations can be executed on a single workflow tool, working together as one team."
  },
  {
    question: "Implementation Effort | What changes are required?",
    shortAnswer: "No disruption.",
    detailedAnswer: "We map your workflows and build intelligence on top. No rip and replace."
  },
  {
    question: "Security and HIPAA | How do you protect PHI?",
    shortAnswer: "Compliance is built into our operating model.",
    detailedAnswer: "Our approach includes HIPAA alignment, Azure-based architecture, role-based access, audits, and continuous training. 100% of the data remains within US."
  },
  {
    question: "Neura AI Differentiation | How is Neura AI different?",
    shortAnswer: "It drives one KPI, “Cash collected”, not just task execution.",
    detailedAnswer: "It automates decision-making, surfaces risk, and guides next-best actions across the revenue cycle."
  },
  {
    question: "Payer Connectivity | Do you support eligibility and claim status checks?",
    shortAnswer: "Yes.",
    detailedAnswer: "We enable live verification, authorization, and claim status workflows to reduce rework and delays. We reduce your current claim to cash cycle time by half in no time."
  },
  {
    question: "Engagement Models | What pricing models do you support?",
    shortAnswer: "FTE, transaction-based, contingency, or hybrid.",
    detailedAnswer: "We align pricing to maturity, volume, and outcomes."
  },
  {
    question: "Scope Options | Can we start with one department?",
    shortAnswer: "Yes.",
    detailedAnswer: "Clients can start with Denials, AR, Coding or go end-to-end as confidence grows."
  },
  {
    question: "Specialties | What specialties do you support?",
    shortAnswer: "All specialties.",
    detailedAnswer: "Our workflows adapt to payer behavior and specialty-specific denial patterns."
  },
  {
    question: "Governance | What does performance management look like?",
    shortAnswer: "Structured governance cadence.",
    detailedAnswer: "Daily visibility, weekly KPI reviews, and monthly optimization."
  },
  {
    question: "Transparency | How do leaders track progress?",
    shortAnswer: "Real-time dashboards and alerts.",
    detailedAnswer: "Leadership sees client KPIs, operational metrics, and risk signals."
  },
  {
    question: "Talent and Culture | Why is performance consistent?",
    shortAnswer: "Strong hiring and transparent accountability. Hire top 1% of the talent in the country.",
    detailedAnswer: "We focus on ownership, training, and recognition."
  },
  {
    question: "Getting Started | How do we begin?",
    shortAnswer: "Start with a focused assessment.",
    detailedAnswer: "We identify leakage, prioritize fixes, and deliver visible impact in 30–90 days."
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

  // No entry animation to ensure visibility
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Explicitly refresh after a short delay to account for other sections loading
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, { scope: containerRef });

  return (
    <section id="faq" className={styles.section}>
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
                <div className={styles.textWrapper}>
                    <span className={styles.question}>
                      {item.question}
                    </span>
                    <span className={styles.shortAnswer}>
                      {item.shortAnswer}
                    </span>
                </div>
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
                  {item.detailedAnswer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
