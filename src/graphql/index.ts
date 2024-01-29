import { ApolloServer } from "@apollo/server";
import { Post } from "./post";
import User from "./user";

export default async function createApolloGraphqlServer() {
  // create a new apollo server instance
  const server = new ApolloServer({
    typeDefs: [User.typeDefs, Post.typeDefs],
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Post.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
        ...Post.resolvers.mutations,
      },
    },
  });
  await server.start();
  return server;
}
