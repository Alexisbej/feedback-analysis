import { z } from "zod";

export const templateIdSchema = z.object({
  templateId: z.string().uuid(),
});
export type TemplateId = z.infer<typeof templateIdSchema>;

export const campaignTemplateSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  tenantId: z.string().uuid(),
  feedbackLinks: z
    .array(
      z.object({
        id: z.string().uuid(),
        url: z.string().url(),
        qrCodeImage: z.string().nullable(),
        expiration: z.date().nullable().optional(),
        usageLimit: z.number().nullable().optional(),
        isActive: z.boolean(),
      }),
    )
    .optional(),
});
export type CampaignTemplate = z.infer<typeof campaignTemplateSchema>;

export const qrSettingsSchema = z.object({
  linkId: z.string().uuid(),
  expiration: z.date().nullable().optional(),
  usageLimit: z.number().nullable().optional(),
  isActive: z.boolean().optional(),
});
export type QRSettings = z.infer<typeof qrSettingsSchema>;

export const questionTypeSchema = z.enum(["TEXT", "MULTIPLE_CHOICE", "RATING"]);
export type QuestionType = z.infer<typeof questionTypeSchema>;

const questionSchema = z
  .object({
    text: z.string().min(1, "Question text is required"),
    type: z.enum(["TEXT", "MULTIPLE_CHOICE", "RATING"]),
    options: z.array(z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === "MULTIPLE_CHOICE" &&
      (!data.options || data.options.length < 2)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "At least 2 options required for multiple choice questions",
        path: ["options"],
      });
    }
    return true;
  });
export type Question = z.infer<typeof questionSchema>;

export const createTemplateSchema = z.object({
  tenantId: z.string(),
  name: z.string().min(1, "Survey name is required"),
  questions: z
    .array(questionSchema)
    .min(1, "At least one question required")
    .max(5, "Maximum 5 questions allowed"),
});
export type CreateTemplateData = z.infer<typeof createTemplateSchema>;
