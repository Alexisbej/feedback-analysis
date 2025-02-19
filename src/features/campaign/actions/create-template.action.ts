"use server";

import { QuestionType } from "@prisma/client";
import { prisma } from "../../../../prisma/prisma";

interface FormValues {
  name: string;
  questions: {
    text: string;
    type: QuestionType;
    options?: string[];
  }[];
}

export async function createTemplateAction(data: FormValues, tenantId: string) {
  try {
    const template = await prisma.template.create({
      data: {
        name: data.name,
        tenantId,
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
      redirectUrl: `/dashboard/campaigns/${template.id}`,
    };
  } catch (error) {
    console.error("Error creating template:", error);
    throw error;
  }
}
