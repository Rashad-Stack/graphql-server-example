import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import morgan from "morgan";
import createApolloGraphqlServer from "./graphql";

const app = express();

(async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const server = await createApolloGraphqlServer();

    // middlewares
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(
      "/graphql",
      expressMiddleware(server, {
        // context: async ({ req }) => {
        //   const token = req.headers.authorization || "";
        //   try {
        //     const user = UserService.decodeJWTToken(token);
        //     return { user };
        //   } catch (error) {
        //     return {};
        //   }
        // },
      }),
    );

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(PORT, () => {
      console.log(`👍 Server running on port ${PORT}`);
    });
  } catch (error) {
    app.use(morgan("dev"));
    console.error(`😡 ${error}`);
  }
})();
