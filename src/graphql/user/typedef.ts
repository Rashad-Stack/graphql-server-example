export const typeDefs = `#graphql

    type User{
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        createdAt: String!
        updatedAt: String!
        profileImageUrl: String
    }

   type Query {
        getUserToken(user:GetUserTokenInput): String
        getCurrentLoggedInUser: User
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
