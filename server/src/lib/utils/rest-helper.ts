import { Response } from "express";

export const RestHelper = {
  json(res: Response, object: unknown | null) {
    if (object) {
      res.json(object);
    }
  },
  noContent(res: Response) {
    res.sendStatus(204);
  },
  ok(res: Response) {
    res.sendStatus(200);
  },
  created(res: Response) {
    res.sendStatus(201);
  },
  accepted(res: Response) {
    res.sendStatus(202);
  },
  notFound(res: Response) {
    res.sendStatus(404);
  },
};
