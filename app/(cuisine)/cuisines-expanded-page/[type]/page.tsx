"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { recommendedForYou, chefsSpecials, todaysSpecials, Special } from "../../data/data";
import FoodCard from "../../components/FoodCard";
import usePreOrder from "../../hooks/usePreOrder";
import FloatingButtons from "../../components/FloatingButtons";

export default function CuisineViewMore() {
  const { type } = useParams();
  const decodedType = decodeURIComponent(type as string);

  const cuisineData: Record<string, Special[]> = {
    "recommended": recommendedForYou,
    "chefs-specials": chefsSpecials,
    "todays-specials": todaysSpecials,
  };

  // Get the corresponding cuisine data
  const allCuisines = cuisineData[decodedType] || [];

  // Sorting state
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Sort cuisines by price
  const sortedCuisines = [...allCuisines].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const { preOrderCount, addItemToPreOrder, clearPreOrder } = usePreOrder();

  return (
    <div className="bg-[url('/background.png')] bg-cover bg-center bg-fixed min-h-screen">
      <nav>Navigation Bar</nav>

      {/* Floating Buttons */}
      <section className="py-4 mx-4 md:mx-14 z-10 fixed bottom-32 left-0 right-0 flex justify-center">
        <FloatingButtons preOrderCount={preOrderCount} setPreOrderCount={clearPreOrder} />
      </section>

      {/* Sorting Dropdown */}
      <section className="py-4 mx-4 md:mx-14 flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          className="px-4 py-2 border rounded-md text-gray-700 font-semibold cursor-pointer"
        >
          <option value="asc">Sort by Price: Low to High</option>
          <option value="desc">Sort by Price: High to Low</option>
        </select>
      </section>

      {/* Display Sorted Cuisines */}
      <section className="py-4 mx-4 md:mx-14 relative">
        <h1 className="text-3xl font-bold mb-6 text-center capitalize">{decodedType}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {sortedCuisines.length > 0 ? (
            sortedCuisines.map((cuisine) => (
              <div key={cuisine.id}>
                <FoodCard
                  image={cuisine.image}
                  rating={cuisine.rating}
                  name={cuisine.name}
                  description={cuisine.description}
                  price={cuisine.price}
                  onAddToPreOrder={addItemToPreOrder}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-2xl font-bold text-gray-800">
              No {decodedType} available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
