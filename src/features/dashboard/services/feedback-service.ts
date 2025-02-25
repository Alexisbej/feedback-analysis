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

// @TODO REMOVE THIS FAKE DATA
// eslint-disable-next-line
export function computeSentimentData(feedbacks: Feedback[] = []) {
  const demoData = Array.from({ length: 31 }, (_, i) => {
    const date = new Date(2024, 2, i + 1);

    const isNegativeDay = i % 5 === 0;

    let positive, negative, neutral;

    if (isNegativeDay) {
      positive = Math.floor(Math.random() * 10) + 2;
      negative = Math.floor(Math.random() * 20) + 15;
      neutral = Math.floor(Math.random() * 8) + 2;
    } else {
      positive = Math.floor(Math.random() * 20) + 10;
      negative = Math.floor(Math.random() * 10) + 2;
      neutral = Math.floor(Math.random() * 8) + 2;
    }

    const ratio =
      negative === 0 && neutral === 0
        ? positive > 0
          ? positive
          : 1
        : (positive + neutral * 0.5) / (negative + neutral * 0.5);

    return {
      date: date.toISOString().split("T")[0],
      ratio,
      positive,
      negative,
      neutral,
    };
  });

  return demoData;
}
