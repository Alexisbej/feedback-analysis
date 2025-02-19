import { prisma } from "../../../prisma/prisma";


export async function getDashboardMetrics(businessId: string) {
  const campaignsCount = await prisma.template.count({
    where: { tenantId: businessId },
  });

  let overallFeedbackScore = 0;
  let participantsCount = 0;

  if (campaignsCount > 0) {
    const feedbackAggregate = await prisma.feedback.aggregate({
      _avg: { rating: true },
      where: { tenantId: businessId, rating: { not: null } },
    });
    overallFeedbackScore = feedbackAggregate._avg.rating || 0;

    const participantsGroup = await prisma.feedback.groupBy({
      by: ["userId"],
      where: { tenantId: businessId, userId: { not: null } },
    });
    participantsCount = participantsGroup.length;
  }


  return {
    campaignsCount,
    overallFeedbackScore,
    participantsCount,
  };
}
