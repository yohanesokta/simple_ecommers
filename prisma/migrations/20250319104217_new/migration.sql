/*
  Warnings:

  - Added the required column `driver_id` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "driver_id" TEXT NOT NULL;
