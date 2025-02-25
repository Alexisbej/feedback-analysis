"use server";

import { fetchFeedbacksFromDb } from "../services/feedback-service";
import { Feedback, FeedbackFilters, feedbackFiltersSchema } from "../types";

export async function getFeedbacksAction({
  tenantId,
  filters,
}: {
  tenantId: string;
  filters: FeedbackFilters;
}): Promise<Feedback[]> {
  const validatedData = feedbackFiltersSchema.parse({ tenantId, filters });

  return fetchFeedbacksFromDb(validatedData.tenantId, validatedData.filters);
}
