import fetch from 'node-fetch';
import prisma from '../config/db';
import { productSchema, ProductType } from '../features/products/product.schema';

interface DummyProductResponse {
    products: unknown[];
}

export async function scrapeAndSaveProducts(apiUrl: string): Promise<number> {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Failed to fetch products');

    const data = (await response.json()) as DummyProductResponse;
    const products = data.products;

    let savedCount = 0;

    for (const p of products) {
        const parseResult = productSchema.safeParse(p);

        if (!parseResult.success) {
            console.warn(`Product validation failed for id=${(p as any).id}:`, parseResult.error);
            continue;
        }

        const product: ProductType = parseResult.data;

        // Prisma upsert with validated data
        await prisma.product.upsert({
            where: { id: product.id },
            update: product,
            create: product
        });

        savedCount++;
    }

    return savedCount;
}

export async function getAllProducts() {
    return prisma.product.findMany();
}
