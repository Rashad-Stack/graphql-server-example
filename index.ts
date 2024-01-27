import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./_db";
import { typeDefs } from "./schema";

const resolvers = {
  Query: {
    games: () => db.games,
    game: (_: any, args: { id: string }) =>
      db.games.find((game) => game.id === args.id),

    authors: () => db.authors,
    author: (_: any, args: { id: string }) =>
      db.authors.find((author) => author.id === args.id),

    reviews: () => db.reviews,
    review: (_: any, args: { id: string }) =>
      db.reviews.find((review) => review.id === args.id),
  },

  Game: {
    reviews: (parent: { id: string }) =>
      db.reviews.filter((review) => review.game_id === parent.id),
  },

  Author: {
    reviews: (parent: { id: string }) =>
      db.reviews.filter((review) => review.author_id === parent.id),
  },

  Review: {
    author: (parent: { author_id: string }) =>
      db.authors.find((author) => author.id === parent.author_id),
  },

  Mutation: {
    deleteGame: (_: any, args: { id: string }) => {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },

    addNewGame: (
      _: any,
      args: { game: { title: string; platform: string[] } }
    ) => {
      const newGame = {
        ...args.game,
        id: String(db.games.length + 1),
      };
      db.games.push(newGame);
      return newGame;
    },

    updateGame: (
      _: any,
      args: { id: string; game: { title?: string; platform?: string[] } }
    ) => {
      const game = db.games.find((game) => game.id === args.id);
      if (!game) throw new Error("Game not found");
      game.title = args.game.title || game.title;
      game.platform = args.game.platform || game.platform;
      return game;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
