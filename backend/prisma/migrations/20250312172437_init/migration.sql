/*
  Warnings:

  - The `modified` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `due` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "modified",
ADD COLUMN     "modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "due",
ADD COLUMN     "due" TIMESTAMP(3);
