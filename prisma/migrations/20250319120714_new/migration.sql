/*
  Warnings:

  - Added the required column `pruduct_image` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "pruduct_image" TEXT NOT NULL;
