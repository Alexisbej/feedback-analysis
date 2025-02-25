"use server";

import { getDashboardMetrics } from "../services/metrics-service";
import { DashboardMetrics, metricsSchema } from "../types";

export async function getMetricsAction(
  businessId: string,
): Promise<DashboardMetrics> {
  const validatedData = metricsSchema.parse({ businessId });

  return getDashboardMetrics(validatedData.businessId);
}
