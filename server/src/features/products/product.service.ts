import prisma from '../../config/db';
import { ProductType } from './product.schema';
import { Prisma } from '@prisma/client';

const transformForPrisma = (data: ProductType): Prisma.ProductCreateInput => {
    const { reviews, ...rest } = data;
    return {
        ...rest,
        tags: JSON.stringify(data.tags),
        images: JSON.stringify(data.images)
    };
};

export const getAllProducts = () => {
    return prisma.product.findMany();
};

export const getProductById = (id: number) => {
    return prisma.product.findUnique({ where: { id } });
};

export const createProduct = (data: ProductType) => {
    return prisma.product.create({ data: transformForPrisma(data) });
};

export const updateProduct = (id: number, data: Partial<ProductType>) => {
    const { reviews, tags, images, ...rest } = data;
    const transformedData: Prisma.ProductUpdateInput = {
        ...rest,
        ...(tags && { tags: JSON.stringify(tags) }),
        ...(images && { images: JSON.stringify(images) })
    };
    
    return prisma.product.update({
        where: { id },
        data: transformedData
    });
};

export const deleteProduct = (id: number) => {
    return prisma.product.delete({ where: { id } });
};
