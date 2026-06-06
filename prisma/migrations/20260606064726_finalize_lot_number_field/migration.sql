/*
  Warnings:

  - You are about to drop the column `lotNNumber` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lotNNumber",
ADD COLUMN     "lotNumber" TEXT;
