"use client";
import ShopsList from "../components/ShopsList";
import ProductsCardsList from "../components/ProductsCardsList";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  shop_id: number;
  name: string;
  image: string;
  price: number;
}

interface Shop {
  id: number;
  name: string;
}

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [cards, setCards] = useState<Product[]>([]);
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/shops").then((res) => res.json()),
      fetch("/api/products").then((res) => res.json()),
    ])
      .then(([shopsData, productsData]) => {
        setShops(shopsData);
        setCards(productsData);
        if (shopsData.length > 0) setSelectedShopId(shopsData[0].id);
      })
      .catch((err) => console.error("Помилка завантаження:", err))
      .finally(() => setIsLoading(false));
  }, []);

  const filteredCards = selectedShopId
    ? cards.filter((card) => card.shop_id === selectedShopId)
    : [];

  if (isLoading) {
    return <div className="p-10 text-center">Завантаження меню...</div>;
  }

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
