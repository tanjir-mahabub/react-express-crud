import { z } from "zod"
import { sharedProductFields } from "./sharedProductFields"

export const productSchema = z.object({
    id: z.number(),
    ...sharedProductFields,
    price: z.number(),
    discountPercentage: z.number(),
    stock: z.number(),
    minimumOrderQuantity: z.number(),
})

export type ProductType = z.infer<typeof productSchema>
