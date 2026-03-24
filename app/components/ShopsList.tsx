import ShopButton from "./ShopButton";

interface ShopsListProps {
  shops: { id: number; name: string }[];
  selectedShopId: number | null;
  onSelectShop: (id: number) => void;
}

export default function ShopsList({
  shops,
  selectedShopId,
  onSelectShop,
}: ShopsListProps) {
  return (
    <nav className="flex flex-col p-3 w-1/4 border rounded-md items-center">
      <span className="font-bold">Shops:</span>
      {shops.map((shop) => (
        <ShopButton
          key={shop.id}
          id={shop.id}
          name={shop.name}
          isSelected={shop.id === selectedShopId}
          onClick={() => onSelectShop(shop.id)}
        />
      ))}
    </nav>
  );
}
