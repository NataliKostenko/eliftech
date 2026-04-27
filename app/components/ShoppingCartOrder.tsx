"use client";
import OrderCard from "./OrderCard";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

interface ShoppingCartOrderProps {
  status: string | null;
}

export default function ShoppingCartOrder({ status }: ShoppingCartOrderProps) {
  const { cart, updateQuantity } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [couponError, setCouponError] = useState("");

  const subtotal = cart.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0,
  );

  const applyCoupon = async () => {
    setCouponError("");
    setDiscountValue(0);

    if (!couponCode.trim()) return;

    try {
      const res = await fetch(`/api/coupons?code=${couponCode}`);
      const data = await res.json();

      if (res.ok) {
        const discount = Math.round(Number(data.discount));

        if (isNaN(discount)) {
          setCouponError("Coupon format error");
          return;
        }

        if (discount === 500 && subtotal < 4000) {
          setCouponError("Coupon for 500 UAH valid from 4000 UAH");
          return;
        }

        if (discount === 200 && subtotal < 2000) {
          setCouponError("Coupon for 200 UAH valid from 2000 UAH");
          return;
        }

        if (discount === 100 && subtotal < 1000) {
          setCouponError("Coupon for 100 UAH valid from 1000 UAH");
          return;
        }

        setDiscountValue(discount);
      } else {
        setCouponError(data.error || "Invalid code");
      }
    } catch (err) {
      setCouponError("Connection error");
    }
  };

  useEffect(() => {
    if (discountValue > 0) {
      const d = Math.round(discountValue);
      let shouldReset = false;

      if (d === 500 && subtotal < 4000) shouldReset = true;
      else if (d === 200 && subtotal < 2000) shouldReset = true;
      else if (d === 100 && subtotal < 1000) shouldReset = true;

      if (shouldReset) {
        setDiscountValue(0);
        setCouponError("The order amount is insufficient for the coupon");
      }
    }
  }, [subtotal, discountValue]);

  const totalPrice = Math.max(0, subtotal - (Number(discountValue) || 0));

  return (
    <div className="w-full lg:w-2/3 border rounded-md p-5 flex flex-col gap-6 h-screen overflow-y-auto md:ml-5 bg-white">
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

      <div className="border-t pt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Is there a coupon?
        </label>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon name"
            className="border p-2 rounded-md flex-grow focus:ring-2 focus:ring-[#376E6F] outline-none"
          />
          <button
            type="button"
            onClick={applyCoupon}
            /*  className="px-4 py-2 bg-[#376E6F] text-white rounded-md hover:bg-opacity-90 transition" */
            className="p-2 bg-[#376E6F] text-white hover:bg-[#DA7B93] active:bg-[#1C3334] rounded-md w-40 disabled:bg-gray-400"
          >
            Apply
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mt-2 italic">
          * 100 from 1000 UAH | 200 from 2000 UAH | 500 from 4000 UAH
        </p>

        {couponError && (
          <p className="text-red-500 text-sm mt-1">{couponError}</p>
        )}
        {discountValue > 0 && (
          <p className="text-green-600 text-sm mt-1 font-bold">
            ✓ Discount applied: -{discountValue} UAH
          </p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-200 pt-4 gap-6">
        <div className="flex flex-col">
          {discountValue > 0 && (
            <p className="text-sm text-gray-500 line-through">
              Subtotal: {subtotal} UAH
            </p>
          )}
          <p className="text-xl font-bold text-[#2F4454]">
            Total: <span className="text-[#376E6F]">{totalPrice} UAH</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={status === "Sending..." || cart.length === 0}
          className="p-2 bg-[#376E6F] text-white hover:bg-[#DA7B93] active:bg-[#1C3334] rounded-md w-40 disabled:bg-gray-400"
        >
          Submit Order
        </button>
      </div>
    </div>
  );
}
