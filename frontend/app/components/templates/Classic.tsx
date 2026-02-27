"use client";

import { Mail, Phone, MapPin, Github, Linkedin, Globe, ExternalLink, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClassicTemplate({ data }: { data: any }) {
  const router = useRouter();
  const { resume } = data;
  const { contact, summary, skills, experience, projects, education, certifications, languages } = resume;

  return (
    <div style={{ background: "#0d1117", color: "#e6edf3", minHeight: "100vh", fontFamily: "'Georgia', serif" }}>

      {/* Back button — floating */}
      {/* Uncomment if you want a back button on the portfolio page}
      <button
        onClick={() => router.push("/templates")}
        style={{
          position: "fixed", top: "1.25rem", left: "1.25rem", zIndex: 50,
          display: "flex", alignItems: "center", gap: "0.4rem",
          color: "rgba(255,255,255,0.7)", fontSize: "0.78rem",
          background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)",
          borderRadius: 8, padding: "0.4rem 0.85rem", cursor: "pointer",
          transition: "all 0.15s ease", backdropFilter: "blur(8px)",
        }}
        onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.2)"; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.12)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
      >
        <ArrowLeft size={13} /> Templates
      </button>
      */}

      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #059669, #10b981)", padding: "3.5rem 2rem 2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.6rem", fontWeight: 700, color: "#fff",
            }}>
              {contact.name?.[0] || "?"}
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "0.2rem", letterSpacing: "-0.02em" }}>
                {contact.name}
              </h1>
              {experience[0]?.role && (
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1rem", fontFamily: "system-ui" }}>
                  {experience[0].role} · {experience[0].company}
                </p>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 1.5rem" }}>
            {contact.email && <ContactChip icon={<Mail size={13} />} label={contact.email} href={`mailto:${contact.email}`} />}
            {contact.phone && <ContactChip icon={<Phone size={13} />} label={contact.phone} />}
            {contact.location && <ContactChip icon={<MapPin size={13} />} label={contact.location} />}
            {contact.github && <ContactChip icon={<Github size={13} />} label="GitHub" href={contact.github.startsWith("http") ? contact.github : `https://github.com/${contact.github}`} />}
            {contact.linkedin && <ContactChip icon={<Linkedin size={13} />} label="LinkedIn" href={contact.linkedin.startsWith("http") ? contact.linkedin : `https://linkedin.com/in/${contact.linkedin}`} />}
            {contact.website && <ContactChip icon={<Globe size={13} />} label="Website" href={contact.website} />}
          </div>
        </div>
      </header>

      {/* Two-column body */}
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "220px 1fr", gap: "0", minHeight: "calc(100vh - 200px)" }}>

        {/* Sidebar */}
        <aside style={{
          background: "#0a0f16", borderRight: "1px solid #21262d",
          padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "2rem",
        }}>
          {skills?.length > 0 && (
            <section>
              <SidebarTitle>Skills</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {skills.map((s: string) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8rem", color: "#c9d1d9", fontFamily: "system-ui" }}>{s}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {education?.length > 0 && (
            <section>
              <SidebarTitle>Education</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {education.map((edu: any, i: number) => (
                  <div key={i}>
                    <p style={{ fontWeight: 600, fontSize: "0.82rem", color: "#e6edf3", fontFamily: "system-ui", lineHeight: 1.4 }}>{edu.degree}</p>
                    <p style={{ color: "#10b981", fontSize: "0.75rem", fontFamily: "system-ui", marginTop: "0.2rem" }}>{edu.institution}</p>
                    {edu.graduation_year && <p style={{ color: "#484f58", fontSize: "0.72rem", fontFamily: "system-ui" }}>{edu.graduation_year}</p>}
                    {edu.gpa && <p style={{ color: "#484f58", fontSize: "0.72rem", fontFamily: "system-ui" }}>GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {languages?.length > 0 && (
            <section>
              <SidebarTitle>Languages</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {languages.map((l: string) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.8rem", color: "#c9d1d9", fontFamily: "system-ui" }}>{l}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications?.length > 0 && (
            <section>
              <SidebarTitle>Certifications</SidebarTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {certifications.map((c: string, i: number) => (
                  <p key={i} style={{ fontSize: "0.78rem", color: "#8b949e", lineHeight: 1.5, fontFamily: "system-ui" }}>{c}</p>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Main */}
        <main style={{ padding: "2rem 2.5rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>

          {summary && (
            <section>
              <MainTitle>Profile</MainTitle>
              <p style={{ color: "#8b949e", fontSize: "0.9rem", lineHeight: 1.8, fontStyle: "italic" }}>"{summary}"</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section>
              <MainTitle>Experience</MainTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                {experience.map((exp: any, i: number) => (
                  <div key={i} style={{ paddingLeft: "1rem", borderLeft: "3px solid #10b981" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.3rem" }}>
                      <div>
                        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#e6edf3", fontFamily: "system-ui" }}>{exp.role}</h3>
                        <p style={{ color: "#10b981", fontSize: "0.82rem", fontFamily: "system-ui", fontWeight: 500 }}>{exp.company}</p>
                      </div>
                      <span style={{ color: "#484f58", fontSize: "0.75rem", whiteSpace: "nowrap", fontFamily: "system-ui", background: "#161b22", border: "1px solid #21262d", padding: "0.2rem 0.6rem", borderRadius: 6 }}>
                        {exp.duration}
                      </span>
                    </div>
                    {exp.highlights?.length > 0 && (
                      <ul style={{ marginTop: "0.6rem", display: "flex", flexDirection: "column", gap: "0.45rem", paddingLeft: 0, listStyle: "none" }}>
                        {exp.highlights.map((h: string, j: number) => (
                          <li key={j} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start" }}>
                            <span style={{ color: "#10b981", flexShrink: 0, marginTop: "0.35rem", fontSize: "0.55rem" }}>▶</span>
                            <span style={{ color: "#8b949e", fontSize: "0.84rem", lineHeight: 1.65, fontFamily: "system-ui" }}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {projects?.length > 0 && (
            <section>
              <MainTitle>Projects</MainTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {projects.map((p: any, i: number) => (
                  <div key={i} style={{ background: "#161b22", borderRadius: 10, padding: "1.1rem 1.25rem", border: "1px solid #21262d", transition: "border-color 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = "#10b981")}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = "#21262d")}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontWeight: 600, fontSize: "0.925rem", fontFamily: "system-ui" }}>{p.name}</h3>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {p.github_url && <a href={p.github_url} target="_blank" rel="noopener noreferrer" style={{ color: "#484f58" }}><Github size={14} /></a>}
                        {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ color: "#484f58" }}><ExternalLink size={14} /></a>}
                      </div>
                    </div>
                    {p.description && <p style={{ color: "#8b949e", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.6rem", fontFamily: "system-ui" }}>{p.description}</p>}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
                      {p.tech_stack?.map((t: string) => (
                        <span key={t} style={{ fontSize: "0.68rem", padding: "0.15rem 0.5rem", borderRadius: 4, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", fontFamily: "system-ui" }}>{t}</span>
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
    <h2 style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981", marginBottom: "0.85rem", fontFamily: "system-ui" }}>
      {children}
    </h2>
  );
}

function MainTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#e6edf3", marginBottom: "1.1rem", paddingBottom: "0.5rem", borderBottom: "2px solid #10b981" }}>
      {children}
    </h2>
  );
}

function ContactChip({ icon, label, href }: { icon: React.ReactNode; label: string; href?: string }) {
  const style: React.CSSProperties = { display: "flex", alignItems: "center", gap: "0.35rem", color: "rgba(255,255,255,0.8)", fontSize: "0.78rem", textDecoration: "none", fontFamily: "system-ui" };
  return href
    ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{icon}{label}</a>
    : <span style={style}>{icon}{label}</span>;
}
