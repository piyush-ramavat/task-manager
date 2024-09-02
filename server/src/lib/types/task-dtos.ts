import { z } from "zod";

export const CreateTaskRequestSchema = z.object({
  name: z.string(),
  description: z.string(),
  dueDate: z.date(),
  userId: z.number(),
});

export type CreateTaskRequest = z.infer<typeof CreateTaskRequestSchema>;
