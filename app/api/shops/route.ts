import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await query("SELECT * FROM shops ORDER BY name ASC");

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error in /api/shops:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
