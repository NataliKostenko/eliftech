"use client";

const RATING_FILTERS = [
  { label: "All Ratings", min: null, max: null },
  { label: "4.0 - 5.0 ★", min: 4.0, max: 5.0 },
  { label: "3.0 - 4.0 ★", min: 3.0, max: 4.0 },
  { label: "2.0 - 3.0 ★", min: 2.0, max: 3.0 },
];

interface ShopRatingFilterProps {
  currentMin: number | null;
  onRatingChange: (min: number | null, max: number | null) => void;
}

export default function ShopRatingFilter({
  currentMin,
  onRatingChange,
}: ShopRatingFilterProps) {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm">
      <span className="font-bold text-[#2F4454] block mb-1 text-sm">
        Shop Rating
      </span>
      <div className="flex flex-col">
        {RATING_FILTERS.map((f, idx) => {
          const isSelected = currentMin === f.min;
          return (
            <button
              key={idx}
              onClick={() => onRatingChange(f.min, f.max)}
              className={`
                px-3 py-2 mt-3 rounded-md text-xs border transition-all flex flex-row items-center justify-around
                ${
                  isSelected
                    ? "bg-[#376E6F] text-white border-[#2F4454] shadow-md"
                    : "bg-white text-[#2F4454] border-[#2F4454] hover:bg-[#376E6F]/20"
                }
              `}
            >
              <span className="font-medium text-sm leading-tight">
                {f.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
