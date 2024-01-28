import UserService, {
  CreateUserPayload,
  GetUserTokenPayload,
} from "../../services/user";

const queries = {
  getUserToken: async (_: any, { user }: GetUserTokenPayload) => {
    const token = await UserService.getUserToken({ user });
    return token;
  },
};

const mutations = {
  createUser: async (_: any, { user }: CreateUserPayload) => {
    const newUser = await UserService.createUser({ user });
    return newUser.id;
  },
};

export const resolvers = { queries, mutations };
