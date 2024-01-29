import { ApolloServer } from "@apollo/server";
import resolvers from "./schema/resolvers";
import { typeDefs } from "./schema/typeDefs";

export default async function createApolloGraphqlServer() {
  // create a new apollo server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  return server;
}
