export interface Recipe {
  id: number | string;
  name: string;
  image?: string;
  servingSize?: number;
}

export interface RecipeInstruction {
  instructionStep: number;
  instruction: string;
}

export interface RecipeIngredient {
  quantity: number;
  measurement: {
    unit: string;
  };
  ingredient: {
    name: string;
  };
}

export interface FullRecipe extends Recipe {
  recipeIngredients: RecipeIngredient[];
  RecipeInstructions: RecipeInstruction[];
  total_price?: number;
  cooking_tips?: string[];
  cookware?: string[];
}

export interface RecipePreview extends Recipe {
  isFavorited?: boolean;
}
