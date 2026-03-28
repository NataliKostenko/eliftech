import { pool } from "../../lib/db";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderData {
  customer: {
    name: string;
    phone: string;
    address: string;
    email: string;
  };
  items: CartItem[];
  total: number;
}

export async function createOrder(orderData: OrderData) {
  const { customer, items } = orderData;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const orderQuery = `
      INSERT INTO orders (name, phone, address, email)
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;
    const orderValues = [
      customer.name,
      customer.phone,
      customer.address,
      customer.email,
    ];
    const res = await client.query(orderQuery, orderValues);
    const orderId = res.rows[0].id;
    const itemsQuery = `
      INSERT INTO order_items (order_id, product_id, price, quantity)
      SELECT $1, unnest($2::int[]), unnest($3::int[]), unnest($4::int[])
    `;

    const productIds = items.map((i: any) => i.product_id);
    const prices = items.map((i) => i.price);
    const quantities = items.map((i) => i.quantity);

    await client.query(itemsQuery, [orderId, productIds, prices, quantities]);

    await client.query("COMMIT");
    return { success: true, orderId };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Помилка при збереженні замовлення:", error);
    throw error;
  } finally {
    client.release();
  }
}
