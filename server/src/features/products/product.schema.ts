import { z } from 'zod';

// --- Reusable small schemas ---

const DimensionsSchema = z.object({
    width: z.number().nonnegative().default(0),
    height: z.number().nonnegative().default(0),
    depth: z.number().nonnegative().default(0),
});

const MetaSchema = z
    .object({
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
        barcode: z.string().default(''),
        qrCode: z.string().default(''),
    })
    .strip()
    .default({});

const ReviewSchema = z.object({
    id: z.number().optional(),
    rating: z.number().min(0).max(5),
    comment: z.string(),
    date: z.string(),
    reviewerName: z.string(),
    reviewerEmail: z.string().email(),
    productId: z.number().optional(),
});

const ReviewsSchema = z.array(ReviewSchema).default([]);

// --- Base product properties shared by create/update/full ---

const BaseProductSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    price: z.number().nonnegative(),
    discountPercentage: z.number().nonnegative(),
    rating: z.number().min(0).max(5).optional(),
    stock: z.number().int().nonnegative().default(0),
    tags: z.array(z.string()).default([]),
    brand: z.string().min(1),
    sku: z.string().optional(),
    weight: z.number().nonnegative().default(0),
    dimensions: DimensionsSchema,
    warrantyInformation: z.string().default(''),
    shippingInformation: z.string().default(''),
    availabilityStatus: z.string().default('available'),
    returnPolicy: z.string().default(''),
    minimumOrderQuantity: z.number().int().nonnegative().default(1),
    meta: MetaSchema,
    reviews: ReviewsSchema,
    images: z.array(z.string().url()).default([]),
    thumbnail: z.string().url(),
});

// --- Full product schema includes ID ---
export const productSchema = BaseProductSchema.extend({
    id: z.number(),
});

// --- Create schema omits ID (no id on create) ---
export const productCreateSchema = BaseProductSchema;

// --- Update schema is partial (all optional), also omit id ---
export const productUpdateSchema = BaseProductSchema.partial().omit({
    thumbnail: true,
    images: true,
});

// --- Type ---
export type ProductType = z.infer<typeof productSchema>;
