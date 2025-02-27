import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request) {
  const { content } = await req.json();

  const prompt = `You are an expert business analyst examining a single piece of customer feedback.
  Provide a comprehensive analysis of the following feedback:

  ${JSON.stringify(content)}

  Instructions:
  1. Analyze the sentiment (positive, neutral, negative) based on:
     * NEGATIVE: expressions of dissatisfaction, frustration, disappointment, or criticism
     * NEUTRAL: balanced opinions, lack of strong emotion, or purely factual statements
     * POSITIVE: expressions of satisfaction, happiness, praise, or enthusiasm
     * For numerical ratings, consider 1-4 as NEGATIVE, 5-6 as NEUTRAL, 7-10 as POSITIVE

  2. Identify main themes present in the feedback (1-3 themes)
     - Provide a clear name for each theme
     - List key subthemes or specific issues

  3. Extract any competitor mentions
     - Note the competitor name
     - Identify comparison points (better than, worse than, similar to)

  4. Suggest specific improvements based on the feedback
     - Provide clear improvement areas
     - Rate priority (HIGH, MEDIUM, LOW)

  Only identify themes, competitors, and improvements if they are clearly present in the feedback.
  
  Structure your response as valid JSON:
  
  {
    "sentiment": "POSITIVE/NEUTRAL/NEGATIVE",
    "themes": [
      {
        "name": "Theme Name",
        "subthemes": ["Subtheme 1", "Subtheme 2"]
      }
    ],
    "competitors": [
      {
        "name": "Competitor Name",
        "comparisonPoints": ["Better at X", "Worse at Y"]
      }
    ],
    "improvements": [
      {
        "name": "Improvement Area",
        "priority": "HIGH/MEDIUM/LOW",
        "suggestions": ["Suggestion 1", "Suggestion 2"]
      }
    ]
  }`;

  const result = generateObject({
    model: anthropic("claude-3-5-sonnet-20240620"),
    system:
      "You are a business intelligence assistant that analyzes customer feedback data and extracts actionable insights. Always return valid JSON.",
    schema: z.object({
      sentiment: z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]),
      themes: z
        .array(
          z.object({
            name: z.string(),
            frequency: z.number(),
            subthemes: z.array(z.string()),
            quotes: z.array(z.string()),
          }),
        )
        .optional(),
      competitors: z
        .array(
          z.object({
            name: z.string(),
            frequency: z.string(),
            comparisonPoints: z.array(z.string()),
          }),
        )
        .optional(),
      improvements: z
        .array(
          z.object({
            name: z.string(),
            priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
            suggestions: z.array(z.string()),
          }),
        )
        .optional(),
    }),
    messages: [{ role: "user", content: prompt }],
  });

  return result.then((r) => r.toJsonResponse());
}
