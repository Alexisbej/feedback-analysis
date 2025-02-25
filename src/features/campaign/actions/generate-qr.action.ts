"use server";

import { revalidatePath } from "next/cache";

import { generateQRCode } from "../services/qr-service";
import { templateIdSchema } from "../types";

export async function generateQRAction(formData: FormData) {
  const templateId = formData.get("templateId")?.toString() || "";

  const validatedData = templateIdSchema.parse({ templateId });

  await generateQRCode(validatedData.templateId);

  revalidatePath("/dashboard/campaigns/[templateId]");
}
