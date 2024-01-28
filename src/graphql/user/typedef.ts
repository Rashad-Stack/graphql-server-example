export const typeDefs = `#graphql
   type Query {
        hello: String
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

`;
