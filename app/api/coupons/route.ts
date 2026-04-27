import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  try {
    if (code) {
      const sql =
        "SELECT id, name, discount, image FROM coupons WHERE name = $1 LIMIT 1";
      const result = await query(sql, [code]);

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: "Coupon not found" },
          { status: 404 },
        );
      }

      return NextResponse.json(result.rows[0]);
    }
    const sql = "SELECT id, name, discount, image FROM coupons ORDER BY id ASC";
    const result = await query(sql);

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error in /api/coupons:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
