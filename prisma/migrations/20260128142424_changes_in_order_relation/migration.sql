/*
  Warnings:

  - Added the required column `generic` to the `Medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturer` to the `Medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Medicines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Medicines` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PUBLISHED', 'DRAFT');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'RECEIVED', 'SHIPPED', 'DELIVERED');

-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "availableQuantity" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "generic" TEXT NOT NULL,
ADD COLUMN     "manufacturer" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "shippingAddress" TEXT,
    "totalPrice" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItems" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PUBLISHED',
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Orders_customerId_idx" ON "Orders"("customerId");

-- CreateIndex
CREATE INDEX "OrderItems_orderId_idx" ON "OrderItems"("orderId");

-- CreateIndex
CREATE INDEX "OrderItems_medicineId_idx" ON "OrderItems"("medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "OrderItems_orderId_medicineId_key" ON "OrderItems"("orderId", "medicineId");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_orderId_key" ON "Reviews"("orderId");

-- CreateIndex
CREATE INDEX "Reviews_orderId_idx" ON "Reviews"("orderId");

-- CreateIndex
CREATE INDEX "Medicines_categoryId_idx" ON "Medicines"("categoryId");

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItems" ADD CONSTRAINT "OrderItems_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
