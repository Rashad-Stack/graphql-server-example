import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

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
      `,
      resolvers: {
        Query: {
          hello: () => "Hello World!",
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
