import ShopButton from "./ShopButton";

interface ShopsListProps {
  shops: { id: number; name: string; rating: number }[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

export default function ShopsList({
  shops,
  selectedShopId,
  onSelectShop,
}: ShopsListProps) {
  return (
    <nav className="p-4 bg-white border rounded-xl shadow-sm">
      <span className="font-bold text-[#2F4454] block mb-3 text-sm">
        Shops:
      </span>
      <div className="flex flex-col gap-2">
        {shops.map((shop) => (
          <ShopButton
            key={shop.id}
            id={shop.id}
            name={shop.name}
            rating={shop.rating}
            isSelected={shop.id === selectedShopId}
            onClick={() => onSelectShop(shop.id)}
          />
        ))}
      </div>
    </nav>
  );
}
