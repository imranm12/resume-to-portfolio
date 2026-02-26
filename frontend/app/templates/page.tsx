"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const TEMPLATES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean, distraction-free. Let your work speak.",
    accent: "#6366f1",
    preview: {
      bg: "#0f0f0f",
      card: "#1a1a1a",
    },
  },
  {
    id: "classic",
    name: "Classic",
    description: "Professional and structured. Great for corporate roles.",
    accent: "#10b981",
    preview: {
      bg: "#111827",
      card: "#1f2937",
    },
  },
  {
    id: "bold",
    name: "Bold",
    description: "High contrast and expressive. Stand out from the crowd.",
    accent: "#f59e0b",
    preview: {
      bg: "#0c0a09",
      card: "#1c1917",
    },
  },
];

export default function TemplatesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("minimal");
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("portfolioData");
    if (!data) {
      router.push("/"); // no data, send back to upload
    } else {
      setHasData(true);
    }
  }, [router]);

  const handleContinue = () => {
    sessionStorage.setItem("selectedTemplate", selected);
    router.push("/portfolio");
  };

  if (!hasData) return null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center px-6 pt-28 pb-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Pick a template
          </h1>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            You can always change this later.
          </p>
        </div>

        {/* Template grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className="text-left rounded-2xl overflow-hidden transition-all"
              style={{
                border: `2px solid ${selected === t.id ? t.accent : "var(--border)"}`,
                background: "var(--card)",
                boxShadow: selected === t.id ? `0 0 20px ${t.accent}33` : "none",
              }}
            >
              {/* Template preview mockup */}
              <div
                className="h-44 p-4 flex flex-col gap-2"
                style={{ background: t.preview.bg }}
              >
                {/* Fake navbar */}
                <div className="flex items-center justify-between mb-1">
                  <div className="h-2 w-16 rounded-full" style={{ background: t.accent }} />
                  <div className="flex gap-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-1.5 w-8 rounded-full" style={{ background: t.preview.card }} />
                    ))}
                  </div>
                </div>
                {/* Fake hero */}
                <div className="h-3 w-32 rounded-full mt-2" style={{ background: t.preview.card }} />
                <div className="h-2 w-48 rounded-full" style={{ background: t.preview.card }} />
                <div className="h-2 w-40 rounded-full" style={{ background: t.preview.card }} />
                {/* Fake skill pills */}
                <div className="flex gap-1 mt-2 flex-wrap">
                  {[40, 52, 36, 44].map((w, i) => (
                    <div
                      key={i}
                      className="h-4 rounded-full"
                      style={{ width: w, background: `${t.accent}33` }}
                    />
                  ))}
                </div>
                {/* Fake cards */}
                <div className="flex gap-2 mt-auto">
                  {[1,2].map(i => (
                    <div
                      key={i}
                      className="flex-1 h-10 rounded-lg"
                      style={{ background: t.preview.card }}
                    />
                  ))}
                </div>
              </div>

              {/* Template info */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold">{t.name}</span>
                  {selected === t.id && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${t.accent}22`, color: t.accent }}
                    >
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {t.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="px-10 py-3 rounded-xl text-sm font-semibold transition-all"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Continue with {TEMPLATES.find(t => t.id === selected)?.name} →
        </button>

      </main>
    </>
  );
}