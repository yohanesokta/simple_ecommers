/*
  Warnings:

  - The values [courer] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('user', 'admin', 'driver');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "driver_ready" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "name_driver" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "number_driver" TEXT NOT NULL DEFAULT '';
