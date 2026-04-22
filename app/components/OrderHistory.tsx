"use client";
import { useState } from "react";
import OrderHistoryForm from "./OrderHistoryForm";
import History from "./History";

export interface Order {
  id: number;
  date: string;
  totalPrice: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async (email: string, phone: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/orders/history?email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}`,
      );
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  flex-col md:flex-row flex-2 w-full">
      <OrderHistoryForm onSearch={fetchOrders} isLoading={loading} />

      {orders.length > 0 ? (
        <History orders={orders} />
      ) : (
        !loading && (
          <div
            className="w-full lg:w-2/3 border rounded-md p-5 bg-gray-50 flex flex-col gap-6 h-screen
     overflow-y-auto md:ml-5 bg-white"
          >
            <p className="text-gray-400">Enter data to see history</p>
          </div>
        )
      )}
    </div>
  );
}
