"use client";

interface Category {
  id: number;
  name: string;
}

interface ProductFiltersProps {
  categories: Category[];
  selectedCatIds: number[];
  onToggleCategory: (id: number) => void;
  onResetCategories: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function ProductFilters({
  categories,
  selectedCatIds,
  onToggleCategory,
  onResetCategories,
  sortBy,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
      <div className="flex items-center gap-2 pr-4 lg:border-r border-gray-200">
        <span className="font-semibold text-gray-700 whitespace-nowrap">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 border border-gray-300 rounded-md bg-white text-sm focus:ring-2 focus:ring-cyan-500 outline-none cursor-pointer"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="alphabet-asc">Alphabet: A → Z</option>
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-gray-700 mr-2">
          Filter Products:
        </span>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onToggleCategory(cat.id)}
            className={`px-4 py-1 rounded-full text-xs font-medium transition-all border ${
              selectedCatIds.includes(cat.id)
                ? "bg-[#376E6F] text-white border-[#2F4454] shadow-sm"
                : "bg-white text-gray-600 border-gray-300 hover:border-[#376E6F]"
            }`}
          >
            {cat.name}
          </button>
        ))}
        {selectedCatIds.length > 0 && (
          <button
            onClick={onResetCategories}
            className="text-xs text-red-500 hover:text-red-700 font-bold ml-2"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
