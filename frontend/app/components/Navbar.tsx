"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(15,15,15,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Link href="/" className="font-bold text-lg tracking-tight" style={{ color: "var(--foreground)", textDecoration: "none" }}>
          resume<span style={{ color: "var(--accent)" }}>2</span>portfolio
        </Link>

        {/* Desktop links */}
        <div className="hide-mobile flex items-center gap-6">
          <a href="how-it-works" style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none" }}>
            How it works
          </a>
        </div>

        {/* Mobile menu button */}
        <button className="sm:hidden" onClick={() => setOpen(!open)} style={{ color: "var(--muted)", background: "none", border: "none", cursor: "pointer" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="fixed top-[57px] left-0 w-full z-40 p-4 flex flex-col gap-3"
          style={{ background: "var(--background)", borderBottom: "1px solid var(--border)" }}
        >
          <a href="how-it-works" style={{ color: "var(--muted)", fontSize: "0.85rem", textDecoration: "none" }}>
            How it works
          </a>
        </div>
      )}
    </>
  );
}