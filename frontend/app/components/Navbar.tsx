import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-4"
      style={{ borderBottom: "1px solid var(--border)", background: "var(--background)" }}
    >
      <Link href="/" className="font-semibold text-lg tracking-tight" style={{ color: "var(--foreground)" }}>
        resume<span style={{ color: "var(--accent)" }}>2</span>portfolio
      </Link>
      
      <a href="https://github.com/yourusername/resume-to-portfolio"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm"
        style={{ color: "var(--muted)" }}
      >
        GitHub ↗
      </a>
    </nav>
  );
}