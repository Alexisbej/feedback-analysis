"use server";

import { auth } from "@/auth";
import { FeedbackSentiment } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import type { FeedbackFormValues } from "../hooks/useFeedbackForm";

export async function submitFeedbackAction(
  data: FeedbackFormValues,
  tenantId: string,
) {
  const { responses } = data;

  const session = await auth();
  const userId = session?.user?.id;

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

  const res = await fetch(`${process.env.BASE_URL}/api/sentiment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: responses }),
  });
  const sentimentResult = await res.text();

  const sentiment = extractSentiment(
    sentimentResult,
  )?.toUpperCase() as FeedbackSentiment;

  await prisma.feedback.update({
    where: { id: feedback.id },
    data: {
      sentiment,
    },
  });

  return feedback;
}

function extractSentiment(responseText: string): string | null {
  // Split the output into separate lines
  const lines = responseText.split("\n");
  // Find the line starting with "0:"
  const sentimentLine = lines.find((line) => line.startsWith("0:"));
  if (!sentimentLine) return null;
  // Remove the "0:" prefix and strip surrounding quotes
  return sentimentLine.slice(2).trim().replace(/^"|"$/g, "");
}
