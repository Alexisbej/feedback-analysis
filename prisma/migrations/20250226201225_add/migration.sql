-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "analysisCompetitors" JSONB,
ADD COLUMN     "analysisImprovements" JSONB,
ADD COLUMN     "analysisThemes" JSONB;
