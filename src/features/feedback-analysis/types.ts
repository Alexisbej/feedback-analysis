import { z } from "zod";

// Theme Analysis
export const themeSchema = z.object({
  name: z.string(),
  frequency: z.string(),
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
  subthemes: z.array(z.string()),
  quotes: z.array(z.string()),
});

export const themeAnalysisSchema = z.object({
  themes: z.array(themeSchema),
});

export const competitorMentionSchema = z.object({
  competitor: z.string(), // This is the name field
  frequency: z.string(),
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
  context: z.array(z.string()),
  comparisonPoints: z.array(z.string()),
});

export const competitorAnalysisSchema = z.object({
  competitors: z.array(competitorMentionSchema),
  summary: z.string(),
});

export const improvementSchema = z.object({
  area: z.string(),
  impact: z.enum(["HIGH", "MEDIUM", "LOW"]),
  effort: z.enum(["HIGH", "MEDIUM", "LOW"]),
  supportingFeedback: z.array(z.string()),
  potentialBenefit: z.string(),
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]).optional(),
});

export const improvementAnalysisSchema = z.object({
  improvements: z.array(improvementSchema),
  quickWins: z.array(z.string()),
});

// Comprehensive Analysis
export const comprehensiveAnalysisSchema = z.object({
  themes: z.array(themeSchema),
  competitors: z.array(competitorMentionSchema).optional(),
  improvements: z.array(improvementSchema),
  summary: z.string(),
  nps: z.number().optional(),
  sentimentTrend: z.string(),
});

// Types from schemas
export type Theme = z.infer<typeof themeSchema>;
export type ThemeAnalysis = z.infer<typeof themeAnalysisSchema>;
export type CompetitorMention = z.infer<typeof competitorMentionSchema>;
export type CompetitorAnalysis = z.infer<typeof competitorAnalysisSchema>;
export type Improvement = z.infer<typeof improvementSchema>;
export type ImprovementAnalysis = z.infer<typeof improvementAnalysisSchema>;
export type ComprehensiveAnalysis = z.infer<typeof comprehensiveAnalysisSchema>;

// Union type for all analysis results
export type AnalysisResult =
  | ThemeAnalysis
  | CompetitorAnalysis
  | ImprovementAnalysis
  | ComprehensiveAnalysis;
