import { fetchProductsFromDummyAPI } from '../src/utils/fetcher';
import prisma from '../src/config/db';

const main = async () => {
    const products = await fetchProductsFromDummyAPI();
    let seededCount = 0;

    for (const p of products) {
        // Check if product is already seeded
        const alreadySeeded = await prisma.seededProduct.findUnique({
            where: { productId: p.id }
        });

        if (alreadySeeded) {
            console.log(`⏩ Product ID ${p.id} already seeded, skipping...`);
            continue;
        }

        const product = await prisma.product.upsert({
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
                tags: p.tags ?? [],
                brand: p.brand ?? 'Unknown',
                sku: p.sku ?? String(p.id),
                weight: p.weight ?? p.dimensions?.weight ?? 0,
                width: p.dimensions?.width ?? 0,
                height: p.dimensions?.height ?? 0,
                depth: p.dimensions?.depth ?? 0,
                warrantyInformation: p.warrantyInformation ?? '',
                shippingInformation: p.shippingInformation ?? '',
                availabilityStatus: p.availabilityStatus ?? 'available',
                returnPolicy: p.returnPolicy ?? '',
                minimumOrderQuantity: p.minimumOrderQuantity ?? 1,
                barcode: p.meta?.barcode ?? '',
                qrCode: p.meta?.qrCode ?? '',
                images: p.images ?? [],
                thumbnail: p.thumbnail
            }
        });

        if (Array.isArray(p.reviews)) {
            for (const r of p.reviews) {
                await prisma.review.create({
                    data: {
                        productId: product.id,
                        rating: r.rating,
                        comment: r.comment,
                        date: new Date(r.date),
                        reviewerName: r.reviewerName,
                        reviewerEmail: r.reviewerEmail
                    }
                });
            }
        }

        await prisma.seededProduct.create({
            data: {
                productId: product.id
            }
        });

        seededCount++;
        console.log(`✅ Seeded product ID ${product.id}`);
    }

    if (seededCount > 0) {
        console.log(`✅ ${seededCount} product(s) successfully seeded.`);
    } else {
        console.log('ℹ️ All products were already seeded. No new products added.');
    }
};

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error('❌ Error seeding products:', e);
        process.exit(1);
    });
