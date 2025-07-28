import * as queries from "../../src/graphql/queries";
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add(
  "graphql",
  (query, variables = {}, operationName = null) => {
    return cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/api/v1/graphql`,
      body: {
        query,
        variables,
        operationName,
      },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }
);

Cypress.Commands.add("getFirstRandomRecipeId", () => {
  return cy
    .graphql(queries.GET_RANDOM_RECIPES, { count: 1 }, "GetRandomRecipes")
    .then((res) => res.body.data.randomRecipes[0].id);
});

Cypress.Commands.add("login", (email: string, password: string) => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/api/v1/login`,
      body: { email, password },
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Important: includes and sets the session cookie
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("user");
      expect(response.body.user).to.have.property("id");
      return response.body.user;
    });
});

Cypress.Commands.add("logout", () => {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.env("apiUrl")}/api/v1/logout`,
    withCredentials: true,
  });
});
