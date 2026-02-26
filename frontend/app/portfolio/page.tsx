"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MinimalTemplate from "../components/templates/Minimal";

export default function PortfolioPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [template, setTemplate] = useState("minimal");

  useEffect(() => {
    const raw = sessionStorage.getItem("portfolioData");
    const tmpl = sessionStorage.getItem("selectedTemplate");
    if (!raw) {
      router.push("/");
      return;
    }
    setData(JSON.parse(raw));
    if (tmpl) setTemplate(tmpl);
  }, [router]);

  if (!data) return null;

  return <MinimalTemplate data={data} />;
}