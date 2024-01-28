"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
type Game {
  id: ID!
  title: String!
  platform:[String!]!
  reviews: [Review!]
}
type Review {
  id: ID!
  rating: Int!
  content: String!
  game: Game!
  author: Author!
}
type Author {
  id: ID!
  name: String!
  verified: Boolean!
  reviews: [Review!]
}
type Query {
  reviews: [Review]
  review(id: ID!): Review

  games: [Game]
  game(id: ID!): Game

  authors: [Author]
  author(id: ID!): Author
}
type Mutation {
  deleteGame(id:ID!):[Game]

  addNewGame(game:GameInput):Game
  updateGame(id:ID!, game:updateInput):Game
}
input GameInput {
  title: String!
  platform: [String!]!
}

input updateInput{
  title: String
  platform: [String!]
}

`;
