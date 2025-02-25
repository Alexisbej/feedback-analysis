"use server";

import { getBusinessesForAdmin } from "../services/business-service";
import { Business, businessIdSchema } from "../types";

export async function getBusinessesAction(userId: string): Promise<Business[]> {
  const validatedData = businessIdSchema.parse({ userId });

  return getBusinessesForAdmin(validatedData.userId);
}
