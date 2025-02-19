import { prisma } from "../../../prisma/prisma";

export async function getCampaignTemplate(templateId: string) {
  return prisma.template.findUnique({
    where: { id: templateId },
    include: {
      tenant: true,
      feedbackLinks: true,
    },
  });
}
