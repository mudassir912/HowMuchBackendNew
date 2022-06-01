/*
  Warnings:

  - You are about to drop the column `image` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `productCategoryId` on the `Service` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('BidOpen', 'BidClose', 'Sold');

-- CreateEnum
CREATE TYPE "ServiceBidStatus" AS ENUM ('Pending', 'Accepted', 'Rejected');

-- DropIndex
DROP INDEX "Service_userId_key";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "image",
DROP COLUMN "location",
DROP COLUMN "productCategoryId",
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "locationTitle" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "serviceCategoryId" INTEGER,
ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT E'BidOpen',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ServiceBid" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "ServiceBidStatus" NOT NULL DEFAULT E'Pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceBid_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT E'',
    "parentId" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceMedia" (
    "id" SERIAL NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "asset" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceMedia_pkey" PRIMARY KEY ("id")
);

-- RenameForeignKey
ALTER TABLE "ProductBid" RENAME CONSTRAINT "isProductBid_Foreign_Key_Constraint" TO "ProductBid_productId_fkey";

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_serviceCategoryId_fkey" FOREIGN KEY ("serviceCategoryId") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBid" ADD CONSTRAINT "ServiceBid_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBid" ADD CONSTRAINT "ServiceBid_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceBid" ADD CONSTRAINT "isServiceBid_Foreign_Key_Constraint" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceCategory" ADD CONSTRAINT "ServiceCategory_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ServiceCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ServiceMedia" ADD CONSTRAINT "ServiceMedia_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
