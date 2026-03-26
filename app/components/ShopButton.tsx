export interface ShopButtonProps {
  id: number;
  name: string;
  isSelected: boolean;
  onClick?: () => void;
}

export default function ShopButton({
  name,
  isSelected,
  onClick,
}: ShopButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
    inline-block 
    p-2
    mt-3   
    w-42
    h-10
    text-center
   ${
     isSelected
       ? "bg-cyan-600 text-white border-cyan-700 shadow-md"
       : "bg-white text-gray-700 border-gray-300 hover:bg-cyan-50"
   }
    border
    border-solid
    rounded-md
    border-grey-100
    `}
    >
      {name}
    </button>
  );
}
