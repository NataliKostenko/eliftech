import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const shopId = searchParams.get("shopId");

  if (!shopId) {
    return NextResponse.json([]);
  }

  const result = await query("SELECT * FROM products WHERE shop_id = $1", [
    shopId,
  ]);
  return NextResponse.json(result.rows);
}
