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
    "rating" REAL,
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
    "thumbnail" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME
);
INSERT INTO "new_Product" ("availabilityStatus", "barcode", "brand", "category", "createdAt", "depth", "description", "discountPercentage", "height", "id", "images", "minimumOrderQuantity", "price", "qrCode", "rating", "returnPolicy", "shippingInformation", "sku", "stock", "tags", "thumbnail", "title", "updatedAt", "warrantyInformation", "weight", "width") SELECT "availabilityStatus", "barcode", "brand", "category", "createdAt", "depth", "description", "discountPercentage", "height", "id", "images", "minimumOrderQuantity", "price", "qrCode", "rating", "returnPolicy", "shippingInformation", "sku", "stock", "tags", "thumbnail", "title", "updatedAt", "warrantyInformation", "weight", "width" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
