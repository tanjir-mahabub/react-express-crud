import { z } from 'zod';

export const productSchema = z.object({
    id: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nonnegative(),
    discountPercentage: z.number().nonnegative(),
    rating: z.number().min(0).max(5),
    stock: z.number().int().nonnegative(),
    tags: z.array(z.string()).optional().default([]),
    brand: z.string().min(1),
    sku: z.string().optional(),
    weight: z.number().nonnegative().optional().default(0),
    width: z.number().nonnegative().optional().default(0),
    height: z.number().nonnegative().optional().default(0),
    depth: z.number().nonnegative().optional().default(0),
    warrantyInformation: z.string().optional().default(''),
    shippingInformation: z.string().optional().default(''),
    availabilityStatus: z.string().optional().default('available'),
    returnPolicy: z.string().optional().default(''),
    minimumOrderQuantity: z.number().int().nonnegative().optional().default(1),
    barcode: z.string().optional().default(''),
    qrCode: z.string().optional().default(''),
    images: z.array(z.string().url()),
    thumbnail: z.string().url()
});

export type ProductType = z.infer<typeof productSchema>;
