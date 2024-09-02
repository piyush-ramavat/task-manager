import { dbService } from "../lib/db-service";
import { CreateTaskRequest, CreateTaskRequestSchema } from "../lib/types";

export const createTask = (taskDetails: CreateTaskRequest) => {
  const parsed = CreateTaskRequestSchema.safeParse(taskDetails);
  if (!parsed.success) {
    throw parsed.error;
  }

  const db = dbService();

  return db.task.create({
    data: {
      ...taskDetails,
    },
  });
};
