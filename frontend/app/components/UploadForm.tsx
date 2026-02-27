"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Upload, FileText, X, Github } from "lucide-react";

export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [github, setGithub] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onDrop = useCallback((accepted: File[]) => {
    setError("");
    if (accepted[0]) setFile(accepted[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
    onDropRejected: () => setError("Please upload a PDF file under 10MB."),
  });

  const handleSubmit = async () => {
    if (!file) return setError("Please upload your resume first.");
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (github) formData.append("github_username", github);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/parse-resume`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Something went wrong.");
      }

      const data = await res.json();
      sessionStorage.setItem("portfolioData", JSON.stringify(data));
      router.push("/templates");
    } catch (err: any) {
      setError(err.message || "Failed to parse resume. Is the Python server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "100%", maxWidth: 560, margin: "0 auto", display: "flex", flexDirection: "column", gap: "1rem" }}>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        style={{
          border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          background: isDragActive ? "rgba(99,102,241,0.05)" : "var(--card)",
          borderRadius: 12,
          minHeight: 180,
          cursor: "pointer",
          transition: "border-color 0.2s ease, background 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <input {...getInputProps()} />

        {file ? (
          /* ── File selected state ── */
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <FileText size={20} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--foreground)" }}>
              {file.name}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer", display: "flex", flexShrink: 0 }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          /* ── Empty state ── */
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", textAlign: "center" }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Upload size={20} style={{ color: "var(--accent)" }} />
            </div>
            <div>
              <p style={{ color: "var(--foreground)", fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.2rem" }}>
                {isDragActive ? "Drop your resume here" : "Drag & drop your resume PDF"}
              </p>
              <p style={{ color: "var(--muted)", fontSize: "0.78rem" }}>PDF up to 10MB</p>
            </div>
            <span style={{
              fontSize: "0.75rem", padding: "0.25rem 0.9rem", borderRadius: 999,
              background: "var(--border)", color: "var(--muted)",
            }}>
              or click to browse
            </span>
          </div>
        )}
      </div>

      {/* GitHub input */}
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 12, padding: "0.75rem 1rem",
      }}>
        <Github size={18} style={{ color: "var(--muted)", flexShrink: 0 }} />
        <input
          type="text"
          placeholder="GitHub username (optional)"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          style={{
            flex: 1, background: "transparent", border: "none",
            outline: "none", fontSize: "0.875rem", color: "var(--foreground)",
          }}
        />
      </div>

      {/* Error message */}
      {error && (
        <p style={{ color: "#f87171", fontSize: "0.875rem", textAlign: "center" }}>
          {error}
        </p>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        style={{
          width: "100%", padding: "0.85rem",
          borderRadius: 12, border: "none",
          fontSize: "0.9rem", fontWeight: 600,
          background: loading || !file ? "var(--border)" : "var(--accent)",
          color: loading || !file ? "var(--muted)" : "#fff",
          cursor: loading || !file ? "not-allowed" : "pointer",
          transition: "background 0.2s ease, transform 0.1s ease",
          transform: "scale(1)",
        }}
        onMouseEnter={e => { if (!loading && file) e.currentTarget.style.background = "var(--accent-hover)"; }}
        onMouseLeave={e => { if (!loading && file) e.currentTarget.style.background = "var(--accent)"; }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
            <svg style={{ animation: "spin 1s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
            Parsing resume... this may take ~60s
          </span>
        ) : "Generate Portfolio →"}
      </button>

      {/* Footer note */}
      <p style={{ color: "var(--muted)", fontSize: "0.75rem", textAlign: "center" }}>
        Your resume is processed securely. We don't store your data.
      </p>

    </div>
  );
}