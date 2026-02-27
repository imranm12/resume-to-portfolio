import Navbar from "./components/Navbar";
import UploadForm from "./components/UploadForm";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Background glow blobs */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(100px)" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 300, height: 300, borderRadius: "50%", background: "rgba(99,102,241,0.04)", filter: "blur(80px)" }} />
      </div>

      <main className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16" style={{ position: "relative", zIndex: 1 }}>

        {/* Badge */}
        <div className="animate-fade-up delay-100">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: "rgba(99,102,241,0.15)", color: "var(--accent)", border: "1px solid rgba(99,102,241,0.25)", letterSpacing: "0.05em", padding: "0.25rem 0.9rem" }}>
            ✦ Free &amp; Fast
          </span>
        </div>

        {/* Headline */}
        <div className="animate-fade-up delay-200 text-center mt-5 mb-4">
          <h1 className="font-bold tracking-tight" style={{ fontSize: "clamp(2.25rem, 6vw, 3.75rem)", lineHeight: 1.1 }}>
            Turn your resume into a
            <br />
            <span style={{
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer 3s linear infinite",
            }}>
              stunning portfolio
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p className="animate-fade-up delay-300 text-center mb-10"
          style={{ color: "var(--muted)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", maxWidth: 480, lineHeight: 1.7 }}>
          Upload your PDF resume and get a beautiful developer
          portfolio in seconds — no account required, completely free.
        </p>

        {/* Upload form */}
        <div className="animate-fade-up delay-400 w-full" style={{ maxWidth: 560 }}>
          <UploadForm />
        </div>

        {/* Social proof */}
        <div className="animate-fade-up delay-500 flex items-center gap-6 mt-10">
          {[
            { label: "Free Forever", icon: "⚡" },
            { label: "AI Powered",   icon: "✦" },
            { label: "3 Templates",  icon: "🎨" },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted)" }}>
              <span>{icon}</span> {label}
            </div>
          ))}
        </div>

      </main>
    </>
  );
}