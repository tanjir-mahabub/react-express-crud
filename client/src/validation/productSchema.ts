import { z } from 'zod';

export const productSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    category: z.string().min(3, 'Category is required'),
    price: z.number().positive('Price must be positive'),
    discountPercentage: z.number().min(0).max(100),
    stock: z.number().int().nonnegative(),
    brand: z.string().min(2),
    minimumOrderQuantity: z.number().int().positive(),
    tags: z.array(z.string()),
    thumbnail: z.string().url('Thumbnail must be a valid URL'),
    images: z.array(z.string().url()).min(1, 'At least one image URL is required'),
});

export type ProductFormData = z.infer<typeof productSchema>;
