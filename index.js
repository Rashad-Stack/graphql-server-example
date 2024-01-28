"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const _db_1 = __importDefault(require("./_db"));
const schema_1 = require("./schema");
const resolvers = {
    Query: {
        games: () => _db_1.default.games,
        game: (_, args) => _db_1.default.games.find((game) => game.id === args.id),
        authors: () => _db_1.default.authors,
        author: (_, args) => _db_1.default.authors.find((author) => author.id === args.id),
        reviews: () => _db_1.default.reviews,
        review: (_, args) => _db_1.default.reviews.find((review) => review.id === args.id),
    },
    Game: {
        reviews: (parent) => _db_1.default.reviews.filter((review) => review.game_id === parent.id),
    },
    Author: {
        reviews: (parent) => _db_1.default.reviews.filter((review) => review.author_id === parent.id),
    },
    Review: {
        author: (parent) => _db_1.default.authors.find((author) => author.id === parent.author_id),
    },
    Mutation: {
        deleteGame: (_, args) => {
            _db_1.default.games = _db_1.default.games.filter((game) => game.id !== args.id);
            return _db_1.default.games;
        },
        addNewGame: (_, args) => {
            const newGame = Object.assign(Object.assign({}, args.game), { id: String(_db_1.default.games.length + 1) });
            _db_1.default.games.push(newGame);
            return newGame;
        },
        updateGame: (_, args) => {
            const game = _db_1.default.games.find((game) => game.id === args.id);
            if (!game)
                throw new Error("Game not found");
            game.title = args.game.title || game.title;
            game.platform = args.game.platform || game.platform;
            return game;
        },
    },
};
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}))();
