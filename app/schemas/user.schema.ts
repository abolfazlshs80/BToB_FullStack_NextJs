import { ROLES } from "@/lib/roles";
import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),

  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),

  role: z.enum([ROLES.ADMIN, ROLES.Employer]),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  id: z.coerce.number().int().positive(),

  username: z.string().trim().min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد"),

  password: z.string().optional().or(z.literal("")),

  role: z.enum([ROLES.ADMIN, ROLES.Employer]),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
