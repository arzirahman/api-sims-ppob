/*
  Warnings:

  - You are about to drop the column `description` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `History` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "description",
DROP COLUMN "total_amount";
