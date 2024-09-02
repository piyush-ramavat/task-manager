import { PrismaClient } from "@prisma/client";

class DBService extends PrismaClient {
  constructor() {
    super();
  }
}

declare global {
  var _dbService: undefined | DBService;
}

const _dbService = globalThis._dbService || new DBService();

// This is for having only 1 instance of prisma client for non-prod env. (Due to hot reloading, multiple instances maybe created)
if (process.env.NODE_ENV !== "production") globalThis._dbService = _dbService;

export const dbService = () => {
  return _dbService;
};
