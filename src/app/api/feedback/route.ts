import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const businessId = url.searchParams.get("businessId");
  const location = url.searchParams.get("location");
  const time = url.searchParams.get("time");
  const demographics = url.searchParams.get("demographics");

  if (!businessId) {
    return NextResponse.json(
      { error: "businessId is required" },
      { status: 400 },
    );
  }

  const where: {
    tenantId: string;
    location?: { contains: string; mode: "insensitive" };
    createdAt?: { gte: Date };
    demographics?: { contains: string; mode: "insensitive" };
  } = {
    tenantId: businessId,
  };

  if (location) {
    where.location = { contains: location, mode: "insensitive" };
  }
  if (time) {
    where.createdAt = { gte: new Date(time) };
  }
  if (demographics) {
    where.demographics = { contains: demographics, mode: "insensitive" };
  }

  try {
    const feedbacks = await prisma.feedback.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        answers: true,
      },
    });
    return NextResponse.json({ feedbacks });
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    return NextResponse.json(
      { error: "Error fetching feedbacks" },
      { status: 500 },
    );
  }
}
