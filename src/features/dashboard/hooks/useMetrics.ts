"use client";

import { useQuery } from "@tanstack/react-query";
import { DashboardMetrics } from "../types";

async function fetchMetrics(businessId: string): Promise<DashboardMetrics> {
  const res = await fetch(`/api/dashboard/metrics?businessId=${businessId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard metrics");
  }

  return res.json();
}

export function useMetrics(businessId: string) {
  return useQuery({
    queryKey: ["dashboard", "metrics", businessId],
    queryFn: () => fetchMetrics(businessId),
    enabled: !!businessId,
  });
}
