import { prisma } from "../../../../prisma/prisma";
import { AnalysisResult } from "../types";

export type AnalysisType =
  | "themes"
  | "competitor"
  | "improvement"
  | "comprehensive";

export async function requestFeedbackAnalysis(
  businessId: string,
  feedbackIds: string[],
  analysisType: AnalysisType,
): Promise<any> {
  try {
    const response = await fetch(`/api/feedback/analysis`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        businessId,
        feedbackIds,
        analysisType,
      }),
    });

    if (!response.ok) {
      throw new Error(`Analysis request failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error requesting feedback analysis:", error);
    throw error;
  }
}

export async function saveAnalysisResult(
  businessId: string,
  analysisType: AnalysisType,
  result: AnalysisResult,
): Promise<void> {
  await prisma.analysisResult.create({
    data: {
      tenantId: businessId,
      type: analysisType,
      result: result as any, // JSON data will be stored
      createdAt: new Date(),
    },
  });
}

export async function getRecentAnalyses(
  businessId: string,
  limit: number = 5,
): Promise<Array<{ id: string; type: string; createdAt: string }>> {
  const analyses = await prisma.analysisResult.findMany({
    where: { tenantId: businessId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      type: true,
      createdAt: true,
    },
  });

  return analyses.map((analysis) => ({
    id: analysis.id,
    type: analysis.type,
    createdAt: analysis.createdAt.toISOString(),
  }));
}

export async function getAnalysisById(
  id: string,
): Promise<AnalysisResult | null> {
  const analysis = await prisma.analysisResult.findUnique({
    where: { id },
  });

  if (!analysis) return null;

  return analysis.result as AnalysisResult;
}
