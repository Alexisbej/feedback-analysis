import { fetchFeedbacksFromDb } from "@/features/dashboard/services/feedback-service";
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

    const filters = {
      location: url.searchParams.get("location") || undefined,
      time: url.searchParams.get("time") || undefined,
      demographics: url.searchParams.get("demographics") || undefined,
      skip: url.searchParams.get("skip")
        ? parseInt(url.searchParams.get("skip")!, 10)
        : 0,
      take: url.searchParams.get("take")
        ? parseInt(url.searchParams.get("take")!, 10)
        : 5,
    };

    const feedbacks = await fetchFeedbacksFromDb(businessId, filters);

    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Error fetching feedbacks" },
      { status: 500 },
    );
  }
}
