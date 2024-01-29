import prisma from "../lib/db";

export interface CreatePostPayload {
  title: string;
  description: string;
  userId: string;
}

class PostService {
  public static async getPosts(userId: string) {
    console.log(userId);
    const posts = await prisma.post.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
    return posts;
  }

  public static async createPost({ post }: { post: CreatePostPayload }) {
    const newPost = await prisma.post.create({
      data: {
        title: post.title,
        description: post.description,
        user: {
          connect: {
            id: post.userId,
          },
        },
      },
    });
    return newPost;
  }
}

export default PostService;
