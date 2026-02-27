"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink } from "lucide-react";

export default function ClassicTemplate({ data }: { data: any }) {
  const { resume, github } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#111827", color: "#f9fafb", minHeight: "100vh", fontFamily: "Georgia, serif" }}>

      {/* Header band */}
      <header style={{ background: "#10b981", padding: "3rem 2rem 2rem" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.25rem", fontFamily: "Georgia, serif" }}>
            {contact.name}
          </h1>
          {experience[0]?.role && (
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1rem", marginBottom: "1rem" }}>
              {experience[0].role} · {experience[0].company}
            </p>
          )}
          {/* Contact row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem" }}>
            {contact.email && <ContactChip icon={<Mail size={13} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <ContactChip icon={<Phone size={13} />} label={contact.phone} />}
            {contact.location && <ContactChip icon={<MapPin size={13} />} label={contact.location} />}
            {contact.github && <ContactChip icon={<Github size={13} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <ContactChip icon={<Linkedin size={13} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <ContactChip icon={<Globe size={13} />} label="Website" href={contact.website} />}
          </div>
        </div>
      </header>

      {/* Two-column layout */}
      <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "2rem", padding: "2rem" }} className="sm:grid-cols-[1fr_2.5fr]">

        {/* Left sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Skills */}
          {skills?.length > 0 && (
            <section>
              <SidebarTitle>Skills</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {skills.map((s: string) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", color: "#d1fae5" }}>{s}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages?.length > 0 && (
            <section>
              <SidebarTitle>Languages</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {languages.map((l: string) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.82rem", color: "#d1fae5" }}>{l}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <section>
              <SidebarTitle>Certifications</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {certifications.map((c: string, i: number) => (
                  <p key={i} style={{ fontSize: "0.82rem", color: "#d1fae5", lineHeight: 1.5 }}>{c}</p>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <SidebarTitle>Education</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {education.map((edu: any, i: number) => (
                  <div key={i}>
                    <p style={{ fontWeight: 600, fontSize: "0.85rem", color: "#f9fafb" }}>{edu.degree}</p>
                    <p style={{ color: "#10b981", fontSize: "0.78rem" }}>{edu.institution}</p>
                    {edu.graduation_year && <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>{edu.graduation_year}</p>}
                    {edu.gpa && <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

        </aside>

        {/* Main content */}
        <main style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {/* Summary */}
          {summary && (
            <section>
              <MainTitle>Profile</MainTitle>
              <p style={{ color: "#d1d5db", fontSize: "0.9rem", lineHeight: 1.8, fontStyle: "italic" }}>
                {summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <MainTitle>Experience</MainTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {experience.map((exp: any, i: number) => (
                  <div key={i} style={{ borderLeft: "3px solid #10b981", paddingLeft: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#f9fafb" }}>{exp.role}</h3>
                        <p style={{ color: "#10b981", fontSize: "0.85rem" }}>{exp.company}</p>
                      </div>
                      <span style={{ color: "#6b7280", fontSize: "0.78rem", whiteSpace: "nowrap", fontFamily: "system-ui" }}>
                        {exp.duration}
                      </span>
                    </div>
                    {exp.highlights?.length > 0 && (
                      <ul style={{ marginTop: "0.5rem", paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                        {exp.highlights.map((h: string, j: number) => (
                          <li key={j} style={{ color: "#9ca3af", fontSize: "0.85rem", lineHeight: 1.6 }}>{h}</li>
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
            <section>
              <MainTitle>Projects</MainTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {projects.map((p: any, i: number) => (
                  <div key={i} style={{ background: "#1f2937", borderRadius: 8, padding: "1rem", border: "1px solid #374151" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontWeight: 600, fontSize: "0.95rem" }}>{p.name}</h3>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {p.github_url && <a href={p.github_url} target="_blank" style={{ color: "#6b7280" }}><Github size={14} /></a>}
                        {p.url && <a href={p.url} target="_blank" style={{ color: "#6b7280" }}><ExternalLink size={14} /></a>}
                      </div>
                    </div>
                    {p.description && <p style={{ color: "#9ca3af", fontSize: "0.82rem", lineHeight: 1.6, marginBottom: "0.6rem" }}>{p.description}</p>}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {p.tech_stack?.map((t: string) => (
                        <span key={t} style={{ fontSize: "0.7rem", padding: "0.15rem 0.5rem", borderRadius: 4, background: "rgba(16,185,129,0.15)", color: "#10b981", border: "1px solid rgba(16,185,129,0.3)" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      </div>
    </div>
  );
}

function SidebarTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#10b981", marginBottom: "0.75rem", fontFamily: "system-ui" }}>
      {children}
    </h2>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#f9fafb", marginBottom: "1rem", paddingBottom: "0.4rem", borderBottom: "2px solid #10b981", fontFamily: "Georgia, serif" }}>
      {children}
    </h2>
  );
}

function ContactChip({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style = { display: "flex", alignItems: "center", gap: "0.35rem", color: "rgba(255,255,255,0.85)", fontSize: "0.78rem", textDecoration: "none", fontFamily: "system-ui" };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}