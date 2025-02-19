import { z } from "zod";

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

export const createTemplateSchema = z
  .object({
    templateType: z.enum(["rating", "feedback"]),
    name: z.string().min(1, "Survey name is required"),
    questions: z
      .array(questionSchema)
      .min(1, "At least one question required")
      .max(5, "Maximum 5 questions allowed"),
  })
  .superRefine((data, ctx) => {
    if (data.templateType === "rating") {
      const invalidQuestions = data.questions.filter(
        (q) => q.type !== "RATING",
      );
      if (invalidQuestions.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Rating surveys can only contain rating questions",
          path: ["questions"],
        });
      }
    }
    return true;
  });
