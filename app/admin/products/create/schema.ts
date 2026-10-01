import { z } from "zod";

export const createCustomerSchema = z.object({
  companyName: z
    .string()
    .min(2, "نام شرکت حداقل باید ۲ کاراکتر باشد"),

  contactName: z
    .string()
    .min(2, "نام تماس حداقل باید ۲ کاراکتر باشد"),

  email: z
    .string()
    .email("ایمیل معتبر نیست"),

  phone: z
    .string()
    .min(10, "شماره تلفن معتبر نیست"),
});

export type CreateCustomerInput = z.infer<
  typeof createCustomerSchema
>;