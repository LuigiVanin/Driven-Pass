/*
  Warnings:

  - You are about to drop the column `title` on the `wifi` table. All the data in the column will be lost.
  - Added the required column `password` to the `wifi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wifi" DROP COLUMN "title",
ADD COLUMN     "password" TEXT NOT NULL;
