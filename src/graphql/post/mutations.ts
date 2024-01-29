export const mutations = `#graphql
input CreatePostInput {
  title: String!
  description: String!
  userId: String!
}

createNewPost(post: CreatePostInput!): Post
`;
