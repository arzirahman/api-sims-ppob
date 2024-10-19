/*
  Warnings:

  - You are about to drop the column `service_code` on the `History` table. All the data in the column will be lost.
  - Added the required column `description` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_service_code_fkey";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "service_code",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "total_amount" BIGINT NOT NULL;
