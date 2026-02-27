"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { FileText, Cpu, Layout, Share2, ChevronRight, CheckCircle } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: <FileText size={22} />,
    title: "Upload your resume",
    description: "Drag and drop your PDF resume into the uploader. Optionally add your GitHub username to automatically pull in your repositories and contributions.",
    details: ["PDF format, up to 10MB", "Any resume layout or format works", "GitHub username is optional but recommended"],
    accent: "#6366f1",
  },
  {
    number: "02",
    icon: <Cpu size={22} />,
    title: "AI extracts your data",
    description: "Our AI reads your resume and intelligently extracts all the key information — contact details, work experience, skills, projects, and education — into structured data.",
    details: ["Powered by Llama 3.1 via Groq", "Extracts name, skills, experience, projects", "GitHub repos merged automatically"],
    accent: "#8b5cf6",
  },
  {
    number: "03",
    icon: <Layout size={22} />,
    title: "Pick a template",
    description: "Choose from three professionally designed portfolio templates — Minimal, Classic, or Bold. Each is fully responsive and optimized for both desktop and mobile.",
    details: ["3 distinct visual styles", "All templates are mobile responsive", "Hover effects and smooth interactions"],
    accent: "#06b6d4",
  },
  {
    number: "04",
    icon: <Share2 size={22} />,
    title: "Share your portfolio",
    description: "Your portfolio is generated instantly. Share the link with recruiters, add it to your LinkedIn, or use it as your personal homepage.",
    details: ["Generated in seconds", "Clean shareable URL", "Works on all devices and browsers"],
    accent: "#10b981",
  },
];

const FAQS = [
  {
    q: "Is it really free?",
    a: "Yes, completely free. No credit card, no account required. Just upload and go.",
  },
  {
    q: "What resume formats are supported?",
    a: "We support PDF format up to 10MB. Most standard resume templates work well — single column, two column, or any layout.",
  },
  {
    q: "How accurate is the AI extraction?",
    a: "Very accurate for most resumes. The AI is powered by Llama 3.1 and is good at parsing complex layouts. Occasionally it may miss a field if your resume uses unusual formatting.",
  },
  {
    q: "Is my resume data stored?",
    a: "No. Your resume is processed in real-time and the data is not stored on our servers. Once you close the tab, it's gone.",
  },
  {
    q: "Can I edit the generated portfolio?",
    a: "Not yet — editing is on the roadmap. For now, if something looks off, you can tweak your resume and re-upload.",
  },
  {
    q: "What is the GitHub integration?",
    a: "If you provide your GitHub username, we automatically fetch your pinned repositories, top languages, and project descriptions to enrich your portfolio's Projects section.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <main style={{ background: "var(--background)", color: "var(--foreground)", minHeight: "100vh" }}>

        {/* Hero */}
        <section style={{ padding: "8rem 2rem 5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: "10%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.05)", filter: "blur(100px)" }} />
            <div style={{ position: "absolute", top: "20%", right: "20%", width: 300, height: 300, borderRadius: "50%", background: "rgba(139,92,246,0.04)", filter: "blur(80px)" }} />
          </div>

          <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
            <div className="animate-fade-up delay-100" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 999, padding: "0.3rem 1rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6366f1" }} />
              <span style={{ color: "#6366f1", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>How it works</span>
            </div>

            <h1 className="animate-fade-up delay-200" style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              From resume to portfolio
              <br />
              <span style={{ color: "#6366f1" }}>in 4 simple steps</span>
            </h1>

            <p className="animate-fade-up delay-300" style={{ color: "var(--muted)", fontSize: "1rem", lineHeight: 1.7, marginBottom: "2rem" }}>
              No design skills needed. No account required. Just upload your resume and get a beautiful developer portfolio in seconds.
            </p>

            <div className="animate-fade-up delay-400">
              <Link href="/" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--accent)", color: "#fff",
                padding: "0.75rem 1.75rem", borderRadius: 10,
                fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
              >
                Try it now <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 2rem 6rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {STEPS.map((step, i) => (
              <div
                key={step.number}
                className="animate-fade-up"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "2rem",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "2rem",
                  position: "relative",
                  overflow: "hidden",
                  animationDelay: `${0.1 * (i + 1)}s`,
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = `${step.accent}44`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {/* Subtle background glow on hover */}
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `${step.accent}06`, filter: "blur(40px)", pointerEvents: "none" }} />

                {/* Step icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                    background: `${step.accent}15`,
                    border: `1px solid ${step.accent}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: step.accent,
                  }}>
                    {step.icon}
                  </div>
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{ width: 1, flex: 1, minHeight: 24, background: `linear-gradient(to bottom, ${step.accent}40, transparent)` }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: step.accent, fontFamily: "monospace", letterSpacing: "0.05em" }}>
                      STEP {step.number}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.6rem", letterSpacing: "-0.01em" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1rem", maxWidth: 560 }}>
                    {step.description}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {step.details.map((d) => (
                      <div key={d} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <CheckCircle size={12} style={{ color: step.accent, flexShrink: 0 }} />
                        <span style={{ fontSize: "0.78rem", color: "var(--muted)" }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ maxWidth: 700, margin: "0 auto", padding: "0 2rem 6rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>
              Frequently asked questions
            </h2>
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              Everything you need to know before getting started.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "var(--border)", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)" }}>
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "0 2rem 8rem", textAlign: "center" }}>
          <div style={{
            maxWidth: 560, margin: "0 auto",
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 20, padding: "3rem 2rem",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at top, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🚀</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "0.75rem" }}>
                Ready to build yours?
              </h2>
              <p style={{ color: "var(--muted)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                Takes less than a minute. No account needed.
              </p>
              <Link href="/" style={{
                display: "inline-flex", alignItems: "center", gap: "0.5rem",
                background: "var(--accent)", color: "#fff",
                padding: "0.8rem 2rem", borderRadius: 10,
                fontSize: "0.9rem", fontWeight: 600, textDecoration: "none",
                transition: "background 0.2s ease",
              }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--accent)")}
              >
                Generate my portfolio <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}

// ── FAQ accordion item ─────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details style={{ background: "var(--card)", padding: "1.25rem 1.5rem", cursor: "pointer" }}
      onMouseEnter={e => (e.currentTarget.style.background = "#1f1f1f")}
      onMouseLeave={e => (e.currentTarget.style.background = "var(--card)")}
    >
      <summary style={{
        fontWeight: 600, fontSize: "0.925rem", listStyle: "none",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        userSelect: "none",
      }}>
        {q}
        <span style={{ color: "var(--muted)", fontSize: "1.2rem", lineHeight: 1, marginLeft: "1rem", flexShrink: 0 }}>+</span>
      </summary>
      <p style={{ color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.7, marginTop: "0.75rem", paddingRight: "1rem" }}>
        {a}
      </p>
    </details>
  );
}