export const typeDefs = `#graphql
type Post {
  id: ID!
  title: String!
  description: String!
  createdAt: String!
  updatedAt: String!
  userId: String!
  user: User!
}

type Query {
  getAllPosts(userId:ID!): [Post]
}

input CreatePostInput {
  title: String!
  description: String!
  userId: String!
}

type Mutation {
  createNewPost(post: CreatePostInput!): Post
  deletePost(id: String!): Post
}
`;
