"use client";
import ShopsList from "./components/ShopsList";
import ProductsCardsList from "./components/ProductsCardsList";
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
    fetch("/api/shops")
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
        if (data.length > 0) setSelectedShopId(data[0].id);
      })
      .catch((err) => console.error("Error loading:", err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (selectedShopId !== null) {
      fetch(`/api/products?shopId=${selectedShopId}`)
        .then((res) => res.json())
        .then((data) => setCards(data))
        .catch((err) => console.error("Error loading products:", err));
    }
  }, [selectedShopId]);

  if (isLoading) {
    return <div className="p-10 text-center">Loading menu...</div>;
  }

  return (
    <>
      <div className="flex flex-row flex-2 w-full">
        <ShopsList
          shops={shops}
          onSelectShop={(id: number) => {
            setSelectedShopId(id);
            return;
          }}
          selectedShopId={selectedShopId}
        />
        <ProductsCardsList cards={cards} />
      </div>
    </>
  );
}
