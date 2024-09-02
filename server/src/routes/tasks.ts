import { Handler } from "express";
import { APIErrorStatus, RestHelper } from "../lib/utils";
import { createTask } from "../services";
import { CreateTaskRequestSchema } from "../lib/types";
import { ApiError } from "../lib/utils/api-error";

// POST /api/task
export const createTaskHandler: Handler = async (req, res) => {
  const parsed = CreateTaskRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }
  const created = await createTask(parsed.data);
  return RestHelper.json(res, created);
};

// GET /api/task
export const getTaskHandler: Handler = (req, res) => {
  RestHelper.json(res, {
    name: "todo",
  });
};
