/* import { query } from "@/lib/db";
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
 */
import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Отримуємо параметри з URL
  const { searchParams } = new URL(request.url);
  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");

  try {
    let sql = "SELECT * FROM shops";
    const params: any[] = [];

    // 2. Додаємо фільтрацію по рейтингу, якщо параметри передані
    if (minRating && maxRating) {
      sql += " WHERE rating >= $1 AND rating <= $2";
      params.push(parseFloat(minRating), parseFloat(maxRating));
      sql += " ORDER BY rating DESC"; // Кращі магазини зверху
    } else {
      sql += " ORDER BY name ASC"; // За замовчуванням за назвою
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
