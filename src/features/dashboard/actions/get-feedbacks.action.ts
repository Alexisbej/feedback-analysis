"use server";

import { fetchFeedbacksFromDb } from "../services/feedback-service";
import { Feedback, FeedbackFilters, feedbackRequestSchema } from "../types";

export async function getFeedbacksAction({
  tenantId,
  filters,
}: {
  tenantId: string;
  filters: FeedbackFilters;
}): Promise<Feedback[]> {
  const validatedData = feedbackRequestSchema.parse({ tenantId, filters });

  return fetchFeedbacksFromDb(validatedData.tenantId, validatedData.filters);
}
