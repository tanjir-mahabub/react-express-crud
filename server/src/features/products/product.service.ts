import prisma from '../../config/db';
import { ProductType } from './product.schema';
import { NotFoundError } from '../../errors/NotFoundError';
import { mapProductToType } from './product.mapper';
import { toPrismaProductData, toPrismaCreateData } from './product.transform';
import { Prisma } from '@prisma/client';
import { ConflictError } from '../../errors/ConflictError'; // create this class if not done

export const findAllProducts = async (): Promise<ProductType[]> => {
    const products = await prisma.product.findMany({
        include: { reviews: true },
    });
    return products.map(mapProductToType);
};

export const findProductById = async (id: number): Promise<ProductType> => {
    const product = await prisma.product.findUnique({
        where: { id },
        include: { reviews: true },
    });
    if (!product) throw new NotFoundError(`Product with id ${id} not found`);
    return mapProductToType(product);
};

export const createProductService = async (
    data: Omit<ProductType, 'id' | 'reviews'>
): Promise<ProductType> => {
    try {
        const createData = toPrismaCreateData(data);
        
        const product = await prisma.product.create({
            data: createData as Prisma.ProductUncheckedCreateInput,
            include: { reviews: true },
        });

        return mapProductToType(product);
    } catch (err) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            const targetField = (err.meta as any)?.target?.join(', ') || 'unknown field';
            throw new ConflictError(`Duplicate value for unique field: ${targetField}`);
        }
        throw err;
    }
};

export const updateProductService = async (
    id: number,
    data: Partial<ProductType>
): Promise<ProductType> => {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError(`Product with id ${id} not found`);

    const updated = await prisma.product.update({
        where: { id },
        data: toPrismaProductData(data),
        include: { reviews: true },
    });

    return mapProductToType(updated);
};

export const deleteProductService = async (id: number): Promise<void> => {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new NotFoundError(`Product with id ${id} not found`);
    await prisma.product.delete({ where: { id } });
};
