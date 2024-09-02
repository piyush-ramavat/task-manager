import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { createTaskHandler, getTaskHandler } from "./tasks";
import { RestHelper } from "../lib/utils";
import { withErrorHandler } from "../error-handler";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes
apiRouter.post("/api/tasks", withErrorHandler(createTaskHandler));
apiRouter.get("/api/tasks", withErrorHandler(getTaskHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
