"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Recipe, RandomRecipesData } from "../types";
import RecipeCard from "../components/cards/RecipeCard";
import { useGraphQLQuery } from "@/hooks/useGraphQLQuery";
import { GET_RANDOM_RECIPES } from "@/graphql/queries";

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const { data, loading, error } = useGraphQLQuery<
    RandomRecipesData,
    { count: number }
  >(GET_RANDOM_RECIPES, { count: 9 }, "GetRandomRecipes");

  useEffect(() => {
    if (isLoggedIn && user) {
      router.push(`/my/cookbooks`);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (data?.randomRecipes) setRecipes(data.randomRecipes);
  }, [data]);

  return (
    <main className="p-6">
      <section className="mb-8 flex-row">
        <h1 className="text-6xl font-bold mb-2 flex justify-center">
          Welcome to Cooking with Caveats
        </h1>
        <p className="text-lg text-gray-700">
          Finding recipes online has never been easier. Everywhere you look you
          can find recipes that fits whatever you are looking for. Yet how often
          have you tried a recipe only to find out it tasted like it was missing
          something? You go back to the recipe and look in the comments only to
          find commenter after commenter sharing their small modifications to
          kick it up a notch or to appeal to a specific palette. Cooking with
          Caveats wants to bring those helpful messages front and center with
          your favorite recipes.
        </p>
        <br />
        <p className="text-lg text-gray-700">
          Discover delicious, curated recipes and organize your personal
          cookbook. Customize your recipes with thoughtful additions,
          subtractions, or substitutions that makes the recipe your very own.
          Sign up to save your favorite recipes and modifications and share with
          others. Search through other user&apos;s creations and modifications
          to see what flavors best fit you.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Explore Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {!isLoggedIn && (
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
          )}
        </div>
      </section>
    </main>
  );
}
