import { FeedbackSentiment } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import { FeedbackFormValues, Question } from "../types";

export async function getFeedbackQuestions(
  tenantSlug: string,
  templateId: string,
): Promise<Question[]> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        templateId,
        template: {
          tenant: {
            slug: tenantSlug,
          },
        },
      },
      select: {
        id: true,
        question: true,
        type: true,
        options: true,
        template: {
          select: {
            name: true,
            tenant: {
              select: {
                id: true,
                name: true,
                settings: {
                  select: {
                    brandColor: true,
                    logoUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return questions.map((q) => ({
      id: q.id,
      question: q.question,
      type: q.type,
      options: q.options,
      templateName: q.template.name,
      tenantName: q.template.tenant.name,
      tenantId: q.template.tenant.id,
      branding: {
        color: q.template.tenant.settings?.brandColor ?? "#2563eb",
        logo: q.template.tenant.settings?.logoUrl,
      },
    }));
  } catch (error) {
    console.error("Error fetching feedback questions:", error);
    throw new Error("Failed to fetch feedback questions");
  }
}

export async function saveFeedbackToDatabase(
  data: FeedbackFormValues,
  tenantId: string,
  userId?: string,
) {
  const { responses } = data;

  const feedback = await prisma.feedback.create({
    data: {
      tenantId,
      userId,
      content: "",
      answers: {
        create: Object.entries(responses).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      },
    },
  });

  return feedback;
}

export async function updateFeedbackSentiment(
  feedbackId: string,
  sentiment: FeedbackSentiment,
) {
  return prisma.feedback.update({
    where: { id: feedbackId },
    data: { sentiment },
  });
}

export function extractSentiment(responseText: string): string | null {
  const lines = responseText.split("\n");
  const sentimentLine = lines.find((line) => line.startsWith("0:"));
  if (!sentimentLine) return null;
  return sentimentLine.slice(2).trim().replace(/^"|"$/g, "");
}
