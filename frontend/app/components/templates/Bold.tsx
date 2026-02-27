"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, ArrowUpRight } from "lucide-react";

export default function BoldTemplate({ data }: { data: any }) {
  const { resume } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#0c0a09", color: "#fafaf9", minHeight: "100vh", fontFamily: "'system-ui', sans-serif" }}>

      {/* Big hero */}
      <header style={{ padding: "5rem 2rem 4rem", borderBottom: "1px solid #292524", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(245,158,11,0.08)", filter: "blur(80px)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "inline-block", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 999, padding: "0.3rem 1rem", marginBottom: "1.5rem" }}>
            <span style={{ color: "#f59e0b", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {experience[0]?.role || "Developer"}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            {contact.name?.split(" ").map((word: string, i: number) => (
              <span key={i} style={{ display: "block", color: i === 0 ? "#fafaf9" : "#f59e0b" }}>{word}</span>
            ))}
          </h1>

          {summary && (
            <p style={{ color: "#a8a29e", fontSize: "1rem", lineHeight: 1.7, maxWidth: 560, marginBottom: "2rem" }}>
              {summary}
            </p>
          )}

          {/* Contact pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            {contact.email && <Pill icon={<Mail size={12} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <Pill icon={<Phone size={12} />} label={contact.phone} />}
            {contact.location && <Pill icon={<MapPin size={12} />} label={contact.location} />}
            {contact.github && <Pill icon={<Github size={12} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <Pill icon={<Linkedin size={12} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <Pill icon={<Globe size={12} />} label="Website" href={contact.website} />}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Skills */}
        {skills?.length > 0 && (
          <section style={{ marginBottom: "5rem" }}>
            <BoldTitle number="01">Skills</BoldTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {skills.map((s: string) => (
                <span key={s} style={{ padding: "0.4rem 1rem", borderRadius: 4, fontSize: "0.85rem", fontWeight: 500, background: "#1c1917", border: "1px solid #292524", color: "#d6d3d1", letterSpacing: "0.02em" }}>
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
                <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: "2rem", alignItems: "start" }}>
                  <div>
                    <p style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem", marginBottom: "0.25rem" }}>{exp.company}</p>
                    <p style={{ color: "#78716c", fontSize: "0.78rem" }}>{exp.duration}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.75rem" }}>{exp.role}</h3>
                    {exp.highlights?.length > 0 && (
                      <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        {exp.highlights.map((h: string, j: number) => (
                          <li key={j} style={{ display: "flex", gap: "0.75rem", color: "#a8a29e", fontSize: "0.875rem", lineHeight: 1.6 }}>
                            <span style={{ color: "#f59e0b", flexShrink: 0, marginTop: "0.2rem" }}>→</span>
                            {h}
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "#292524", border: "1px solid #292524", borderRadius: 12, overflow: "hidden" }}>
              {projects.map((p: any, i: number) => (
                <div key={i} style={{ background: "#0c0a09", padding: "1.5rem", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#1c1917")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#0c0a09")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                    <h3 style={{ fontWeight: 700, fontSize: "1rem" }}>{p.name}</h3>
                    <div style={{ display: "flex", gap: "0.4rem" }}>
                      {p.github_url && <a href={p.github_url} target="_blank" style={{ color: "#78716c", display: "flex" }}><Github size={15} /></a>}
                      {p.url && <a href={p.url} target="_blank" style={{ color: "#78716c", display: "flex" }}><ArrowUpRight size={15} /></a>}
                    </div>
                  </div>
                  {p.description && <p style={{ color: "#78716c", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.description}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                    {p.tech_stack?.map((t: string) => (
                      <span key={t} style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 3, background: "rgba(245,158,11,0.1)", color: "#f59e0b" }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education + Languages + Certs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "3rem" }}>

          {education?.length > 0 && (
            <section>
              <BoldTitle number="04">Education</BoldTitle>
              {education.map((edu: any, i: number) => (
                <div key={i} style={{ marginBottom: "1.25rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9rem" }}>{edu.degree}</p>
                  <p style={{ color: "#f59e0b", fontSize: "0.82rem" }}>{edu.institution}</p>
                  {edu.graduation_year && <p style={{ color: "#78716c", fontSize: "0.78rem" }}>{edu.graduation_year}</p>}
                  {edu.gpa && <p style={{ color: "#78716c", fontSize: "0.78rem" }}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {languages?.length > 0 && (
            <section>
              <BoldTitle number="05">Languages</BoldTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {languages.map((l: string) => (
                  <span key={l} style={{ color: "#a8a29e", fontSize: "0.875rem" }}>— {l}</span>
                ))}
              </div>
            </section>
          )}

          {certifications?.length > 0 && (
            <section>
              <BoldTitle number="06">Certifications</BoldTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {certifications.map((c: string, i: number) => (
                  <span key={i} style={{ color: "#a8a29e", fontSize: "0.875rem" }}>— {c}</span>
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
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.5rem" }}>
      <span style={{ color: "#f59e0b", fontSize: "0.7rem", fontWeight: 700, fontFamily: "monospace" }}>{number}</span>
      <h2 style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fafaf9" }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: "#292524" }} />
    </div>
  );
}

function Pill({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style = { display: "flex", alignItems: "center", gap: "0.4rem", color: "#a8a29e", fontSize: "0.78rem", textDecoration: "none", background: "#1c1917", border: "1px solid #292524", borderRadius: 999, padding: "0.35rem 0.85rem" };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}