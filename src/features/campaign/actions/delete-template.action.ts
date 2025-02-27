"use server";

import { revalidatePath } from "next/cache";
import { deleteTemplate } from "../services/template-service";
import { templateIdSchema } from "../types";

export async function deleteTemplateAction(formData: FormData) {
  const templateId = formData.get("templateId")?.toString() || "";

  const validatedData = templateIdSchema.parse({ templateId });

  await deleteTemplate(validatedData.templateId);

  revalidatePath("/dashboard/campaigns");

  return { success: true, redirectUrl: "/dashboard" };
}
