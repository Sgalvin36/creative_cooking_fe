export interface Recipe {
    id: number;
    name: string;
    image_url?: string;
}

export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface FullRecipe extends Recipe {
    ingredients: Ingredient[];
    instructions: string[];
    serving_size: number;
    total_price: number;
    cooking_tips?: string[];
    cookware?: string[];
}

export interface RecipePreview extends Recipe {
    isFavorited?: boolean;
}