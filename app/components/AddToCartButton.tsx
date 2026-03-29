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
    text-center
    bg-transparent hover:bg-cyan-500 active:bg-cyan-700 
    border
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
