import { z } from "zod";

export const createEmailSchema = z.object({
  body: z.object({
    sender: z
      .string()
      .min(1),
    receiver: z
      .string()
      .min(1),
    headline: z
      .string()
      .min(1),
    content: z
      .string()
      .min(1),
  }),
});
