import { Router } from "express";
import { healthCheckHandler } from "./health-check";
import { createTaskHandler, getAllTasksHandler, getTaskHandler, updateTaskHandler } from "./tasks";
import { RestHelper, withErrorHandler } from "../lib/utils";
import { createUserHandler, findAllUsersHandler } from "./user";
import { adminAuthHandler } from "./admin-auth";
import { userExistsAuthHandler } from "./user-exists-auth";

const apiRouter = Router();

// Public routes
apiRouter.get("/health-check", healthCheckHandler);

// API routes
apiRouter.post("/api/:userId/tasks", withErrorHandler(userExistsAuthHandler), withErrorHandler(createTaskHandler));
apiRouter.get("/api/:userId/tasks/all", withErrorHandler(userExistsAuthHandler), withErrorHandler(getAllTasksHandler));
apiRouter.get("/api/:userId/tasks/:taskId", withErrorHandler(userExistsAuthHandler), withErrorHandler(getTaskHandler));
apiRouter.put("/api/:userId/tasks", withErrorHandler(userExistsAuthHandler), withErrorHandler(updateTaskHandler));

// Admin routes
apiRouter.post("/admin/users", withErrorHandler(adminAuthHandler), withErrorHandler(createUserHandler));
apiRouter.get("/admin/users", withErrorHandler(adminAuthHandler), withErrorHandler(findAllUsersHandler));

// Unknown
apiRouter.use((req, res) => {
  return RestHelper.notFound(res);
});

export default apiRouter;
