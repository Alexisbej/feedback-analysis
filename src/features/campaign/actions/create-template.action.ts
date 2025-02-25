"use server";

import { createTemplate } from "../services/template-service";
import { CreateTemplateData, createTemplateSchema } from "../types";

export async function createTemplateAction(data: CreateTemplateData) {
  const validatedData = createTemplateSchema.parse(data);

  return createTemplate(validatedData);
}
