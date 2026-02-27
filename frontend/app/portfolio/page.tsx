"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MinimalTemplate from "../components/templates/Minimal";
import ClassicTemplate from "../components/templates/Classic";
import BoldTemplate from "../components/templates/Bold";

const TEMPLATES: Record<string, React.ComponentType<{ data: any }>> = {
  minimal: MinimalTemplate,
  classic: ClassicTemplate,
  bold: BoldTemplate,
};

export default function PortfolioPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [template, setTemplate] = useState("minimal");

  useEffect(() => {
    const raw = sessionStorage.getItem("portfolioData");
    const tmpl = sessionStorage.getItem("selectedTemplate");
    if (!raw) { router.push("/"); return; }
    setData(JSON.parse(raw));
    if (tmpl) setTemplate(tmpl);
  }, [router]);

  if (!data) return null;

  const Template = TEMPLATES[template] ?? MinimalTemplate;
  return <Template data={data} />;
}