import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { RestHelper } from "../lib/utils";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
