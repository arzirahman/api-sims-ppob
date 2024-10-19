/*
  Warnings:

  - You are about to drop the column `service_id` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `History` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[service_code]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_code` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_service_id_fkey";

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_user_id_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "service_id",
DROP COLUMN "user_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "service_code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_service_code_key" ON "Service"("service_code");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "Service"("service_code") ON DELETE CASCADE ON UPDATE CASCADE;
