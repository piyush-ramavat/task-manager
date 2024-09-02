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
});

export type UpdateTaskRequest = z.infer<typeof UpdateTaskRequestSchema>;
