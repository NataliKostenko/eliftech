import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const shopId = searchParams.get("shopId");
  const catIds = searchParams.get("catIds");
  const minRating = searchParams.get("minRating");
  const maxRating = searchParams.get("maxRating");
  const page = parseInt(searchParams.get("page") || "1");
  const sortBy = searchParams.get("sortBy");
  const limit = parseInt(searchParams.get("limit") || "6");
  const offset = (page - 1) * limit;
  const min = parseFloat(minRating || "");
  const max = parseFloat(maxRating || "");

  let orderBySql = "p.id ASC";
  if (sortBy === "price-asc") orderBySql = "p.price ASC";
  if (sortBy === "price-desc") orderBySql = "p.price DESC";
  if (sortBy === "alphabet-asc") orderBySql = "p.name ASC";

  try {
    const params: any[] = [];
    let whereClauses: string[] = [];

    const isRatingActive = !isNaN(min) && !isNaN(max);

    if (shopId && shopId !== "null" && shopId !== "") {
      params.push(shopId);
      whereClauses.push(`p.shop_id = $${params.length}`);
    }
    if (isRatingActive) {
      params.push(min, max);
      whereClauses.push(
        `s.rating >= $${params.length - 1} AND s.rating <= $${params.length}`,
      );
    }
    if (catIds && catIds !== "") {
      const idArray = catIds.split(",");
      const placeholders = idArray
        .map((id) => {
          params.push(id);
          return `$${params.length}`;
        })
        .join(", ");
      whereClauses.push(`p.categories_id IN (${placeholders})`);
    }

    const whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";
    const countSql = `SELECT COUNT(*) FROM products p  INNER JOIN shops s ON p.shop_id = s.id ${whereClause}`;
    const countResult = await query(countSql, params);
    const totalCount = parseInt(countResult.rows[0].count);
    const productsSql = `
      SELECT p.*, c.name as category_name, s.name as shop_name, s.rating as shop_rating 
      FROM products p
      LEFT JOIN categories c ON p.categories_id = c.id
      INNER JOIN shops s ON p.shop_id = s.id
      ${whereClause}
      ORDER BY ${orderBySql}
      LIMIT ${limit} OFFSET ${offset}
    `;
    const productsResult = await query(productsSql, params);

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
