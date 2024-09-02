import { Handler } from "express";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { createTask, findTask } from "../services";
import { CreateTaskRequestSchema } from "../lib/types";

// POST /api/tasks
export const createTaskHandler: Handler = async (req, res) => {
  const parsed = CreateTaskRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }

  // TODO: verify User Exists

  const created = await createTask(parsed.data);
  return RestHelper.json(res, created);
};

// GET /api/tasks/:taskId
export const getTaskHandler: Handler = async (req, res) => {
  // TODO: verify User Exists

  const taskId = Number(req.params.taskId);
  const task = await findTask(taskId);

  if (!task) {
    throw new ApiError(APIErrorStatus.NotFound, "Task not found");
  }
  return RestHelper.json(res, task);
};
