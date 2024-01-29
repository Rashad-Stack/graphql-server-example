import { movies, users } from "../../lib/_db";

const queries = {
  users: () => {
    const usersWithFriends = users.map((user) => {
      const friends = user.friends.map((friendId) => {
        return users.find((user) => String(user.id) === String(friendId));
      });
      return { ...user, friends };
    });
    return usersWithFriends;
  },

  user: (_: any, args: any) => {
    const { id } = args;
    const user = users.find((user) => String(user.id) === String(id));

    if (!user) {
      throw new Error(`No user with id: ${id}`);
    }
    const friends = user.friends.map((friendId) => {
      return users.find((user) => String(user.id) === String(friendId));
    });

    return { ...user, friends };
  },

  movies: () => movies,
  movie: (_: any, { name }: { name: string }) =>
    movies.find((movie) =>
      movie.name.toLowerCase().includes(name.toLowerCase()),
    ),
};

const mutations = {};

const User = {
  favoriteMovies: () =>
    movies.filter(
      (movie) =>
        movie.yearOfPublication >= 2010 && movie.yearOfPublication <= 2012,
    ),
};

const resolvers = {
  Query: queries,
  // Mutation: mutations,
  User,
};

export default resolvers;
