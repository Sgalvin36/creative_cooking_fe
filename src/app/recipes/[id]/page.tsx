import { getRecipe } from "@/lib/queries/getRecipe";
import RecipeActionBar from "./RecipeActionBar";

type rParams = Promise<{ id: string }>;

export default async function RecipePage({ params }: { params: rParams }) {
  const { id }: { id: string } = await params;
  const fullRecipe = await getRecipe(id);
  return (
    <div className="flex flex-col">
      {/* Hero banner */}
      <div
        className="w-full h-64 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${fullRecipe.image || "https://via.placeholder.com/800x400"})`,
        }}
      >
        <h1 className="text-4xl font-bold text-white bg-black bg-opacity-50 px-6 py-2 rounded">
          {fullRecipe.name}
        </h1>
      </div>

      {/* Actions Bar */}
      <RecipeActionBar />
      {/* Ingredients + future mods */}
      <div className="flex flex-row p-8 space-x-8">
        {/* Ingredients */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {fullRecipe.recipeIngredients.map((ing, idx) => (
              <li key={idx}>
                {ing.quantity} {ing.measurement.unit} {ing.ingredient.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Future modifications */}
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Your Modifications</h2>
          <div className="text-gray-500">Coming soon...</div>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          {fullRecipe.recipeInstructions
            .slice()
            .sort((a, b) => a.instructionStep - b.instructionStep)
            .map((step, idx) => (
              <li key={idx}>{step.instruction}</li>
            ))}
        </ol>
      </div>
    </div>
  );
}
