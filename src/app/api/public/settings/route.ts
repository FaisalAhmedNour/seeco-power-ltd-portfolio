import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/settings";

// Mark this route as dynamic to ensure fresh settings are served
export const dynamic = "force-dynamic";

/**
 * GET: retrieve public site configuration parameters (brand colors, slogans, logos).
 * Accessible without session checks for public site visitor hydration.
 */
export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings, { status: 200 });
  } catch (error) {
    console.error("Public settings GET API error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred loading settings." },
      { status: 500 }
    );
  }
}
