import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import prisma from "./lib/db";

(async () => {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;

    // middlewares
    app.use(express.json());
    // app.use(morgan("dev"));

    // create a new apollo server instance
    const server = new ApolloServer({
      typeDefs: `#graphql
      type Query {
        hello: String!
      }
      type Mutation {
        createUser(user:CreateUserInput): Boolean
      }
      input CreateUserInput {
        firstName: String!
        lastName: String!
        email: String!
        password: String!
      }
      `,
      resolvers: {
        Query: {
          hello: () => "Hello World!",
        },
        Mutation: {
          createUser: async (_, { user }) => {
            await prisma.user.create({
              data: { ...user, salt: "123" },
            });
            return true;
          },
        },
      },
    });
    await server.start();

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.use("/graphql", expressMiddleware(server));

    app.listen(PORT, () => {
      console.log(`👍 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`😡 Error: ${error}`);
  }
})();
