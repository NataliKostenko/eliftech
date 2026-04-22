"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface RepeatOrderButtonProps {
  items: OrderItem[];
}

export default function ReordertButton({ items }: RepeatOrderButtonProps) {
  const { repeatOrder } = useCart();
  const router = useRouter();
  const handleRepeat = (e: React.MouseEvent) => {
    e.stopPropagation();

    repeatOrder(items);

    console.log("Order repeated");
    router.push("/cart");
  };

  return (
    <button
      onClick={handleRepeat}
      className="
        flex items-center gap-2 
        px-4 py-2 
        bg-[#376E6F] text-white 
        rounded-md text-sm font-medium 
        transition-all 
        hover:bg-[#2F4454] 
        active:scale-95
        shadow-sm
      "
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 1l4 4-4 4" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <path d="M7 23l-4-4 4-4" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
      Repeat Order
    </button>
  );
}
