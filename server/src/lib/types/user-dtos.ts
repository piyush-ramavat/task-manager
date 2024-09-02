import { z } from "zod";

export const FindByEmailRequestSchema = z.object({
  email: z.string(),
});

export type FindByEmailRequest = z.infer<typeof FindByEmailRequestSchema>;

export const CreateUserRequestSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;
