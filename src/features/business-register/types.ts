import * as z from "zod";

export const businessRegisterSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  slug: z
    .string()
    .min(1, "Business URL is required")
    .regex(
      /^[a-z0-9-]+$/,
      "Only lowercase letters, numbers, and hyphens are allowed",
    ),
});
export type BusinessRegisterFormValues = z.infer<typeof businessRegisterSchema>;
