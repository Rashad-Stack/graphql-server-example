import PostService, { CreatePostPayload } from "../../services/post";

const queries = {
  getAllPosts: async (userId: string) => {
    const posts = await PostService.getPosts(userId);
    return posts;
  },
};

const mutations = {
  createNewPost: async (_: any, { post }: { post: CreatePostPayload }) => {
    const newPost = await PostService.createPost({ post });
    return newPost;
  },
};

export const resolvers = {
  queries,
  mutations,
};
