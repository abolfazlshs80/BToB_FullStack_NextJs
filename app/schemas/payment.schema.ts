import { z } from "zod";

export const createPaymentSchema = z.object({
  orderId: z.number().int().positive(),

  amount: z.number().positive("مبلغ پرداخت باید بیشتر از صفر باشد."),

  status: z.enum(["Pending", "Completed", "Failed"]),

  method: z.enum(["Cash", "Card", "Transfer"]),
});

export type CreatePaymentSchema = z.infer<typeof createPaymentSchema>;

export const updatePaymentSchema = z.object({
  id: z.number().int().positive(),

  orderId: z.number().int().positive(),

  amount: z.number().positive("مبلغ پرداخت باید بیشتر از صفر باشد."),

  status: z.enum(["Pending", "Completed", "Failed"]),

  method: z.enum(["Cash", "Card", "Transfer"]),
});

export type UpdatePaymentSchema = z.infer<typeof updatePaymentSchema>;
