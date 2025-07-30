export function validateRecipe(recipe: any) {
  expect(recipe).to.include.all.keys("id", "name", "image", "servingSize");
  expect(recipe.id).to.be.a("string");
  expect(recipe.name).to.be.a("string");
  expect(recipe.image).to.be.a("string");
  expect(recipe.servingSize).to.be.a("number");
}

export function validateRecipeDetails(recipe: any) {
  expect(recipe).to.include.all.keys(
    "id",
    "name",
    "image",
    "servingSize",
    "recipeInstructions",
    "recipeIngredients"
  );

  expect(recipe.id).to.be.a("string");
  expect(recipe.name).to.be.a("string");
  expect(recipe.image).to.be.a("string");
  expect(recipe.servingSize).to.be.a("number");

  // Instructions
  expect(recipe.recipeInstructions).to.be.an("array");
  recipe.recipeInstructions.forEach((instruction: any) => {
    expect(instruction).to.have.all.keys("instructionStep", "instruction");
    expect(instruction.instructionStep).to.be.a("number");
    expect(instruction.instruction).to.be.a("string");
  });

  // Ingredients
  expect(recipe.recipeIngredients).to.be.an("array");
  recipe.recipeIngredients.forEach((entry: any) => {
    expect(entry).to.have.property("quantity").that.is.a("number");

    expect(entry).to.have.property("measurement").that.is.an("object");
    expect(entry.measurement).to.have.property("unit").that.is.a("string");

    expect(entry).to.have.property("ingredient").that.is.an("object");
    expect(entry.ingredient).to.have.property("name").that.is.a("string");
  });
}

export function validateCookbook(cookbook: any) {
  expect(cookbook).to.have.all.keys("id", "cookbookName", "public", "user");
  expect(cookbook.id).to.be.a("string");
  expect(cookbook.cookbookName).to.be.a("string");
  expect(cookbook.user).to.have.property("id").that.is.a("string");
}
