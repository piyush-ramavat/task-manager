import { Handler } from "express";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { createUser, findAllUsers } from "../services";
import { CreateUserRequestSchema } from "../lib/types";

// POST /admin/users
export const createUserHandler: Handler = async (req, res) => {
  const parsed = CreateUserRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }

  const created = await createUser(parsed.data);
  return RestHelper.json(res, created);
};

// GET /admin/users
export const findAllUsersHandler: Handler = async (req, res) => {
  const users = await findAllUsers();
  return RestHelper.json(res, users);
};
