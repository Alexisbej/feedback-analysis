// app/api/feedback/route.ts

import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get("businessId");
  const location = searchParams.get("location");
  // const time = searchParams.get("time");
  const demographics = searchParams.get("demographics");

  if (!businessId) {
    return NextResponse.json({ error: "Missing businessId" }, { status: 400 });
  }

  // Build filters for Prisma. Note: JSON filtering may vary depending on your Postgres version.
  const filters: { tenantId: string; metadata?: { path: string[]; equals: string } } = { tenantId: businessId };

  // Example: If filtering by location (assuming metadata is stored as { location: "..." })
  if (location) {
    filters.metadata = {
      path: ["location"],
      equals: location,
    };
  }
  if (demographics) {
    filters.metadata = {
      ...filters.metadata,
      path: ["demographics"],
      equals: demographics,
    };
  }
  // Time filter could be implemented as a date range on createdAt if needed

  const feedbacks = await prisma.feedback.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ feedbacks });
}
