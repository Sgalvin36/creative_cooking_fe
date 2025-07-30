describe("Authentication API", () => {
  const email = "SRoger@example.com";
  const firstName = "Steve";
  const lastName = "Rogers";
  const password = "SteveRogers123!";

  it("logs in user and receives user data and cookie", () => {
    cy.login(email, password).then((response) => {
      expect(response.headers).to.have.property("set-cookie");
    });
  });

  it("fetches the current user after login", () => {
    cy.login(email, password).then(() => {
      cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/api/v1/me`,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("user");
        expect(response.body.user.first_name).to.eq(firstName);
        expect(response.body.user.last_name).to.eq(lastName);
      });
    });
  });

  it("logs out the user and prevents fetching /me afterward", () => {
    cy.login(email, password).then(() => {
      cy.logout().then((logoutResponse) => {
        expect(logoutResponse.status).to.eq(204);

        cy.request({
          method: "GET",
          url: `${Cypress.env("apiUrl")}/api/v1/me`,
          withCredentials: true,
          failOnStatusCode: false,
        }).then((meResponse) => {
          expect(meResponse.status).to.be.oneOf([401, 403]);
        });
      });
    });
  });
});
