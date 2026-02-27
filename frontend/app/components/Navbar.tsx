"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: "56px",
        background: "rgba(15,15,15,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <span style={{ fontSize: "1rem", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          resume<span style={{ color: "#6366f1" }}>2</span>portfolio
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        <NavLink href="/how-it-works">How it works</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      style={{
        fontSize: "0.82rem",
        fontWeight: 500,
        color: isActive ? "#f5f5f5" : "#71717a",
        textDecoration: "none",
        padding: "0.35rem 0.85rem",
        borderRadius: 8,
        background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.color = "#f5f5f5";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.color = "#71717a";
          e.currentTarget.style.background = "transparent";
        }
      }}
    >
      {children}
    </Link>
  );
}