"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";

export default function MinimalTemplate({ data }: { data: any }) {
  const { resume, github } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#0f0f0f", color: "#f5f5f5", minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>

      {/* Navbar */}
      <nav style={{ borderBottom: "1px solid #2a2a2a", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0f0f0f", zIndex: 50 }}>
        <span style={{ fontWeight: 600, fontSize: "1rem" }}>{contact.name}</span>
        <div style={{ display: "flex", gap: "1.5rem" }} className="hide-mobile">
          {["About", "Experience", "Projects", "Education"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} style={{ color: "#a1a1aa", fontSize: "0.85rem", textDecoration: "none" }}>{s}</a>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Hero */}
        <section id="about" style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(99,102,241,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.25rem", fontWeight: 700, color: "#6366f1" }}>
              {contact.name?.[0] || "?"}
            </div>
            <div>
              <h1 style={{ fontSize: "1.5rem", fontWeight: 700, lineHeight: 1.2 }}>{contact.name}</h1>
              {experience[0]?.role && (
                <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>{experience[0].role}</p>
              )}
            </div>
          </div>

          {/* Contact links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
            {contact.email && <ContactLink icon={<Mail size={14} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <ContactLink icon={<Phone size={14} />} label={contact.phone} />}
            {contact.location && <ContactLink icon={<MapPin size={14} />} label={contact.location} />}
            {contact.github && <ContactLink icon={<Github size={14} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <ContactLink icon={<Linkedin size={14} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <ContactLink icon={<Globe size={14} />} label="Website" href={contact.website} />}
          </div>

          {summary && <p style={{ color: "#d4d4d8", lineHeight: 1.7, fontSize: "0.95rem" }}>{summary}</p>}
        </section>

        {/* Skills */}
        {skills?.length > 0 && (
          <section style={{ marginBottom: "4rem" }}>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((s: string) => (
                <span key={s} style={{ padding: "0.3rem 0.75rem", borderRadius: 999, fontSize: "0.8rem", background: "rgba(99,102,241,0.12)", color: "#818cf8", border: "1px solid rgba(99,102,241,0.2)" }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section id="experience" style={{ marginBottom: "4rem" }}>
            <SectionTitle>Experience</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {experience.map((exp: any, i: number) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>{exp.role}</h3>
                      <p style={{ color: "#6366f1", fontSize: "0.875rem" }}>{exp.company}</p>
                    </div>
                    <span style={{ color: "#a1a1aa", fontSize: "0.8rem", whiteSpace: "nowrap" }}>{exp.duration}</span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                      {exp.highlights.map((h: string, j: number) => (
                        <li key={j} style={{ color: "#a1a1aa", fontSize: "0.875rem", lineHeight: 1.6 }}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section id="projects" style={{ marginBottom: "4rem" }}>
            <SectionTitle>Projects</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
              {projects.map((p: any, i: number) => (
                <div key={i} style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 12, padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontWeight: 600, fontSize: "0.95rem" }}>{p.name}</h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {p.github_url && <a href={p.github_url} target="_blank" style={{ color: "#a1a1aa" }}><Github size={14} /></a>}
                      {p.url && <a href={p.url} target="_blank" style={{ color: "#a1a1aa" }}><ExternalLink size={14} /></a>}
                    </div>
                  </div>
                  {p.description && <p style={{ color: "#a1a1aa", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.description}</p>}
                  {p.tech_stack?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {p.tech_stack.map((t: string) => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "0.2rem 0.5rem", borderRadius: 999, background: "#2a2a2a", color: "#a1a1aa" }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <section id="education" style={{ marginBottom: "4rem" }}>
            <SectionTitle>Education</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {education.map((edu: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: "0.95rem" }}>{edu.degree}</h3>
                    <p style={{ color: "#6366f1", fontSize: "0.85rem" }}>{edu.institution}</p>
                    {edu.field_of_study && <p style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>{edu.field_of_study}</p>}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {edu.graduation_year && <span style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>{edu.graduation_year}</span>}
                    {edu.gpa && <p style={{ color: "#a1a1aa", fontSize: "0.8rem" }}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          {languages?.length > 0 && (
            <section>
              <SectionTitle>Languages</SectionTitle>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {languages.map((l: string) => (
                  <span key={l} style={{ padding: "0.3rem 0.75rem", borderRadius: 999, fontSize: "0.8rem", background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#d4d4d8" }}>{l}</span>
                ))}
              </div>
            </section>
          )}
          {certifications?.length > 0 && (
            <section>
              <SectionTitle>Certifications</SectionTitle>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {certifications.map((c: string, i: number) => (
                  <li key={i} style={{ color: "#a1a1aa", fontSize: "0.875rem" }}>• {c}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

      </main>
    </div>
  );
}

// ── Small reusable components ──────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#a1a1aa", marginBottom: "1.25rem", paddingBottom: "0.5rem", borderBottom: "1px solid #2a2a2a" }}>
      {children}
    </h2>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style = { display: "flex", alignItems: "center", gap: "0.35rem", color: "#a1a1aa", fontSize: "0.8rem", textDecoration: "none" };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}