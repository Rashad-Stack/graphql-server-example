import JWT from "jsonwebtoken";
import { createHmac, randomBytes } from "node:crypto";
import prisma from "../lib/db";

const JWT_SECRET = "1enfBrFhSQ2J8DtFKURZL0j4GkHscBk+RdVeJWbXeVQ=";

export interface CreateUserPayload {
  user: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
  };
}

export interface GetUserTokenPayload {
  user: {
    email: string;
    password: string;
  };
}

class UserService {
  private static generateHashedPassword(password: string, salt: string) {
    return createHmac("sha256", salt).update(password).digest("hex");
  }

  private static generateJWTToken(userId: string, userEmail: string) {
    return JWT.sign({ id: userId, email: userEmail }, JWT_SECRET as string, {
      expiresIn: "1d",
    });
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET as string);
  }

  public static async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  public static async createUser({ user }: CreateUserPayload) {
    const { password } = user;
    const salt = randomBytes(32).toString("hex");
    const hashedPassword = this.generateHashedPassword(password, salt);

    return prisma.user.create({
      data: {
        ...user,
        salt,
        password: hashedPassword,
      },
    });
  }

  private static async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  public static async getUserToken({ user }: GetUserTokenPayload) {
    const { email, password } = user;
    const userRecord = await this.getUserByEmail(email);

    if (!userRecord) {
      throw new Error("User not found");
    }

    const { salt } = userRecord;
    const hashedPassword = this.generateHashedPassword(password, salt);

    if (hashedPassword !== userRecord.password) {
      throw new Error("Invalid password");
    }

    // Send token
    const token = this.generateJWTToken(userRecord.id, userRecord.email);

    return token;
  }
}
export default UserService;
