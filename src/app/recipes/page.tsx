"use client";

import { useEffect, useState } from "react";
import { Recipe, RandomRecipesData } from "@/types";
import RecipeCard from "@/components/cards/RecipeCard";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { GET_RANDOM_RECIPES } from "@/graphql/queries";

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, loading, error } = useGraphQLQuery<
    RandomRecipesData,
    { count: number }
  >(GET_RANDOM_RECIPES, { count: 9 }, "GetRandomRecipes");

  useEffect(() => {
    if (data?.randomRecipes) setRecipes(data.randomRecipes);
  }, [data]);

  return (
    <div>
      <div className="flex gap-4">
        <h1>Recipes</h1>
        <a>Filter</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {
          <>
            {loading && <p>Loading recipes...</p>}
            {error && (
              <p className="text-red-500">
                Error: {error.message || "Something went wrong."}
              </p>
            )}
            {!loading &&
              !error &&
              recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
          </>
        }
      </div>
    </div>
  );
}
