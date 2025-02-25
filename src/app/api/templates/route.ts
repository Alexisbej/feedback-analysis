import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const businessId = searchParams.get("businessId");

  if (!businessId) {
    return NextResponse.json(
      { error: "businessId is required" },
      { status: 400 },
    );
  }

  const business = await prisma.tenant.findFirst({
    where: { id: businessId, ownerId: session.user.id },
  });

  if (!business) {
    return NextResponse.json({ error: "Business not found" }, { status: 404 });
  }

  const templates = await prisma.template.findMany({
    where: { tenantId: businessId },
    select: { id: true, name: true },
  });

  return NextResponse.json(templates);
}
