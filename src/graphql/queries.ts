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

export const GET_PUBLIC_COOKBOOKS = `
  query GetPublicCookbooks {
    publicCookbooks {
      id
      cookbookName
      public
      user {
        id
      }
    }
  }
`;

export const GET_USER_COOKBOOKS = `
  query GetUserCookbooks {
    userCookbooks {
      id
      cookbookName
      public
      user {
        id
      }
    }
  }
`;

export const GET_COOKBOOK_RECIPES = `
  query GetCookbookRecipes($id: ID!) { 
    cookbookRecipes (id: $id) {
      id
      cookbookName
      public
      canEdit
      user {
        id
      }
      recipes {
        id
        name
        image
      }
    }
  }
`;
