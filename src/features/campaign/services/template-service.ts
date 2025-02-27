import { QuestionType } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";
import { CampaignTemplate, CreateTemplateData } from "../types";

export async function createTemplate(data: CreateTemplateData) {
  try {
    const template = await prisma.template.create({
      data: {
        name: data.name,
        tenantId: data.tenantId,
        fields: {
          create: data.questions.map((question) => ({
            question: question.text,
            type: question.type as QuestionType,
            options:
              question.type === "MULTIPLE_CHOICE" ? question.options || [] : [],
          })),
        },
      },
    });

    return {
      success: true,
      template,
      redirectUrl: `/dashboard/campaigns/${template.id}?businessId=${data.tenantId}`,
    };
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
}

export async function getCampaignTemplate(
  templateId: string,
): Promise<CampaignTemplate | null> {
  return prisma.template.findUnique({
    where: { id: templateId },
    include: {
      tenant: true,
      feedbackLinks: true,
    },
  });
}

export async function deleteTemplate(templateId: string) {
  try {
    await prisma.feedbackLink.updateMany({
      where: { templateId },
      data: { isActive: false },
    });

    await prisma.template.delete({
      where: { id: templateId },
    });

    return { success: true };
  } catch (error) {
    console.error("Error deleting template:", error);
    throw error;
  }
}
