import { NextResponse } from "next/server";
import { createSupabaseHealthClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createSupabaseHealthClient();

  if (!supabase) {
    return NextResponse.json(
      {
        overall: "NOT_CONFIGURED",
        services: {
          frontend: "CONNECTED",
          supabase: "NOT_CONFIGURED",
          database: "UNKNOWN",
          authentication: "NOT_REQUIRED",
          groq: "NOT_CONFIGURED",
          vercel: process.env.VERCEL ? "CONNECTED" : "UNKNOWN",
        },
      },
      { status: 503 },
    );
  }

  const { data, error } = await supabase.rpc("health_check");
  const databaseConnected = !error && data?.ok === true;

  return NextResponse.json(
    {
      overall: databaseConnected ? "CONNECTED" : "FAILED",
      services: {
        frontend: "CONNECTED",
        supabase: "CONFIGURED",
        database: databaseConnected ? "CONNECTED" : "FAILED",
        authentication: "NOT_REQUIRED",
        groq: "NOT_CONFIGURED",
        vercel: process.env.VERCEL ? "CONNECTED" : "UNKNOWN",
      },
      checkedAt: new Date().toISOString(),
    },
    { status: databaseConnected ? 200 : 503 },
  );
}
