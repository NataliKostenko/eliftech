"use client";

import ReorderButton from "./ReorderButton";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: number;
  items: OrderItem[];
}

export default function History({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 italic">
        No orders found
      </div>
    );
  }

  return (
    <div
      className="w-full md:w-1/2 flex flex-col justify-center  
    border rounded-md p-3 md:ml-5 bg-white "
    >
      <h2 className="text-xl font-bold text-[#2F4454] mb-6 ">
        Your previous orders
      </h2>

      <div className="flex flex-col gap-4 h-screen overflow-y-auto">
        {orders.map((order) => {
          const orderTotal = order.items.reduce(
            (acc, item) => acc + Number(item.price) * (item.quantity || 1),
            0,
          );

          return (
            <div
              key={order.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all gap-4"
            >
              <div className="flex flex-col gap-1">
                <span className="font-bold text-[#2F4454] text-lg">
                  Order №{order.id}
                </span>
                <span className="text-sm font-semibold text-[#376E6F]">
                  Sum: {orderTotal.toFixed(2)} грн
                </span>
                <span className="text-xs text-gray-400">
                  Goods: {order.items.length} шт.
                </span>
              </div>

              <div className="w-full sm:w-auto">
                <ReorderButton items={order.items} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
