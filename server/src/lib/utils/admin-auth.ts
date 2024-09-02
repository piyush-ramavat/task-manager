import { RequestHandler } from "express";

export const withErrorHandler = (handler: RequestHandler): RequestHandler => {
    return async (request, response, next) => {
      try {
        return await handler(request, response, next);
      } catch (error) {
        next(error);
      }
    };
  };