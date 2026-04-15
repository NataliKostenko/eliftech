import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const shopId = searchParams.get("shopId");
  const catIds = searchParams.get("catIds");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = (page - 1) * limit;

  if (!shopId) {
    return NextResponse.json({ items: [], totalCount: 0 });
  }

  try {
    let whereClause = "WHERE p.shop_id = $1";
    const params: any[] = [shopId];

    if (catIds) {
      const idArray = catIds.split(",");
      const placeholders = idArray.map((_, i) => `$${i + 2}`).join(", ");
      whereClause += ` AND p.categories_id IN (${placeholders})`;
      params.push(...idArray);
    }
    const countSql = `SELECT COUNT(*) FROM products p ${whereClause}`;
    const countResult = await query(countSql, params);
    const totalCount = parseInt(countResult.rows[0].count);
    const productsParams = [...params, limit, offset];
    const productsSql = `
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.categories_id = c.id
      ${whereClause}
      ORDER BY p.id ASC 
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;

    const productsResult = await query(productsSql, productsParams);

    return NextResponse.json({
      items: productsResult.rows,
      totalCount: totalCount,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
