import * as mutations from "@/graphql/mutations";
// import * as queries from "@/graphql/queries";

describe("GraphQL API", () => {
  // const email = "SRoger@example.com";
  // const firstName = "Steve";
  // const lastName = "Rogers";
  // const password = "SteveRogers123!";

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
});
