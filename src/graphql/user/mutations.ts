export const mutations = `#graphql
input CreateUserInput {
  firstName: String!
  lastName: String!
  email: String!
  password: String!
}
createUser(user: CreateUserInput!): String
`;
