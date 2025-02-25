import { prisma } from "../../../../prisma/prisma";
import { DashboardMetrics } from "../types";

export async function getDashboardMetrics(
  businessId: string,
): Promise<DashboardMetrics> {
  const campaignsCount = await prisma.template.count({
    where: { tenantId: businessId },
  });

  let overallFeedbackScore = 0;
  let participantsCount = 0;
  let unregisteredParticipantsCount = 0;

  if (campaignsCount > 0) {
    const [directFeedback, answerRatings] = await Promise.all([
      prisma.feedback.aggregate({
        _avg: { rating: true },
        where: {
          tenantId: businessId,
          rating: { not: null },
        },
      }),
      prisma.answer.findMany({
        where: {
          feedback: { tenantId: businessId },
          question: { type: "RATING" },
        },
        select: {
          value: true,
        },
      }),
    ]);

    const directRatingSum =
      (directFeedback._avg.rating || 0) *
      (await prisma.feedback.count({
        where: { tenantId: businessId, rating: { not: null } },
      }));

    const answerRatingSum = answerRatings.reduce((sum, answer) => {
      const rating = Number(answer.value);
      return !isNaN(rating) ? sum + rating : sum;
    }, 0);

    const totalRatings =
      answerRatings.length +
      (await prisma.feedback.count({
        where: { tenantId: businessId, rating: { not: null } },
      }));

    overallFeedbackScore =
      totalRatings > 0 ? (directRatingSum + answerRatingSum) / totalRatings : 0;

    const participantsGroup = await prisma.feedback.groupBy({
      by: ["userId"],
      where: { tenantId: businessId, userId: { not: null } },
    });
    participantsCount = participantsGroup.length;

    const unregisteredParticipantsGroup = await prisma.feedback.groupBy({
      by: ["userId"],
      where: { tenantId: businessId, userId: null },
    });
    unregisteredParticipantsCount = unregisteredParticipantsGroup.length;
  }

  return {
    campaignsCount,
    overallFeedbackScore,
    participantsCount,
    unregisteredParticipantsCount,
  };
}
