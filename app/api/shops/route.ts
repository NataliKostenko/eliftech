import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");

  try {
    let sql = "SELECT * FROM shops";
    const params: any[] = [];
    const hasMin =
      minRating !== null && minRating !== "null" && minRating !== "";
    const hasMax =
      maxRating !== null && maxRating !== "null" && maxRating !== "";

    if (hasMin && hasMax) {
      sql += " WHERE rating >= $1 AND rating <= $2";
      params.push(
        parseFloat(minRating as string),
        parseFloat(maxRating as string),
      );
      sql += " ORDER BY rating DESC";
    } else {
      sql += " ORDER BY name ASC";
    }

    const result = await query(sql, params);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error in /api/shops:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
