import * as mutations from "../../src/graphql/mutations";
import * as queries from "../../src/graphql/queries";
import * as validators from "../support/validators";

describe("GraphQL API", () => {
  const email = "SRoger@example.com";
  // const firstName = "Steve";
  // const lastName = "Rogers";
  const password = "SteveRogers123!";

  it("registers a user", () => {
    const randomFirstName = `First_${Date.now()}`;
    const randomLastName = `Last_${Date.now()}`;
    const randomEmail = `user_${Date.now()}@example.com`;

    cy.graphql(
      mutations.REGISTER_USER,
      {
        firstName: randomFirstName,
        lastName: randomLastName,
        email: randomEmail,
        password: "IronManRocks123!",
      },
      "RegisterUser"
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.registerUser.user.firstName).to.eq(
        randomFirstName
      );
      expect(response.body.data.registerUser.user.lastName).to.eq(
        randomLastName
      );
      expect(response.body.data.registerUser.user.email).to.eq(randomEmail);
    });
  });

  it("gets default random recipes", () => {
    cy.graphql(queries.GET_RANDOM_RECIPES, {}, "GetRandomRecipes").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property("randomRecipes");
        expect(response.body.data.randomRecipes).to.be.an("array");
        expect(response.body.data.randomRecipes.length).to.be.at.most(5);

        response.body.data.randomRecipes.forEach((recipe: any) => {
          validators.validateRecipe(recipe);
        });
      }
    );
  });

  it("gets set number of random recipes", () => {
    const count = 9;

    cy.graphql(queries.GET_RANDOM_RECIPES, { count }, "GetRandomRecipes").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property("randomRecipes");
        expect(response.body.data.randomRecipes).to.be.an("array");
        expect(response.body.data.randomRecipes).to.have.lengthOf(9);

        response.body.data.randomRecipes.forEach((recipe: any) => {
          validators.validateRecipe(recipe);
        });
      }
    );
  });

  it("return default number of random recipes if count is < 0", () => {
    const count = -10;

    cy.graphql(queries.GET_RANDOM_RECIPES, { count }, "GetRandomRecipes").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.property("randomRecipes");
        expect(response.body.data.randomRecipes).to.be.an("array");
        expect(response.body.data.randomRecipes).to.have.lengthOf(5);

        response.body.data.randomRecipes.forEach((recipe: any) => {
          validators.validateRecipe(recipe);
        });
      }
    );
  });

  it("fetches a detailed recipe by ID", () => {
    cy.getFirstRandomRecipeId().then((id) => {
      cy.graphql(queries.GET_RECIPE, { id }, "GetRecipe").then((response) => {
        expect(response.body.data.oneRecipe.id).to.eq(id);
        const recipe = response.body.data.oneRecipe;
        validators.validateRecipeDetails(recipe);
      });
    });
  });

  it("gets a list of public cookbooks for guests", () => {
    cy.graphql(queries.GET_PUBLIC_COOKBOOKS, {}, "GetPublicCookbooks").then(
      (response) => {
        expect(response.status).to.eq(200);
        const cookbooks = response.body.data.publicCookbooks;

        expect(cookbooks).to.be.an("array");

        cookbooks.forEach((cookbook: any) => {
          validators.validateCookbook(cookbook);
          expect(cookbook.public).to.be.true;
        });
      }
    );
  });

  it("gets a list of public cookbooks and user cookbooks for logged in user", () => {
    cy.login(email, password).then((user) => {
      const currentUserId = user.id;
      cy.graphql(queries.GET_PUBLIC_COOKBOOKS, {}, "GetPublicCookbooks").then(
        (response) => {
          expect(response.status).to.eq(200);
          const cookbooks = response.body.data.publicCookbooks;

          expect(cookbooks).to.be.an("array");

          cookbooks.forEach((cookbook: any) => {
            validators.validateCookbook(cookbook);
            if (cookbook.user.id === currentUserId) {
              expect(cookbook.public).to.be.oneOf([true, false]);
            } else {
              expect(cookbook.public).to.be.true;
            }
          });
        }
      );
    });
  });

  it("gets a lits of user owned cookbooks", () => {
    cy.login(email, password).then((user) => {
      const currentUserId = String(user.id);
      cy.graphql(queries.GET_USER_COOKBOOKS, {}, "GetUserCookbooks").then(
        (response) => {
          expect(response.status).to.eq(200);
          const cookbooks = response.body.data.userCookbooks;

          expect(cookbooks).to.be.an("array");

          cookbooks.forEach((cookbook: any) => {
            validators.validateCookbook(cookbook);
            expect(cookbook.user.id).to.eq(currentUserId);
            expect(cookbook.public).to.be.oneOf([true, false]);
          });
        }
      );
    });
  });
});
