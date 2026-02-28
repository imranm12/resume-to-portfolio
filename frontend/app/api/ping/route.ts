// frontend/app/api/ping/route.ts
// Pings the Render backend every 14 minutes to prevent cold starts.
// Triggered by Vercel Cron — add this to vercel.json

export const runtime = "edge";

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return Response.json({ error: "NEXT_PUBLIC_API_URL not set" }, { status: 500 });
  }

  try {
    const start = Date.now();
    const res = await fetch(`${apiUrl}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(10000), // 10s timeout
    });
    const ms = Date.now() - start;

    return Response.json({
      ok: res.ok,
      status: res.status,
      latency_ms: ms,
      pinged_at: new Date().toISOString(),
    });
  } catch (err: any) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}