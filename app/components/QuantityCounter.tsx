"use client";

interface QuantityCounterProps {
  id: number;
  quantity: number;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
}

export default function QuantityCounter({
  id,
  quantity,
  onIncrease,
  onDecrease,
}: QuantityCounterProps) {
  return (
    <div
      className="flex items-center border rounded-lg 
    bg-white overflow-hidden shadow-sm h-8 w-40  mt-2"
    >
      <span
        className="px-3 text-sm font-medium w-full text-center
      "
      >
        {quantity}
      </span>
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => onIncrease(id)}
          className="px-2 hover:bg-gray-100 border-l border-b"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 fill-current text-gray-600"
          >
            <path d="M12 8l-6 6h12z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onDecrease(id)}
          className="px-2 hover:bg-gray-100 border-l border-t"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-3 h-3 fill-current text-gray-600"
          >
            <path d="M12 16l-6-6h12z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
