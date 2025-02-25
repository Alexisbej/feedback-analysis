import { getDashboardMetrics } from "@/features/dashboard/services/metrics-service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const businessId = url.searchParams.get("businessId");

    if (!businessId) {
      return NextResponse.json(
        { error: "businessId is required" },
        { status: 400 },
      );
    }

    const metrics = await getDashboardMetrics(businessId);

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    return NextResponse.json(
      { error: "Error fetching dashboard metrics" },
      { status: 500 },
    );
  }
}
