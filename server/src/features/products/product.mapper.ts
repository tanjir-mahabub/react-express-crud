import { Product, Review } from '@prisma/client';
import { ProductType } from './product.schema';
import { Prisma } from '@prisma/client';

const parseJsonArray = (value: Prisma.JsonValue): string[] => {
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
};

export const mapProductToType = (
    product: Product & { reviews: Review[] }
): ProductType => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    tags: parseJsonArray(product.tags),
    brand: product.brand,
    weight: product.weight,
    sku: product.sku ?? undefined,
    dimensions: {
        width: product.width,
        height: product.height,
        depth: product.depth,
    },
    warrantyInformation: product.warrantyInformation ?? '',
    shippingInformation: product.shippingInformation ?? '',
    availabilityStatus: product.availabilityStatus ?? 'available',
    returnPolicy: product.returnPolicy ?? '',
    minimumOrderQuantity: product.minimumOrderQuantity,
    images: parseJsonArray(product.images),
    thumbnail: product.thumbnail,
    reviews: product.reviews.map(review => ({
        id: review.id,
        rating: review.rating,
        comment: review.comment,
        date: review.date.toISOString(),
        reviewerName: review.reviewerName,
        reviewerEmail: review.reviewerEmail,
        productId: review.productId,
    })),
    meta: {
        barcode: product.barcode ?? '',
        qrCode: product.qrCode ?? '',
        createdAt: '',
        updatedAt: '',
    },
});
