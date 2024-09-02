import { Handler } from "express";
import { ApiError, APIErrorStatus } from "../lib/utils";
import { findUser } from "../services";

// api/* routes
export const userExistsAuthHandler: Handler = async (req, res, next) => {
  const userId = Number(req.params.userId);
  if (isNaN(userId)) {
    throw new ApiError(APIErrorStatus.BadRequest, "Bad request");
  }

  // NOTE: Ideally this would be done via Auth but for current scope, userId is expected in request.body
  const user = await findUser(userId);
  if (!user) {
    throw new ApiError(APIErrorStatus.UnAuthorized, "User Not found");
  }
  next();
};
