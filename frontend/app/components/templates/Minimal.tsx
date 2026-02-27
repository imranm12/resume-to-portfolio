"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MinimalTemplate({ data }: { data: any }) {
  const router = useRouter();
  const { resume } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#0f0f0f", color: "#f5f5f5", minHeight: "100vh", fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Sticky Navbar */}
      <nav style={{
        borderBottom: "1px solid #1e1e1e",
        padding: "0.875rem 2rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        position: "sticky", top: 0, background: "rgba(15,15,15,0.9)",
        backdropFilter: "blur(12px)", zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            onClick={() => router.push("/templates")}
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              color: "#a1a1aa", fontSize: "0.8rem", background: "none",
              border: "1px solid #2a2a2a", borderRadius: 8,
              padding: "0.35rem 0.75rem", cursor: "pointer",
              transition: "all 0.15s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#f5f5f5"; e.currentTarget.style.borderColor = "#444"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#a1a1aa"; e.currentTarget.style.borderColor = "#2a2a2a"; }}
          >
            <ArrowLeft size={13} /> Templates
          </button>
          <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{contact.name}</span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["About", "Experience", "Projects", "Education"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              style={{ color: "#71717a", fontSize: "0.82rem", textDecoration: "none", transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f5")}
              onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}
            >{s}</a>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Hero */}
        <section id="about" style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(99,102,241,0.08))",
              border: "2px solid rgba(99,102,241,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.4rem", fontWeight: 700, color: "#6366f1",
            }}>
              {contact.name?.[0] || "?"}
            </div>
            <div>
              <h1 style={{ fontSize: "1.6rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: "0.2rem" }}>
                {contact.name}
              </h1>
              {experience[0]?.role && (
                <p style={{ color: "#6366f1", fontSize: "0.875rem", fontWeight: 500 }}>
                  {experience[0].role} · {experience[0].company}
                </p>
              )}
            </div>
          </div>

          {/* Contact row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem 1.25rem", marginBottom: "1.5rem" }}>
            {contact.email && <ContactLink icon={<Mail size={13} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <ContactLink icon={<Phone size={13} />} label={contact.phone} />}
            {contact.location && <ContactLink icon={<MapPin size={13} />} label={contact.location} />}
            {contact.github && <ContactLink icon={<Github size={13} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <ContactLink icon={<Linkedin size={13} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <ContactLink icon={<Globe size={13} />} label="Website" href={contact.website} />}
          </div>

          {summary && (
            <p style={{ color: "#a1a1aa", lineHeight: 1.75, fontSize: "0.925rem", maxWidth: 620, borderLeft: "2px solid #2a2a2a", paddingLeft: "1rem" }}>
              {summary}
            </p>
          )}
        </section>

        {/* Skills */}
        {skills?.length > 0 && (
          <section style={{ marginBottom: "3.5rem" }}>
            <SectionTitle>Skills</SectionTitle>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {skills.map((s: string) => (
                <span key={s} style={{
                  padding: "0.3rem 0.8rem", borderRadius: 6, fontSize: "0.78rem", fontWeight: 500,
                  background: "rgba(99,102,241,0.08)", color: "#818cf8",
                  border: "1px solid rgba(99,102,241,0.15)",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section id="experience" style={{ marginBottom: "3.5rem" }}>
            <SectionTitle>Experience</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {experience.map((exp: any, i: number) => (
                <div key={i} style={{ paddingLeft: "1rem", borderLeft: "2px solid #1e1e1e" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                    <div>
                      <h3 style={{ fontWeight: 600, fontSize: "1rem", marginBottom: "0.15rem" }}>{exp.role}</h3>
                      <p style={{ color: "#6366f1", fontSize: "0.82rem", fontWeight: 500 }}>{exp.company}</p>
                    </div>
                    <span style={{
                      color: "#52525b", fontSize: "0.75rem", whiteSpace: "nowrap",
                      background: "#1a1a1a", border: "1px solid #2a2a2a",
                      padding: "0.2rem 0.6rem", borderRadius: 6,
                    }}>{exp.duration}</span>
                  </div>
                  {exp.highlights?.length > 0 && (
                    <ul style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem", paddingLeft: 0, listStyle: "none" }}>
                      {exp.highlights.map((h: string, j: number) => (
                        <li key={j} style={{ display: "flex", gap: "0.65rem", alignItems: "flex-start" }}>
                          <span style={{ color: "#6366f1", flexShrink: 0, marginTop: "0.3rem", fontSize: "0.6rem" }}>◆</span>
                          <span style={{ color: "#a1a1aa", fontSize: "0.85rem", lineHeight: 1.65 }}>{h}</span>
                        </li>
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
          <section id="projects" style={{ marginBottom: "3.5rem" }}>
            <SectionTitle>Projects</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {projects.map((p: any, i: number) => (
                <div key={i} style={{
                  background: "#111", border: "1px solid #1e1e1e", borderRadius: 12, padding: "1.25rem",
                  transition: "border-color 0.15s, transform 0.15s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366f1"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e1e1e"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                    <h3 style={{ fontWeight: 600, fontSize: "0.925rem" }}>{p.name}</h3>
                    <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                      {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f5")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}><Github size={14} /></a>}
                      {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#52525b", transition: "color 0.15s" }} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f5")} onMouseLeave={e => (e.currentTarget.style.color = "#52525b")}><ExternalLink size={14} /></a>}
                    </div>
                  </div>
                  {p.description && <p style={{ color: "#71717a", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.description}</p>}
                  {p.tech_stack?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {p.tech_stack.map((t: string) => (
                        <span key={t} style={{ fontSize: "0.68rem", padding: "0.15rem 0.5rem", borderRadius: 4, background: "#1a1a1a", color: "#71717a", border: "1px solid #2a2a2a" }}>{t}</span>
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
          <section id="education" style={{ marginBottom: "3.5rem" }}>
            <SectionTitle>Education</SectionTitle>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {education.map((edu: any, i: number) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", paddingBottom: "1.25rem", borderBottom: i < education.length - 1 ? "1px solid #1a1a1a" : "none" }}>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: "0.925rem", marginBottom: "0.2rem" }}>{edu.degree}</h3>
                    <p style={{ color: "#6366f1", fontSize: "0.82rem" }}>{edu.institution}</p>
                    {edu.field_of_study && <p style={{ color: "#52525b", fontSize: "0.78rem", marginTop: "0.1rem" }}>{edu.field_of_study}</p>}
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    {edu.graduation_year && <p style={{ color: "#52525b", fontSize: "0.78rem" }}>{edu.graduation_year}</p>}
                    {edu.gpa && <p style={{ color: "#52525b", fontSize: "0.78rem" }}>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages & Certifications */}
        {(languages?.length > 0 || certifications?.length > 0) && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
            {languages?.length > 0 && (
              <section>
                <SectionTitle>Languages</SectionTitle>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {languages.map((l: string) => (
                    <span key={l} style={{ padding: "0.25rem 0.7rem", borderRadius: 6, fontSize: "0.78rem", background: "#111", border: "1px solid #1e1e1e", color: "#a1a1aa" }}>{l}</span>
                  ))}
                </div>
              </section>
            )}
            {certifications?.length > 0 && (
              <section>
                <SectionTitle>Certifications</SectionTitle>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {certifications.map((c: string, i: number) => (
                    <div key={i} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start" }}>
                      <span style={{ color: "#6366f1", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.6rem" }}>◆</span>
                      <span style={{ color: "#a1a1aa", fontSize: "0.82rem" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.12em",
      textTransform: "uppercase", color: "#52525b",
      marginBottom: "1.25rem", paddingBottom: "0.6rem",
      borderBottom: "1px solid #1e1e1e",
      display: "flex", alignItems: "center", gap: "0.5rem",
    }}>
      {children}
    </h2>
  );
}

function ContactLink({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.35rem", color: "#71717a", fontSize: "0.78rem", textDecoration: "none", transition: "color 0.15s" };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={e => (e.currentTarget.style.color = "#f5f5f5")} onMouseLeave={e => (e.currentTarget.style.color = "#71717a")}>{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}
