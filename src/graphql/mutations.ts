export const REGISTER_USER = `
mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    token
    user {
      id
      firstName
      lastName
      userName
      slug
    }
    errors
  }
}
`;
