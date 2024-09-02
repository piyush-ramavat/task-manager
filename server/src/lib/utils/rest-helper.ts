import { Response } from "express";

export enum APIErrorStatus {
  NoContent = 204,
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NotFound = 404,
  BadRequest = 400,
  UnAuthorized = 401,
}

export const RestHelper = {
  json(res: Response, object: unknown | null) {
    if (object) {
      res.json(object);
    }
  },
  noContent(res: Response) {
    res.sendStatus(APIErrorStatus.NoContent);
  },
  ok(res: Response) {
    res.sendStatus(APIErrorStatus.Ok);
  },
  created(res: Response) {
    res.sendStatus(APIErrorStatus.Created);
  },
  accepted(res: Response) {
    res.sendStatus(APIErrorStatus.Accepted);
  },
  notFound(res: Response) {
    res.sendStatus(APIErrorStatus.NotFound);
  },
  badRequest(res: Response) {
    res.sendStatus(APIErrorStatus.BadRequest);
  },
};
