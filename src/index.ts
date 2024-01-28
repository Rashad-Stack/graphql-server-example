import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import createApolloGraphqlServer from "./graphql";

(async () => {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;
    const server = await createApolloGraphqlServer();

    // middlewares
    app.use(express.json());
    app.use("/graphql", expressMiddleware(server));

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`👍 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(`😡 Error: ${error}`);
  }
})();
