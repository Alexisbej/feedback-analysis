"use server";

import { auth } from "@/auth";
import { FeedbackSentiment } from "@prisma/client";
import {
  extractSentiment,
  saveFeedbackToDatabase,
  updateFeedbackSentiment,
} from "../services/feedback-service";
import { FeedbackFormValues, feedbackSubmitSchema } from "../types";

export async function submitFeedbackAction(
  data: FeedbackFormValues,
  tenantId: string,
) {
  const validatedData = feedbackSubmitSchema.parse(data);

  const session = await auth();
  const userId = session?.user?.id;

  const feedback = await saveFeedbackToDatabase(
    validatedData,
    tenantId,
    userId,
  );

  const res = await fetch(`${process.env.BASE_URL}/api/sentiment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: validatedData.responses }),
  });
  const sentimentResult = await res.text();

  const sentiment = extractSentiment(
    sentimentResult,
  )?.toUpperCase() as FeedbackSentiment;

  await updateFeedbackSentiment(feedback.id, sentiment);

  return feedback;
}
