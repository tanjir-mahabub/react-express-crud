import 'dotenv/config';
import prisma from '../src/config/db';

const rollback = async () => {
    try {
        const seededProducts = await prisma.seededProduct.findMany();

        if (seededProducts.length === 0) {
            console.log('ℹ️ No seeded products found to rollback.');
            return;
        }

        for (const seeded of seededProducts) {
            const productId = seeded.productId;

            // Delete reviews for the product first
            await prisma.review.deleteMany({
                where: { productId }
            });

            // Delete the product
            await prisma.product.delete({
                where: { id: productId }
            });

            // Because of onDelete: Cascade on SeededProduct, this entry will be auto deleted
            // But to be safe, you can explicitly delete it as well:
            // await prisma.seededProduct.delete({ where: { id: seeded.id } });

            console.log(`✅ Rolled back product ID ${productId}`);
        }

        console.log(`✅ Rollback complete. Deleted ${seededProducts.length} products.`);
    } catch (error) {
        console.error('❌ Rollback failed:', error);
    } finally {
        await prisma.$disconnect();
    }
};

rollback();
