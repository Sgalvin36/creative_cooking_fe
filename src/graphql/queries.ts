export const GET_RECIPES = `
  query GetRecipes($cookbook: Boolean) {
    recipes(cookbook: $cookbook) {
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
