import { z } from "zod";
import { Role } from "../Enums/Roles";

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    password: z
      .string()
      .min(4, { message: "Descrition must be greater than 4 characters!" }),
      role: z.enum([Role.Admin, Role.User, ], {
        required_error: "Role is required",
        invalid_type_error: "Invalid role"}),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(1, { message: "Name must be greater than 1 characters!" }),
    password: z
      .string()
      .min(4, { message: "Descrition must be greater than 4 characters!" }),
  }).partial()
});