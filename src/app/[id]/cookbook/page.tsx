"use client";
import { Recipe } from "@/types";
import { useAuth } from "@/context/AuthContext";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect } from "react";

export default function Cookbook() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch("/api/cookbook_recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.data.recipes))
      .catch((err) => console.error("Error fetching recipes", err));
  }, []);

  return (
    <main className="p-6">
      <section>
        {user && (
          <h2 className="text-2xl font-semibold mb-4">
            {user.name}&apos;s Cookbook
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-lg">
              Add your first recipe to get started!
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
