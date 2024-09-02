import { Handler } from "express";
import { ApiError, APIErrorStatus } from "../lib/utils";

// admin/* routes
export const adminAuthHandler: Handler = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader !== `bearer ${process.env.ADMIN_SECRET}`) {
    throw new ApiError(APIErrorStatus.UnAuthorized, "Unauthorized");
  }
  next();
};
