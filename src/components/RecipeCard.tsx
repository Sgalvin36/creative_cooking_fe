import Link from "next/link";
import { Recipe } from "../types";

type Props = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: Props) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div
        className="rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200 bg-white"
        data-cy="recipe-card"
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
        {/* Optional: recipe name or meta info */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">{recipe.name}</h2>
        </div>
      </div>
    </Link>
  );
}
