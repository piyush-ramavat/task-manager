import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { createTaskHandler, getAllTasksHandler, getTaskHandler } from "./tasks";
import { RestHelper, withErrorHandler } from "../lib/utils";
import { createUserHandler, findAllUsersHandler } from "./user";
import { adminAuthHandler } from "./admin-auth";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes
apiRouter.post("/api/tasks", withErrorHandler(createTaskHandler));
apiRouter.get("/api/tasks/all/:userId", withErrorHandler(getAllTasksHandler));
apiRouter.get("/api/tasks/:taskId", withErrorHandler(getTaskHandler));

// Admin routes
apiRouter.post("/admin/users", withErrorHandler(adminAuthHandler), withErrorHandler(createUserHandler));
apiRouter.get("/admin/users", withErrorHandler(adminAuthHandler), withErrorHandler(findAllUsersHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
