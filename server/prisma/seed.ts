import { fetchProductsFromDummyAPI } from '../src/utils/fetcher';
import prisma from '../src/config/db';

const main = async () => {
    const products = await fetchProductsFromDummyAPI();

    for (const p of products) {
        await prisma.product.upsert({
            where: { id: p.id },
            update: {},
            create: {
                id: p.id,
                title: p.title,
                description: p.description,
                category: p.category,
                price: p.price,
                discountPercentage: p.discountPercentage,
                rating: p.rating,
                stock: p.stock,
                tags: JSON.stringify([]),
                brand: p.brand ?? 'Unknown',
                sku: String(p.id),
                weight: 0,
                width: 0,
                height: 0,
                depth: 0,
                warrantyInformation: '',
                shippingInformation: '',
                availabilityStatus: 'available',
                returnPolicy: '',
                minimumOrderQuantity: 1,
                barcode: '',
                qrCode: '',
                images: JSON.stringify(p.images),
                thumbnail: p.thumbnail
            } as any
        });
    }
};

main()
    .then(() => {
        console.log('✅ Products seeded');
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });