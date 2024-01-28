import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, { user }: GetUserTokenPayload) => {
    const token = await UserService.getUserToken({ user });
    return token;
  },

  getCurrentLoggedInUser: async (_: any, __: any, context: any) => {
    if (context && context.user) {
      const id = context.user.id;
      const user = await UserService.getUserById(id);
      return user;
    }
    throw new Error("User not found");
  },
};

const mutations = {
  createUser: async (_: any, { user }: CreateUserPayload) => {
    const newUser = await UserService.createUser({ user });
    return newUser.id;
  },
};

export const resolvers = { queries, mutations };
