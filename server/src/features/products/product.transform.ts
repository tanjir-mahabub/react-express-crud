import { Prisma } from '@prisma/client';
import { ProductType } from './product.schema';

export const toPrismaCreateData = (
    data: Omit<ProductType, 'id' | 'reviews'>
): Prisma.ProductCreateInput => ({
    title: data.title,
    description: data.description,
    category: data.category,
    price: data.price,
    discountPercentage: data.discountPercentage,
    rating: data.rating ?? 0,
    stock: data.stock,
    tags: data.tags,
    brand: data.brand,
    weight: data.weight,
    sku: data.sku,
    width: data.dimensions?.width ?? 0,
    height: data.dimensions?.height ?? 0,
    depth: data.dimensions?.depth ?? 0,
    warrantyInformation: data.warrantyInformation ?? '',
    shippingInformation: data.shippingInformation ?? '',
    availabilityStatus: data.availabilityStatus ?? 'available',
    returnPolicy: data.returnPolicy ?? '',
    minimumOrderQuantity: data.minimumOrderQuantity ?? 1,
    images: data.images,
    thumbnail: data.thumbnail,
    barcode: data.meta?.barcode ?? '',
    qrCode: data.meta?.qrCode ?? '',
} as unknown as Prisma.ProductCreateInput);

export const toPrismaProductData = (
    data: Partial<ProductType>
): Partial<Prisma.ProductUncheckedUpdateInput> => {
    const updateData: Partial<Prisma.ProductUncheckedUpdateInput> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.discountPercentage !== undefined) updateData.discountPercentage = data.discountPercentage;
    if (data.rating !== undefined) updateData.rating = data.rating;
    if (data.stock !== undefined) updateData.stock = data.stock;
    if (data.tags !== undefined) updateData.tags = data.tags;
    if (data.brand !== undefined) updateData.brand = data.brand;
    if (data.weight !== undefined) updateData.weight = data.weight;
    if (data.sku !== undefined) updateData.sku = data.sku;

    if (data.dimensions?.width !== undefined) updateData.width = data.dimensions.width;
    if (data.dimensions?.height !== undefined) updateData.height = data.dimensions.height;
    if (data.dimensions?.depth !== undefined) updateData.depth = data.dimensions.depth;

    if (data.warrantyInformation !== undefined) updateData.warrantyInformation = data.warrantyInformation;
    if (data.shippingInformation !== undefined) updateData.shippingInformation = data.shippingInformation;
    if (data.availabilityStatus !== undefined) updateData.availabilityStatus = data.availabilityStatus;
    if (data.returnPolicy !== undefined) updateData.returnPolicy = data.returnPolicy;
    if (data.minimumOrderQuantity !== undefined) updateData.minimumOrderQuantity = data.minimumOrderQuantity;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;

    if (data.meta?.barcode !== undefined) updateData.barcode = data.meta.barcode;
    if (data.meta?.qrCode !== undefined) updateData.qrCode = data.meta.qrCode;

    return updateData;
};
