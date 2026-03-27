"use client";
import OrderCard from "./OrderCard";
import { useCart } from "../context/CartContext";

export default function ShoppingCartOrder() {
  const { cart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="w-full lg:w-2/3 border rounded-md p-5 bg-gray-50 flex flex-col gap-6 h-screen
     overflow-y-auto ml-5"
    >
      <div className="flex w-full flex-col">
        {cart.map((item) => (
          <OrderCard
            key={item.id}
            {...item}
            onIncrease={() => updateQuantity(item.id, 1)}
            onDecrease={() => updateQuantity(item.id, -1)}
          />
        ))}
      </div>
      <div className="flex justify-between items-center border-t pt-4 gap-6">
        <p className="text-xl font-bold">
          Total: <span className="text-cyan-700">{totalPrice} грн</span>
        </p>
        <button
          type="submit"
          className="p-2 bg-cyan-600 text-white rounded-md w-40"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
