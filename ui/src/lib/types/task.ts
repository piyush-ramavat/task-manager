import { z } from "zod";

const DateSchema = z.string().transform((val) => new Date(val));

export enum TaskStatus {
  NotUrgent = "Not Urgent",
  DueSoon = "Due Soon",
  Overdue = "Overdue",
}

export const UserTaskSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  dueDate: DateSchema,
  createdAt: DateSchema,
  updatedAt: DateSchema.optional(),
  userId: z.number(),
  status: z.nativeEnum(TaskStatus),
});

export type UserTask = z.infer<typeof UserTaskSchema>;

export type CreateUserTask = {
  name: string;
  description: string;
  dueDate: Date;
};

export type UpdateUserTask = CreateUserTask & { id: number };

export type Paginated<T> = {
  data: T;
  pageIndex: number;
  pageSize: number;
  total: number;
};