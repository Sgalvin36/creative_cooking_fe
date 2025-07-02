"use client";
import Link from "next/link";
import { useState } from "react";
import { Recipe } from "../types";
import { useAuth } from "../context/AuthContext";
import { Plus, X } from "react-feather";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  const [inCookbook, setInCookbook] = useState(false);
  const { isLoggedIn } = useAuth();

  const toggleCookbook = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Please log in to add to cookbook");
      return;
    }
    setInCookbook(!inCookbook);
  };

  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div
        className="
          rounded-xl
          shadow-md dark:shadow-light
          overflow-hidden 
          transition transform duration-200 ease-in-out 
          hover:scale-105 
          hover:shadow-xl hover:dark:shadow-lighter
          bg-white dark:bg-gray-500
          relative"
        data-cy="recipe-card"
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-black">
            No Image
          </div>
        )}
        {/* Optional: recipe name or meta info */}
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-black">{recipe.name}</h2>
          <button
            onClick={toggleCookbook}
            title={inCookbook ? "Remove from Cookbook" : "Add to Cookbook"}
            className={`ml-2 p-1 rounded-full ${inCookbook ? "bg-red-500" : "bg-green-500"} text-white hover:scale-110 transition`}
          >
            {inCookbook ? <X size={20} /> : <Plus size={20} />}
          </button>
        </div>
      </div>
    </Link>
  );
}
