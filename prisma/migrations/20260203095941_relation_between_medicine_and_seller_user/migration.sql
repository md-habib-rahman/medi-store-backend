-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
