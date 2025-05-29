/*
  Warnings:

  - You are about to alter the column `images` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - You are about to alter the column `tags` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
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
    "tags" JSONB NOT NULL,
    "brand" TEXT NOT NULL,
    "sku" TEXT,
    "weight" REAL NOT NULL DEFAULT 0,
    "width" REAL NOT NULL DEFAULT 0,
    "height" REAL NOT NULL DEFAULT 0,
    "depth" REAL NOT NULL DEFAULT 0,
    "warrantyInformation" TEXT DEFAULT '',
    "shippingInformation" TEXT DEFAULT '',
    "availabilityStatus" TEXT,
    "returnPolicy" TEXT DEFAULT '',
    "minimumOrderQuantity" INTEGER NOT NULL,
    "barcode" TEXT,
    "qrCode" TEXT,
    "images" JSONB NOT NULL,
    "thumbnail" TEXT NOT NULL
);
INSERT INTO "new_Product" ("availabilityStatus", "barcode", "brand", "category", "depth", "description", "discountPercentage", "height", "id", "images", "minimumOrderQuantity", "price", "qrCode", "rating", "returnPolicy", "shippingInformation", "sku", "stock", "tags", "thumbnail", "title", "warrantyInformation", "weight", "width") SELECT "availabilityStatus", "barcode", "brand", "category", "depth", "description", "discountPercentage", "height", "id", "images", "minimumOrderQuantity", "price", "qrCode", "rating", "returnPolicy", "shippingInformation", "sku", "stock", "tags", "thumbnail", "title", "warrantyInformation", "weight", "width" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
