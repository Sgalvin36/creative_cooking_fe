declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<Response>;
    logout(): Chainable<Response>;
    graphql(
      query: string,
      variables?: Record<string, unknown>,
      operationName?: string | null
    ): Chainable<Response>;
    getFirstRandomRecipeId(): Chainable<Response>;
  }
}
