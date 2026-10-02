import { z } from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "نام محصول حداقل ۲ کاراکتر باشد")
    .max(100, "نام محصول بیش از حد طولانی است"),

  price: z.number().positive("قیمت باید بیشتر از صفر باشد"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
