import { z } from "zod";

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
  name: z.string(),
  sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
  frequency: z.string(),
  comparisonPoints: z.array(z.string()),
});

export const competitorAnalysisSchema = z.object({
  competitors: z.array(competitorMentionSchema),
});

export const improvementSchema = z.object({
  area: z.string(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
  suggestions: z.array(z.string()),
});

export const improvementAnalysisSchema = z.object({
  improvements: z.array(improvementSchema),
});

export type Theme = z.infer<typeof themeSchema>;
export type ThemeAnalysis = z.infer<typeof themeAnalysisSchema>;
export type CompetitorMention = z.infer<typeof competitorMentionSchema>;
export type CompetitorAnalysis = z.infer<typeof competitorAnalysisSchema>;
export type Improvement = z.infer<typeof improvementSchema>;
export type ImprovementAnalysis = z.infer<typeof improvementAnalysisSchema>;

export type AnalysisResult =
  | ThemeAnalysis
  | CompetitorAnalysis
  | ImprovementAnalysis;
