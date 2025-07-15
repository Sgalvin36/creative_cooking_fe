export const GET_PERSONAL_COOKBOOK = `
query GetPersonalCookbook {
  personalCookbook {
    id
    name
    image
    servingSize
  }
}
`;

export const GET_RECIPE = `
  query GetRecipe($id: ID!) {
    oneRecipe(id: $id) {
      id
      name
      image
      servingSize
      recipeInstructions {
        instructionStep
        instruction
      }
      recipeIngredients {
        quantity
        measurement {
          unit
        }
        ingredient {
          name
        }
      }
    }
  }
`;

export const GET_RANDOM_RECIPES = `
  query GetRandomRecipes($count: Int) {
    randomRecipes(count: $count) {
      id
      name
      image
      servingSize
    }
  }
`;

export const GET_ALL_RECIPES = `
  query GetAllRecipes($search: String, $limit: Int, $offset: Int) {
    allRecipes(search: $search, limit: $limit, offset: $offset) {
      id
      name
      image
      servingSize
    }
  }
`;
