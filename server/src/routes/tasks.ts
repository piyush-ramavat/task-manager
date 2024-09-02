import { Handler } from "express";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { createTask, findAllTasksForUser, findTask, findUser, updateTask } from "../services";
import { CreateTaskRequestSchema, UpdateTaskRequest, UpdateTaskRequestSchema } from "../lib/types";

// POST /api/:userId/tasks
export const createTaskHandler: Handler = async (req, res) => {
  const userId = Number(req.params.userId);
  const parsed = CreateTaskRequestSchema.safeParse({ ...req.body, userId });
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

// GET /api/:userId/tasks/list
export const getTaskListHandler: Handler = async (req, res) => {
  const userId = Number(req.params.userId);

  // NOTE: Ideally this would be done via Auth but for current scope, userId is expected in request.body
  const user = await findUser(userId);
  if (!user) {
    throw new ApiError(APIErrorStatus.BadRequest, "User Not found");
  }
  const tasks = await findAllTasksForUser(userId);

  return RestHelper.json(res, tasks || []);
};

// GET /api/:userId/tasks/:taskId
export const getTaskHandler: Handler = async (req, res) => {
  const userId = Number(req.params.userId);
  const taskId = Number(req.params.taskId);

  // userId is already checked in user-exists-auth
  if (isNaN(taskId)) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad request");
  }
  const task = await findTask(taskId, userId);

  if (!task) {
    throw new ApiError(APIErrorStatus.NotFound, "Task not found");
  }
  return RestHelper.json(res, task);
};

// PUT /api/:userId/tasks
export const updateTaskHandler: Handler = async (req, res) => {
  const userId = Number(req.params.userId);

  const parsed = UpdateTaskRequestSchema.safeParse({ ...req.body, userId, updatedAt: new Date() } as UpdateTaskRequest);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const updated = await updateTask(parsed.data);
  return RestHelper.json(res, updated);
};
