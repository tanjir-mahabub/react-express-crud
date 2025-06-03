import { z } from "zod"
import { sharedProductFields } from "./sharedProductFields"

export const productFormSchema = z.object({
    id: z.number().optional(),
    ...sharedProductFields,
    price: z.coerce
        .number()
        .positive({ message: "Price must be a positive number" }),
    discountPercentage: z.coerce
        .number()
        .min(0, { message: "Discount cannot be negative" })
        .max(100, { message: "Discount cannot exceed 100%" }),
    stock: z.coerce
        .number()
        .int({ message: "Stock must be a whole number" })
        .nonnegative({ message: "Stock cannot be negative" }),
    minimumOrderQuantity: z.coerce
        .number()
        .int({ message: "Minimum order quantity must be a whole number" })
        .positive({ message: "Minimum order quantity must be positive" }),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
