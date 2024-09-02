import { Handler } from "express";
import { ApiError, APIErrorStatus, RestHelper } from "../lib/utils";
import { createUser, findAllUsers, findUserByEmail } from "../services";
import { CreateUserRequestSchema, FindByEmailRequestSchema } from "../lib/types";

// POST /user/auth-by-email
export const authByEmailOnlyHandler: Handler = async (req, res) => {
  const parsed = FindByEmailRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad Request", parsed.error);
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    throw new ApiError(APIErrorStatus.UnAuthorized, "Unauthorized");
  }
  return RestHelper.json(res, user);
};

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
