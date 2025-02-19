import * as z from "zod";

export const feedbackSubmitSchema = z.object({
  responses: z.record(z.union([z.string(), z.number()])),
});

export type FeedbackSubmitSchema = z.infer<typeof feedbackSubmitSchema>;
