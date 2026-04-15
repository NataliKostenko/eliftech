"use client";
import OrderCard from "./OrderCard";
import { useCart } from "../context/CartContext";

interface ShoppingCartOrderProps {
  status: string | null;
}
export default function ShoppingCartOrder({ status }: ShoppingCartOrderProps) {
  const { cart, updateQuantity } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div
      className="w-full lg:w-2/3 border rounded-md p-5 bg-gray-50 flex flex-col gap-6 h-screen
     overflow-y-auto md:ml-5 bg-white"
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
      <div
        className="flex flex-col lg:flex-row justify-between items-center border-t 
      border-[#IC3334] pt-4 gap-6"
      >
        <p className="text-xl font-bold text-[#2F4454]">
          Total: <span className="text[#376E6F]">{totalPrice} грн</span>
        </p>
        <button
          type="submit"
          disabled={status === "Sending..."}
          className="p-2 bg-[#376E6F] text-white hover:bg-[#DA7B93] active:bg-[#IC3334] rounded-md w-40"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
