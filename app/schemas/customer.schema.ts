import { z } from "zod";

export const createCustomerSchema = z.object({
  name: z
    .string()
    .min(2, "نام مشتری باید حداقل ۲ کاراکتر باشد.")
    .max(100, "نام مشتری نمی‌تواند بیشتر از ۱۰۰ کاراکتر باشد."),

  phone: z
    .string()
    .max(20, "شماره تلفن نمی‌تواند بیشتر از ۲۰ کاراکتر باشد.")
    .optional()
    .or(z.literal("")),

  email: z.email("ایمیل وارد شده معتبر نیست.").optional().or(z.literal("")),

  companyId: z.number().int().positive(),
});

export type CreateCustomerSchema = z.infer<typeof createCustomerSchema>;

export const updateCustomerSchema = createCustomerSchema.extend({
  customerId: z.number().int().positive(),
});
export type UpdateCustomerSchema = z.infer<typeof updateCustomerSchema>;
