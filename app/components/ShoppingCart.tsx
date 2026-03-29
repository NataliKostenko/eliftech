"use client";
import { useState } from "react";
import ShoppingCartForm from "./ShoppingCartForm";
import ShoppingCartOrder from "./ShoppingCartOrder";
import { useCart } from "../context/CartContext";

export default function ShoppingCart() {
  const { cart } = useCart();
  const [status, setStatus] = useState<string | null>(null);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cleanItems = cart.map((item) => ({
      product_id: item.id,
      price: Number(item.price),
      quantity: Number(item.quantity),
    }));
    const orderData = {
      customer: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        address: formData.get("address"),
      },
      items: cleanItems,
    };

    if (
      !orderData.customer.name ||
      !orderData.customer.phone ||
      cart.length === 0
    ) {
      alert("Fill in the form and add items to your basket!");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setStatus("Your order has been successfully placed!");
        alert("Thank you! Your order has been received.");
      } else {
        setStatus("An error occurred during sending.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting to the server.");
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-row flex-2 w-full">
      <ShoppingCartForm />
      <ShoppingCartOrder />
    </form>
  );
}
