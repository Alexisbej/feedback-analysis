"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedbackFilters, FeedbackResponse } from "../types";

async function fetchFeedbacks(
  businessId: string,
  filters: FeedbackFilters = {},
): Promise<FeedbackResponse> {
  const query = new URLSearchParams({ businessId: businessId });

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`/api/feedback?${query.toString()}`);

  if (!res.ok) {
    throw new Error("Failed to fetch feedbacks");
  }

  return res.json();
}

export function useFeedbacks(
  businessId: string,
  filters: FeedbackFilters = {},
) {
  return useInfiniteQuery<
    FeedbackResponse,
    Error,
    FeedbackResponse,
    [string, string, FeedbackFilters],
    number
  >({
    queryKey: ["feedbacks", businessId, filters],
    queryFn: ({ pageParam }) =>
      fetchFeedbacks(businessId, {
        ...filters,
        skip: pageParam,
        take: 5,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.feedbacks.length < 5) return undefined;
      return pages.length * 5;
    },
  });
}
