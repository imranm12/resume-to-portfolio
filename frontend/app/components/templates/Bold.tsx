"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ArrowUpRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BoldTemplate({ data }: { data: any }) {
  const router = useRouter();
  const { resume } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#09090b", color: "#fafafa", minHeight: "100vh", fontFamily: "'system-ui', sans-serif" }}>

      {/* Back button */}
      {/* Uncomment if you want a back button on the portfolio page}
      <button
        onClick={() => router.push("/templates")}
        style={{
          position: "fixed", top: "1.25rem", left: "1.25rem", zIndex: 50,
          display: "flex", alignItems: "center", gap: "0.4rem",
          color: "rgba(255,255,255,0.6)", fontSize: "0.78rem",
          background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)",
          borderRadius: 8, padding: "0.4rem 0.85rem", cursor: "pointer",
          transition: "all 0.15s ease", backdropFilter: "blur(8px)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(245,158,11,0.2)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(245,158,11,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
      >
        <ArrowLeft size={13} /> Templates
      </button>
      */}

      {/* Hero */}
      <header style={{ padding: "6rem 2rem 4rem", borderBottom: "1px solid #18181b", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -150, right: -150, width: 500, height: 500, borderRadius: "50%", background: "rgba(245,158,11,0.06)", filter: "blur(100px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 300, height: 300, borderRadius: "50%", background: "rgba(245,158,11,0.04)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "0.3rem 1rem", marginBottom: "1.75rem" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }} />
            <span style={{ color: "#f59e0b", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {experience[0]?.role || "Developer"}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 9vw, 6rem)", fontWeight: 900, lineHeight: 0.95, letterSpacing: "-0.04em", marginBottom: "1.75rem" }}>
            {contact.name?.split(" ").map((word: string, i: number) => (
              <span key={i} style={{ display: "block", color: i === 0 ? "#fafafa" : "#f59e0b" }}>{word}</span>
            ))}
          </h1>

          {summary && (
            <p style={{ color: "#71717a", fontSize: "0.95rem", lineHeight: 1.75, maxWidth: 540, marginBottom: "2rem" }}>
              {summary}
            </p>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
            {contact.email && <Pill icon={<Mail size={12} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <Pill icon={<Phone size={12} />} label={contact.phone} />}
            {contact.location && <Pill icon={<MapPin size={12} />} label={contact.location} />}
            {contact.github && <Pill icon={<Github size={12} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <Pill icon={<Linkedin size={12} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <Pill icon={<Globe size={12} />} label="Website" href={contact.website} />}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Skills */}
        {skills?.length > 0 && (
          <section style={{ marginBottom: "5rem" }}>
            <BoldTitle number="01">Skills</BoldTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((s: string) => (
                <span key={s} style={{
                  padding: "0.35rem 0.9rem", borderRadius: 6,
                  fontSize: "0.82rem", fontWeight: 500,
                  background: "#18181b", border: "1px solid #27272a",
                  color: "#d4d4d8", letterSpacing: "0.01em",
                  transition: "border-color 0.15s, color 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.color = "#f59e0b"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#d4d4d8"; }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section style={{ marginBottom: "5rem" }}>
            <BoldTitle number="02">Experience</BoldTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
              {experience.map((exp: any, i: number) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: "2rem", alignItems: "start" }}>
                  <div style={{ paddingTop: "0.25rem" }}>
                    <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.82rem", marginBottom: "0.3rem", lineHeight: 1.4 }}>{exp.company}</p>
                    <p style={{ color: "#52525b", fontSize: "0.75rem" }}>{exp.duration}</p>
                  </div>
                  <div style={{ borderLeft: "1px solid #27272a", paddingLeft: "1.5rem" }}>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "-0.01em" }}>{exp.role}</h3>
                    {exp.highlights?.length > 0 && (
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", paddingLeft: 0, listStyle: "none" }}>
                        {exp.highlights.map((h: string, j: number) => (
                          <li key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                            <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: "0.25rem" }}>→</span>
                            <span style={{ color: "#71717a", fontSize: "0.875rem", lineHeight: 1.65 }}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section style={{ marginBottom: "5rem" }}>
            <BoldTitle number="03">Projects</BoldTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "#27272a", border: "1px solid #27272a", borderRadius: 14, overflow: "hidden" }}>
              {projects.map((p: any, i: number) => (
                <div key={i} style={{ background: "#09090b", padding: "1.5rem", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#18181b")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#09090b")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "0.95rem", letterSpacing: "-0.01em" }}>{p.name}</h3>
                    <div style={{ display: "flex", gap: "0.4rem", flexShrink: 0 }}>
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", display: "flex", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f59e0b")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}><Github size={14} /></a>}
                      {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", display: "flex", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f59e0b")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}><ArrowUpRight size={14} /></a>}
                    </div>
                  </div>
                  {p.description && <p style={{ color: "#52525b", fontSize: "0.8rem", lineHeight: 1.65, marginBottom: "0.8rem" }}>{p.description}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                    {p.tech_stack?.map((t: string) => (
                      <span key={t} style={{ fontSize: "0.68rem", padding: "0.15rem 0.5rem", borderRadius: 4, background: "rgba(245,158,11,0.08)", color: "#d97706", border: "1px solid rgba(245,158,11,0.15)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Bottom grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem" }}>
          {education?.length > 0 && (
            <section>
              <BoldTitle number="04">Education</BoldTitle>
              {education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.875rem", lineHeight: 1.4, marginBottom: "0.2rem" }}>{edu.degree}</p>
                  <p style={{ color: "#f59e0b", fontSize: "0.78rem", marginBottom: "0.15rem" }}>{edu.institution}</p>
                  {edu.graduation_year && <p style={{ color: "#52525b", fontSize: "0.75rem" }}>{edu.graduation_year}</p>}
                  {edu.gpa && <p style={{ color: "#52525b", fontSize: "0.75rem" }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {languages?.length > 0 && (
            <section>
              <BoldTitle number="05">Languages</BoldTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {languages.map((l: string) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#f59e0b" }} />
                    <span style={{ color: "#a1a1aa", fontSize: "0.85rem" }}>{l}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications?.length > 0 && (
            <section>
              <BoldTitle number="06">Certifications</BoldTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {certifications.map((c: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: "0.2rem" }}>→</span>
                    <span style={{ color: "#a1a1aa", fontSize: "0.82rem", lineHeight: 1.5 }}>{c}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

      </main>
    </div>
  );
}

function BoldTitle({ children, number }: { children: React.ReactNode; number: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
      <span style={{ color: "#f59e0b", fontSize: "0.65rem", fontWeight: 700, fontFamily: "monospace", opacity: 0.8 }}>{number}</span>
      <h2 style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fafafa" }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: "#27272a" }} />
    </div>
  );
}

function Pill({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "0.4rem",
    color: "#71717a", fontSize: "0.75rem", textDecoration: "none",
    background: "#18181b", border: "1px solid #27272a",
    borderRadius: 999, padding: "0.35rem 0.85rem",
    transition: "all 0.15s ease",
  };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "#f59e0b"; e.currentTarget.style.color = "#f59e0b"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "#27272a"; e.currentTarget.style.color = "#71717a"; }}
      >{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}
