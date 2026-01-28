-- CreateTable
CREATE TABLE "Medicines" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "title" VARCHAR(225) NOT NULL,
    "details" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicines_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" TEXT NOT NULL,
    "adminId" TEXT NOT NULL,
    "title" VARCHAR(225) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Medicines_sellerId_idx" ON "Medicines"("sellerId");

-- CreateIndex
CREATE INDEX "Categories_adminId_idx" ON "Categories"("adminId");

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
