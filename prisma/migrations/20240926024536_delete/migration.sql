/*
  Warnings:

  - You are about to drop the column `data` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `isOnline` on the `Device` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Device" DROP COLUMN "data",
DROP COLUMN "isOnline";
