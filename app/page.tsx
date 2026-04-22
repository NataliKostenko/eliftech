"use client";
import ShopsList from "./components/ShopsList";
import ProductsCardsList from "./components/ProductsCardsList";
import ProductFilters from "./components/ProductFilters";
import ShopRatingFilter from "./components/ShopRatingFilter";
import Pagination from "./components/Pagination";
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
  rating: number;
}

interface Category {
  id: number;
  name: string;
}

export default function Home() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCatIds, setSelectedCatIds] = useState<number[]>([]);
  const [cards, setCards] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [selectedShopId, setSelectedShopId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [ratingRange, setRatingRange] = useState<{
    min: number | null;
    max: number | null;
  }>({ min: null, max: null });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  useEffect(() => {
    const query =
      ratingRange.min !== null && ratingRange.min !== undefined
        ? `?minRating=${ratingRange.min}&maxRating=${ratingRange.max}`
        : "";
    fetch(`/api/shops${query}`)
      .then((res) => res.json())
      .then((data) => {
        setShops(data);
      })
      .finally(() => setIsLoading(false));
  }, [ratingRange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedShopId, selectedCatIds, ratingRange]);

  useEffect(() => {
    const shopQuery = selectedShopId ? `&shopId=${selectedShopId}` : "";
    const catQuery =
      selectedCatIds.length > 0 ? `&catIds=${selectedCatIds.join(",")}` : "";
    const ratingQuery =
      ratingRange.min !== null
        ? `&minRating=${ratingRange.min}&maxRating=${ratingRange.max}`
        : "";
    fetch(
      `/api/products?page=${currentPage}&limit=${itemsPerPage}&sortBy=${sortBy}${shopQuery}${catQuery}${ratingQuery}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data.items || []);

        const total = data.totalCount || 0;
        setTotalPages(Math.ceil(total / itemsPerPage) || 1);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setCards([]);
      });
  }, [selectedShopId, selectedCatIds, currentPage, sortBy, ratingRange]);

  if (isLoading)
    return <div className="p-10 text-center text-xl">Loading menu...</div>;

  const handleRatingChange = (min: number | null, max: number | null) => {
    setRatingRange({ min, max });
    setSelectedShopId(null);
    setCurrentPage(1);
  };

  const handleShopSelect = (id: number) => {
    setSelectedShopId(id);
    setRatingRange({ min: null, max: null });
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4">
      <ProductFilters
        categories={categories}
        selectedCatIds={selectedCatIds}
        onToggleCategory={(id) =>
          setSelectedCatIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
          )
        }
        onResetCategories={() => setSelectedCatIds([])}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <div className="flex flex-col md:flex-row w-full gap-6 items-start">
        <div className="w-full md:w-1/4 flex flex-col gap-4  top-4">
          <ShopRatingFilter
            currentMin={ratingRange.min}
            onRatingChange={handleRatingChange}
          />
          {cards.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
              {selectedShopId ? "No products found." : "Please select a shop."}
            </div>
          )}
          <ShopsList
            shops={shops}
            onSelectShop={handleShopSelect}
            selectedShopId={selectedShopId}
          />
        </div>

        <ProductsCardsList cards={cards} />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
