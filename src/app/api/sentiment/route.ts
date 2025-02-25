import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { content } = await req.json();

  const prompt = `You are tasked with analyzing the sentiment of user feedback for a survey system. The feedback can come from two types of surveys: one with only a numerical rating from 1-10, and another with text answers or multiple choice responses. Your goal is to categorize the sentiment as either NEGATIVE, NEUTRAL, or POSITIVE.

Survey Types:
1. Rating Survey: Contains only a numerical rating from 1-10
2. Text/Multiple Choice Survey: Contains text answers or multiple choice responses

Sentiment Categories:
- NEGATIVE
- NEUTRAL
- POSITIVE

Here is the feedback content to analyze:
<feedback_content>
${JSON.stringify(content)}
</feedback_content>

Instructions for analysis:

1. If the survey type is "Rating Survey":
   - Analyze the numerical rating provided
   - Ratings 1-4 should generally be considered NEGATIVE
   - Ratings 5-6 should generally be considered NEUTRAL
   - Ratings 7-10 should generally be considered POSITIVE

2. If the survey type is "Text/Multiple Choice Survey":
   - Carefully read and analyze the text content or multiple choice responses
   - Look for keywords, phrases, and overall tone that indicate sentiment
   - Consider the context and any nuances in the language used

Guidelines for determining sentiment:
- NEGATIVE sentiment typically includes expressions of dissatisfaction, frustration, disappointment, or criticism
- NEUTRAL sentiment typically includes balanced opinions, lack of strong emotion, or purely factual statements
- POSITIVE sentiment typically includes expressions of satisfaction, happiness, praise, or enthusiasm

In your analysis, consider the following:
- The overall tone of the feedback
- Specific words or phrases that indicate sentiment
- Any context clues that might influence the interpretation of the sentiment

After your analysis, provide your sentiment determination in the following format:

[NEGATIVE/NEUTRAL/POSITIVE]

ONLY RETURN ONE WORD, WHICH IS THE SENTIMENT.
`;

  const result = streamText({
    model: anthropic("claude-3-5-sonnet-20240620"),
    messages: [{ role: "user", content: prompt }],
  });

  return result.toDataStreamResponse();
}
