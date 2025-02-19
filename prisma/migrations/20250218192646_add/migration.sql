/*
  Warnings:

  - You are about to drop the column `channel` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `distributionMethod` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "channel";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "distributionMethod" "FeedbackChannel" NOT NULL;

-- CreateTable
CREATE TABLE "FeedbackLink" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "qrCodeImage" TEXT,
    "expiration" TIMESTAMP(3),
    "usageLimit" INTEGER,
    "currentUsage" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedbackLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackLink_url_key" ON "FeedbackLink"("url");

-- AddForeignKey
ALTER TABLE "FeedbackLink" ADD CONSTRAINT "FeedbackLink_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
