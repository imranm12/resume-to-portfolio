"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Download, ExternalLink, ChevronLeft, Check } from "lucide-react";
import MinimalTemplate from "../components/templates/Minimal";
import ClassicTemplate from "../components/templates/Classic";
import BoldTemplate from "../components/templates/Bold";

const TEMPLATES: Record<string, React.ComponentType<{ data: any }>> = {
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  bold:    BoldTemplate,
};

// ── HTML export helpers ────────────────────────────────────────────────────

function generateHTML(data: any, template: string): string {
  const { resume } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  const accent =
    template === "classic" ? "#10b981" :
    template === "bold"    ? "#f59e0b" :
                             "#6366f1";

  const bg =
    template === "classic" ? "#0d1117" :
    template === "bold"    ? "#09090b" :
                             "#0f0f0f";

  const skillsHTML = skills?.length
    ? skills.map((s: string) => `<span class="skill">${s}</span>`).join("")
    : "";

  const experienceHTML = experience?.length
    ? experience.map((exp: any) => `
        <div class="exp-item">
          <div class="exp-header">
            <div>
              <div class="exp-role">${exp.role}</div>
              <div class="exp-company">${exp.company}</div>
            </div>
            <span class="exp-duration">${exp.duration}</span>
          </div>
          <ul class="exp-bullets">
            ${exp.highlights?.map((h: string) => `<li>${h}</li>`).join("") ?? ""}
          </ul>
        </div>`).join("")
    : "";

  const projectsHTML = projects?.length
    ? projects.map((p: any) => `
        <div class="project-card">
          <div class="project-header">
            <span class="project-name">${p.name}</span>
            <div class="project-links">
              ${p.github_url ? `<a href="${p.github_url}" target="_blank">GitHub ↗</a>` : ""}
              ${p.url ? `<a href="${p.url}" target="_blank">Live ↗</a>` : ""}
            </div>
          </div>
          ${p.description ? `<p class="project-desc">${p.description}</p>` : ""}
          <div class="tech-stack">
            ${p.tech_stack?.map((t: string) => `<span class="tech">${t}</span>`).join("") ?? ""}
          </div>
        </div>`).join("")
    : "";

  const educationHTML = education?.length
    ? education.map((edu: any) => `
        <div class="edu-item">
          <div>
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-institution">${edu.institution}</div>
            ${edu.field_of_study ? `<div class="edu-field">${edu.field_of_study}</div>` : ""}
          </div>
          <div class="edu-year">${edu.graduation_year ?? ""}${edu.gpa ? ` · GPA ${edu.gpa}` : ""}</div>
        </div>`).join("")
    : "";

  const contactLinks = [
    contact.email    && `<a href="mailto:${contact.email}">${contact.email}</a>`,
    contact.phone    && `<span>${contact.phone}</span>`,
    contact.location && `<span>${contact.location}</span>`,
    contact.github   && `<a href="${contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`}" target="_blank">GitHub</a>`,
    contact.linkedin && `<a href="${contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`}" target="_blank">LinkedIn</a>`,
    contact.website  && `<a href="${contact.website}" target="_blank">Website</a>`,
  ].filter(Boolean).join(" · ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${contact.name} — Portfolio</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${bg}; color: #f5f5f5; font-family: system-ui, sans-serif; line-height: 1.6; }
    a { color: ${accent}; text-decoration: none; }
    a:hover { text-decoration: underline; }

    .container { max-width: 760px; margin: 0 auto; padding: 4rem 2rem 6rem; }

    /* Hero */
    .hero { margin-bottom: 3.5rem; }
    .avatar { width: 56px; height: 56px; border-radius: 50%; background: ${accent}22;
      border: 2px solid ${accent}44; display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; font-weight: 700; color: ${accent}; flex-shrink: 0; }
    .hero-top { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .hero-name { font-size: 1.6rem; font-weight: 700; letter-spacing: -0.02em; }
    .hero-role { color: ${accent}; font-size: 0.875rem; font-weight: 500; margin-top: 0.15rem; }
    .contact-row { display: flex; flex-wrap: wrap; gap: 0.4rem 1.25rem; margin-bottom: 1.25rem; font-size: 0.8rem; color: #71717a; }
    .contact-row a { color: #71717a; }
    .contact-row a:hover { color: #f5f5f5; text-decoration: none; }
    .summary { color: #a1a1aa; font-size: 0.925rem; line-height: 1.75; border-left: 2px solid #2a2a2a; padding-left: 1rem; }

    /* Section */
    .section { margin-bottom: 3.5rem; }
    .section-title { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
      color: #52525b; padding-bottom: 0.6rem; border-bottom: 1px solid #1e1e1e; margin-bottom: 1.25rem; }

    /* Skills */
    .skills { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill { padding: 0.3rem 0.8rem; border-radius: 6px; font-size: 0.78rem; font-weight: 500;
      background: ${accent}12; color: ${accent}cc; border: 1px solid ${accent}22; }

    /* Experience */
    .exp-item { padding-left: 1rem; border-left: 2px solid #1e1e1e; margin-bottom: 2rem; }
    .exp-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem; }
    .exp-role { font-weight: 600; font-size: 1rem; }
    .exp-company { color: ${accent}; font-size: 0.82rem; font-weight: 500; margin-top: 0.1rem; }
    .exp-duration { font-size: 0.75rem; color: #52525b; background: #1a1a1a; border: 1px solid #2a2a2a;
      padding: 0.2rem 0.6rem; border-radius: 6px; white-space: nowrap; }
    .exp-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.45rem; margin-top: 0.6rem; }
    .exp-bullets li { font-size: 0.85rem; color: #a1a1aa; line-height: 1.65; padding-left: 1rem; position: relative; }
    .exp-bullets li::before { content: "◆"; color: ${accent}; position: absolute; left: 0; top: 0.1rem; font-size: 0.5rem; }

    /* Projects */
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 1rem; }
    .project-card { background: #111; border: 1px solid #1e1e1e; border-radius: 12px; padding: 1.25rem; }
    .project-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem; }
    .project-name { font-weight: 600; font-size: 0.925rem; }
    .project-links { display: flex; gap: 0.5rem; font-size: 0.75rem; }
    .project-links a { color: #52525b; }
    .project-links a:hover { color: ${accent}; text-decoration: none; }
    .project-desc { color: #71717a; font-size: 0.8rem; line-height: 1.6; margin-bottom: 0.75rem; }
    .tech-stack { display: flex; flex-wrap: wrap; gap: 0.3rem; }
    .tech { font-size: 0.68rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: #1a1a1a; color: #71717a; border: 1px solid #2a2a2a; }

    /* Education */
    .edu-item { display: flex; justify-content: space-between; align-items: flex-start;
      padding-bottom: 1.25rem; border-bottom: 1px solid #1a1a1a; margin-bottom: 1.25rem; }
    .edu-item:last-child { border-bottom: none; margin-bottom: 0; }
    .edu-degree { font-weight: 600; font-size: 0.925rem; margin-bottom: 0.2rem; }
    .edu-institution { color: ${accent}; font-size: 0.82rem; }
    .edu-field { color: #52525b; font-size: 0.78rem; margin-top: 0.1rem; }
    .edu-year { color: #52525b; font-size: 0.78rem; text-align: right; white-space: nowrap; }

    /* Bottom grid */
    .bottom-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; }
    .lang-pill { display: inline-block; padding: 0.25rem 0.7rem; border-radius: 6px; font-size: 0.78rem;
      background: #111; border: 1px solid #1e1e1e; color: #a1a1aa; margin: 0.2rem; }
    .cert-item { font-size: 0.82rem; color: #a1a1aa; margin-bottom: 0.4rem; padding-left: 1rem; position: relative; }
    .cert-item::before { content: "◆"; color: ${accent}; position: absolute; left: 0; font-size: 0.5rem; top: 0.2rem; }

    @media (max-width: 600px) {
      .exp-header { flex-direction: column; gap: 0.4rem; }
      .edu-item { flex-direction: column; gap: 0.25rem; }
      .projects-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="hero">
      <div class="hero-top">
        <div class="avatar">${contact.name?.[0] ?? "?"}</div>
        <div>
          <div class="hero-name">${contact.name}</div>
          ${experience[0]?.role ? `<div class="hero-role">${experience[0].role} · ${experience[0].company}</div>` : ""}
        </div>
      </div>
      <div class="contact-row">${contactLinks}</div>
      ${summary ? `<p class="summary">${summary}</p>` : ""}
    </div>

    ${skills?.length ? `<div class="section"><div class="section-title">Skills</div><div class="skills">${skillsHTML}</div></div>` : ""}
    ${experience?.length ? `<div class="section"><div class="section-title">Experience</div>${experienceHTML}</div>` : ""}
    ${projects?.length ? `<div class="section"><div class="section-title">Projects</div><div class="projects-grid">${projectsHTML}</div></div>` : ""}
    ${education?.length ? `<div class="section"><div class="section-title">Education</div>${educationHTML}</div>` : ""}

    ${(languages?.length || certifications?.length) ? `
    <div class="bottom-grid">
      ${languages?.length ? `<div class="section"><div class="section-title">Languages</div>${languages.map((l: string) => `<span class="lang-pill">${l}</span>`).join("")}</div>` : ""}
      ${certifications?.length ? `<div class="section"><div class="section-title">Certifications</div>${certifications.map((c: string) => `<div class="cert-item">${c}</div>`).join("")}</div>` : ""}
    </div>` : ""}

  </div>
</body>
</html>`;
}

// ── Page component ─────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [template, setTemplate] = useState("minimal");
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const raw  = sessionStorage.getItem("portfolioData");
    const tmpl = sessionStorage.getItem("selectedTemplate");
    if (!raw) { router.push("/"); return; }
    setData(JSON.parse(raw));
    if (tmpl) setTemplate(tmpl);
  }, [router]);

  const handleDownload = () => {
    if (!data) return;
    const html     = generateHTML(data, template);
    const blob     = new Blob([html], { type: "text/html" });
    const url      = URL.createObjectURL(blob);
    const a        = document.createElement("a");
    const name     = data.resume?.contact?.name?.replace(/\s+/g, "-").toLowerCase() ?? "portfolio";
    a.href         = url;
    a.download     = `${name}-portfolio.html`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  if (!data) return null;

  const Template = TEMPLATES[template] ?? MinimalTemplate;
  const accent   = template === "classic" ? "#10b981" : template === "bold" ? "#f59e0b" : "#6366f1";
  const name     = data.resume?.contact?.name ?? "Portfolio";

  return (
    <div style={{ position: "relative" }}>

      {/* Toolbar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1.5rem", height: "52px",
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>

        {/* Left — back button + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={() => router.push("/templates")}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              color: "#71717a", fontSize: "0.78rem", fontWeight: 500,
              background: "none", border: "1px solid #2a2a2a",
              borderRadius: 8, padding: "0.3rem 0.7rem", cursor: "pointer",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f5f5f5"; e.currentTarget.style.borderColor = "#444"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#71717a"; e.currentTarget.style.borderColor = "#2a2a2a"; }}
          >
            <ChevronLeft size={13} /> Templates
          </button>

          <div style={{ width: 1, height: 18, background: "#2a2a2a" }} />

          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#a1a1aa" }}>
            {name}
          </span>

          <span style={{
            fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.55rem",
            borderRadius: 999, textTransform: "capitalize",
            background: `${accent}18`, color: accent, border: `1px solid ${accent}30`,
          }}>
            {template}
          </span>
        </div>

        {/* Right — actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={handleDownload}
            style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              fontSize: "0.82rem", fontWeight: 600,
              background: downloaded ? "rgba(16,185,129,0.15)" : `${accent}18`,
              color: downloaded ? "#10b981" : accent,
              border: `1px solid ${downloaded ? "rgba(16,185,129,0.3)" : `${accent}30`}`,
              borderRadius: 8, padding: "0.4rem 1rem", cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              if (!downloaded) e.currentTarget.style.background = `${accent}28`;
            }}
            onMouseLeave={e => {
              if (!downloaded) e.currentTarget.style.background = `${accent}18`;
            }}
          >
            {downloaded
              ? <><Check size={13} /> Downloaded!</>
              : <><Download size={13} /> Download HTML</>
            }
          </button>
        </div>
      </div>

      {/* Portfolio content — push down by toolbar height */}
      <div style={{ paddingTop: "52px" }}>
        <Template data={data} />
      </div>

      {/* Download hint toast — shows once on mount */}
      <DownloadHint accent={accent} onDownload={handleDownload} />
    </div>
  );
}

// ── One-time hint that fades out ───────────────────────────────────────────

function DownloadHint({ accent, onDownload }: { accent: string; onDownload: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100,
      background: "#1a1a1a", border: "1px solid #2a2a2a",
      borderRadius: 12, padding: "1rem 1.25rem",
      maxWidth: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      animation: "fadeUp 0.4s ease forwards",
    }}>
      <p style={{ fontSize: "0.82rem", fontWeight: 600, marginBottom: "0.3rem", color: "#f5f5f5" }}>
        🎉 Your portfolio is ready!
      </p>
      <p style={{ fontSize: "0.75rem", color: "#71717a", lineHeight: 1.5, marginBottom: "0.75rem" }}>
        Download it as an HTML file to host anywhere — GitHub Pages, Netlify, or send it directly.
      </p>
      <button
        onClick={() => { onDownload(); setVisible(false); }}
        style={{
          fontSize: "0.75rem", fontWeight: 600,
          background: `${accent}18`, color: accent,
          border: `1px solid ${accent}30`, borderRadius: 6,
          padding: "0.3rem 0.75rem", cursor: "pointer",
        }}
      >
        Download now →
      </button>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute", top: "0.6rem", right: "0.75rem",
          background: "none", border: "none", color: "#52525b",
          cursor: "pointer", fontSize: "1rem", lineHeight: 1,
        }}
      >×</button>
    </div>
  );
}