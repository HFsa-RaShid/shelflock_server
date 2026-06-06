/*
  Warnings:

  - You are about to drop the column `lotName` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lotName",
ADD COLUMN     "lotNNumber" TEXT;
