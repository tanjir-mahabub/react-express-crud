import { z } from "zod"

export const dimensionsSchema = z.object({
    width: z.coerce.number(),
    height: z.coerce.number(),
    depth: z.coerce.number(),
})

export const metaSchema = z.object({
    barcode: z.string().optional(),
    qrCode: z.string().optional(),
})

export const reviewSchema = z.object({
    reviewerName: z.string(),
    rating: z.number(),
    comment: z.string(),
    date: z.string(),
})

export const sharedProductFields = {
    sku: z.string().optional(),
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters" })
        .max(100, { message: "Title must not exceed 100 characters" }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" })
        .max(500, { message: "Description must not exceed 500 characters" }),
    category: z.string().min(1, { message: "Please select a category" }),
    brand: z.string().min(1, { message: "Brand is required" }),
    tags: z.array(z.string()).min(1, { message: "Add at least one tag" }),
    thumbnail: z.string().min(1, { message: "Thumbnail is required" }),
    images: z
        .array(z.string().min(1, { message: "Image URL is required" }))
        .min(1, { message: "Add at least one image" }),
    rating: z.number().optional(),
    availabilityStatus: z.string().optional(),
    weight: z.number().optional(),
    dimensions: dimensionsSchema.optional(),
    warrantyInformation: z.string().optional(),
    shippingInformation: z.string().optional(),
    returnPolicy: z.string().optional(),
    meta: metaSchema.optional(),
    reviews: z.array(reviewSchema).optional(),
}
