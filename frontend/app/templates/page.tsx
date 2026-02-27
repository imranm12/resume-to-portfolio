"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and distraction-free. Let your work speak for itself.",
    accent: "#6366f1",
    tag: "Most Popular",
    preview: {
      bg: "#0f0f0f",
      card: "#1a1a1a",
      border: "#2a2a2a",
      muted: "#333",
    },
  },
  {
    id: "classic",
    name: "Classic",
    description: "Professional two-column layout. Perfect for corporate roles.",
    accent: "#10b981",
    tag: "Professional",
    preview: {
      bg: "#111827",
      card: "#1f2937",
      border: "#374151",
      muted: "#2a3a4a",
    },
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast and expressive. Stand out from the crowd.",
    accent: "#f59e0b",
    tag: "Creative",
    preview: {
      bg: "#0c0a09",
      card: "#1c1917",
      border: "#292524",
      muted: "#2a2520",
    },
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("minimal");
  const [hasData, setHasData] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("portfolioData");
    if (!data) router.push("/");
    else setHasData(true);
  }, [router]);

  const handleContinue = () => {
    sessionStorage.setItem("selectedTemplate", selected);
    router.push("/portfolio");
  };

  if (!hasData) return null;

  const selectedTemplate = TEMPLATES.find(t => t.id === selected)!;

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.5rem 3rem",
        position: "relative",
      }}>

        {/* Background glow matching selected template */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          transition: "all 0.5s ease",
        }}>
          <div style={{
            position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
            width: 600, height: 300, borderRadius: "50%",
            background: `${selectedTemplate.accent}0a`,
            filter: "blur(100px)",
            transition: "background 0.5s ease",
          }} />
        </div>

        <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1000 }}>

          {/* Header */}
          <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h1 style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: "0.6rem",
            }}>
              Choose your template
            </h1>
            <p style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
              All templates are fully responsive. You can switch anytime.
            </p>
          </div>

          {/* Cards grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            marginBottom: "2.5rem",
          }}>
            {TEMPLATES.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setSelected(t.id)}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                className="animate-fade-up"
                style={{
                  background: "var(--card)",
                  border: `1.5px solid ${selected === t.id ? t.accent : hovered === t.id ? "#3a3a3a" : "var(--border)"}`,
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  transform: selected === t.id ? "translateY(-6px)" : hovered === t.id ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: selected === t.id
                    ? `0 20px 40px ${t.accent}22, 0 0 0 1px ${t.accent}33`
                    : hovered === t.id ? "0 8px 24px rgba(0,0,0,0.3)" : "none",
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                {/* Preview mockup */}
                <div style={{
                  height: 200,
                  background: t.preview.bg,
                  padding: "1rem",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Mockup: navbar */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ height: 6, width: 48, borderRadius: 4, background: t.accent }} />
                    <div style={{ display: "flex", gap: 6 }}>
                      {[28, 22, 26].map((w, j) => (
                        <div key={j} style={{ height: 4, width: w, borderRadius: 3, background: t.preview.muted }} />
                      ))}
                    </div>
                  </div>

                  {/* Mockup: hero section */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${t.accent}33`, border: `2px solid ${t.accent}66`, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ height: 7, width: "60%", borderRadius: 4, background: "#f5f5f5", marginBottom: 5, opacity: 0.7 }} />
                      <div style={{ height: 4, width: "40%", borderRadius: 3, background: t.accent, opacity: 0.8 }} />
                    </div>
                  </div>

                  {/* Mockup: skill pills */}
                  <div style={{ display: "flex", gap: 5, marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    {[44, 36, 52, 40, 32].map((w, j) => (
                      <div key={j} style={{
                        height: 16, width: w, borderRadius: 999,
                        background: `${t.accent}22`,
                        border: `1px solid ${t.accent}44`,
                      }} />
                    ))}
                  </div>

                  {/* Mockup: content rows */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {[90, 75, 60].map((w, j) => (
                      <div key={j} style={{ height: 4, width: `${w}%`, borderRadius: 3, background: t.preview.muted }} />
                    ))}
                  </div>

                  {/* Mockup: bottom cards */}
                  <div style={{ display: "flex", gap: 8, position: "absolute", bottom: 12, left: 12, right: 12 }}>
                    {[1, 2].map(j => (
                      <div key={j} style={{
                        flex: 1, height: 32, borderRadius: 8,
                        background: t.preview.card,
                        border: `1px solid ${t.preview.border}`,
                      }} />
                    ))}
                  </div>

                  {/* Selected overlay glow */}
                  {selected === t.id && (
                    <div style={{
                      position: "absolute", inset: 0,
                      background: `linear-gradient(135deg, ${t.accent}08 0%, transparent 60%)`,
                      pointerEvents: "none",
                    }} />
                  )}
                </div>

                {/* Card info */}
                <div style={{ padding: "1rem 1.25rem 1.25rem" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "1rem" }}>{t.name}</span>
                    <span style={{
                      fontSize: "0.65rem", fontWeight: 600, padding: "0.2rem 0.6rem",
                      borderRadius: 999, letterSpacing: "0.05em", textTransform: "uppercase",
                      background: selected === t.id ? `${t.accent}22` : "var(--border)",
                      color: selected === t.id ? t.accent : "var(--muted)",
                      transition: "all 0.2s ease",
                    }}>
                      {selected === t.id ? "✓ Selected" : t.tag}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6 }}>
                    {t.description}
                  </p>
                  {/* Accent color dot */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: "0.75rem" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.accent }} />
                    <span style={{ fontSize: "0.72rem", color: "var(--muted)" }}>
                      {t.id === "minimal" ? "Indigo accent" : t.id === "classic" ? "Emerald accent" : "Amber accent"}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Continue button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
            <button
              onClick={handleContinue}
              style={{
                padding: "0.875rem 3rem",
                borderRadius: 12,
                border: "none",
                fontSize: "0.95rem",
                fontWeight: 600,
                background: selectedTemplate.accent,
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: `0 4px 20px ${selectedTemplate.accent}44`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 28px ${selectedTemplate.accent}55`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 20px ${selectedTemplate.accent}44`;
              }}
            >
              Continue with {selectedTemplate.name} →
            </button>
            <p style={{ fontSize: "0.78rem", color: "var(--muted)" }}>
              Your portfolio will be ready in seconds
            </p>
          </div>

        </div>
      </main>
    </>
  );
}
