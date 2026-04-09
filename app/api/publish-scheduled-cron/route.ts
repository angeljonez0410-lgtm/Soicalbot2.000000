import { NextRequest, NextResponse } from "next/server";
import { runScheduledPublishing } from "../../../lib/publisher";

export async function GET(req: NextRequest) {
  try {
    const isVercelCron = req.headers.get("x-vercel-cron") === "1";

    if (!isVercelCron) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await runScheduledPublishing();

    return NextResponse.json({
      success: true,
      source: "vercel-cron",
      ...result,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to run scheduled cron publishing" },
      { status: 500 }
    );
  }
}
