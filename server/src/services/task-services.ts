import { dbService } from "../lib/db-service";
import { CreateTaskRequest } from "../lib/types";

export const createTask = async (taskDetails: CreateTaskRequest) => {
  const db = dbService();

  return await db.task.create({
    data: {
      ...taskDetails,
    },
  });
};

export const findAllTasksForUser = async (userId: number) => {
  const db = dbService();

  return await db.task.findMany({
    where: {
      userId,
    },
  });
};

export const findTask = async (taskId: number) => {
  const db = dbService();

  return await db.task.findFirst({
    where: {
      id: taskId,
    },
  });
};
