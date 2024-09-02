import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PrismaClient as OriginalPrismaClient } from "@prisma/client";
import { createTask } from "./task-services";
import { dbService } from "../lib/db-service";
import { CreateTaskRequest } from "../lib/types";

jest.mock("@prisma/client", () => ({
  PrismaClient: function () {
    return mockDeep<OriginalPrismaClient>();
  },
}));

const db = dbService();
const prismaMock = db as unknown as DeepMockProxy<OriginalPrismaClient>;

describe("Task Services", () => {
  it("creates a task", async () => {
    const task: CreateTaskRequest = {
      name: "Test Task",
      description: "Test description",
      dueDate: new Date(),
      userId: 0,
    };
    prismaMock.task.create.mockResolvedValue({ ...task, id: 123, createdAt: new Date(), updatedAt: new Date() });

    const result = await createTask(task);

    expect(result).not.toBeNull();
    expect(result).toHaveProperty("id");
  });
});
