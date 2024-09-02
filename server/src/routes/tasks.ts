import { Handler } from "express";
import { APIErrorStatus, RestHelper } from "../lib/utils";
import { createTask } from "../services";
import { CreateTaskRequestSchema } from "../lib/types";
import { ApiError } from "../lib/utils/api-error";

// POST /api/task
export const createTaskHandler: Handler = async (req, res) => {
  let createTaskDetails;
  try {
    createTaskDetails = JSON.parse(req.body);
  } catch (e) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request");
  }

  const parsed = CreateTaskRequestSchema.safeParse(createTaskDetails);
  if (!parsed.success) {
    console.error("Zod Parse error", parsed.error);
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request");
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
