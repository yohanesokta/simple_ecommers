/*
  Warnings:

  - Added the required column `email_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "email_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "carts" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);
