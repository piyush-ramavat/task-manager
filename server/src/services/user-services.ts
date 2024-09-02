import { dbService } from "../lib/db-service";
import { CreateUserRequest } from "../lib/types";

export const createUser = async (userDetails: CreateUserRequest) => {
  const db = dbService();

  return await db.user.create({
    data: {
      ...userDetails,
    },
  });
};

export const findUser = async (userId: number) => {
  const db = dbService();

  return await db.user.findFirst({
    where: {
      id: userId,
    },
  });
};

export const findAllUsers = async () => {
  const db = dbService();

  return await db.user.findMany({});
};
