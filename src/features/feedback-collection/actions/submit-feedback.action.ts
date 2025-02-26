"use server";

import { auth } from "@/auth";
import {
  saveFeedbackToDatabase,
  updateFeedbackWithAnalysis,
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

  const res = await fetch(`${process.env.BASE_URL}/api/feedback/analysis`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: validatedData.responses }),
  });

  const analysisResult = await res.json();

  await updateFeedbackWithAnalysis(
    feedback.id,
    analysisResult.sentiment,
    analysisResult.themes || [],
    analysisResult.competitors || [],
    analysisResult.improvements || [],
  );

  return feedback;
}
