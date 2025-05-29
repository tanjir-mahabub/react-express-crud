/*
  Warnings:

  - Added the required column `availabilityStatus` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barcode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depth` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minimumOrderQuantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qrCode` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `returnPolicy` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingInformation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warrantyInformation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "reviewerName" TEXT NOT NULL,
    "reviewerEmail" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "discountPercentage" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "width" REAL NOT NULL,
    "height" REAL NOT NULL,
    "depth" REAL NOT NULL,
    "warrantyInformation" TEXT NOT NULL,
    "shippingInformation" TEXT NOT NULL,
    "availabilityStatus" TEXT NOT NULL,
    "returnPolicy" TEXT NOT NULL,
    "minimumOrderQuantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "barcode" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL
);
INSERT INTO "new_Product" ("brand", "category", "description", "discountPercentage", "id", "price", "rating", "stock", "thumbnail", "title") SELECT "brand", "category", "description", "discountPercentage", "id", "price", "rating", "stock", "thumbnail", "title" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
