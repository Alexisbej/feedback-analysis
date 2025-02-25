import * as z from "zod";

export const questionSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  question: z.string(),
  type: z.enum(["TEXT", "RATING", "MULTIPLE_CHOICE"]),
  options: z.array(z.string()).optional(),
});
export type Question = z.infer<typeof questionSchema>;

export type ResponseValue = string | number;

export const feedbackSubmitSchema = z.object({
  responses: z.record(z.union([z.string(), z.number()])),
});
export type FeedbackFormValues = z.infer<typeof feedbackSubmitSchema>;

export const brandingSchema = z.object({
  color: z.string(),
  logo: z.string().nullable().optional(),
});
export type Branding = z.infer<typeof brandingSchema>;

export const feedbackQuestionSchema = questionSchema.extend({
  templateName: z.string(),
  tenantName: z.string(),
  branding: brandingSchema,
});
export type FeedbackQuestion = z.infer<typeof feedbackQuestionSchema>;
