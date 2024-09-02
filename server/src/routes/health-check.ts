import { Handler } from "express";
import { RestHelper } from "../lib/utils";

// health-check
export const healthCheckHandler: Handler = (req, res) => {
  RestHelper.ok(res);
};
