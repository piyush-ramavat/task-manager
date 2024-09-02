import { z } from "zod";

const DateSchema = z.string().transform((val) => new Date(val));

export const CreateTaskRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  dueDate: DateSchema,
  userId: z.number(),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
