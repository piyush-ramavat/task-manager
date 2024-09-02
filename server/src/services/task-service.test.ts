import { mockDeep } from "jest-mock-extended";
import { PrismaClient as OriginalPrismaClient } from "@prisma/client";
import { createTask } from "./task-services";

jest.mock("@prisma/client", () => ({
  PrismaClient: function () {
    return mockDeep<OriginalPrismaClient>();
  },
}));

describe("Task Services", () => {
  it("creates a task", async () => {
    const result = await createTask({
      name: "Test Task",
      description: "Test description",
      dueDate: new Date(),
      userId: 0,
    });

    expect(result).not.toBeNull();
  });
});
