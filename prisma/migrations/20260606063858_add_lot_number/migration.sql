-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "lotName" TEXT;

-- CreateIndex
CREATE INDEX "Product_storeId_idx" ON "Product"("storeId");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "Store_merchantId_idx" ON "Store"("merchantId");

-- CreateIndex
CREATE INDEX "categories_storeId_idx" ON "categories"("storeId");
