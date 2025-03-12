/*
  Warnings:

  - The `modified` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `due` column on the `Item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[title]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "modified",
ADD COLUMN     "modified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "due",
ADD COLUMN     "due" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Item_title_key" ON "Item"("title");
