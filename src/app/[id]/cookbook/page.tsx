"use client";
import { Recipe } from "@/types";
import { useAuth } from "@/context/AuthContext";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect } from "react";
import { useGraphQLQuery } from "@/graphql/hooks/useGraphQLQuery";
import { GET_PERSONAL_COOKBOOK } from "@/graphql/queries";

interface CookbookData {
  personalCookbook: Recipe[];
}

export default function Cookbook() {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, loading, error } = useGraphQLQuery<CookbookData, undefined>(
    GET_PERSONAL_COOKBOOK,
    undefined,
    "GetPersonalCookbook",
  );

  useEffect(() => {
    if (data?.personalCookbook) setRecipes(data.personalCookbook);
  }, [data]);

  return (
    <main className="p-6">
      <section>
        {user && (
          <h2 className="text-2xl font-semibold mb-4">
            {user.name}&apos;s Cookbook
          </h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
        </div>
      </section>
    </main>
  );
}
