import { NextResponse } from "next/server";

const startTime = Date.now();

export const dynamic = "force-dynamic";

export async function GET() {
  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);

  return NextResponse.json({
    status: "ok",
    service: "AI Unleashed - ICI Fest 2026",
    uptimeSeconds,
    timestamp: new Date().toISOString(),
  });
}
