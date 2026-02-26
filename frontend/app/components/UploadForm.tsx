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
    maxSize: 10 * 1024 * 1024, // 10MB
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

      const res = await fetch("http://localhost:8000/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Something went wrong.");
      }

      const data = await res.json();

      // Store result in sessionStorage and navigate to template picker
      sessionStorage.setItem("portfolioData", JSON.stringify(data));
      router.push("/templates");
    } catch (err: any) {
      setError(err.message || "Failed to parse resume. Is the Python server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">

      {/* Drop zone */}
      <div
        {...getRootProps()}
        className="rounded-xl p-10 text-center cursor-pointer transition-all"
        style={{
          border: `2px dashed ${isDragActive ? "var(--accent)" : "var(--border)"}`,
          background: isDragActive ? "rgba(99,102,241,0.05)" : "var(--card)",
        }}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-center gap-3">
            <FileText size={20} style={{ color: "var(--accent)" }} />
            <span className="text-sm font-medium">{file.name}</span>
            <button
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
              style={{ color: "var(--muted)" }}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={28} style={{ color: "var(--muted)" }} />
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {isDragActive ? "Drop your resume here" : "Drag & drop your resume PDF"}
            </p>
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: "var(--border)", color: "var(--muted)" }}
            >
              or click to browse
            </span>
          </div>
        )}
      </div>

      {/* GitHub input */}
      <div
        className="flex items-center gap-3 rounded-xl px-4 py-3"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <Github size={18} style={{ color: "var(--muted)" }} />
        <input
          type="text"
          placeholder="GitHub username (optional)"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-sm text-center" style={{ color: "#f87171" }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading || !file}
        className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
        style={{
            background: loading || !file ? "var(--border)" : "var(--accent)",
            color: loading || !file ? "var(--muted)" : "#fff",
            cursor: loading || !file ? "not-allowed" : "pointer",
        }}
        >
        {loading ? (
            <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
            </svg>
            Parsing resume... this may take ~60s
            </span>
        ) : "Generate Portfolio →"}
       </button>

      <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
        Your resume is processed locally. Nothing is stored or sent to any server.
      </p>
    </div>
  );
}