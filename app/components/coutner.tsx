"use client";

import { useState } from "react";

export default function QuantityCounter() {
  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden bg-white shadow-sm">
      <button
        onClick={decrement}
        type="button"
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-bold border-r"
      >
        −
      </button>

      <span className="px-4 py-1 min-w-[40px] text-center font-medium text-gray-800">
        {count}
      </span>

      <button
        onClick={increment}
        type="button"
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-bold border-l"
      >
        +
      </button>
    </div>
  );
}
