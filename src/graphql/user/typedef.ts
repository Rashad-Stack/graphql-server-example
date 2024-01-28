export const typeDefs = `#graphql
   type Query {
        getUserToken(user:GetUserTokenInput): String
    }

    type Mutation {
        createUser(user: CreateUserInput!): String
    }

   input CreateUserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
    }
    input GetUserTokenInput {
        email: String!
        password: String!
    }
`;
