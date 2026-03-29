import { NextResponse } from "next/server";
import { createOrder } from "../orders.service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (
      !body.customer.name ||
      !body.customer.phone ||
      !body.customer.address ||
      !body.customer.email ||
      body.items.length === 0
    ) {
      return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    const result = await createOrder(body);

    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
