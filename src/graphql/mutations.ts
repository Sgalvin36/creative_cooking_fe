export const REGISTER_USER = `
  mutation RegisterUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    registerUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      token
      user {
        id
        firstName
        lastName
        email
        slug
      }
    errors
    }
  }
`;
