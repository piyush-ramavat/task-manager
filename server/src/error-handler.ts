import { ErrorRequestHandler } from "express";

export const APIErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Delegate to default express error handler if headers already sent
  if (res.headersSent) return next(err);

  console.error("Error", process.env.NODE_ENV === "development" ? err : err.message);

  res.status(err.status || 500).send(err.message || "Unknown Error");
};
