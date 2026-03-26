import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await query("SELECT * FROM products");
  return NextResponse.json(result.rows);
}
