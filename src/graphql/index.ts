import { ApolloServer } from "@apollo/server";
import User from "./user";

export default async function createApolloGraphqlServer() {
  // create a new apollo server instance
  const server = new ApolloServer({
    typeDefs: [User.typeDefs],
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await server.start();
  return server;
}
