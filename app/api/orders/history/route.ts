import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  if (!email || !phone) {
    return NextResponse.json(
      { error: "Email and phone are required" },
      { status: 400 },
    );
  }

  try {
    const sql = `
      SELECT o.id, o.email, o.phone,
      COALESCE(
        (
          SELECT json_agg(json_build_object(
            'id', oi.product_id,
            'name', p.name,
            'price', oi.price,
            'quantity', oi.quantity,
            'image', p.image 
          ))
          FROM order_items oi
          LEFT JOIN products p ON oi.product_id = p.id 
          WHERE oi.order_id = o.id
        ), 
        '[]'::json
      ) as items
      FROM orders o
      WHERE LOWER(o.email) = LOWER($1) AND (o.phone = $2 OR REPLACE(o.phone, '+', '') = REPLACE($2, '+', ''))
      ORDER BY o.id DESC
    `;

    const result = await query(sql, [email, phone]);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error("DATABASE ERROR:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}
