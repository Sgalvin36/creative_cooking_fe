'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // adjust to your actual path
import Link from 'next/link';

export default function HomePage() {
  const { isLoggedIn, user } = useAuth();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      fetch('/api/random_recipes') // or your actual backend endpoint
        .then((res) => res.json())
        .then((data) => setRecipes(data))
        .catch((err) => console.error('Error fetching recipes', err));
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.firstName}!</h1>
        <p className="mb-4">Here’s your cookbook:</p>
        {/* You'll replace this with actual cookbook data */}
        <Link href="/cookbooks" className="text-blue-500 underline">
          Go to your cookbook
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6">
      <section className="mb-8 flex-row">
        <h1 className="text-6xl font-bold mb-2 flex justify-center">Welcome to Cooking with Caveats</h1>
        <p className="text-lg text-gray-700">
          Finding recipes online has never been easier. Everywhere you look you can find recipes that fits whatever you are looking for. Yet how often have you tried a recipe only to find out it tasted like it was missing something? You go back to the recipe and look in the comments only to find commenter after commenter sharing their small modifications to kick it up a notch or to appeal to a specific palette. Cooking with Caveats wants to bring those helpful messages front and center with your favorite recipes.  
        </p>
        <br/>
        <p className="text-lg text-gray-700">
          Discover delicious, curated recipes and organize your personal cookbook. Customize your recipes with thoughtful additions, subtractions, or substitutions that makes the recipe your very own. Sign up to save your favorite recipes and modifications and share with others. Search through other user's creations and modifications to see what flavors best fit you. 
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Explore Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.id}`}>
              <div className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 bg-white">
                {recipe.image_url ? (
                  <img src={recipe.image_url} alt={recipe.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{recipe.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{recipe.description?.slice(0, 80)}...</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recipe.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
