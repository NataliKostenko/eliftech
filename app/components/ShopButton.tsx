export interface ShopButtonProps {
  id: number;
  name: string;
  isSelected: boolean;
  rating: number;
  onClick?: () => void;
}

export default function ShopButton({
  name,
  rating,
  isSelected,
  onClick,
}: ShopButtonProps) {
  {
    return (
      <button
        onClick={onClick}
        className={`
   px-3 py-2 rounded-md text-xs border transition-all flex flex-row justify-around
   ${
     isSelected
       ? "bg-[#376E6F] text-white border-[#2F4454] shadow-md"
       : "bg-white text-[#2F4454] border-[#2F4454] hover:bg-[#376E6F]/20"
   }`}
      >
        <span className="font-medium text-sm leading-tight">{name}</span>

        <span
          className={`text-xs mt-1 flex items-center gap-1 ${
            isSelected ? "text-yellow-300" : "text-yellow-600"
          }`}
        >
          ★ {Number(rating).toFixed(1)}
        </span>
      </button>
    );
  }
}
