/*
  Warnings:

  - Added the required column `product_name` to the `ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_alamat` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "user_alamat" TEXT NOT NULL,
ADD COLUMN     "user_number" TEXT NOT NULL DEFAULT '';
