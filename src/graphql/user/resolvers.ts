const queries = {};

const mutations = {
  createUser: async (_: any, { user }: any) => {
    const { firstName, lastName, email, password } = user;
    return "User created";
  },
};

export const resolvers = { queries, mutations };
