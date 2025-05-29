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

        // ✅ Shared productData
        const productData = {
            id: product.id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            tags: JSON.stringify(product.tags),
            brand: product.brand,
            sku: product.sku,
            weight: product.weight,
            width: product.dimensions?.width ?? 0,
            height: product.dimensions?.height ?? 0,
            depth: product.dimensions?.depth ?? 0,
            warrantyInformation: product.warrantyInformation ?? '',
            shippingInformation: product.shippingInformation ?? '',
            availabilityStatus: product.availabilityStatus ?? 'available',
            returnPolicy: product.returnPolicy ?? '',
            minimumOrderQuantity: product.minimumOrderQuantity ?? 1,
            barcode: product.meta?.barcode ?? '',
            qrCode: product.meta?.qrCode ?? '',
            images: JSON.stringify(product.images),
            thumbnail: product.thumbnail
        };

        await prisma.product.upsert({
            where: { id: product.id },
            update: productData,
            create: productData
        });

        savedCount++;
    }

    return savedCount;
}

export async function getAllProducts() {
    return prisma.product.findMany();
}
