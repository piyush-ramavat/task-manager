import { Handler } from "express";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { createTask, findAllTasksForUser, findAllUsers, findTask, findUser } from "../services";
import { CreateTaskRequestSchema } from "../lib/types";

// POST /api/tasks
export const createTaskHandler: Handler = async (req, res) => {
  const parsed = CreateTaskRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }

  // NOTE: Ideally this would be done via Auth but for current scope, userId is expected in request.body
  const user = await findUser(parsed.data.userId);
  if (!user) {
    throw new ApiError(APIErrorStatus.BadRequest, "User Not found");
  }

  const created = await createTask(parsed.data);
  return RestHelper.json(res, created);
};

// GET /api/tasks/all/:userId
export const getAllTasksHandler: Handler = async (req, res) => {
  const userId = Number(req.params.userId);

  // NOTE: Ideally this would be done via Auth but for current scope, userId is expected in request.body
  const user = await findUser(userId);
  if (!user) {
    throw new ApiError(APIErrorStatus.BadRequest, "User Not found");
  }
  const tasks = await findAllTasksForUser(userId);

  return RestHelper.json(res, tasks || []);
};

// GET /api/tasks/:taskId
export const getTaskHandler: Handler = async (req, res) => {
  const taskId = Number(req.params.taskId);
  const task = await findTask(taskId);

  if (!task) {
    throw new ApiError(APIErrorStatus.NotFound, "Task not found");
  }
  return RestHelper.json(res, task);
};
