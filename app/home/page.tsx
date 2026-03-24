"use client";
import ShopsList from "../components/ShopsList";
import ProductsCardsList from "../components/ProductsCardsList";
import { useState } from "react";

export default function Home() {
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const shops = [
    { id: 1, name: "shop1" },
    { id: 2, name: "shop2" },
    { id: 3, name: "shop3" },
  ];

  const cards = [
    { id: 1, shopId: 1, name: "Burger1", image: "/burger1.jpg" },
    { id: 2, shopId: 1, name: "Burger2", image: "/burger2.jpg" },
    { id: 3, shopId: 2, name: "Burger3", image: "/burger3.jpg" },
    { id: 4, shopId: 2, name: "Burger4", image: "/burger4.jpg" },
    { id: 5, shopId: 3, name: "Burger5", image: "/burger5.jpg" },
    { id: 6, shopId: 3, name: "Burger6", image: "/burger6.jpg" },
  ];

  const filteredCards = cards.filter((card) => card.shopId === selectedShopId);
  return (
    <>
      <div className="flex flex-row flex-2 w-full">
        <ShopsList
          shops={shops}
          onSelectShop={setSelectedShopId}
          selectedShopId={selectedShopId}
        />
        <ProductsCardsList cards={filteredCards} />
      </div>
    </>
  );
}
