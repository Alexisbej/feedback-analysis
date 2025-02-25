import { z } from "zod";

export const businessIdSchema = z.object({
  userId: z.string(),
});
export type BusinessId = z.infer<typeof businessIdSchema>;

// Business schema
export const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional(),
});
export type Business = z.infer<typeof businessSchema>;

export const metricsSchema = z.object({
  businessId: z.string().uuid(),
});
export type Metrics = z.infer<typeof metricsSchema>;

// Dashboard metrics schema
export const dashboardMetricsSchema = z.object({
  campaignsCount: z.number(),
  overallFeedbackScore: z.number(),
  participantsCount: z.number(),
  unregisteredParticipantsCount: z.number(),
});
export type DashboardMetrics = z.infer<typeof dashboardMetricsSchema>;

// Feedback filters schema
export const feedbackFiltersSchema = z.object({
  location: z.string().optional(),
  time: z.string().optional(),
  demographics: z.string().optional(),
  skip: z.number().optional(),
  take: z.number().optional(),
});
export type FeedbackFilters = z.infer<typeof feedbackFiltersSchema>;

// Answer schema
export const answerSchema = z.object({
  id: z.string(),
  value: z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.record(z.any()),
    z.null(),
  ]),
  createdAt: z.string(),
  question: z
    .object({
      type: z.string(),
    })
    .optional(),
});
export type Answer = z.infer<typeof answerSchema>;

// Feedback schema
export const feedbackSchema = z.object({
  id: z.string(),
  content: z.string(),
  rating: z.number().nullable(),
  sentiment: z.string().nullable(),
  createdAt: z.string(),
  answers: z.array(answerSchema),
  user: z
    .object({
      name: z.string().nullable(),
      email: z.string(),
    })
    .nullable()
    .optional(),
});
export type Feedback = z.infer<typeof feedbackSchema>;

export interface FeedbackResponse {
  feedbacks: Feedback[];
  pages: FeedbackResponse[];
}

// SentimentData schema
export const sentimentDataItemSchema = z.object({
  date: z.string(),
  ratio: z.number(),
  positive: z.number(),
  negative: z.number(),
  neutral: z.number(),
});
export const sentimentDataSchema = z.array(sentimentDataItemSchema);
export type SentimentData = z.infer<typeof sentimentDataSchema>;
