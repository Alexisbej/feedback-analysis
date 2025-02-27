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

export const feedbackRequestSchema = z.object({
  tenantId: z.string().uuid(),
  filters: feedbackFiltersSchema,
});
export type FeedbackRequestSchema = z.infer<typeof feedbackRequestSchema>;

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

export const themeSchema = z.object({
  name: z.string(),
  subthemes: z.array(z.string()),
  frequency: z.union([z.number(), z.string()]).optional(),
  quotes: z.array(z.string()).optional(),
});
export type Theme = z.infer<typeof themeSchema>;

export const competitorSchema = z.object({
  name: z.string(),
  comparisonPoints: z.array(z.string()),
  frequency: z.union([z.number(), z.string()]).optional(),
});
export type Competitor = z.infer<typeof competitorSchema>;

export const improvementSchema = z.object({
  name: z.string(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  suggestions: z.array(z.string()),
  count: z.number().optional(),
});
export type Improvement = z.infer<typeof improvementSchema>;

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
  analysisThemes: z.array(themeSchema).nullable().optional(),
  analysisCompetitors: z.array(competitorSchema).nullable().optional(),
  analysisImprovements: z.array(improvementSchema).nullable().optional(),
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
