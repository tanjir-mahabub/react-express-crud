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
    dimensions: z.object({
        width: z.number().nonnegative(),
        height: z.number().nonnegative(),
        depth: z.number().nonnegative()
    }).optional().default({ width: 0, height: 0, depth: 0 }),
    warrantyInformation: z.string().optional().default(''),
    shippingInformation: z.string().optional().default(''),
    availabilityStatus: z.string().optional().default('available'),
    returnPolicy: z.string().optional().default(''),
    minimumOrderQuantity: z.number().int().nonnegative().optional().default(1),
    meta: z.object({
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        barcode: z.string().optional().default(''),
        qrCode: z.string().optional().default('')
    }).optional(),
    reviews: z.array(z.object({
        rating: z.number().min(0).max(5),
        comment: z.string(),
        date: z.string(),
        reviewerName: z.string(),
        reviewerEmail: z.string().email()
    })).optional().default([]),
    images: z.array(z.string().url()),
    thumbnail: z.string().url()
});

// Schema for create allowing optional fields (except ones you want required)
export const productCreateSchema = productSchema
    .omit({ id: true })
    .extend({
        stock: z.number().int().nonnegative().default(0),
        minimumOrderQuantity: z.number().int().nonnegative().default(1),
        weight: z.number().nonnegative().default(0),
        dimensions: z.object({
            width: z.number().nonnegative().default(0),
            height: z.number().nonnegative().default(0),
            depth: z.number().nonnegative().default(0),
        }).default({ width: 0, height: 0, depth: 0 }),
        tags: z.array(z.string()).default([]),
        images: z.array(z.string().url()).default([]),
        reviews: z.array(z.object({
            rating: z.number().min(0).max(5),
            comment: z.string(),
            date: z.string(),
            reviewerName: z.string(),
            reviewerEmail: z.string().email()
        })).default([]),
        warrantyInformation: z.string().default(''),
        shippingInformation: z.string().default(''),
        availabilityStatus: z.string().default('available'),
        returnPolicy: z.string().default(''),
        meta: z.object({
            createdAt: z.string().optional(),
            updatedAt: z.string().optional(),
            barcode: z.string().default(''),
            qrCode: z.string().default('')
        }).default({}),
    });

// Schema for update: fully partial
export const productUpdateSchema = productSchema.partial().omit({ id: true });

export type ProductType = z.infer<typeof productSchema>;
