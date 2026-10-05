import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, "نام شرکت باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام شرکت نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  phone: z
    .string()
    .max(20, "شماره تلفن نمی‌تواند بیشتر از ۲۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),

  email: z
    .email("ایمیل وارد شده معتبر نیست.")
    .optional()
    .or(z.literal("")),

  status: z.boolean().default(true),
});

export const updateCompanySchema = createCompanySchema.extend({
  id: z.number().int().positive(),
});

export type CreateCompanySchema = z.infer<
  typeof createCompanySchema
>;

export type UpdateCompanySchema = z.infer<
  typeof updateCompanySchema
>;