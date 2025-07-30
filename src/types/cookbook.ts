import { Recipe } from "./recipe";

export interface CookbookUser {
  id: number | string;
}

export interface Cookbook {
  id: number | string;
  cookbookName: string;
  public: boolean;
  user: CookbookUser;
}

export interface CookbookRecipe extends Cookbook {
  canEdit: boolean;
  recipes: Recipe[];
}

export interface GetCookbookRecipesResponse {
  cookbookRecipes: CookbookRecipe;
}

export interface GetPublicCookbooksResponse {
  publicCookbooks: Cookbook[];
}

export interface GetUserCookbooksResponse {
  userCookbooks: Cookbook[];
}
