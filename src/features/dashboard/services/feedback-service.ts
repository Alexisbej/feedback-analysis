import { Prisma } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import { Feedback, FeedbackFilters } from "../types";

export async function fetchFeedbacksFromDb(
  tenantId: string,
  filters: FeedbackFilters = {},
): Promise<Feedback[]> {
  const { location, time, demographics, skip = 0, take = 5 } = filters;

  const whereClause: Prisma.FeedbackWhereInput = { tenantId };

  const metadataFilters = [];
  if (location) {
    metadataFilters.push({
      metadata: { path: ["location"], equals: location },
    });
  }
  if (demographics) {
    metadataFilters.push({
      metadata: { path: ["demographics"], equals: demographics },
    });
  }
  if (metadataFilters.length > 0) {
    whereClause.AND = metadataFilters;
  }

  if (time) {
    whereClause.createdAt = { gte: new Date(time) };
  }

  const feedbacksData = await prisma.feedback.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    skip: Number(skip),
    take: Number(take),
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      answers: {
        include: {
          question: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });

  return feedbacksData.map((feedback) => ({
    id: feedback.id,
    content: feedback.content,
    rating: feedback.rating,
    sentiment: feedback.sentiment,
    createdAt: feedback.createdAt.toISOString(),
    answers: feedback.answers.map((answer) => ({
      id: answer.id,
      value: answer.value,
      createdAt: answer.createdAt.toISOString(),
      question: answer.question,
    })),
    user: feedback.user,
  }));
}

export function computeSentimentData(feedbacks: Feedback[] = []) {
  const feedbacksByDate = feedbacks.reduce((acc, feedback) => {
    const date = feedback.createdAt.split("T")[0]; // Get YYYY-MM-DD format
    if (!acc[date]) {
      acc[date] = { positive: 0, negative: 0, neutral: 0 };
    }

    if (feedback.sentiment === "POSITIVE") {
      acc[date].positive += 1;
    } else if (feedback.sentiment === "NEGATIVE") {
      acc[date].negative += 1;
    } else if (feedback.sentiment === "NEUTRAL") {
      acc[date].neutral += 0.5;
    }

    return acc;
  }, {} as Record<string, { positive: number; negative: number; neutral: number }>);

  const sentimentData = Object.entries(feedbacksByDate)
    .map(([date, counts]) => {
      const { positive, negative, neutral } = counts;

      const ratio =
        negative === 0 && neutral === 0
          ? positive > 0
            ? positive
            : 1
          : (positive + neutral * 0.5) / (negative + neutral * 0.5);

      return {
        date,
        ratio,
        positive,
        negative,
        neutral,
      };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date

  return sentimentData;
}
