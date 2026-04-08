"use client";
import { useState } from "react";
import ShoppingCartForm from "./ShoppingCartForm";
import ShoppingCartOrder from "./ShoppingCartOrder";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function ShoppingCart() {
  const { cart, clearCart } = useCart();
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
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
        if (clearCart) {
          clearCart();
        }
        form.reset();
        setStatus("Your order has been successfully placed!");
        alert("Thank you! Your order has been received.");
        router.push("/");
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
      <ShoppingCartOrder status={status} />
    </form>
  );
}
