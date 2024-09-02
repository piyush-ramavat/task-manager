import { Task } from "@prisma/client";
import { z } from "zod";

const DateSchema = z.string().transform((val) => new Date(val));

export const CreateTaskRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  dueDate: DateSchema,
  userId: z.number(),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;

export const UpdateTaskRequestSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  dueDate: DateSchema,
  updatedAt: z.date(),
});

export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;

export enum TaskStatus {
  NotUrgent = "Not Urgent",
  DueSoon = "Due Soon",
  Overdue = "Overdue",
}

export type UserTask = Task & { status: TaskStatus };
