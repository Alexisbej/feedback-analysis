"use server";

import { prisma } from "../../../../prisma/prisma";
import type { Prisma } from "@prisma/client";

type Filters = {
  location?: string;
  time?: string;
  demographics?: string;
};

export const fetchFeedbacksAction = async ({
  tenantId,
  filters,
}: {
  tenantId: string;
  filters: Filters;
}) => {
  const { location, time, demographics } = filters;

  const whereClause: Prisma.FeedbackWhereInput = { tenantId };

  const metadataFilters = [];
  if (location) {
    metadataFilters.push({
      metadata: { path: ["location"], equals: location },
    });
  }
  if (demographics) {
    metadataFilters.push({
      metadata: { path: ["demographics"], equals: demographics },
    });
  }
  if (metadataFilters.length > 0) {
    whereClause.AND = metadataFilters;
  }

  if (time) {
    whereClause.createdAt = { gte: new Date(time) };
  }

  const feedbacks = await prisma.feedback.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  return feedbacks;
};
