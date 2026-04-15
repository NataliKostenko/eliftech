"use client";

import { useCart } from "../context/CartContext";

export interface AddToCartButtonProps {
  name: string;
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export default function AddToCartButton({
  name,
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => {
        addToCart(product);
        alert("Item added!");
      }}
      className="    
    p-2
    mt-3   
    w-42
    h-10
    text-center text-[#2F4454] active:text-white
    bg-[#DA7B93]/50 hover:bg-[#DA7B93] active:bg-[#2E151B]
    border-solid
    rounded-md
    border-grey-100
    ml-10    
    "
    >
      {name}
    </button>
  );
}
